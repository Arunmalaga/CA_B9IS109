import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../features/products/ProductSlice";
import authSlice from "../features/auth/authSlice";
import CartSlice from "../features/cart/CartSlice";
import OrderSlice from "../features/order/OrderSlice";
import UserSlice from "../features/user/UserSlice";




export const store=configureStore({
    reducer:{
        ProductSlice,
        authSlice,
        CartSlice,
        OrderSlice,
        UserSlice,
    }
})