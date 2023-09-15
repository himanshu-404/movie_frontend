import {
  setError,
  setLoading,
  setMovieDetails,
} from "../store/movieDetailsSlice";
import axios from "axios";

export function fetchMovieDetails(id: string | number | undefined) {
  return async function fetchMovieDetailsThunk(dispatch: any, getState: any) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/movie/${id}`
      );
      dispatch(setMovieDetails(data.data));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };
}
