"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Chirp from "../models/chirp.model";
import { FilterQuery, SortOrder } from "mongoose";

/* Server Actions */

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

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
  } catch (err: any) {
    throw new Error(`Failed to fetch user: ${err.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    //Find all threads by user id
    connectToDB();
    /* TODO: Populate Circle */
    const chirps = await User.findOne({ id: userId }).populate({
      path: "chirps",
      model: Chirp,
      populate: {
        path: "children",
        model: Chirp,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return chirps;
  } catch (err: any) {
    throw new Error(`Failed to fetch user posts: ${err.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNum = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmt = (pageNum - 1) * pageSize; //skip

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      //fetch
      id: { $ne: userId } /* ne: not equal */,
    };

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
    const userChirps = await Chirp.find({ author: userId });

    //Collect all child chirps replies id from the children field

    const childChirpIds = userChirps.reduce(
      (acc /*accumulator*/, userChirp) => {
        return acc.concat(userChirp.children);
      }, []);

    const replies = await Chirp.find({
      _id: { $in: childChirpIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (err: any) {
    throw new Error(`Failed to fetch activities: ${err.message}`);
  }
}
