const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  addAndUpdateToCart,
  viewCart,
  removefromcart,
} = require("../controllers/basket");

const basketRouter = express.Router();

basketRouter.post("/:product_id", authentication, addAndUpdateToCart);
basketRouter.get("/", authentication, viewCart);
basketRouter.delete("/", removefromcart);

module.exports = basketRouter;
