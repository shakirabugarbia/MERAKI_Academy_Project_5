const express = require("express");
require("dotenv").config();


const app = express();
app.use(express.json());


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
