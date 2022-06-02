const connection = require("../models/db");

//add to cart  depend on the login | token userId
const addAndUpdateToCart =(req, res) => {
    let check = false
    let quantity = 1 
    const prducut_id =req.params.prducut_id
    const user_id = req.token.userId;

    const query = `SELECT * FROM basket WHERE prducut_id=? AND user_id=?`;
    const data = [prducut_id,user_id];
  //if item already added will + the quantity
    connection.query(query, data, (err, result) => {
      if (result.length) {
     check = true
    const new_quantity = quantity+ result[0].quantity
     const query= `UPDATE basket SET quantity=? WHERE product_id=?`
      } else {
     const data =[prducut_id,user_id]
    const query = `INSERT INTO basket (prducut_id ,user_id) VALUES (?,?);`; 
    
     }


  
     
    });
  };



//View Cart 
const viewCart= (req, res) => {
    const id =req.params.prducut_id
    const user_id = req.token.userId;

    const query = `SELECT * FROM basket WHERE (prducut_id ,user_id) VALUES (?,?);`;
    const data = [ id, user_id];
  
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


//function add the quantity +1 and increase the total depend on the product price
const updatCartById = (req, res) => {
    const basket_id = req.params.id;
    const user_id = req.token.userId;
    const newAmount = ddddd//??
    const quantity = ++1

  
    const query = `SELECT * FROM products WHERE id=?;`;
    const data = [basket_id,user_id];
  
    connection.query(query, data, (err, result) => {
      if (err) {
        res.status(404).json({
          success: false,
          massage: "something went wrong while add to basket",
          err: err,
        });
      }if (!result) {
        res.status(404).json({
          success: false,
          massage: `The product: ${id} is not found`,
          err: err,
        });
      } 
      else {
        const query = `UPDATE product SET quantity++=?, newprice=? WHERE id=?;`;
        const data = [
            newAmount || result[0].newAmount,
            quantity || result[0].quantity,
            product_id,
        ];
  
        connection.query(query, data, (err, result) => {
          if (result.affectedRows != 0)
            res.status(201).json({
              success: true,
              massage: `Product updated`,
              result: result,
            });
        });
      }
    });
  };
  

 // Remove product from Cart
  const removeBycart = (req, res) => {
    const userId = req.query.userId;
    const productId = request.query.productId;
    
    const query = "UPDATE FROM basket SET WHERE user_id =? and product_id =?"
    const data = [userId, productId]

    connection.query(query, data, (error, result) => {
        if(error) throw error
        res.status(200).send("Removed from Cart")
    });
}

//checkout


  module.exports = {
    addAndUpdateToCart,
    viewCart,
    updatCartById,
    deleteBycart
  };
/***Dont miss serch handly it in backend */
//=================================================================
//marah functions 
  const addToCart2 = (req, res) => {
    const productId = req.params.id;
    const userId = req.token.userId;
    console.log("BACKEND");
    usersModel
      .updateOne({ _id: userId }, { $push: { cart: productId } })
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `Add to cart`,
          cart: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };
  const getProductInCart = (req, res) => {
    const userId = req.token.userId;
    usersModel
      .find({ _id: userId })
      .populate("cart")
      .then((result) => {
        console.log({ result });
        if (result.length) {
          res.status(200).json({
            success: true,
            message: `All the products in cart`,
            result: result[0].cart,
          });
        } else {
          res.status(200).json({
            success: false,
            message: `No products in cart Yet`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

  
//==============================================================

      

