import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchMovies } from "../Actions/movies";

const Home = () => {
  const { data, loading, error } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies("1"));
  }, [dispatch]);

  console.log(data);
  return (
    <div>
      {loading && <div>Loading...</div>}

      {error && <div>{error}</div>}
    </div>
  );
};

export default Home;
