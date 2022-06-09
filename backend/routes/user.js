const express = require("express");

const { getAllUsers, blockUser, ActiveUser } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.put("/:id", blockUser);
userRouter.put("/active/:id", ActiveUser);

module.exports = userRouter;
