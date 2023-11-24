"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Chirp from "../models/chirp.model";

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
  connectToDB();
  try {
    //Find all threads by user id

    /* TODO: Populate Circle */
    const chirps = await User.findOne({id: userId})
    .populate({
      path: 'chirps',
      model: Chirp,
      populate: {
        path: 'children',
        model: Chirp,
        populate: {
          path: 'author',
          model: User,
          select: 'name image id'
        }
      }
    })

    return chirps;
  } catch (err: any) {
    throw new Error(`Failed to fetch user posts: ${err.message}`);
  }
}
