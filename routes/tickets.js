const express = require("express");
const router = express.Router();

/* GET Tickets view. */
router.get("/", async function (req, res, next) {
  res.render("tickets/tickets", { title: "Tickets" });
});

/* GET Ticket view */
router.get("/ticket/:id", async function (req, res, next) {
  res.render("tickets/edit-ticket", { ticket: req.params.id });
});

/* GET Create Ticket view */
router.get("/add", async function (req, res, next) {
  res.render("tickets/create-ticket", { title: "Add Ticket" });
});

/* POST Ticket */
router.post("/", async function (req, res, next) {
  res.redirect("tickets/tickets");
});

/* PUT Ticket */
router.put("/:id", async function (req, res, next) {
  const params = req.body.params;

  // Do something with the params

  res.redirect("tickets/tickets");
});

/* DELETE Ticket */
router.delete("/:id", async function (req, res, next) {
  // Delete ticket

  res.redirect("tickets/tickets");
});

module.exports = router;
