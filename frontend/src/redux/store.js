import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import products from "./reducers/products";
import categories from "./reducers/categories";
import basket from "./reducers/basket";
export default configureStore({
  reducer: {
    auth: auth,
    products: products,
    categories: categories,
    basket: basket,
  },
});
