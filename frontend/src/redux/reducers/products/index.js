import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    addProductts: (state, action) => {
      state.products.push(action.payload);
    },

    deleteproductts: (state, action) => {
      state.products = state.products.filter((product, index) => {
        return product.id != action.payload;
      });
    },

    updateproductts: (state, action) => {
      state.products = state.products.map((product, index) => {
        if (product.id == action.payload.id) {
          return action.payload;
        }
        return product;
      });
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addProductts, deleteproductts, updateproductts, setProducts } =
  products.actions;

export default products.reducer;
