import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { usersRouter } from "./routes/userRoutes.js";
import config from "./config/config.js";
import { productsRouter } from "./routes/productRoutes.js";
import { shoppingCartRouter } from "./routes/shoppingCartRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";
const PORT = Number(config.server.port);
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); //parse URL-encoded bodies
app.use(express.json()); //parse JSON bodies

//connect to MongoDB

mongoose
  .connect(`${config.server.dbURI}`)
  .then((res) => {
    console.log(`Connected to Mongo Db:`, config.server.dbName);
  })
  .catch((err) => {
    console.error("MongoDb connection error:", err);
  });

//Setup Routes
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/shoppingCart", shoppingCartRouter);
app.use("/api/order", orderRouter);
app.listen(PORT, () => {
  console.log(`BuyIt Server running on port: ${PORT}`);
});
