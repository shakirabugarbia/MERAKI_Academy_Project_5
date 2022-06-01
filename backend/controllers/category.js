// ----------------------------------------------- shaker
const connection = require("../models/db");

const createCategory = (req, res) => {
  const { category_title, category_img } = req.body;
  const query = `INSERT INTO foodCategories (category_title, category_img) VALUES (?,?);`;
  const data = [category_title, category_img];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "category created",
      result: result,
    });
  });
};

const getAllCategories = (req, res) => {
  const query = `SELECT  category_title,category_img 
FROM  foodCategories
WHERE is_deleted = 0;`;
  connection.query(query, (err, result) => {
    if (err) {
    return  res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
   return res.status(200).json({
      success: true,
      massage: "All categoryies",
      result: result,
    });
  });
};

module.exports = {
  createCategory,
  getAllCategories,
};

//------------------------------------------------------ marah

//-----------------------------------------------afgani

//-------------------------------------------------------fouad
