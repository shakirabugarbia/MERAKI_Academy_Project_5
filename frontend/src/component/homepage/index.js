import axios from "axios";
import React, { useState, useEffect } from "react";
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

const Homepage = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const ProductsState = useSelector((state) => {
    return {
      products: state.products.products,
    };
  });
  const categoriesState = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });
  const gatAllCategories = () => {
    axios
      .get(`http://localhost:5000/category/allCategories`)
      .then((result) => {
        dispatch(setCategories(result.data.result));
        setMessage(result.data.message);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  useEffect(() => {
    gatAllCategories();
  }, []);
  return (
    <div>
      <h2>categories and products</h2>
      <>
        {categoriesState.categories.map((element, index) => {
          return (
            <div key={index}>
              <div> {element.category_title}</div>
              <div>{element.category_img}</div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Homepage;
