import jwt from "jsonwebtoken";
import * as errorController from "./errorController.js";

export async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return errorController.errorHandler(res, "No token provided", 401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return errorController.errorHandler(res, "Token invalid", 401);
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    errorController.serverErrorHandler(error, res);
  }
}
