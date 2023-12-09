import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface ratingItem{
    rate :number,
    count:number
}
export interface Product{
    id:number,
    title:string,
    price:number,
    description:string,
    image:string,
    rating:ratingItem
}

interface productState{
    product: Product[];
}

const initialState :productState = {
    product:[],
}

export const fetchProduct = createAsyncThunk(
    "product/fetch",
    async (thunkAPI) => {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "GET",
      });
      const data = response.json();
      return data;
    },
  );

export const ProductSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addProduct:(state,action:PayloadAction<Product>)=>{
            state.product.push(
                action.payload
                );
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
          state.product = action.payload;
        });
      },
    
});

export default ProductSlice.reducer;
export const { addProduct } = ProductSlice.actions;