const connection = require("../models/db");
const bcrypt = require("bcrypt");
const salt = 10;

const register = async (req, res) => {
  const { userName,phoneNumber,address, email, password, role_id } =
    req.body;

  const encryptedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users ( userName,phoneNumber,address, email, password, role_id) VALUES (?,?,?,?,?)`;
  const data = [
    userName,phoneNumber,address,
    email.toLowerCase(),
    encryptedPassword,
    role_id,
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        massage: "The email already exists",
        err
      });
    }
    res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result
    });
  });
};

module.exports = {
  register,
};
