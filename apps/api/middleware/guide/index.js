const User = require("../../models/user");

const verifyGuide = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const user = await User.findOne({ email });
    if (user?.role !== "guide" && user?.role !== "admin") {
      return res.status(403).send({ message: "forbidden access - guide role required" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ message: "server error" });
  }
};

module.exports = verifyGuide;
