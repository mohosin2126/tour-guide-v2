const express = require("express");
const router = express.Router();
const { createContact, getContacts, deleteContact } = require("../../controllers/contact/index");
const verifyToken = require("../../middleware/auth/index");
const isAdmin = require("../../middleware/admin/index");

router.post("/", createContact);
router.get("/", verifyToken, isAdmin, getContacts);
router.delete("/:id", verifyToken, isAdmin, deleteContact);

module.exports = router;
