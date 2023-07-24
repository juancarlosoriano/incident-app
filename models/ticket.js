let mongoose = require("mongoose");

// Create a ticket model class
let ticketModel = mongoose.Schema(
  {
    title: String,
    description: String,
  },
  {
    collection: "Ticket",
  }
);

module.exports = mongoose.model("Ticket", ticketModel);
