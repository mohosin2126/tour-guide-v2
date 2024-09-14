const client = require("../../config/db");

const verifyGuide = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await client.db("tourDb").collection("users").findOne({ email });
  if (user?.role !== "guide") {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = verifyGuide;
