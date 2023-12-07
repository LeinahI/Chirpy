"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Chirp from "../models/chirp.model";
import Circle from "../models/circle.model";

export async function isChirpReactedByUser({
  chirpId,
  userId,
}: {
  chirpId: string;
  userId: string;
}) {
  try {
    connectToDB();

    const chirp = await Chirp.findOne({ _id: chirpId });

    const isReacted: any = chirp.reactions.some((reaction: any) =>
      reaction.user.equals(userId)
    );

    return !!isReacted;
  } catch (error: any) {
    throw new Error(
      `Failed to check if chirp is reacted by user: ${error.message}`
    );
  }
}

export async function fetchChirps(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of chirps to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the chirps that have no parent (top-level chirps) (a chirps that is not a comment/reply).
  const chirpsQuery = Chirp.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "circle",
      model: Circle,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level chirps (chirps) i.e., chirps that are not comments.
  const totalChirpsCount = await Chirp.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of chirps

  const chirps = await chirpsQuery.exec();

  const isNext = totalChirpsCount > skipAmount + chirps.length;

  return { chirps, isNext };
}

interface Params {
  text: string;
  author: string;
  circleId: string | null;
  path: string;
}

export async function editChirp({
  chirpId /* New */,
  text,
  path,
}: {
  chirpId: string;
  text: string;
  path: string;
}) {
  try {
    connectToDB();

    const chirp = await Chirp.findById(chirpId);

    if (!chirp) {
      throw new Error("Chirp not found");
    }

    chirp.text = text;

    await chirp.save();

    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Failed to edit chirp: ${err.message}`);
  }
}

export async function createChirp({ text, author, circleId, path }: Params) {
  try {
    connectToDB();

    const circleIdObject = await Circle.findOne({ id: circleId }, { _id: 1 });

    const createdChirp = await Chirp.create({
      text,
      author,
      circle: circleIdObject, // Assign circleId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { chirps: createdChirp._id },
    });

    if (circleIdObject) {
      // Update Circle model
      await Circle.findByIdAndUpdate(circleIdObject, {
        $push: { chirps: createdChirp._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create chirp: ${error.message}`);
  }
}

export async function fetchAllChildChirps(chirpId: string): Promise<any[]> {
  const childChirps = await Chirp.find({ parentId: chirpId });

  const descendantChirps = [];
  for (const childChirp of childChirps) {
    const descendants = await fetchAllChildChirps(childChirp._id);
    descendantChirps.push(childChirp, ...descendants);
  }

  return descendantChirps;
}

export async function deleteChirp(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    // Find the chirp to be deleted (the main chirp)
    const mainChirp = await Chirp.findById(id).populate("author circle");

    if (!mainChirp) {
      throw new Error("Chirp not found");
    }

    // Fetch all child chirps and their descendants recursively
    const descendantChirps = await fetchAllChildChirps(id);

    // Get all descendant chirp IDs including the main chirp ID and child chirp IDs
    const descendantChirpIds = [
      id,
      ...descendantChirps.map((chirp) => chirp._id),
    ];

    // Extract the authorIds and circleIds to update User and Circle models respectively
    const uniqueAuthorIds = new Set(
      [
        ...descendantChirps.map((chirp) => chirp.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainChirp.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    const uniqueCircleIds = new Set(
      [
        ...descendantChirps.map((chirp) => chirp.circle?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainChirp.circle?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    // Recursively delete child chirps and their descendants
    await Chirp.deleteMany({ _id: { $in: descendantChirpIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { chirps: { $in: descendantChirpIds } } }
    );

    // Update Circle model
    await Circle.updateMany(
      { _id: { $in: Array.from(uniqueCircleIds) } },
      { $pull: { chirps: { $in: descendantChirpIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete chirp: ${error.message}`);
  }
}

export async function fetchChirpById(chirpId: string) {
  connectToDB();

  try {
    const chirp = await Chirp.findById(chirpId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name username image",
      }) // Populate the author field with _id and username
      .populate({
        path: "circle",
        model: Circle,
        select: "_id id name image",
      }) // Populate the circle field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name username parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Chirp, // The model of the nested children (assuming it's the same "Chirp" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name username parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return chirp;
  } catch (err) {
    console.error("Error while fetching chirp:", err);
    throw new Error("Unable to fetch chirp");
  }
}

export async function addReactToChirp({
  chirpId,
  userId,
  path,
}: {
  chirpId: string;
  userId: string;
  path: string;
}) {
  try {
    connectToDB();

    const chirp = await Chirp.findById(chirpId);
    const user = await User.findOne({ id: userId });

    if (!chirp) {
      throw new Error("Chirp not found");
    }

    const isAlreadyReacted = await isChirpReactedByUser({
      chirpId: chirp._id,
      userId: user._id,
    });

    if (isAlreadyReacted) {
      chirp.reactions.pull({
        user: user._id,
      });
    } else {
      chirp.reactions.push({
        user: user._id,
      });
    }

    await chirp.save();

    if (isAlreadyReacted) {
      user.reactions.pull({
        chirp: chirp._id,
      });
    } else {
      user.reactions.push({
        chirp: chirp._id,
      });
    }

    await user.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add reaction to chirp: ${error.message}`);
  }
}

export async function addCommentToChirp(
  chirpId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // Find the original chirp by its ID
    const originalChirp = await Chirp.findById(chirpId);

    if (!originalChirp) {
      throw new Error("Chirp not found");
    }

    // Create the new comment chirp
    const commentChirp = new Chirp({
      text: commentText,
      author: userId,
      parentId: chirpId, // Set the parentId to the original chirp's ID
    });

    // Save the comment chirp to the database
    const savedCommentChirp = await commentChirp.save();

    // Add the comment chirp's ID to the original chirp's children array
    originalChirp.children.push(savedCommentChirp._id);

    // Save the updated original chirp to the database
    await originalChirp.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}
