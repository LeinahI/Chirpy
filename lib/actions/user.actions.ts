"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Chirp from "../models/chirp.model";
import { FilterQuery, SortOrder } from "mongoose";
import Circle from "../models/circle.model";

/* Server Actions */
export async function followUser({
  followerId,
  followedId,
  path,
}: {
  followerId: string;
  followedId: string;
  path: string;
}) {
  try {
    connectToDB();

    const follower = await User.findOne({ id: followerId });

    if (!follower) {
      throw new Error("Follower not found");
    }

    const followed = await User.findOne({ id: followedId });

    if (!followed) {
      throw new Error("Followed not found");
    }

    const isAlreadyFollowed = await isUserFollowing(followerId, followedId);

    if (isAlreadyFollowed) {
      follower.following.pull({
        user: followed._id,
      });
    } else {
      follower.following.push({
        user: followed._id,
      });
    }

    await follower.save();

    if (isAlreadyFollowed) {
      followed.followers.pull({
        user: follower._id,
      });
    } else {
      followed.followers.push({
        user: follower._id,
      });
    }

    await followed.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to follow user: ${error.message}`);
  }
}

export async function isUserFollowing(followerId: string, followedId: string) {
  try {
    connectToDB();

    const followed = await User.findOne({ id: followedId });

    const isFollowing = await User.findOne({
      id: followerId,
      following: { $elemMatch: { user: followed._id } },
    });

    return !!isFollowing;
  } catch (error: any) {
    throw new Error(`Failed to check if user is followed: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId }).populate({
      path: "circles",
      model: Circle,
      /* select: "name username image _id id", */
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  path: string;
  image: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  path,
  image,
}: Params): Promise<void> {
  connectToDB();
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser && existingUser.id !== userId) {
      // If the username exists and belongs to a different user, throw an error
      throw new Error("Username is already taken.");
    }

    // Update the user
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (err: any) {
    throw new Error(`Failed to create/update user: ${err.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    //Find all chirps by user id
    connectToDB();
    /* TODO: Populate Circle */
    const chirps = await User.findOne({ id: userId }).populate({
      path: "chirps",
      model: Chirp,
      populate: [
        {
          path: "circle",
          model: Circle,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Circle" model
        },
        {
          path: "children",
          model: Chirp,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });

    return chirps;
  } catch (err: any) {
    throw new Error(`Failed to fetch user posts: ${err.message}`);
  }
}

export async function getUserFollowersIds(userId: string, key: string) {
  try {
    connectToDB();

    const user = await User.findOne({ id: userId });

    const followersIds = user[key].map((folower: any) => folower.user);

    return followersIds;
  } catch (error: any) {
    throw new Error(`Failed to fetch user followers: ${error.message}`);
  }
}

export async function fetchUsersByField(userId: string, field: string) {
  try {
    connectToDB();

    const user = await User.findOne({ id: userId });

    const usersIds = user[field].map((user: any) => user.user);

    const users = await User.find({ _id: { $in: usersIds } });

    return users;
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  userIds,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  userIds?: string[];
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmt = (pageNumber - 1) * pageSize; //skip

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      //fetch
      id: { $ne: userId } /* ne: not equal */,
    };

    if (userIds) {
      query._id = { $in: userIds };
    }

    if (searchString.trim() !== "") {
      //searching
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy }; //sorting

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmt)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmt + users.length;

    return { users, isNext };
  } catch (err: any) {
    throw new Error(`Failed to fetch users: ${err.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();
    //find all chirps created by user
    const [userChirps, user] = await Promise.all([
      Chirp.find({ author: userId }),
      User.findOne({ _id: userId }),
    ]);

    //Collect all child chirps replies id from the children field
    const childChirpIds = userChirps.reduce(
      (acc /*accumulator*/, userChirp) => {
        return acc.concat(userChirp.children);
      },
      []
    );

    const reactions = userChirps.reduce( /* NEW */
      (acc, userChirp) => acc.concat(userChirp.reactions),
      []
    );

    const [reactionsUsers, followersUsers] = await Promise.all([ /* NEW */
      User.find({
        _id: {
          $in: reactions.map((reaction: { user: any; }) => reaction.user),
        },
      }),
      User.find({
        _id: {
          $in: user.followers.map((follower: { user: any }) => follower.user),
        },
      }),
    ]);

    const reactionsData = reactions.map((reaction: { user: { toString: () => any; }; createdAt: any; }, index: any) => { /* NEW */
      const reactingUser = reactionsUsers.find(
        (user) => user._id.toString() === reaction.user.toString()
      );

      if (reactingUser._id.equals(userId)) return null;
      return {
        author: {
          name: reactingUser.name,
          username: reactingUser.username,
          image: reactingUser.image,
          _id: reactingUser._id,
          id: reactingUser.id,
        },
        createdAt: reaction.createdAt,
        parentId: userChirps[0]._id.toString(),
        activityType: "reaction",
      };
    });

    const followersData = user.followers.map(
      (follower: { user: { toString: () => any }; createdAt: any }) => {
        const followingUser = followersUsers.find(
          (user) => user._id.toString() === follower.user.toString()
        );

        if (followingUser._id.equals(userId)) return null;
        return {
          author: {
            name: followingUser.name,
            username: followingUser.username,
            image: followingUser.image,
            _id: followingUser._id,
            id: followingUser.id,
          },
          createdAt: follower.createdAt,
          activityType: "follow",
        };
      }
    );

    const [replies, reactionsAndFollowers] = await Promise.all([
      Chirp.find({
        _id: { $in: childChirpIds },
        author: { $ne: userId },
      }).populate({
        path: "author",
        model: User,
        select: "name username image id _id",
      }),
      reactionsData.concat(followersData),
    ]);

    const activity = [...replies, ...reactionsAndFollowers]
      .filter((i) => i !== null)
      .sort((a, b) => b?.createdAt - a?.createdAt);

    return activity;
  } catch (err: any) {
    throw new Error(`Failed to fetch activities: ${err.message}`);
  }
}
