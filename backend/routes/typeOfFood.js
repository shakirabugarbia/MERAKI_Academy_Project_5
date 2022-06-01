const express = require("express");

//controllers
const { createTypeOfFood,deleteCategoryById} = require("../controllers/typeOfFood");

const typeOfFoodRouter = express.Router();


typeOfFoodRouter.post("/",createTypeOfFood);
typeOfFoodRouter.delete ("/:id",deleteCategoryById);

module.exports = typeOfFoodRouter;
