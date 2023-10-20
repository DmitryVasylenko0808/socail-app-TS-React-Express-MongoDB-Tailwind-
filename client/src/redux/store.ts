import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./authSlice";
import { emptySplitApi } from "./services/emptySplitApi";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [emptySplitApi.reducerPath]: emptySplitApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptySplitApi.middleware)
});

setupListeners(store.dispatch);

export type RoosState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;