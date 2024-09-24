const client = require("../../config/db");

const getGuides = async (req, res) => {
  const result = await client.db("tourDb").collection("guide").find().toArray();
  res.send(result);
};

const postGuide = async (req, res) => {
  const guide = req.body;
  const result = await client.db("tourDb").collection("guide").insertOne(guide);
  res.send(result);
};

module.exports = {
  getGuides,
  postGuide,
};
