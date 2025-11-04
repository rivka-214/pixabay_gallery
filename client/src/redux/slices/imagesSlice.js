import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Redux Slice לניהול תמונות
 * כולל שליפת נתונים, טעינה, שגיאות וניווט בין עמודים
 */

// קריאת API לשרת
export const getImages = createAsyncThunk(
  'images/getImages',
  async ({ category, page, sortBy }) => {
    const response = await axios.get(`${API_BASE_URL}/images`, {
      params: { category, page, sortBy },
    });
    return response.data;
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    displayedResults: 0,
    totalResults: 0,
    currentCategory: 'nature',
    currentSortBy: 'latest',
  },
  reducers: {
    // מעבר לעמוד הבא
    nextPage: (state) => {
      if (state.currentPage < state.totalPages) state.currentPage += 1;
    },
    // מעבר לעמוד הקודם
    prevPage: (state) => {
      if (state.currentPage > 1) state.currentPage -= 1;
    },
    // שינוי קטגוריה (כולל איפוס עמוד)
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
      state.currentPage = 1;
    },
    // שינוי מיון (כולל איפוס עמוד)
    setSortBy: (state, action) => {
      state.currentSortBy = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // בזמן טעינה
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // הצלחה בשליפת נתונים
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload.data || [];

        const pagination = action.payload.pagination || {};
        state.displayedResults = pagination.displayedResults ?? 0;
        state.totalResults = pagination.totalResults ?? 0;
        state.totalPages = pagination.totalPages ?? 1;
      })
      // במקרה של שגיאה
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ייצוא פעולות וסלקטורים
export const { nextPage, prevPage, setCategory, setSortBy } = imagesSlice.actions;
export const selectImages = (state) => state.images.images;
export const selectLoading = (state) => state.images.loading;
export const selectError = (state) => state.images.error;
export const selectCurrentPage = (state) => state.images.currentPage;
export const selectTotalPages = (state) => state.images.totalPages;
export const selectDisplayedResults = (state) => state.images.displayedResults;
export const selectTotalResults = (state) => state.images.totalResults;
export const selectCurrentCategory = (state) => state.images.currentCategory;
export const selectCurrentSortBy = (state) => state.images.currentSortBy;

export default imagesSlice.reducer;
