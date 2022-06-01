const express = require("express");

const { createCategory } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);

module.exports = categoryRouter;
