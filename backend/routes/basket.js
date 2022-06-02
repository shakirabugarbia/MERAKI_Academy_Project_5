const express = require("express");

 const { addAndUpdateToCart, viewCart, removefromcart } = require("../controllers/basket");

const basketRouter = express.Router();

 basketRouter.post("/:prducut_id", addAndUpdateToCart);
 basketRouter.get("/", viewCart);
 basketRouter.delete("/", removefromcart);


module.exports = basketRouter;
