import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
import productSlice from "../features/product/productSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    filter: filterSlice,
    product: productSlice,
  },
});

export default store;
