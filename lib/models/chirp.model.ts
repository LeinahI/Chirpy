import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({ /* NEW */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
  reactions: [reactionSchema], /* NEW */
  children: [
    /* Replies and recusion will occur */
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chirp",
    },
  ],
});

chirpSchema.virtual("reactionsCount").get(function () { /* NEW */
  return this.reactions.length;
});

chirpSchema.virtual("repliesCount").get(function () {
  return this.children.length;
});

const Chirp = mongoose.models.Chirp || mongoose.model("Chirp", chirpSchema);

export default Chirp;