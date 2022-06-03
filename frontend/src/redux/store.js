import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import products from "./reducers/products";
import categories from "./reducers/categories";
export default configureStore({
  reducer: {
    auth: auth,
    products: products,
    categories: categories,
  },
});
