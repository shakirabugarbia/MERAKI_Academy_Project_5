const express = require("express");

const { getAllProduct } = require("../controllers/products");

const productRouter = express.Router();

productRouter.get("/",getAllProduct);

module.exports = productRouter;
