import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMovieDetails } from "../Actions/movieDetails";
import style from "./movieDetails.module.css";
import Loader from "../components/Loader";

const MovieDetails = () => {
  const { id } = useParams();

  const { data, error, loading } = useAppSelector(
    (state) => state.movieDetails
  );

  const images = [
    `https://image.tmdb.org/t/p/w500${data?.backdrop_path}`,
    `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
  ];

  const [current, setCurrent] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [id]);

  return (
    <>
      {loading && <Loader />}

      <div className={style["movie-details"]}>
        <div className={style["movie-poster"]}>
          <img
            src={images[current]}
            alt=""
            onClick={() => {
              current === images.length - 1
                ? setCurrent(0)
                : setCurrent(current + 1);
            }}
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
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
