const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  order,
  orderhistoryByUser,
  allOrders,
  usersOrders,
  getOrderHistoryById
} = require("../controllers/orderhistory");

const orderRouter = express.Router();
orderRouter.post("/", authentication, order);
orderRouter.get("/", authentication, orderhistoryByUser);
orderRouter.get("/users/:id",usersOrders);
orderRouter.get("/all", allOrders)
orderRouter.get("/orderid/:id", getOrderHistoryById);


module.exports = orderRouter;
