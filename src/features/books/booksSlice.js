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
        // Default status when added is "reading"
        state.library.push({ ...action.payload, status: "reading" });
        localStorage.setItem("library", JSON.stringify(state.library));
      }
    },
    removeBook: (state, action) => {
      state.library = state.library.filter((book) => book.id !== action.payload);
      localStorage.setItem("library", JSON.stringify(state.library));
    },
    updateBookStatus: (state, action) => {
      // action.payload = { id: bookId, status: "reading" | "completed" | "want-to-read" }
      const book = state.library.find((b) => b.id === action.payload.id);
      if (book) {
        book.status = action.payload.status;
        localStorage.setItem("library", JSON.stringify(state.library));
      }
    },
    toggleFavorite: (state, action) => {
      let book = state.library.find((b) => b.id === action.payload.id);
      if (!book) {
        // Auto-add to library if favoriting a new found book
        state.library.push({ ...action.payload, status: "want-to-read", isFavorite: true });
      } else {
        book.isFavorite = !book.isFavorite;
      }
      localStorage.setItem("library", JSON.stringify(state.library));
    },
  },
});

export const { addBook, removeBook, updateBookStatus, toggleFavorite } = booksSlice.actions;
export default booksSlice.reducer;
