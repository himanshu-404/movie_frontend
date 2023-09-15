import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchMovies } from "../Actions/movies";
import style from "./movieList.module.css";

const MovieList = () => {
  const { data, loading, error } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies("1"));
  }, [dispatch]);

  const handleAdd = (productData: object) => {
    console.log(productData);
  };

  return (
    <div className={style["card-wrapper"]}>
      {data?.map((movies) => (
        <div className={style["movie-card"]}>
          <img
            className={style["movie-poster"]}
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          />
          <div className={style["movie-info"]}>
            <h2 className={style["movie-title"]}>{movies.title}</h2>
            <p className={style["movie-release-date"]}>
              Release Date: {movies.release_date}
            </p>
            <p className={style["movie-overview"]}>{movies.overview}</p>
            <p className={style["movie-popularity"]}>
              Popularity: {movies.popularity}
            </p>
            <button onClick={() => handleAdd(movies)} className={style["btn"]}>
              Add to watchlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
