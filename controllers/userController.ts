import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel.js";

import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import signJWT from "../helpers/signJWT.js";

//validateToken

const validateToken = (req: Request, res: Response) => {
  console.log("Token validation...");
  return res.status(200).json({
    message: "Token validated, Autorization complete!",
  });
};

const register = (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        error: err,
      });
    }
    //Insert user into DB here...
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hash,
      isAdmin: false,
    });

    return newUser
      .save()
      .then((user) => {
        return res.status(201).json({
          user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
          error: err,
        });
      });
  });
};

const registerAdmin = (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        error: err,
      });
    }
    //Insert user into DB here...
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hash,
      isAdmin: true,
    });

    return newUser
      .save()
      .then((user) => {
        return res.status(201).json({
          user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
          error: err,
        });
      });
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  userModel
    .find({ email })
    .exec()
    .then((results) => {
      let user = results[0];
      console.log(user);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Unauthorized! (Incorrect password)",
          });
        } else if (result) {
          signJWT(user, (error, token) => {
            if (error) {
              return res.status(401).json({
                message: "Unable to sign token",
                error,
              });
            } else if (token) {
              return res.status(200).json({
                message: "Authorization successful!",
                token,
                user: {
                  id: user._id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                },
              });
            }
          });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
        error: err,
      });
    });
};

//View all Users
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  userModel
    .find()
    .select("-password")
    .exec()
    .then((results) => {
      return res.status(200).json({
        users: results,
        count: results.length,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
        err,
      });
    });
};

// //Find User by email for login?
// const getUserByEmail = (email: string) => {
//   const user = userModel.findOne({ email });
//   return user;
//   //not sure if it's req.params or req.body
// };

// //Create New Users
// const createStandardUser = (req: Request, res: Response) => {
//   const { firstName, lastName, email, password } = req.body;
//   const newUser = new userModel({
//     firstName,
//     lastName,
//     email,
//     password,
//     isAdmin: false,
//   });
//   newUser
//     .save()
//     .then((results) => {
//       res.json({
//         message: "User created succesfully",
//       });
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         message: err.message,
//         err,
//       });
//     });
// };

// const createAdminUser = (req: Request, res: Response, next: NextFunction) => {
//   const { firstName, lastName, email, password } = req.body;
//   const user = new userModel({
//     firstName,
//     lastName,
//     email,
//     password,
//     isAdmin: true,
//   });
//   user
//     .save()
//     .then((results) => {
//       res.json({
//         message: "User created succesfully",
//       });
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         message: err.message,
//         err,
//       });
//     });
// };

export default {
  validateToken,
  register,
  registerAdmin,
  getAllUsers,
  login,
};
