const express = require("express");

const { getAllProduct, createNewProduct,deleteProductById } = require("../controllers/products");

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.post("/:type_id", createNewProduct);
productRouter.put("/:id", deleteProductById);

module.exports = productRouter;
