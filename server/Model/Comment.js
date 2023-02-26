const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  postId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
