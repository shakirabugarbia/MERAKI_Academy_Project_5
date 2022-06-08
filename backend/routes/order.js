const express = require("express");
const authentication = require("../middlewares/authentication");

const { order, orderhistoryByUser } = require("../controllers/orderhistory");

const orderRouter = express.Router();
orderRouter.post("/", authentication, order);
orderRouter.get("/", authentication, orderhistoryByUser);
module.exports = orderRouter;
