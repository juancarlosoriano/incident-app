// create a User Model Instance
const ticketModel = require("../models/ticket");
const Ticket = ticketModel.Ticket;
const commentModel = require("../models/comment");
const comment = commentModel.Comment;
const userModel = require("../models/user");
const User = userModel.User;

const getAllTickets = async (req, res) => {
  try {
    let allTickets = await Ticket.find({}).select(
      "_id title description status createdOn closeOn createdBy assignedTo comments"
    );
    res.status(200).json(allTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTicket = async (req, res) => {
  let id = req.params.id;

  try {
    await Ticket.findByIdAndRemove(id);

    res.status(200).json({ message: "Ticket Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createTicket = async (req, res) => {
  let newTicket = new Ticket({
    title: req.body.title,
    status: "Open",
    description: req.body.description,
    createdOn: Date.now(),
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo,
    comments: [],
  });

  try {
    await newTicket.save();

    res.status(200).json({ message: "Ticket Created!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTicket = async (req, res) => {
  let id = req.params.id;
  let params = {
    title: req.body.title,
    description: req.body.description,
  };

  try {
    await Ticket.updateOne(
      { _id: id },
      {
        $set: params,
      }
    );

    res.status(200).json({ message: "Ticket Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const openTicket = async (req, res) => {
  let id = req.params.id;

  try {
    await Ticket.updateOne({ _id: id }, { $set: { status: "Open" } });

    res.status(200).json({ message: "Ticekt Opened" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resolveTicket = async (req, res) => {
  let id = req.params.id;

  try {
    await Ticket.updateOne({ _id: id }, { $set: { status: "Resolved" } });

    res.status(200).json({ message: "Ticekt Resolved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createComment = async (req, res) => {
  let ticket_id = req.params.ticket_id;

  let comment = {
    commentText: req.body.commentText,
    createdBy: req.body.createdBy,
    createdOn: Date.now(),
  };

  try {
    let ticket = await Ticket.findOne({ _id: ticket_id });
    console.log(ticket);
    await ticket.comments.push(comment);
    await ticket.save();

    res.status(200).json({ message: "Comment added!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTickets,
  deleteTicket,
  createTicket,
  updateTicket,
  openTicket,
  resolveTicket,
  createComment,
};
