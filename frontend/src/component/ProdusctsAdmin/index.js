import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
import {
  addTypeOfFood,
  deleteTypeOfFood,
  updateTypeOfFood,
  setTypeOfFood,
  setTypeId,
} from "../../redux/reducers/typeoffoods/index";

const ProductsAdminSide = () => {
  const navigate = useNavigate();
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

  const typesOffoodsState = useSelector((state) => {
    return {
      typesOffood: state.typeoffood.typeOfFood,
      type_id: state.typeoffood.type_id,
    };
  });

  const { categories, category_id } = useSelector((state) => {
    return {
      categories: state.categories.categories,
      category_id: state.categories.category_id,
    };
  });
  const [confirmation, setConfirmation] = useState(false);
  const [show, setShow] = useState(false);
  const [showupdate, setShowupdate] = useState(false);
  const [cansel, setCansel] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [productId, setProductId] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [hide, setHide] = useState(false);
  const [page, setPage] = useState(1);
  const [showid, setShowid] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [showTypeFood, setShowTypeFood] = useState(false);
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(true);
  const [showXButton, setShowXbutton] = useState(false);
  const [showXButton2, setShowXbutton2] = useState(false);
  const [showXButton3, setShowXbutton3] = useState(false);

  const gatAllproducts = () => {
    axios
      .get(`http://localhost:5000/product/?page=${page}`)
      .then((result) => {
        dispatch(setProducts(result.data.result.result));
        setMessage(result.data.message);
        // setShow(true);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  const deleteProductById = (product_id) => {
    axios
      .put(`http://localhost:5000/product/${product_id}`)
      .then((result) => {
        console.log(result.data.result);
        dispatch(deleteproductts(result.data.result));
        gatAllproducts();
      })
      .catch((err) => {
        setMessage(err.message);
        console.log(err);
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
  const createProduct = () => {
    axios
      .post(`http://localhost:5000/product/${typesOffoodsState.type_id}`, {
        productName,
        description,
        img,
        price,
        category_id,
      })
      .then(() => {
        gatAllproducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateproducttss = (id) => {
    axios
      .put(`http://localhost:5000/product/update/${id}`, {
        productName,
        img,
        description,
        price,
      })
      .then((result) => {
        // dispatch(updateproductts(result.data));

        console.log("hiii", result.data);
        gatAllproducts();
      })
      .catch((error) => {
        setMessage(error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    gatAllCategories();
    gatAllproducts();
    getAllTypeOfFood();
  }, []);

  return (
    <div className="main">
      {isLoggedIn ? (
        <>
          <h1 className="Products_Admin_Side_p">Products Admin Side</h1>

          <button
            className="Create_Meale_button"
            onClick={() => {
              setShowCreateButton(false);
              setShowCategory(true);
              setShowXbutton(true);
            }}
          >
            Create Meal
          </button>

          {showXButton ? (
            <div className="big_div">
              <button
                id="closebtn"
                onClick={() => {
                  setShowXbutton(false);
                  setShowCreateInput(false);
                  setShowCategory(false);
                  setShowTypeFood(false);
                }}
              >
                &times;
              </button>
              {showCategory ? (
                <div className="choose_category_div">
                  <p className="Choose_Category_p">Choose Category Of Meal</p>
                  {categories.map((element, index) => {
                    return (
                      <div className="category_title_links">
                        <a
                          key={index}
                          onClick={() => {
                            dispatch(setCategoriesId(element.id));
                            setShowCategory(false);
                            setShowTypeFood(true);
                          }}
                        >
                          <button className="category_button">
                            {element.category_title}
                          </button>
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              {showTypeFood ? (
                <div className="choose_foodType_div">
                  <p className="Choose_Type_p">Choose Type Of Meal</p>
                  {typesOffoodsState.typesOffood.map((element, index) => {
                    return (
                      <div className="Choose_Type_links">
                        <a
                          key={index}
                          onClick={() => {
                            dispatch(setTypeId(element.id));
                            setShowCreateInput(true);
                            setShowTypeFood(false);
                          }}
                        >
                          {element.type}
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              {showCreateInput ? (
                <div className="Create_Product_div">
                  <input
                    className="Create_Product_inputs"
                    type="text"
                    placeholder="Meal name"
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  />
                  <input
                    className="Create_Product_inputs"
                    type="text"
                    placeholder="Image link"
                    onChange={(e) => {
                      setImg(e.target.value);
                    }}
                  />
                  <input
                    className="Create_Product_inputs"
                    type="text"
                    placeholder="The description of meal"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <input
                    className="Create_Product_inputs"
                    type="text"
                    placeholder="The price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <button
                    className="Create_button1"
                    onClick={() => {
                      setShowCreateInput(false);
                      setShowXbutton(false);
                      createProduct();
                    }}
                  >
                    Create
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}

          <div className="Products_Container_admin">
            {show &&
              productsState.products.map((element, index) => {
                return (
                  <div className="Product_Container_Admin" key={index}>
                    <div className="Product-Img-Dev">
                      <img className="imgg" src={element.img} />
                    </div>
                    
                      <div className="t2">
                        <div className="product_m">
                          <div className="pName"> {element.productName}</div>
                          <div className="desc"> {element.description}</div>
                          <div className="price">{element.price} JD</div>
                        </div>

                        <div className="Marah_delete">
                          <button
                            className="delete"
                            onClick={() => {
                              setConfirmation(true);
                              setShowid(element.id);
                              setShowXbutton3(true);
                              setShowXbutton2(true);
                            }}
                          >
                            Delete
                          </button>
                          {showXButton3 && element.id === showid ? (
                            <>
                              <button
                                className="xbutton1"
                                onClick={() => {
                                  setConfirmation(false);
                                  setShowupdate(false);
                                  setShowXbutton3(false);
                                  setShowXbutton2(false);
                                  setCansel(false);
                                }}
                              >
                                &times;
                              </button>
                            </>
                          ) : (
                            <></>
                          )}
                          <div className="sure">
                            {confirmation && element.id === showid ? (
                              <div className="sure1">
                                <p className="are_you_sure">
                                  Are you sure you want to delete the product?
                                </p>
                                <button
                                  onClick={() => {
                                    deleteProductById(element.id);
                                    setConfirmation(false);
                                    setShowXbutton2(false);
                                    setShowXbutton3(false);
                                    setCansel(false);
                                  }}
                                >
                                  Confirm
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                          </div>
                        </div>

                        <div className="shaker_update">
                          <button
                            onClick={() => {
                              setShowid(element.id);
                              setShowupdate(true);
                              setCansel(true);
                              setShowXbutton2(true);
                            }}
                          >
                            Update
                          </button>

                          <div className="bigDiv2">
                            {cansel && element.id === showid ? (
                              <div className="afghani">
                                <button
                                  className="xbutton2"
                                  onClick={() => {
                                    setConfirmation(false);
                                    setShowupdate(false);
                                    setCansel(false);
                                    setShowXbutton3(false);
                                    setShowXbutton2(false);
                                  }}
                                >
                                  &times;
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            <div className="update-inputs">
                              {showupdate && element.id === showid ? (
                                <div className="update_input_3">
                                  <input
                                    type="text"
                                    placeholder="Meal name"
                                    onChange={(e) => {
                                      setProductName(e.target.value);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Image linke "
                                    onChange={(e) => {
                                      setImg(e.target.value);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Description"
                                    onChange={(e) => {
                                      setDescription(e.target.value);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Price"
                                    onChange={(e) => {
                                      setPrice(e.target.value);
                                    }}
                                  />

                                  <button
                                    className="submit"
                                    onClick={() => {
                                      updateproducttss(element.id);
                                      setShowupdate(false);
                                      setShowXbutton2(false);
                                      setShowXbutton3(false);
                                      setCansel(false);
                                    }}
                                  >
                                    Submit
                                  </button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    
                  </div>
                );
              })}
          </div>

          {hide ? (
            <></>
          ) : (
            <>
              <a href="#l">
                <button
                  onClick={() => {
                    back();
                  }}
                >
                  Back
                </button>
              </a>
              {page}
              <a href="#l">
                <button
                  onClick={() => {
                    next();
                  }}
                >
                  Next
                </button>
              </a>
            </>
          )}
        </>
      ) : (
        <div>
          Login first
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            go to login
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsAdminSide;
