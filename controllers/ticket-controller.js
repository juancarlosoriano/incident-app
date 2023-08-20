// create a User Model Instance
const ticketModel = require("../models/ticket");
const ticket = ticketModel.Ticket;
const commentModel = require("../models/comment");
const comment = commentModel.Comment;
const userModel = require("../models/user");
const User = userModel.User;

const getAllTickets = async (req, res) => {
  try {
    let allTickets = await ticket
      .find({})
      .populate("createdBy", "-password -_id")
      .populate("assignedTo", "-password -_id");

    res.status(200).json(allTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllComments = async (req, res) => {
  try {
    let allComments = await comment
      .find({}, { _id: 0 })
      .populate("author", "-password -_id")
      .populate("TicketRef", "-_id -createdBy -assignedTo");

    res.status(200).json({ comments: allComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTicket = async (req, res) => {
  let id = req.params.id;

  try {
    await ticket.findByIdAndRemove(id);

    res.status(200).json({ message: "Ticket Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createTicket = async (req, res) => {
  let ticketToCreate = new ticket({
    title: req.body.title,
    status: req.body.status ? req.body.status : "Open",
    description: req.body.description,
    createdOn: req.body.createdOn,
    createdBy: req.body.creatorId,
    assignedTo: req.body.assignedId,
  });

  let ticketComment = new comment({
    author: req.body.creatorId,
    description: req.body.commentDescription,
    isInternal: req.body.isInternal,
  });

  let ticketRef, commentId;

  try {
    await ticket.create(ticketToCreate).then((result) => {
      ticketRef = result._id;
    });

    ticketComment.TicketRef = ticketRef;
    await comment.create(ticketComment).then((result) => {
      commentId = result._id;
    });

    await ticket.updateOne(
      { _id: ticketRef },
      { $addToSet: { comments: commentId } }
    );

    res.status(200).json({ message: "Ticket and Comment Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const displayTicket = async (req, res) => {
  let id = req.params.id;

  try {
    let returnTicket = await ticket
      .findById(id, { _id: 0 })
      .populate("createdBy", "-password -_id -createdAt -updatedAt")
      .populate("assignedTo", "-password -_id -createdAt -updatedAt");

    res.status(200).json({ ticket: returnTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTicket = async (req, res) => {
  let id = req.params.id;
  let ticketToUpdate = new ticket({
    title: req.body.title,
    description: req.body.description,
    createdOn: req.body.createdOn,
    createdBy: req.body.creatorId,
    assignedTo: req.body.assignedId,
  });

  try {
    await ticket.updateOne(
      { _id: id },
      {
        $set: {
          title: ticketToUpdate.title,
          description: ticketToUpdate.description,
          createdOn: ticketToUpdate.createdOn,
          createdBy: ticketToUpdate.createdBy,
          assignedTo: ticketToUpdate.assignedTo,
        },
      }
    );

    res.status(200).json({ message: "Ticekt Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const displayComment = async (req, res) => {
  let id = req.params.ticket_id;

  try {
    let commentToDisplay = await comment
      .find({ TicketRef: id }, { _id: 0 })
      .populate("TicketRef", "-_id -createdBy -assignedTo");

    res.status(200).json({ comment: commentToDisplay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateComment = async (req, res) => {
  let id = req.params.comment_id;

  let commentToUpdate = new comment({
    description: req.body.description,
    isInternal: req.body.isInternal,
    userStories: req.body.userStories,
  });

  try {
    await comment.updateOne(
      { _id: id },
      {
        $set: {
          description: commentToUpdate.description,
          isInternal: commentToUpdate.isInternal,
          userStories: commentToUpdate.userStories,
        },
      }
    );

    res.status(200).json({ message: "Comment Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const openTicket = async (req, res) => {
  let id = req.params.id;

  try {
    await ticket.updateOne({ _id: id }, { $set: { status: "Open" } });

    res.status(200).json({ message: "Ticekt Opened" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resolveTicket = async (req, res) => {
  let id = req.params.id;

  try {
    await ticket.updateOne({ _id: id }, { $set: { status: "Resolved" } });

    res.status(200).json({ message: "Ticekt Resolved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createComment = async (req, res) => {
  let id = req.params.ticket_id;

  let commentToCreate = new comment({
    TicketRef: id,
    author: req.body.authorId,
    createdOn: req.body.createdOn,
    description: req.body.description,
    isInternal: req.body.isInternal,
    userStories: req.body.userStories,
  });

  let commentId;
  try {
    await comment.create(commentToCreate).then((result) => {
      commentId = result._id;
    });

    await ticket.updateOne({ _id: id }, { $addToSet: { comments: commentId } });

    res.status(200).json({ message: "Comment Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  let id = req.params.comment_id;

  try {
    await comment.findByIdAndRemove(id);

    res.status(200).json({ message: "Comment Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTickets,
  deleteTicket,
  createTicket,
  displayTicket,
  updateTicket,
  openTicket,
  resolveTicket,
  displayComment,
  updateComment,
  getAllComments,
  createComment,
  deleteComment,
};
