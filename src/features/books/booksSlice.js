import { createSlice } from "@reduxjs/toolkit";

const savedBooks = JSON.parse(localStorage.getItem("library")) || [];

const initialState = {
  library: savedBooks,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const exists = state.library.find((book) => book.id === action.payload.id);
      if (!exists) {
        state.library.push(action.payload);
        // Sync to localStorage
        localStorage.setItem("library", JSON.stringify(state.library));
      }
    },
    removeBook: (state, action) => {
      state.library = state.library.filter((book) => book.id !== action.payload);
      // Sync to localStorage
      localStorage.setItem("library", JSON.stringify(state.library));
    },
  },
});

export const { addBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
