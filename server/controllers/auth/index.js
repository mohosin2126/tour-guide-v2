const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

const getToken = (req, res) => {
  const user = req.body;
  const token = createToken(user);
  res.send({ token });
};

module.exports = {
  getToken,
};
