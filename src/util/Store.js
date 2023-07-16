import { createSlice,configureStore } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:{cart:[],
    },
    reducers:{
        addToCart(state,action){
            state.cart.push(action.payload)
        },
        removeFromCart(state,action){
           const updatedCart=state.cart.filter(ele=>ele.title!==action.payload)
            state.cart=updatedCart
        }
    }
})
export const actions=cartSlice.actions
const store=configureStore({reducer:cartSlice.reducer})
export default store