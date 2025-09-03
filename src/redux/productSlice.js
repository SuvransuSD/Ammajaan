import { createSlice } from '@reduxjs/toolkit';
import productsData from '../data/products.jsx';  // ✅ this works with default export

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: productsData,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
