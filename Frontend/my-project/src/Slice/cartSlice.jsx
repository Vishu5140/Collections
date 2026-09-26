import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems:JSON.parse(localStorage.getItem("cartItems"))|| [],
  },

  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    removeToCart:(state,action)=>{
       state.cartItems=state.cartItems.filter((item)=>item._id!==action.payload._id);
       localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    Increment:(state,action)=>{
       const Isexist= state.cartItems.find((item)=>item._id===action.payload._id)
       if(Isexist)
       {
        Isexist.quantity+=1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
       }else {
    state.cartItems.push({
      ...action.payload,
      quantity: 1
    });
  }
   
    },
    Decrement:(state,action)=>{
       const Isexist= state.cartItems.find((item)=>item._id===action.payload._id)
       if(Isexist && Isexist.quantity>1)
       {
        Isexist.quantity-=1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
       }
    },
  },
});

export const { addToCart,Increment,Decrement,removeToCart} = cartSlice.actions;

export default cartSlice.reducer;

