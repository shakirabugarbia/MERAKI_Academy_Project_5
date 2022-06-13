const mysql = require('mysql2');
require("dotenv").config();
const  connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
 });
 
 if (connection) {
   console.log("Connected to database");
 } else {
   console.log("Connection failed");
 };
 
 module.exports = connection;