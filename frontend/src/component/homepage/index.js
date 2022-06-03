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

const Homepage = () => {
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
  const productsState = useSelector((state) => {
    return {
      products: state.products.products,
    };
  });
  const categoriesState = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });
  const   productByCategory=(String)=>{
    axios.get(`http://localhost:5000/product/${String}`).then((result)=>{
   
      dispatch(setProducts(result.data.result));
   console.log(result.data.result);
    })
  }
  const addToCart = (String) => {
    axios
      .post(`http://localhost:5000/basket/${String.id}`)
      .then((result) => {});
  };
  const gatAllproducts = () => {
    axios
      .get(`http://localhost:5000/product/?page=${page}`)
      .then((result) => {
        dispatch(setProducts(result.data.result.result));
        setMessage(result.data.message);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
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
  const next = () => {
    axios
      .get(`http://localhost:5000/product/?page=${page + 1}`)
      .then((result) => {
        if (result.data.result.result.length !== 0) {
          dispatch(setProducts(result.data.result.result));
          setPage(page + 1);
          console.log(page);
        } else {
          return setPage(page);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const back = () => {
    axios
      .get(`http://localhost:5000/product/?page=${page - 1}`)
      .then((result) => {
        if (result.data.result.result.length !== 0) {
          dispatch(setProducts(result.data.result.result));
          setPage(page - 1);
          console.log(page);
        } else {
          return setPage(page);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    gatAllCategories();
    gatAllproducts();
  }, []);
  return (
    <div>
      <h2>categories and products</h2>
      <div className="categories">
        {categoriesState.categories.map((element, index) => {
          return (
            <div key={index}>
              <div>
                <button onClick={() => {
                  productByCategory(element.id);
                    navigate("/foodbycategory")
                }}>{element.category_title}</button>
              </div>
              <div><img src={element.category_img}></img></div>
            </div>
          );
        })}
      </div>
      <h2>products</h2>
      <div className="products">
        {productsState.products.map((element, index) => {
          return (
            <div key={index}>
              <div> {element.productName}</div>
              <div>{element.img}</div>
              <div>{element.price}</div>
              <button
                onClick={() => {
                  addToCart();
                
                }}
              >
                add to cart
              </button>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          back();
        }}
      >
        Back
      </button>
      {page}
      <button
        onClick={() => {
          next();
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Homepage;
