const express = require("express");

//controllers
const { createTypeOfFood } = require("../controllers/typeOfFood");

const typeOfFoodRouter = express.Router();


typeOfFoodRouter.post("/",createTypeOfFood);

module.exports = typeOfFoodRouter;
