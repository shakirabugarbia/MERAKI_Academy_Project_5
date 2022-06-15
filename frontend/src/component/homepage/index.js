import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Video from "../Video/video";
import {
  addProductts,
  deleteproductts,
  updateproductts,
  setProducts,
  setProductName,
} from "../../redux/reducers/products/index";
import {
  addCategoriess,
  deleteCategoriess,
  updateCategoriess,
  setCategories,
  setCategoriesId,
} from "../../redux/reducers/categories";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setBasket,
  updateBasket,
  deleteFromBasket,
  addToBasket,
  setAmount,
  zeroPrice,
  setPrice,
  decreasePrice,
} from "../../redux/reducers/basket/index";

import {
  addTypeOfFood,
  deleteTypeOfFood,
  updateTypeOfFood,
  setTypeOfFood,
} from "../../redux/reducers/typeoffoods/index";

import { FiPlus } from "react-icons/fi";


import { BsArrowLeftSquareFill,BsArrowRightSquareFill } from "react-icons/bs";

const Homepage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const productsState = useSelector((state) => {
    return {
      products: state.products.products,
      productName: state.products.productName,
    };
  });
  const typesOffoodsState = useSelector((state) => {
    return {
      typesOffoods: state.typeoffood,
    };
  });
  const { categories, category_id } = useSelector((state) => {
    return {
      categories: state.categories.categories,
      category_id: state.categories.category_id,
    };
  });
  const basketState = useSelector((state) => {
    return {
      basket: state.basket.basket,
      amount: state.basket.amount,
      price: state.basket.price,
    };
  });
  const productByCategory = (String) => {
    axios.get(`http://localhost:5000/product/${String}`).then((result) => {
      dispatch(setProducts(result.data.result));
      dispatch(setCategoriesId(result.data.result[0].category_id));
    });
  };
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
        setShow(true);
        setMessage("Added To Basket");
      })
      .catch((err) => {
        console.log("header", token);
        console.log(err);
        setMessage(err.message);
      });
  };
  const gatAllproducts = () => {
    axios
      .get(`http://localhost:5000/product/?page=${page}`)
      .then((result) => {
        dispatch(setProducts(result.data.result.result));
        setMessage(result.data.message);
      })
      .catch((err) => {
        setShow(true);
        setMessage(err.message);
      });
  };
  const gatAllCategories = () => {
    axios
      .get(`http://localhost:5000/category/allCategories`)
      .then((result) => {
        dispatch(setCategories(result.data.result));
        setMessage(result.data.message);
        setShow(true);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const getAllTypeOfFood = () => {
    axios
      .get(`http://localhost:5000/typeOfFood`)
      .then((result) => {
        dispatch(setTypeOfFood(result.data.result));
        setShow(true);
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
          setShow(true);
          console.log(page);
        } else {
          return setPage(page);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getProductsByTypeOf = (type_id) => {
    axios
      .get(
        `http://localhost:5000/product/bytype/${type_id}/categoryId?category_id=${category_id}`
      )
      .then((result) => {
        dispatch(setProducts(result.data.result));
        setShow(true);
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const back = () => {
    axios
      .get(`http://localhost:5000/product/?page=${page - 1}`)
      .then((result) => {
        if (result.data.result.result.length !== 0) {
          dispatch(setProducts(result.data.result.result));
          setPage(page - 1);
          setShow(true);
          console.log(page);
        } else {
          return setPage(page);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    gatAllCategories();
    gatAllproducts();
    getAllTypeOfFood();
  }, []);

  return (
    <div>
      <Video />

      <div className="Search-Continer">
        <input
          className="searchBarInput"
          type={"text"}
          placeholder="      Search Here For Your Food"
          onChange={(e) => {
            dispatch(setProductName(e.target.value));
          }}
        />
        <button
          className="searchButton"
          onClick={() => {
            navigate("/search");
          }}
        >
          search
        </button>
      </div>

      <div className="kitchen-Continer">
        <h2 className="kitchen-titele">Kitchen</h2>
      </div>

      <div className="Categories-Slider-Container" id="l">
        {show &&
          categories.map((element, index) => {
            return (
              <div key={index}>
                <div className="Slider-Show-continer">
                  <img className="pic-slideshow" src={element.category_img} />
                  <a
                    className="Category-title-slider-btn"
                    onClick={() => {
                      productByCategory(element.id);
                      setHide(true);
                    }}
                  >
                    {element.category_title}
                  </a>
                </div>
              </div>
            );
          })}
      </div>
      <div className="Products-Continer-Home">
        <div className="Types-of-products-continer">
          {hide ? (
            <>
              <div className="types-Of-Food-div">
                {" "}
                {show &&
                  typesOffoodsState.typesOffoods.typeOfFood.map(
                    (element, index) => {
                      return (
                        <div key={index}>
                          <button
                            className="types-Of-Food"
                            onClick={() => {
                              getProductsByTypeOf(element.id);
                            }}
                          >
                            {element.type}{" "}
                          </button>
                        </div>
                      );
                    }
                  )}
              </div>
            </>
          ) : (
            <></>
          )}
          {hide ? (
            <button
              className="types-Of-Food-btn"
              onClick={() => {
                gatAllproducts();
                setHide(false);
              }}
            >
              All product{" "}
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="Products-Container">
          {show &&
            productsState.products.map((element, index) => {
              return (
                <div className="Product-Container" key={index}>
                  <div className="product-All-Detiles">
                    <div className="Product-Img-Dev">
                      <img className="imgg" src={element.img} />
                    </div>
                    <div className="pppp">
                      <div className="tow">
                        <div className="pName"> {element.productName}</div>
                        <p className="desc"> {element.description}</p>
                        <div className="price">{element.price} JD</div>
                      </div>
                      {isLoggedIn ? (
                        <div className="adding-Product" >
                          <button
                            className="bttt"
                            onClick={() => {
                              addToCart(element.id);
                              dispatch(setAmount());
                              dispatch(setPrice(element.price));
                            }}
                          >
                            <div class="tooltip">
                            <span class="tooltiptext">add to basket</span>
                            <FiPlus/>
                            </div>
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {hide ? (
        <></>
      ) : (
        <>
          <a href="#l">
            <button className="bttt2"
              onClick={() => {
                back();
              }}
            >
             <BsArrowLeftSquareFill className="bttt3"/>
            </button>
          </a>
          {page}
          <a href="#l">
            <button className="bttt2"
              onClick={() => {
                next();
              }}
            >
              <BsArrowRightSquareFill className="bttt2" />
            </button>
          </a>
        </>
      )}
    </div>
  );
};

export default Homepage;
