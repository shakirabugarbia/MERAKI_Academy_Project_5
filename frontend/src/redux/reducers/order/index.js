import { createSlice } from "@reduxjs/toolkit";

const order = createSlice({
  name: "order",
  initialState: {
    order: [],
    items: [],
    id: localStorage.getItem("id") || 0,
    recipteId: localStorage.getItem("recipteId") || 0,
  },
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    setItems: (state, action) => {
      state.items.push(action.payload);
    },
    setId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("id", state.id);
    },
    setrecipteId: (state, action) => {
      state.recipteId = action.payload;
      localStorage.setItem("recipteId", state.recipteId);
    },
  },
});

export const { addOrder, setItems, setId ,setrecipteId} = order.actions;
export default order.reducer;
