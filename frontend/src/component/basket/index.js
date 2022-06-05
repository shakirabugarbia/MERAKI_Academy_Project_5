import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineDelete,
} from "react-icons/ai";
import "./style.css";
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
  zero,
  decrease,
  erase,
} from "../../redux/reducers/basket/index";

const Basket = () => {
  const [show, setShow] = useState(false);

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
      productName: state.products.productName,
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
      amount: state.basket.amount,
      price: state.basket.price,
    };
  });
  const emptyBasket = () => {
    axios
      .delete(`http://localhost:5000/basket/empty`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        viewBasket();

        dispatch(zero());
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const removeFromCart = (id) => {
    axios
      .put(
        `http://localhost:5000/basket/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        viewBasket();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const increaseCart = (id) => {
    axios
      .post(
        `http://localhost:5000/basket/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        viewBasket();

        dispatch(setAmount());

        setMessage("Added To Basket");
      })
      .catch((err) => {
        // console.log("header", token);
        // console.log(err);
        setMessage(err.message);
      });
  };
  const decreaseAndRemoveFromBasket = (id) => {
    axios
      .put(
        `http://localhost:5000/basket/basket/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        viewBasket();
        dispatch(decrease());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewBasket = () => {
    axios
      .get(`http://localhost:5000/basket/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.success) {
          dispatch(setProducts(result.data.result));
          setShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    viewBasket();
  }, []);
  return (
    <div>
      <div className="products">
        {show &&
          productsState.products.map((element, index) => {
            return (
              <div className="bask" key={index}>
                <img src={element.img} />
                <div> {element.productName}</div>
                <div> {element.description}</div>
                <div>amount: {element.amount}</div>
                <div>price: {element.price * element.amount}</div>
                {isLoggedIn ? (
                  <>
                    <button
                      className="dec"
                      onClick={() => {
                        decreaseAndRemoveFromBasket(element.id);
                      }}
                    >
                      <AiOutlineMinusSquare className="ai" />
                    </button>

                    <button
                      className="del"
                      onClick={() => {
                        removeFromCart(element.id);
                        dispatch(erase(element.amount));
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                    <button
                      className="inc"
                      onClick={() => {
                        increaseCart(element.id);
                      }}
                    >
                      <AiOutlinePlusSquare />
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </div>
      {productsState.products.length ? (
        <div>
          <button
            className="emptyButton"
            onClick={() => {
              emptyBasket();
            }}
          >
            empty basket
          </button>
        </div>
      ) : (
        <></>
      )}
      total items : {basketState.amount}
      <br />
      total price : {basketState.price}
    </div>
  );
};

export default Basket;
