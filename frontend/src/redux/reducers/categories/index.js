import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    addCategoriess: (state, action) => {
      state.categories.push(action.payload);
    },

    deleteCategoriess: (state, action) => {
      state.categories = state.categories.filter((element, index) => {
        return element.id != action.payload;
      });
    },

    updateCategoriess: (state, action) => {
      state.categories = state.categories.map((element, index) => {
        if (element.id == action.payload.id) {
          return action.payload;
        }
        return element;
      });
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addCategoriess, deleteCategoriess, updateCategoriess, setCategories } =
categoriesSlice.actions;

export default categoriesSlice.reducer;
