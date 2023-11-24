"use server";

import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Chirp from "../models/chirp.model";
import User from "../models/user.model";
import Circle from "../models/circle.model";
import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the Circle model
const circleSchema = new Schema({
  // Define your fields here
  // For example:
  name: { type: String, required: true },
});

interface Params {
  text: string;
  author: string;
  circleId: string | null;
  path: string;
}

export async function createChirp({ text, author, circleId, path }: Params) {
  connectToDB();

  try {
    const createdChirp = await Chirp.create({
      text,
      author,
      circle: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { /* Name of Collection */ chirps: createdChirp._id },
    });

    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Error on creating chirp: ${err.message}`);
  }
}

export async function fetchChirps(pageNumber = 1, pageSize = 20) {
  connectToDB();

  //calc post skip
  const skipAmount = (pageNumber - 1) * pageSize;

  //top lvl chirps
  const chirpsQuery = Chirp.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalChirpCount = await Chirp.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const chirps = await chirpsQuery.exec();

  const isNext = totalChirpCount > skipAmount + chirps.length;

  return { chirps, isNext };
}

export async function fetchChirpById(chirpId: string) {
  connectToDB();
  try {
    //TODO: populate circle
    const chirp = await Chirp.findById(chirpId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "circle",
        model: Circle,
        select: "_id id name image",
      })
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Chirp, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return chirp;
  } catch (err: any) {
    throw new Error(`Error fetching chirp: ${err.message}`);
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
    //adding comment
    const originalChirp = await Chirp.findById(chirpId);

    if (!originalChirp) {
      throw new Error("Chirp not found");
    }

    //create a new chirp with the comment txt
    const commentChirp = new Chirp({
      text: commentText,
      author: userId,
      parentId: chirpId,
    });

    //save new chirp
    const savedCommentChirp = await commentChirp.save();

    //update the orig chirp to include new comment
    originalChirp.children.push(savedCommentChirp._id);

    //save orig chirp
    await originalChirp.save();

    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Error adding comment to chirp: ${err.message}`);
  }
}
