const client =require("../../config/db")
const { ObjectId } = require("mongodb");

const insertBooking = async (req, res) => {
  const booking = req.body;
  const result = await client.db("tourDb").collection("bookings").insertOne(booking);
  res.send(result);
};

const getBookings = async (req, res) => {
  const email = req.query.email;
  const result = await client.db("tourDb").collection("bookings").find({ email }).toArray();
  res.send(result);
};

const getGuideBookings = async (req, res) => {
  const result = await client.db("tourDb").collection("bookings").find().toArray();
  res.send(result);
};

const updateBookingStatus = async (req, res, status) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = { $set: { status } };
  const result = await client.db("tourDb").collection("bookings").updateOne(filter, updatedDoc);
  res.send(result);
};

const deleteBooking = async (req, res) => {
  const id = req.params.id;
  const result = await client.db("tourDb").collection("bookings").deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

module.exports = {
  insertBooking,
  getBookings,
  getGuideBookings,
  updateBookingStatus,
  deleteBooking,
};
