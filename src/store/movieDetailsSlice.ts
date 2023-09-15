import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieDetailsState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: MovieDetailsState = {
  loading: false,
  data: {},
  error: null,
};

const movieDetaisSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMovieDetails: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
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

export const { setMovieDetails, setLoading, setError } =
  movieDetaisSlice.actions;

export default movieDetaisSlice.reducer;
