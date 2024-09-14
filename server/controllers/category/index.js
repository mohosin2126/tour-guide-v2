const client = require("../../config/db");

const getCategories = async (req, res) => {
  const result = await client.db("tourDb").collection("category").find().toArray();
  res.send(result);
};

module.exports = {
  getCategories,
};
