// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import "./style.css";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import {
//   addProductts,
//   deleteproductts,
//   updateproductts,
//   setProducts,
//   setProductName,
// } from "../../redux/reducers/products/index";
// import {
//   addCategoriess,
//   deleteCategoriess,
//   updateCategoriess,
//   setCategories,
//   setCategoriesId,
// } from "../../redux/reducers/categories";
// import {
//   addTypeOfFood,
//   deleteTypeOfFood,
//   updateTypeOfFood,
//   setTypeOfFood,
// } from "../../redux/reducers/typeoffoods/index";

// const Admin = () => {
//   const dispatch = useDispatch();

//   const { token, isLoggedIn } = useSelector((state) => {
//     return {
//       token: state.auth.token,
//       isLoggedIn: state.auth.isLoggedIn,
//     };
//   });

//   const productsState = useSelector((state) => {
//     products: state.products.products;
//   });

//   const typesOffoodsState = useSelector((state) => {
//     return {
//       typesOffoods: state.typeoffood,
//     };
//   });

//   const { categories, category_id } = useSelector((state) => {
//     return {
//       categories: state.categories.categories,
//       category_id: state.categories.category_id,
//     };
//   });

//   const [show, setShow] = useState(false);
//   const [productName, setProductName] = useState("");
//   const [description, setDescription] = useState("");
//   const [img, setImg] = useState("");
//   const [price, setPrice] = useState("");
//   const [updateBox, setUpdateBox] = useState(false);
//   const [productId, setProductId] = useState(false);
//   const [message, setMessage] = useState("");
//   const [userId, setUserId] = useState("");
//   const [hide, setHide] = useState(false);

//   const gatAllproducts = () => {
//     axios
//       .get(`http://localhost:5000/product/?page=${page}`)
//       .then((result) => {
//         dispatch(setProducts(result.data.result.result));
//         setMessage(result.data.message);
//       })
//       .catch((err) => {
//         setShow(true);
//         setMessage(err.message);
//       });
//   };
//   const gatAllCategories = () => {
//     axios
//       .get(`http://localhost:5000/category/allCategories`)
//       .then((result) => {
//         dispatch(setCategories(result.data.result));
//         setMessage(result.data.message);
//         setShow(true);
//       })
//       .catch((err) => {
//         setMessage(err.message);
//       });
//   };

//   const getAllTypeOfFood = () => {
//     axios
//       .get(`http://localhost:5000/typeOfFood`)
//       .then((result) => {
//         dispatch(setTypeOfFood(result.data.result));
//         setShow(true);
//       })
//       .catch((err) => {
//         setMessage(err.message);
//       });
//   };
//   // const createProduct = ()=>{
//   //   axios.post(`http://localhost:5000/product/${}`,{}).then({}).catch({})
//   // }
//   const updateproducttss = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/product/update/${id}`, {
//         productName,
//         img,
//         description,
//         price,
//       });
//       dispatch(
//         updateproductts({
//           productName: productName,
//           img: img,
//           description: description,
//           price: price,
//         })
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     gatAllCategories();
//     gatAllproducts();
//     getAllTypeOfFood();
//   }, []);
//   return (
//     <div className="main">

//       <div><button>Show as a user</button>
//         <button onClick={navigate}>product</button></div>
//       {state.products.map((element, index) => (
//         <div key={index} className="product">
//           <div>{element.productName}</div>
//           <div>{element.img}</div>
//           <div>{element.description}</div>
//           <div>{element.price}</div>
//           <button className="delete" onClick={() => deleteproductts(productId)}>
//             X
//           </button>
//           <button className="update" onClick={updateproductts()}>
//             update product
//           </button>
//         </div>
//       ))}
//       <div>The Boss is here</div>
//     </div>
//   );
// };
// export default Admin;
