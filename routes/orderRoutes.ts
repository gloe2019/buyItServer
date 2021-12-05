import express from "express";
import controller from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/:id", controller.getOrders);
orderRouter.post("/:id", controller.checkout);

export { orderRouter };
