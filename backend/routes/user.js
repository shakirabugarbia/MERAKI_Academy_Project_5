const express = require("express");

const { getAllUsers } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

module.exports = userRouter;
