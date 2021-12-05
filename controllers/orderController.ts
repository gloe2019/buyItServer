import { Request, Response, NextFunction } from "express";
import orderModel from "../models/orderModel.js";
import shoppingCartModel from "../models/shoppingCartModel.js";
import userModel from "../models/userModel.js";
import config from "../config/config.js";
import Stripe from "stripe";
const stripe = new Stripe(config.server.stripe.secret, {
  apiVersion: "2020-08-27",
});

const getOrders = async (req: Request, res: Response) => {
  const userId = req.params.id;
  orderModel
    .find({ userId })
    .sort({ date: "desc" })
    .then((orders) => res.json({ orders }));
};

const checkout = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { source } = req.body;
    let shoppingCart = await shoppingCartModel.findOne({ userId });
    let user = await userModel.findOne({ _id: userId });
    let email = "";
    user ? (email = user.email) : (email = "");
    if (shoppingCart) {
      const charge = await stripe.charges.create({
        amount: shoppingCart.total,
        currency: "usd",
        source: source,
        receipt_email: email,
      });
      if (charge) {
        const order = await orderModel.create({
          userId,
          items: shoppingCart.items,
          total: shoppingCart.total,
        });

        const data = await shoppingCartModel.findByIdAndDelete({
          _id: shoppingCart.id,
        });

        return res.status(200).json({ order });
      }
    } else {
      res
        .status(500)
        .json({ message: "Error processing charge, no items in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error during checkout...", error: err });
  }
};

export default {
  getOrders,
  checkout,
};
