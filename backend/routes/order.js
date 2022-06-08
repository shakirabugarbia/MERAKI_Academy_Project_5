const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  order,
  orderhistoryByUser,
  allOrders,
} = require("../controllers/orderhistory");

const orderRouter = express.Router();
orderRouter.post("/", authentication, order);
orderRouter.get("/", authentication, orderhistoryByUser);
orderRouter.get("/all", allOrders);
module.exports = orderRouter;
