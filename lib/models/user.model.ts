import mongoose from "mongoose";

/* FollowerSchema */
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

/* ReactionSchema */
const reactionSchema = new mongoose.Schema({ 
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chirp",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
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
  followers: [followerSchema], /* NEW */
  following: [followerSchema], /* NEW */
  chirps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chirp",
    },
  ],
  reactions: [reactionSchema],
  onboarded: {
    type: Boolean,
    default: false,
  },
  circles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circle",
    },
  ],
});

userSchema.virtual("chirpsCount").get(function () {
  return this.chirps.length;
});

userSchema.virtual("followersCount").get(function () { /* NEW */
  return this.followers.length;
});

userSchema.virtual("followingCount").get(function () { /* NEW */
  return this.following.length;
});

userSchema.virtual("circlesCount").get(function () {
  return this.circles.length;
});

userSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;