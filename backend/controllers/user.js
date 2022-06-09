const connection = require("../models/db");

const getAllUsers = (req, res) => {
  const query = `SELECT id,userName,email,phoneNumber,is_deleted  FROM users WHERE Role_id =1 ;`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `All users `,
        result: result,
      });
    }
  });
};
const blockUser = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE users SET is_deleted=1 WHERE id=?; `;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    } else {
      return res.status(200).json({
        success: true,
        massage: `block user`,
        result: result,
      });
    }
  });
};
const ActiveUser = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE users SET is_deleted=0 WHERE id=?; `;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    } else {
      return res.status(200).json({
        success: true,
        massage: `active user`,
        result: result,
      });
    }
  });
};

module.exports = {
  getAllUsers,
  blockUser,
  ActiveUser,
};
