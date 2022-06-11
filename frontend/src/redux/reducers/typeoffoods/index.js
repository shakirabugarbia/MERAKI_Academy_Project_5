import { createSlice } from "@reduxjs/toolkit";

const typeoffoods = createSlice({
  name: "typeoffood",
  initialState: {
    typeOfFood: [],
    type_id: "",
  },
  reducers: {
    addTypeOfFood: (state, action) => {
      state.typeOfFood.push(action.payload);
    },

    deleteTypeOfFood: (state, action) => {
      state.typeOfFood = state.typeOfFood.filter((typeOfFood, index) => {
        return typeOfFood.id != action.payload;
      });
    },

    updateTypeOfFood: (state, action) => {
      state.typeOfFood = state.typeOfFood.map((typeOfFood, index) => {
        if (typeOfFood.id == action.payload.id) {
          return action.payload;
        }
        return typeOfFood;
      });
    },

    setTypeOfFood: (state, action) => {
      state.typeOfFood = action.payload;
    },
    setTypeId: (state, action) => {
      state.type_id = action.payload;
    },
  },
});

export const {
  addTypeOfFood,
  deleteTypeOfFood,
  updateTypeOfFood,
  setTypeOfFood,
  setTypeId
} = typeoffoods.actions;

export default typeoffoods.reducer;
