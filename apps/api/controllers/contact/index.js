const Contact = require("../../models/contact");
const { success, badRequest, serverError } = require("../../utils/response");

const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return badRequest(res, "Name, email, subject, and message are required");
    }
    const contact = await Contact.create({ name, email, phone, subject, message });
    return success(res, "Message sent successfully", { contact }, 201);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return success(res, "Success", contacts);
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    return success(res, "Contact deleted");
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = { createContact, getContacts, deleteContact };
