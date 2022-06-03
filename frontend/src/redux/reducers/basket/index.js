import { createSlice } from "@reduxjs/toolkit";

const basket = createSlice({
  name: "basket",
  initialState: {
    baskest: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      state.baskest.push(action.payload);
    },

    deleteFromBasket: (state, action) => {
      state. baskest = state. baskest.filter((element, index) => {
        return element.id != action.payload;
      });
    },

    updateBasket: (state, action) => {
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
