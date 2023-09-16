import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movieSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import watchListReducer from "./watchListSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    watchList: watchListReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
