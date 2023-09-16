import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMovieDetails } from "../Actions/movieDetails";
import style from "./css/movieDetails.module.css";
import "../components/css/common.css";
import Loader from "../components/Loader";
import {
  addMovieToWatchListAction,
  removeMovieFromWatchListAction,
} from "../Actions/watchList";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, loading } = useAppSelector(
    (state) => state.movieDetails
  );

  const { data: watchListData, loading: watchListLoading } = useAppSelector(
    (state) => state.watchList
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [id]);

  const handleAddWatchlist = (moviedId: number) => {
    dispatch(addMovieToWatchListAction(moviedId));
  };

  const handleRemoveWatchlist = (moviedId: number) => {
    dispatch(removeMovieFromWatchListAction(moviedId));
  };

  return (
    <>
      {(loading || watchListLoading) && <Loader />}

      <div className={style["movie-details"]}>
        <div className={style["movie-poster"]}>
          <img
            src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            // src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}
            alt=""
          />
        </div>
        <div className={style["movie-info"]}>
          <h1 className={style["movie-title"]}>{data?.title}</h1>
          <p className={style["movie-release-date"]}>
            Release Date: {data?.release_date}
          </p>
          <p className={style["movie-overview"]}>{data.overview}</p>
          <p className={style["movie-popularity"]}>
            Popularity: {data.popularity}
          </p>
          <p className={style["movie-margin-top"]}>
            Genres:{" "}
            {data?.genres
              ?.map((genre: { name: string }) => genre.name)
              .join(", ")}
          </p>
          <p className={style["movie-margin-top"]}>
            Runtime: {data?.runtime} minutes
          </p>
          <p className={style["movie-margin-top"]}>Revenue: {data?.revenue}</p>
          <p className={style["movie-margin-top"]}>
            Rating: {data?.vote_average}
          </p>

          {watchListData?.find((item) => item.movie_id == data.id) ? (
            <button
              className={"btn-disabled"}
              onClick={() => handleRemoveWatchlist(data?.id)}
            >
              Remove from watchlist
            </button>
          ) : (
            <button
              onClick={() => handleAddWatchlist(data?.id)}
              className={"btn"}
            >
              Add to watchlist
            </button>
          )}

          <p className={style["movie-margin-top"]}>
            <button
              onClick={() => navigate("/watchlist")}
              className={style["btn-watchlist"]}
            >
              Go to watchlist
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
