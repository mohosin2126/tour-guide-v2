const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  serverError,
} = require("../../utils/response");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
};

const register = async (req, res) => {
  try {
    const { email, password, name, photo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return badRequest(res, "User already exists");
    }

    const user = new User({ email, password, name, photo });
    await user.save();

    const token = createToken(user);
    return success(
      res,
      "User registered successfully",
      {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          photo: user.photo,
          role: user.role,
        },
      },
      201
    );
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return unauthorized(res, "Invalid credentials");
    }

    if (!user.isActive) {
      return forbidden(res, "Account is deactivated");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return unauthorized(res, "Invalid credentials");
    }

    const token = createToken(user);
    return success(res, "Login successful", {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        photo: user.photo,
        role: user.role,
      },
    });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

const getToken = async (req, res) => {
  try {
    const { email } = req.decoded;
    const user = await User.findOne({ email });
    if (!user) {
      return unauthorized(res, "User not found");
    }
    if (!user.isActive) {
      return forbidden(res, "Account is deactivated");
    }
    const token = createToken(user);
    return success(res, "Success", { token });
  } catch (err) {
    return serverError(res, err.message, err.message);
  }
};

module.exports = {
  register,
  login,
  getToken,
};
