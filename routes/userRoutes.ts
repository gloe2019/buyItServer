import express from "express";
import controller from "../controllers/userController.js";
import extractJWT from "../middleware/extractJWT.js";

const usersRouter = express.Router();

usersRouter.get("/validate", extractJWT, controller.validateToken);
usersRouter.post("/register", controller.register);
usersRouter.post("/login", controller.login);
usersRouter.get("/all", controller.getAllUsers);
usersRouter.post("/newAdmin", controller.registerAdmin);
export { usersRouter };
