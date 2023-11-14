"use server";

import { FilterQuery, SortOrder } from "mongoose";

import Circle from "../models/circle.model";
import Chirp from "../models/chirp.model";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function createCircle(
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string // Change the parameter name to reflect it's an id
) {
  try {
    connectToDB();

    // Find the user with the provided unique id
    const user = await User.findOne({ id: createdById });

    if (!user) {
      throw new Error("User not found"); // Handle the case if the user with the id is not found
    }

    const newCircle = new Circle({
      id,
      name,
      username,
      image,
      bio,
      createdBy: user._id, // Use the mongoose ID of the user
    });

    const createdCircle = await newCircle.save();

    // Update User model
    user.circles.push(createdCircle._id);
    await user.save();

    return createdCircle;
  } catch (error) {
    // Handle any errors
    console.error("Error creating circle:", error);
    throw error;
  }
}

export async function fetchCircleDetails(id: string) {
  try {
    connectToDB();

    const circleDetails = await Circle.findOne({ id }).populate([
      "createdBy",
      {
        path: "members",
        model: User,
        select: "name username image _id id",
      },
    ]);

    return circleDetails;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching circle details:", error);
    throw error;
  }
}

export async function fetchCircleChirps(id: string) {
  try {
    connectToDB();

    const circleChirps = await Circle.findById(id).populate({
      path: "chirps",
      model: Chirp,
      populate: [
        {
          path: "author",
          model: User,
          select: "name image id", // Select the "name" and "_id" fields from the "User" model
        },
        {
          path: "children",
          model: Chirp,
          populate: {
            path: "author",
            model: User,
            select: "image _id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });

    return circleChirps;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching circle chirps:", error);
    throw error;
  }
}

export async function fetchCircles({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate the number of circles to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter circles.
    const query: FilterQuery<typeof Circle> = {};

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched circles based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    // Create a query to fetch the circles based on the search and sort criteria.
    const circlesQuery = Circle.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");

    // Count the total number of circles that match the search criteria (without pagination).
    const totalCirclesCount = await Circle.countDocuments(query);

    const circles = await circlesQuery.exec();

    // Check if there are more circles beyond the current page.
    const isNext = totalCirclesCount > skipAmount + circles.length;

    return { circles, isNext };
  } catch (error) {
    console.error("Error fetching circles:", error);
    throw error;
  }
}

export async function addMemberToCircle(
  circleId: string,
  memberId: string
) {
  try {
    connectToDB();

    // Find the circle by its unique id
    const circle = await Circle.findOne({ id: circleId });

    if (!circle) {
      throw new Error("Circle not found");
    }

    // Find the user by their unique id
    const user = await User.findOne({ id: memberId });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user is already a member of the circle
    if (circle.members.includes(user._id)) {
      throw new Error("User is already a member of the circle");
    }

    // Add the user's _id to the members array in the circle
    circle.members.push(user._id);
    await circle.save();

    // Add the circle's _id to the circles array in the user
    user.circles.push(circle._id);
    await user.save();

    return circle;
  } catch (error) {
    // Handle any errors
    console.error("Error adding member to circle:", error);
    throw error;
  }
}

export async function removeUserFromCircle(
  userId: string,
  circleId: string
) {
  try {
    connectToDB();

    const userIdObject = await User.findOne({ id: userId }, { _id: 1 });
    const circleIdObject = await Circle.findOne(
      { id: circleId },
      { _id: 1 }
    );

    if (!userIdObject) {
      throw new Error("User not found");
    }

    if (!circleIdObject) {
      throw new Error("Circle not found");
    }

    // Remove the user's _id from the members array in the circle
    await Circle.updateOne(
      { _id: circleIdObject._id },
      { $pull: { members: userIdObject._id } }
    );

    // Remove the circle's _id from the circles array in the user
    await User.updateOne(
      { _id: userIdObject._id },
      { $pull: { circles: circleIdObject._id } }
    );

    return { success: true };
  } catch (error) {
    // Handle any errors
    console.error("Error removing user from circle:", error);
    throw error;
  }
}

export async function updateCircleInfo(
  circleId: string,
  name: string,
  username: string,
  image: string
) {
  try {
    connectToDB();

    // Find the circle by its _id and update the information
    const updatedCircle = await Circle.findOneAndUpdate(
      { id: circleId },
      { name, username, image }
    );

    if (!updatedCircle) {
      throw new Error("Circle not found");
    }

    return updatedCircle;
  } catch (error) {
    // Handle any errors
    console.error("Error updating circle information:", error);
    throw error;
  }
}

export async function deleteCircle(circleId: string) {
  try {
    connectToDB();

    // Find the circle by its ID and delete it
    const deletedCircle = await Circle.findOneAndDelete({
      id: circleId,
    });

    if (!deletedCircle) {
      throw new Error("Circle not found");
    }

    // Delete all chirps associated with the circle
    await Chirp.deleteMany({ circle: circleId });

    // Find all users who are part of the circle
    const circleUsers = await User.find({ circles: circleId });

    // Remove the circle from the 'circles' array for each user
    const updateUserPromises = circleUsers.map((user) => {
      user.circles.pull(circleId);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deletedCircle;
  } catch (error) {
    console.error("Error deleting circle: ", error);
    throw error;
  }
}
