const client = require("../../config/db");

const postComment = async (req, res) => {
  const comment = req.body;
  const result = await client.db("tourDb").collection("comment").insertOne(comment);
  res.send(result);
};

const getComments = async (req, res) => {
  const result = await client.db("tourDb").collection("comment").find().toArray();
  res.send(result);
};

module.exports = {
  postComment,
  getComments,
};
