const client = require("../../config/db");

const getStories = async (req, res) => {
  const result = await client.db("tourDb").collection("story").find().toArray();
  res.send(result);
};

module.exports = {
  getStories,
};
