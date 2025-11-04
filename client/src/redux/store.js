import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './slices/imagesSlice';

/**
 * Redux Store
 * מכיל את כל ה-state הגלובלי של האפליקציה
 * devTools מופעל רק בפיתוח
 */
export const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export default store;