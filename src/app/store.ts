
import { configureStore } from "@reduxjs/toolkit";
import api from "@/feature/mainApi";
import userReducer from "@/feature/user/user.slice";
import analyticsReducer from "@/feature/analytics/analytics.slice"

export const store = configureStore({
  reducer: {

    [api.reducerPath]: api.reducer,
     user: userReducer,
     analytics: analyticsReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 
  devTools: process.env.NODE_ENV !== "production",
});

//  Typed hooks support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
