const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket-controller");

// Returns all releveant items via json
router.get("/", ticketController.getAllTickets);

// Deletes tickets with :id, returns message
router.delete("/delete/:id", ticketController.deleteTicket);

// Creates ticket and one comment, returns message
router.post("/add", ticketController.createTicket);

// Displays or Updates the ticket with :id
router.put("/:id", ticketController.updateTicket);

// Sets status of ticket :id to 'Open'
router.put("/open/:id", ticketController.openTicket);

// Sets status of ticket :id to 'Resolved'
router.put("/resolve/:id", ticketController.resolveTicket);

// Creates a comment related to ticket with :id
router.put("/create_comment/:ticket_id", ticketController.createComment);

module.exports = router;
