import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { productSlice } from "./productSlice";

export const Store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productSlice.reducer,
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;