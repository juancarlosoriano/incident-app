let mongoose = require("mongoose");
let userModel = require("./user");
let User = userModel.User;
let commentModel = require("./comment");
let Comment = commentModel.Comment;

// Create a ticket model class
let ticketModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Open", "Resolved"],
    },
    description: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    closedOn: {
      type: Date,
      required: false,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    comments: [
      {
        commentText: String,
        createdOn: Date,
        createdBy: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    collection: "Ticket",
  }
);

module.exports.Ticket = mongoose.model("Ticket", ticketModel);
