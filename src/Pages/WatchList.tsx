import React, { useEffect } from "react";
import {
  fetchWatchList,
  removeMovieFromWatchListAction,
  updateMovieWatchListAction,
} from "../Actions/watchList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Loader from "../components/Loader";
import style from "../components/css/movieList.module.css";
import "../components/css/common.css";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
  const dispach = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading } = useAppSelector((state) => state.watchList);

  useEffect(() => {
    dispach(fetchWatchList());
  }, []);

  const handleRemoveWatchlist = (moviedId: number) => {
    dispach(removeMovieFromWatchListAction(moviedId));
  };
  const handleUpdateWatchlist = (moviedId: number, isWatched: boolean) => {
    dispach(updateMovieWatchListAction(moviedId, isWatched));
  };

  return (
    <>
      {loading && <Loader />}

      {data?.length === 0 && (
        <div className={style["card-wrapper"]}>
          <img src="no_data.svg" alt="" height={600} width={250} />
        </div>
      )}

      <div className={style["card-wrapper"]}>
        {data?.map((movies) => (
          <div className={style["movie-card"]}>
            <img
              className={style["movie-poster"]}
              src={`https://image.tmdb.org/t/p/w500${movies?.movie_data?.poster_path}`}
              onClick={() => {
                navigate(`/movie/${movies?.movie_id}`);
              }}
            />
            <div className={style["movie-info"]}>
              <div
                className={style["movie-title"]}
                onClick={() => {
                  navigate(`/movie/${movies?.movie_id}`);
                }}
              >
                {movies?.movie_data?.title}
              </div>
            </div>

            <p className={style["movie-popularity"]}>
              {movies?.isWatched ? (
                <span className={style["watched"]}>Watched</span>
              ) : (
                <span className={style["not-watched"]}>Not Watched</span>
              )}
            </p>

            <div className={style["btn-action"]}>
              <button
                className={"btn-watchlist"}
                onClick={() =>
                  handleUpdateWatchlist(movies?.movie_id, !movies?.isWatched)
                }
              >
                {movies?.isWatched ? "Mark as not watched" : "Mark as watched"}
              </button>
              <button
                className={"btn-disabled"}
                onClick={() => handleRemoveWatchlist(movies?.movie_id)}
              >
                Remove from watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WatchList;
