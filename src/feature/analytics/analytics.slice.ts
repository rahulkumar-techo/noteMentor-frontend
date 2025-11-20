import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnalyticsState {
  // Common search (applies to both users and notes)
  search: string;

  // Users pagination
  usersPage: number;
  usersLimit: number;

  // Notes pagination
  notesPage: number;
  notesLimit: number;
}

const initialState: AnalyticsState = {
  search: "",
  usersPage: 1,
  usersLimit: 20,
  notesPage: 1,
  notesLimit: 10,
};

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    // 🔍 Master search (Users + Notes)
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.usersPage = 1;
      state.notesPage = 1;
    },

    // 👤 Only change user page
    setUsersPage(state, action: PayloadAction<number>) {
      state.usersPage = action.payload;
    },

    // 📝 Only change notes page
    setNotesPage(state, action: PayloadAction<number>) {
      state.notesPage = action.payload;
    },

    // 🔄 Reset everything
    resetAnalytics(state) {
      state.search = "";
      state.usersPage = 1;
      state.notesPage = 1;
      state.usersLimit = 20;
      state.notesLimit = 10;
    },
  },
});

// Export actions
export const { setSearch, setUsersPage, setNotesPage, resetAnalytics } =
  analyticsSlice.actions;

export default analyticsSlice.reducer;
