import { setMovieDetails } from "../store/movieDetailsSlice";
import { setError, setLoading, setMovies } from "../store/movieSlice";
import axios from "axios";

export function fetchMovies(id: number) {
  return async function fetchMoviesThunk(dispatch: any, getState: any) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/movie?page=${id}`
      );
      dispatch(setMovies(data.data));
      dispatch(setMovieDetails({}));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };
}
