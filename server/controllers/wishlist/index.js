const client = require("../../config/db");

const postWishlist = async (req, res) => {
  const wishlist = req.body;
  const result = await client.db("tourDb").collection("wishlist").insertOne(wishlist);
  res.send(result);
};

const getWishlist = async (req, res) => {
  const email = req.query.email;
  const result = await client.db("tourDb").collection("wishlist").find({ email }).toArray();
  res.send(result);
};

const deleteWishlist = async (req, res) => {
  const id = req.params.id;
  const result = await client.db("tourDb").collection("wishlist").deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

module.exports = {
  postWishlist,
  getWishlist,
  deleteWishlist,
};
