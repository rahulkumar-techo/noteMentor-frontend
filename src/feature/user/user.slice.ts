

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  fullname: string;
  role:string;
  email: string;
  avatar?: {
    secure_url: string;
    public_id:string
  };
}

interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // set user after login
    setUser: (
      state,
      action: PayloadAction<{ user: any; token?: string }>
    ) => {
      state.user = action.payload.user;
      if (action.payload.token) state.token = action.payload.token;
      state.error = null;
    },

    // update profile
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // logout
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },

    // set loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // error handler
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, updateUser, clearUser, setLoading, setError } =
  userSlice.actions;

export default userSlice.reducer;
