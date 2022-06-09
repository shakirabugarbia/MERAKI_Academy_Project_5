import { createSlice } from "@reduxjs/toolkit";

const order = createSlice({
  name: "order",
  initialState: {
    order: [],
    items: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    setItems: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addOrder, setItems } = order.actions;
export default order.reducer;
