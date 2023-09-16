import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchMovies } from "../Actions/movies";
import style from "./movieList.module.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {
  addMovieToWatchListAction,
  fetchWatchList,
  removeMovieFromWatchListAction,
} from "../Actions/watchList";

const MovieList = () => {
  const { data, loading, error } = useAppSelector((state) => state.movies);
  const { data: watchListData, loading: watchListLoading } = useAppSelector(
    (state) => state.watchList
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWatchList());
    dispatch(fetchMovies("2"));
  }, [dispatch]);

  const handleAddWatchlist = (moviedId: number) => {
    dispatch(addMovieToWatchListAction(moviedId));
  };

  const handleRemoveWatchlist = (moviedId: number) => {
    dispatch(removeMovieFromWatchListAction(moviedId));
  };

  return (
    <>
      {(loading || watchListLoading) && <Loader />}

      <div className={style["card-wrapper"]}>
        {data?.map((movies) => (
          <div className={style["movie-card"]}>
            <img
              className={style["movie-poster"]}
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              onClick={() => {
                navigate(`/movie/${movies?.id}`);
              }}
            />
            <div className={style["movie-info"]}>
              <h2
                className={style["movie-title"]}
                onClick={() => {
                  navigate(`/movie/${movies?.id}`);
                }}
              >
                {movies.title}
              </h2>
              <p className={style["movie-release-date"]}>
                Release Date: {movies.release_date}
              </p>
              <p className={style["movie-overview"]}>
                {movies.overview.slice(0, 100)}

                {movies.overview.length > 100 && (
                  <Link to={`/movie/${movies?.id}`} className={style["link"]}>
                    ...Read More
                  </Link>
                )}
              </p>
              <p className={style["movie-popularity"]}>
                Popularity: {movies.popularity}
              </p>
              <p className={style["movie-popularity"]}>
                Rating: {movies.vote_average}
              </p>

              {watchListData?.find((item) => item.movie_id == movies.id) ? (
                <button
                  className={style["btn-disabled"]}
                  onClick={() => handleRemoveWatchlist(movies?.id)}
                >
                  Remove from watchlist
                </button>
              ) : (
                <button
                  onClick={() => handleAddWatchlist(movies?.id)}
                  className={style["btn"]}
                >
                  Add to watchlist
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList;
