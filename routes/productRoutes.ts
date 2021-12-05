import express from "express";
import controller from "../controllers/productController.js";
const productsRouter = express.Router();

productsRouter.get("/", controller.getAllProducts);
productsRouter.get("/seed", controller.seedProducts);
productsRouter.post("/new", controller.createProduct);
export { productsRouter };
