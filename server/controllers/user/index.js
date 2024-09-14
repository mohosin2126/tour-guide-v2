const { ObjectId } = require("mongodb");
const client = require("../../config/db");

const getUsers = async (req, res) => {
  const result = await client.db("tourDb").collection("users").find().toArray();
  res.send(result);
};

const getUserByEmail = async (req, res) => {
  const email = req.query.email;
  const result = await client.db("tourDb").collection("users").find({ email }).toArray();
  res.send(result);
};

const postUser = async (req, res) => {
  const user = req.body;
  const existingUser = await client.db("tourDb").collection("users").findOne({ email: user.email });
  if (existingUser) {
    return res.send({ message: "user already exists", insertedId: null });
  }
  const result = await client.db("tourDb").collection("users").insertOne(user);
  res.send(result);
};

const makeAdmin = async (req, res) => {
  const id = req.params.id;
  const result = await client.db("tourDb").collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: "admin" } }
  );
  res.send(result);
};

const checkAdmin = async (req, res) => {
  const email = req.params.email;
  if (email !== req.decoded.email) {
    return res.status(403).send({ message: "unauthorized access" });
  }
  const user = await client.db("tourDb").collection("users").findOne({ email });
  res.send({ admin: user?.role === "admin" });
};

const makeGuide = async (req, res) => {
  const id = req.params.id;
  const result = await client.db("tourDb").collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: "guide" } }
  );
  res.send(result);
};

const checkGuide = async (req, res) => {
  const email = req.params.email;
  if (email !== req.decoded.email) {
    return res.status(403).send({ message: "unauthorized access" });
  }
  const user = await client.db("tourDb").collection("users").findOne({ email });
  res.send({ guide: user?.role === "guide" });
};

module.exports = {
  getUsers,
  getUserByEmail,
  postUser,
  makeAdmin,
  checkAdmin,
  makeGuide,
  checkGuide,
};
