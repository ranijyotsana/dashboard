import { configureStore } from '@reduxjs/toolkit';
import borrowersReducer from './slices/borrowersSlice';
export const store = configureStore({
  reducer: {
    borrowers: borrowersReducer,
  },
});
