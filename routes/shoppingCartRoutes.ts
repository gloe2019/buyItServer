import express from "express";
import controller from "../controllers/shoppingCartController.js";

const shoppingCartRouter = express.Router();

shoppingCartRouter.get("/:id", controller.getCart);
shoppingCartRouter.post("/:id", controller.addItemToCart);
shoppingCartRouter.delete("/:userId/:productId", controller.deleteItemFromCart);
export { shoppingCartRouter };
