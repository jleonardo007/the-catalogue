import React from "react";
import { useState, useEffect, useRef } from "react";
import FeaturesBar from "../FeaturesBar/FeaturesBar";
import MovieCard from "../MovieCard/MovieCard";
import API from "../../Services/api";
import "./Home.css";

function Home() {
  const observerTarget = useRef(null);
  const [title, setTitle] = useState("Now Playing");
  const [movies, setMovies] = useState(null);
  const [pageNumber, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      setMovies(await API.fetchNowPlayingMovies());
    })();
  }, []);

  useEffect(() => {
    const handleInfiniteScroll = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleInfiniteScroll, {
      root: null,
      rootMargin: "20px",
      thresold: 1.0,
    });

    if (observerTarget.current) observer.observe(observerTarget.current);
  }, []);

  useEffect(() => {
    const loadMoreMovies = async () => {
      let results = [];
      switch (title) {
        case "Popular Movies":
          results = await API.fetchPopularMovies(pageNumber);
          break;

        case "Upcoming":
          results = await API.fetchUpcomingMovies(pageNumber);
          break;

        case "Now Playing":
          results = await API.fetchNowPlayingMovies(pageNumber);
          break;

        default:
          break;
      }
      setMovies((prevMovies) =>
        prevMovies ? prevMovies.concat(...results) : null
      );
    };

    if (pageNumber > 1) loadMoreMovies();
  }, [pageNumber, title]);

  useEffect(() => {
    const loadMoreMoviesOnSearch = async () => {
      const results = await API.searchMovie(query, pageNumber);
      setMovies((prevMovies) =>
        prevMovies ? prevMovies.concat(...results) : null
      );
    };
    if (pageNumber > 1 && query) loadMoreMoviesOnSearch();
  }, [pageNumber, query]);

  const fetchMovies = async (movies) => {
    setQuery("");
    setPage(1);
    setMovies(null);

    switch (movies) {
      case "trending":
        setTitle("Trending Movies");
        setMovies(await API.fetchTrendingMovies());
        break;

      case "popular":
        setTitle("Popular Movies");
        setMovies(await API.fetchPopularMovies());
        break;

      case "upcoming":
        setTitle("Upcoming");
        setMovies(await API.fetchUpcomingMovies());
        break;

      default:
        setTitle("Now Playing");
        setMovies(await API.fetchNowPlayingMovies());
        break;
    }
  };

  const searchMovies = async (query) => {
    setQuery(query);
    const result = await API.searchMovie(query);
    setMovies(null);

    if (result.length === 0) setTitle("No results");
    else {
      setPage(1);
      setTitle(`Results for "${query}"`);
      setMovies(await API.searchMovie(query));
    }
  };

  /*const filterMoviesByGenre = (id) => {
    let results = [];

    //Id === 0 represents the clear filter option, check FeaturesBar component
    if (id === 0) console.log("filter cleaned");
    else {
      results = currentMovies.filter((movie) => {
        return movie.genre_ids.includes(id);
      });
      setCurrent(results);
    }
  };*/

  return (
    <div className="home">
      <FeaturesBar
        fetchMovies={fetchMovies}
        search={searchMovies}
        /*filter={filterMoviesByGenre}*/
      />
      <h1 className="home__title">{title}</h1>

      {movies ? (
        <div className="home__movies">
          {movies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
        </div>
      ) : (
        <div className="fetching-movie">Fetching movies</div>
      )}
      <div className="home__loader" ref={observerTarget} />
    </div>
  );
}

export default Home;
