import toast from "react-hot-toast";
import {
  addMovieInWatchList,
  setMovieInWatchListFromDB,
  removeMovieFromWatchList,
  updateMovieWatchList,
  setWatchListLoading,
} from "../store/watchListSlice";
import axios from "axios";

export function fetchWatchList() {
  return async function fetchWatchListThunk(dispatch: any, getState: any) {
    try {
      dispatch(setWatchListLoading(true));
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/watchlist`
      );
      dispatch(setWatchListLoading(false));

      dispatch(setMovieInWatchListFromDB(data.data));
    } catch (err: any) {
      dispatch(setWatchListLoading(false));
      console.log(err.message);
    }
  };
}

export function addMovieToWatchListAction(movieId: number) {
  return async function addMovieToWatchListThunk(dispatch: any, getState: any) {
    try {
      dispatch(setWatchListLoading(true));

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/watchlist`,
        { id: movieId.toString() }
      );

      dispatch(setWatchListLoading(false));
      dispatch(addMovieInWatchList(data.data));

      toast.success("Movie added to watchlist");
    } catch (err: any) {
      dispatch(setWatchListLoading(false));
      toast.error(err?.response?.data?.message || err.message);
    }
  };
}

export function removeMovieFromWatchListAction(movieId: number) {
  return async function removeMovieToWatchListThunk(
    dispatch: any,
    getState: any
  ) {
    try {
      dispatch(setWatchListLoading(true));

      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/watchlist/${movieId}`
      );

      dispatch(setWatchListLoading(false));
      dispatch(removeMovieFromWatchList(movieId));
      toast.success("Movie removed from watchlist");
    } catch (err: any) {
      dispatch(setWatchListLoading(false));

      toast.error(err?.response?.data?.message || err.message);
    }
  };
}

export function updateMovieWatchListAction(movieId: number, watched: boolean) {
  return async function updateMovieWatchListThunk(
    dispatch: any,
    getState: any
  ) {
    try {
      dispatch(setWatchListLoading(true));

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/watchlist/`,
        {
          id: movieId.toString(),
          isWatched: watched,
        }
      );

      dispatch(setWatchListLoading(false));
      dispatch(updateMovieWatchList(data.data));
      toast.success("Movie updated in watchlist");
    } catch (err: any) {
      dispatch(setWatchListLoading(false));

      toast.error(err?.response?.data?.message || err.message);
    }
  };
}
