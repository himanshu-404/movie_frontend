import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchMovies } from "../Actions/movies";
import style from "./css/movieList.module.css";
import "./css/common.css";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [scrollIndex, setScrollIndex] = useState(1);
  const [yearFilter, setYearFilter] = useState(false);
  const [selectedYear, setSelectedYear] = useState<any>("Select year");
  const [languageFilter, setLanguageFilter] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<String>("Select language");

  useEffect(() => {
    dispatch(fetchWatchList());
    dispatch(fetchMovies(1));
  }, [dispatch]);

  const handleAddWatchlist = (moviedId: number) => {
    dispatch(addMovieToWatchListAction(moviedId));
  };
  const handleRemoveWatchlist = (moviedId: number) => {
    dispatch(removeMovieFromWatchListAction(moviedId));
  };

  // Get years from 1960 to current year for dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1959 },
    (_, index) => 1960 + index
  );

  // Get unique languages from data
  const uniqueLanguages = Array.from(
    new Set(data.map((movie) => movie.original_language))
  );

  // Filter movies based on selected year and language
  const filteredMovies = data.filter((movie) => {
    const releaseYear = new Date(movie.release_date).getFullYear();
    return selectedLanguage !== "Select language" &&
      selectedYear !== "Select year"
      ? releaseYear == selectedYear &&
          movie.original_language == selectedLanguage
      : selectedLanguage !== "Select language"
      ? movie.original_language == selectedLanguage
      : selectedYear !== "Select year"
      ? releaseYear == selectedYear
      : data;
  });

  //remove duplicates from filteredMovies
  const uniqueMovies = Array.from(
    new Set(filteredMovies.map((movie) => movie.id))
  ).map((id) => {
    return filteredMovies.find((movie) => movie.id == id);
  });

  const handleMoreData = () => {
    dispatch(fetchMovies(scrollIndex + 1));
    setScrollIndex(scrollIndex + 1);
  };

  return (
    <>
      {watchListLoading ? (
        <Loader />
      ) : (
        <div style={{ marginTop: "37px" }}>
          {/* create dropdown component with html  */}
          <div className={style["header-filter"]}>
            <button
              className={style["drop-button"]}
              onClick={() => setYearFilter(!yearFilter)}
            >
              {selectedYear ? selectedYear : "Select year"}
            </button>
            {yearFilter && (
              <ul
                className={style["dropdown-content"]}
                style={{ right: "162px" }}
              >
                <div className={style["scrollDiv"]}>
                  {["None", ...years]?.map((year) => {
                    return (
                      <div
                        onClick={() => {
                          setYearFilter(!yearFilter);
                          setSelectedYear(
                            year === "None" ? "Select year" : year
                          );
                        }}
                      >
                        {year}
                      </div>
                    );
                  })}
                </div>
              </ul>
            )}

            {/* create dropdown component with html for language */}
            <button
              className={style["drop-button"]}
              onClick={() => setLanguageFilter(!languageFilter)}
            >
              {selectedLanguage ? selectedLanguage : "Select language"}
            </button>
            {languageFilter && (
              <ul
                className={style["dropdown-content"]}
                style={{ right: "0px" }}
              >
                <div className={style["scrollDiv"]}>
                  {["None", ...uniqueLanguages]?.map((lan) => {
                    return (
                      <div
                        onClick={() => {
                          setLanguageFilter(!languageFilter);
                          setSelectedLanguage(
                            lan === "None" ? "Select language" : lan
                          );
                        }}
                      >
                        {lan}
                      </div>
                    );
                  })}
                </div>
              </ul>
            )}
          </div>
          <InfiniteScroll
            dataLength={uniqueMovies.length || 0}
            next={handleMoreData}
            hasMore={true}
            loader={loading && <h4>Loading...</h4>}
            style={{ paddingTop: "40px" }}
          >
            <div className={style["card-wrapper"]}>
              {uniqueMovies?.map((movies) => (
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
                      {movies.overview.slice(0, 100) + "  ..."}

                      <Link
                        to={`/movie/${movies.id}`}
                        className={style["link"]}
                      >
                        Read More
                      </Link>
                    </p>
                    <p className={style["movie-popularity"]}>
                      Popularity: {movies.popularity}
                    </p>
                    {watchListData?.find(
                      (item) => item.movie_id == movies.id
                    ) ? (
                      <button
                        className={"btn-disabled"}
                        onClick={() => handleRemoveWatchlist(movies?.id)}
                      >
                        Remove from watchlist
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddWatchlist(movies?.id)}
                        className={"btn"}
                      >
                        Add to watchlist
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default MovieList;
