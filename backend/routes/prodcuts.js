const express = require("express");

const { getAllProduct, createNewProduct } = require("../controllers/products");

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.post("/:type_id", createNewProduct);

module.exports = productRouter;
