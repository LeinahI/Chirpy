import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({ /* NEW */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const circleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chirps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chirp",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [followerSchema], /* NEW */
});

circleSchema.virtual("membersCount").get(function () {
  return this.members.length;
});

circleSchema.virtual("chirpsCount").get(function () {
  return this.chirps.length;
});

circleSchema.virtual("followersCount").get(function () { /* NEW */
  return this.followers.length;
});

const Circle = mongoose.models.Circle || mongoose.model("Circle", circleSchema);

export default Circle;
