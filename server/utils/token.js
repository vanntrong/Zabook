import jwt from "jsonwebtoken";

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function generateRefreshToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: "20d",
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, options);
}
