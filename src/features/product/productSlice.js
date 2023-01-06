import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productApi";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error: "",
  postSuccess: false,
};

export const getProducts = createAsyncThunk("product/getProduct", async () => {
  const products = fetchProducts();
  return products;
});

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data) => {
    postProduct(data);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.postSuccess = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.postSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.postSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { togglePostSuccess } = productSlice.actions;

export default productSlice.reducer;
