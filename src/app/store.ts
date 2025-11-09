
import { configureStore } from "@reduxjs/toolkit";
import api from "@/feature/mainApi";

export const store = configureStore({
  reducer: {

    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 
  devTools: process.env.NODE_ENV !== "production",
});

//  Typed hooks support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
