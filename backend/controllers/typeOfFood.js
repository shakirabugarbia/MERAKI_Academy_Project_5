const connection = require("../models/db");

const createTypeOfFood = (req, res) => {
  const { type } = req.body;

  const query = `INSERT INTO typeOfFood (type) VALUES (?)`;
  const data = [type];
  connection.query(query, data, (err, results) => {
    if (err) {
   return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "Success typeOfFood created",
      results: results,
    });
  });
};


module.exports = {
    createTypeOfFood,
  };
  

