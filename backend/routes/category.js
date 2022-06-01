const express = require("express");

const {
  createCategory,
  getAllCategories,
  updateCategoryByid,
} = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);

categoryRouter.get("/allCategories", getAllCategories);

categoryRouter.put("/:id", updateCategoryByid);

module.exports = categoryRouter;
