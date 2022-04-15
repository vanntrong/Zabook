import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json("No token provided");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).json("Invalid token");
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}
