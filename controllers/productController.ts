import { Request, Response, NextFunction } from "express";
import productModel from "../models/productModel.js";
import faker from "faker";

const getAllProducts = (req: Request, res: Response) => {
  productModel
    .find()
    .sort({ name: "asc" })
    .then((products) => {
      return res.status(201).json(products);
    });
};

const createProduct = (req: Request, res: Response) => {
  console.log("<<<creating product>>>", req.body);
  let newProduct = new productModel(req.body);
  newProduct.save().then((product) => {
    res.status(201).json({
      message: `New product created - ${product.name}`,
    });
  });
};

const updateProduct = (req: Request, res: Response) => {
  console.log("<<<<updating product>>>>", req.body);
  /* check for product id -- _id=req.params.id...
  //productModel.findByIdAndUpdate({_id:req.params.id}, req.body).then)
  */
};

const deleteProduct = (req: Request, res: Response) => {
  console.log("<<<deleting product>>>", req.body);

  // productModel.findByIdAndDelete({_id: req.params.id})
};

const seedProducts = () => {
  //delete all products...
  productModel.deleteMany();
  //insert 5 products into db
  const productList = [];
  for (let i = 0; i < 5; i++) {
    productList.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      image: "https://fakeimg.pl/440x320/?text=ProductImage",
      price: faker.commerce.price(),
      quantity: faker.datatype.number({ max: 50 }),
    });
  }
  productModel.insertMany(productList).then((res) => {
    console.log("Products inserted", res);
  });
};

export default {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
};
