//-------------------------------------------------- shaker
const connection = require("../models/db");



































































// ------------------------------------------------------------ Afgani
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


module.exports = {getAllProduct}


































































//------------------------fouad





































































//-------------------------------------marah
