const connection = require("../models/db");

const createNewProduct = (req, res) => {
  const { productName, img, price, category_id } = req.body;
  const type_id= req.params.type_id;
  const query = `INSERT INTO products (productName,
    img,
    price,
    type_id,
    category_id) VALUES (?,?,?,?,?);`;
  const data = [productName, img, price, type_id, category_id];
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
      massage: "Product created",
      result: result,
    });
  });
};

const getAllProduct = (req, res) => {
  const query = `SELECT * FROM products WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the product",
      result: result,
    });
  });
};

module.exports = { getAllProduct, createNewProduct };
