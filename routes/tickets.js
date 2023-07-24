const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
let ObjectId = require("mongoose").Types.ObjectId;
let Ticket = require("../models/ticket");

// Helper function for guard purpose
function requireAuth(req, res, next) {
  // Check if user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Tickets view. */
router.get("/", requireAuth, async function (req, res, next) {
  res.render("tickets/tickets", { title: "Tickets" });
});

/* GET Ticket view */
router.get("/ticket/:id", requireAuth, async function (req, res, next) {
  res.render("tickets/edit-ticket", { ticket: req.params.id });
});

/* GET Create Ticket view */
router.get("/add", requireAuth, async function (req, res, next) {
  res.render("tickets/create-ticket", { title: "Add Ticket" });
});

/* POST Ticket */
router.post("/", requireAuth, async function (req, res, next) {
  res.redirect("tickets/tickets");
});

/* PUT Ticket */
router.put("/:id", requireAuth, async function (req, res, next) {
  const params = req.body.params;

  // Do something with the params

  res.redirect("tickets/tickets");
});

/* DELETE Ticket */
router.delete("/:id", requireAuth, async function (req, res, next) {
  // Delete ticket

  res.redirect("tickets/tickets");
});

module.exports = router;
