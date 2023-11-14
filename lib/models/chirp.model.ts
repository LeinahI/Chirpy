import mongoose from "mongoose";

const chirpSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  circle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circle",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    /* Replies and recusion will occur */
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circle",
    },
  ], 
});

const Chirp =
  mongoose.models.Chirp ||
  mongoose.model("Chirp", chirpSchema);

export default Chirp;

