const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const user = await client.db("tourDb").collection("users").findOne({ email });
    if (user?.role !== "admin") {
      return res.status(403).send({ message: "forbidden access" });
    }
    next();
  };
  
  module.exports = verifyAdmin;
  