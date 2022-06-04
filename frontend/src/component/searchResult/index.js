import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addProductts,
  deleteproductts,
  updateproductts,
  setProducts,
} from "../../redux/reducers/products/index";
import {
  addCategoriess,
  deleteCategoriess,
  updateCategoriess,
  setCategories,
} from "../../redux/reducers/categories";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setBasket,
  updateBasket,
  deleteFromBasket,
  addToBasket,
} from "../../redux/reducers/basket/index";



 const SearchResult=()=>{
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { token, isLoggedIn } = useSelector((state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
      };
    });
    const {products,productName} = useSelector((state) => {
      return {
        products: state.products.products,
        productName:state.products.productName
      };
    });
    const categoriesState = useSelector((state) => {
      return {
        categories: state.categories.categories,
      };
    });
    const basketState = useSelector((state) => {
      return {
        basket: state.basket.basket,
      };
    });


const getProductBySearch=()=>{

    axios.get(`http://localhost:5000/product/search?productName=${productName}`).then((result)=>{
dispatch(setProducts(result.data.result))
console.log("hi",result.data.result);

    }).catch((err)=>{
        console.log(err);
    })

}
useEffect(() => {
    getProductBySearch();
  }, []);

  const addToCart = (String) => {
    axios
      .post(
        `http://localhost:5000/basket/${String}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setMessage("Added To Basket");
      })
      .catch((err) => {
        console.log("header", token);
        console.log(err);
        setMessage(err.message);
      });
  };





return(
    <div> <div className="products">
    {products.map((element, index) => {
      return (
        <div key={index}>
          <div>{element.img}</div>
          <div> {element.productName}</div>
          <div> {element.description}</div>
          <div>{element.price}</div>
          {isLoggedIn ? (
            <button
              onClick={() => {
                addToCart(element.id);
              }}
            >
              add to cart
            </button>
          ) : (
            <></>
          )}
        </div>
      );
    })}
  </div></div>
)


}

export default SearchResult ;