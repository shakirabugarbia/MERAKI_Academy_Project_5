import { createSlice } from "@reduxjs/toolkit";

const basket = createSlice({
  name: "basket",
  initialState: {
    basket: [],
    amount: 0,
    price: 0,
  },
  reducers: {
    addToBasket: (state, action) => {
      state.basket.push(action.payload);
    },

    deleteFromBasket: (state, action) => {
      state.basket = state.basket.filter((element, index) => {
        return element.id != action.payload;
      });
    },

    updateBasket: (state, action) => {
      state.basket = state.basket.map((element, index) => {
        if (element.id == action.payload.id) {
          return action.payload;
        }
        return element;
      });
    },

    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = state.amount + 1;
    },
    decrease: (state, action) => {
      state.amount = state.amount - 1;
    },
    zero: (state, action) => {
      state.amount = 0;
    },
    setPrice: (state, action) => {
      state.price = action.payload + state.price;
    },
    decreasePrice: (state, action) => {
      state.price = state.price - action.payload;
    },
    zeroPrice: (state, action) => {
      state.price = 0;
    },
  },
});

export const {
  setBasket,
  updateBasket,
  deleteFromBasket,
  addToBasket,
  setAmount,
  decrease,
  zero,
  zeroPrice,
  setPrice,
  decreasePrice,
} = basket.actions;

export default basket.reducer;
