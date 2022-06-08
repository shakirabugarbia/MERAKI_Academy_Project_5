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
} from "../../redux/reducers/categories";
import {
  addTypeOfFood,
  deleteTypeOfFood,
  updateTypeOfFood,
  setTypeOfFood,
} from "../../redux/reducers/typeoffoods/index";

const ProductsAdminSide = () => {
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
      typesOffoods: state.typeoffood,
    };
  });

  const { categories, category_id } = useSelector((state) => {
    return {
      categories: state.categories.categories,
      category_id: state.categories.category_id,
    };
  });

  const [show, setShow] = useState(false);
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
  // const createProduct = ()=>{
  //   axios.post(`http://localhost:5000/product/${}`,{}).then({}).catch({})
  // }
  const updateproducttss = async (id) => {
    try {
      await axios.put(`http://localhost:5000/product/update/${id}`, {
        productName,
        img,
        description,
        price,
      });
      dispatch(
        updateproductts({
          productName: productName,
          img: img,
          description: description,
          price: price,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gatAllCategories();
    gatAllproducts();
    getAllTypeOfFood();
  }, []);

  return (
    <div className="main">
      <h1>Products Admin Side</h1>
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
                    <div className="t">
                      <div className="pName"> {element.productName}</div>
                      <div className="desc"> {element.description}</div>
                      <div className="price">{element.price}JD</div>
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
    </div>
  );
};

export default ProductsAdminSide;
