import jwt from "jsonwebtoken";
import config from "../config/config.js";
import IUser from "../interfaces/user";

const signJWT = (
  user: IUser,
  callback: (err: Error | null, token: string | null) => void
): void => {
  const timeSinceEpoch = new Date().getTime();
  const expirationTime =
    timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
  const expireTimeInSec = Math.floor(expirationTime / 1000);

  jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.server.token.secret,
    {
      algorithm: "HS256",
      expiresIn: expireTimeInSec,
    },
    (err, token) => {
      if (err) {
        callback(err, null);
      } else if (token) {
        callback(null, token);
      }
    }
  );
};

export default signJWT;
