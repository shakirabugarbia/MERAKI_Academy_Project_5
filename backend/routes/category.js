const express = require("express");

const { createCategory, getAllCategories } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);

categoryRouter.get("/allCategories", getAllCategories);

module.exports = categoryRouter;
