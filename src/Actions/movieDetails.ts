import {
  setError,
  setLoading,
  setMovieDetails,
} from "../store/movieDetailsSlice";
import axios from "axios";

export function fetchMovieDetails(id: String) {
  return async function fetchMovieDetailsThunk(dispatch: any, getState: any) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      dispatch(setMovieDetails(data));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };
}
