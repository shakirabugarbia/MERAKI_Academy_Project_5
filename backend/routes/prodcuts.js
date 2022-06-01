const express = require("express");

const {
  getAllProduct,
  createNewProduct,
  deleteProductById,
  updateProductById,
  getAllProductByType,
  getProductsByTitle
} = require("../controllers/products");

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/bytype", getAllProductByType);
productRouter.post("/:type_id", createNewProduct);
productRouter.put("/:id", deleteProductById);
productRouter.put("/update/:id", updateProductById);
productRouter.get("/search", getProductsByTitle);

module.exports = productRouter;
