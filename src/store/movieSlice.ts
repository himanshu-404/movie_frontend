// movieSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  loading: boolean;
  data: any[];
  error: string | null;
}

const initialState: MovieState = {
  loading: false,
  data: [],
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMovies: (state, action: PayloadAction<any[]>) => {
      state.data = [...state.data, ...action.payload];
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
    },
  },
});

export const { setLoading, setMovies, setError } = movieSlice.actions;
export default movieSlice.reducer;
