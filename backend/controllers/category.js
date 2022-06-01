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

module.exports = {
  createCategory,
};

//------------------------------------------------------ marah

//-----------------------------------------------afgani

//-------------------------------------------------------fouad
