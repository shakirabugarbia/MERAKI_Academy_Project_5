const connection = require("../models/db");

//add to cart  depend on the login | token userId
const addAndUpdateToCart = (req, res) => {
  let found = false;
  let quantity = 1;
  const product_id = req.params.product_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM basket WHERE product_id=? AND user_id=?`;
  const data = [product_id, user_id];
  console.log("data",data);
  connection.query(query, data, (err, result) => {
    console.log(result);
    if (result.length) {
      
      found = true;
      result[0].amount = quantity + result[0].amount;
      const query = `UPDATE basket SET amount=? WHERE product_id=? `;
      const data = [result[0].amount,result[0].product_id]
      connection.query(query, data, (err, results) => {
        if (results.affectedRows != 0) {
          res.status(201).json({
            success: true,
            massage: `Product Amount Updated +1`,
            result: results,
          });
        } else {
          res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
      });
    } else {
      const query = `INSERT INTO basket (product_id ,user_id) VALUES (?,?);`;
      const data = [product_id, user_id];
      connection.query(query, data, (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
        res.status(200).json({
          success: true,
          massage: `Product Added to Basket`,
          result: result,
        });
      });
    }
  });
};

//View Cart
const viewCart = (req, res) => {
  const id = req.params.prducut_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM basket WHERE (product_id ,user_id) VALUES (?,?);`;
  const data = [id, user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Product In Cart with id : ${id}`,
      result: result,
    });
  });
};

// Remove product from Cart
const removefromcart = (req, res) => {
  const userId = req.query.userId;
  const productId = request.query.productId;

  const query = "UPDATE FROM basket SET WHERE user_id =? and product_id =?";
  const data = [userId, productId];

  connection.query(query, data, (error, result) => {
    if (error) throw error;
    res.status(200).send("Removed from Cart");
  });
};

//checkout

module.exports = {
  addAndUpdateToCart,
  viewCart,
  removefromcart,
};

