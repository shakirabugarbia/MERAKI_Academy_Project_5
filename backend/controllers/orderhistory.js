const connection = require("../models/db");

const order = (req, res) => {
  const user_id = req.token.userId;
  const orderhisory = req.body.orderhisory;
  const query = `INSERT INTO ORDERHISTORY
  ( user_id,ORDERhisory) VALUES (?,?)`;
  const data = [user_id, orderhisory];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result,
    });
  });
};

const orderhistoryByUser = (req, res) => {
  const user_id = req.token.userId;
  const query = `SELECT userName,email,phoneNumber,orderdate ,ORDERhisory FROM ORDERHISTORY INNER JOIN users ON user_id = users.id WHERE user_id = ? ;`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `order history `,
        result: result,
      });
    }
  });
};

module.exports = {
  order,
  orderhistoryByUser,
};
