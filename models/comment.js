let mongoose = require("mongoose");

let commentModel = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    text: {
      type: String,
    },
  },
  {
    collection: "Comment",
  }
);

module.exports.Comment = mongoose.model("Comment", commentModel);
