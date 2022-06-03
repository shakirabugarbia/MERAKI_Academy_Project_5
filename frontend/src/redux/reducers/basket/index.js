import { createSlice } from "@reduxjs/toolkit";

const basket = createSlice({
  name: "basket",
  initialState: {
    basket: [],
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
  },
});

export const {  setBasket,  updateBasket, deleteFromBasket, addToBasket } =
basket.actions;

export default basket.reducer;
