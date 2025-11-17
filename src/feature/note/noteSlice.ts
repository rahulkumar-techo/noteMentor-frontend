

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  _id: string | null;
  title: string;
  content: string;
  likes: string[];       // store user ids who liked
  likesCount: number;
  views: string[];       // store user ids who viewed
  viewsCount: number;
}

const initialState: NoteState = {
  _id: null,
  title: "",
  content: "",
  likes: [],
  likesCount: 0,
  views: [],
  viewsCount: 0,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<Partial<NoteState>>) => {
      return { ...state, ...action.payload };
    },

    toggleLikeLocal: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      const alreadyLiked = state.likes.includes(userId);

      if (alreadyLiked) {
        state.likes = state.likes.filter((id) => id !== userId);
        state.likesCount -= 1;
      } else {
        state.likes.push(userId);
        state.likesCount += 1;
      }
    },

    addViewLocal: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      if (!state.views.includes(userId)) {
        state.views.push(userId);
        state.viewsCount += 1;
      }
    },

    resetNote: () => initialState,
  },
});

export const {
  setNote,
  toggleLikeLocal,
  addViewLocal,
  resetNote,
} = noteSlice.actions;

export default noteSlice.reducer;
