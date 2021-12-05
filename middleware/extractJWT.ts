import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("🔑Validating Token...");
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, config.server.token.secret, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          message: err.message,
          error: err,
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized request!",
    });
  }
};

export default extractJWT;
