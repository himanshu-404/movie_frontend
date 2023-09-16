import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  movie_id: number;
  isWatched: boolean;
  movie_data: {
    poster_path: string;
    title: string;
    overview: string;
  };
}

const initialState = {
  data: [] as Movie[],
  loading: false,
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,

  reducers: {
    setMovieInWatchListFromDB: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      return state;
    },

    addMovieInWatchList: (state, action: PayloadAction<Movie>) => {
      state.data.push(action.payload);
    },
    removeMovieFromWatchList: (state, action: PayloadAction<number>) => {
      const updateData = state.data.filter(
        (movie) => movie.movie_id != action.payload
      );
      state.data = updateData;
    },
    updateMovieWatchList: (state, action: PayloadAction<Movie>) => {
      const index = state.data.findIndex(
        (movie) => movie.movie_id === action.payload.movie_id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    setWatchListLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setMovieInWatchListFromDB,
  addMovieInWatchList,
  removeMovieFromWatchList,
  updateMovieWatchList,
  setWatchListLoading,
} = watchListSlice.actions;

export default watchListSlice.reducer;
