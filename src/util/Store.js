import { createSlice,configureStore } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:{cart:[],
        quantity:0
    },
    reducers:{
        addToCart(state,action){
            state.cart.push(action.payload)
        },
        removeFromCart(state,action){
            state.cart.splice(action.payload,1)
        }
    }
})
export const actions=cartSlice.actions
const store=configureStore({reducer:cartSlice.reducer})
export default store