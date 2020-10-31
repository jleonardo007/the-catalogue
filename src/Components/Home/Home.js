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
  const [genreID, setID] = useState(0);
  const [sortBy, setSort] = useState("");

  useEffect(() => {
    (async () => {
      setMovies(await API.fetchNowPlayingMovies());
    })();
  }, []);

  //Creating list storage
  useEffect(() => {
    if (!localStorage.lists) {
      localStorage.setItem(
        "lists",
        JSON.stringify([
          {
            id: "favorites",
            name: "Favorites",
            listType: "default",
            movies: [],
          },
          {
            id: "view-later",
            name: "View later",
            listType: "default",
            movies: [],
          },
          { id: "viewed", name: "Viewed", listType: "default", movies: [] },
        ])
      );
    }
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

    return () => {
      //Observer cleanup
      observer.disconnect();
    };
  }, []);

  //"Infinite scroll" effect
  useEffect(() => {
    const loadSortedMovies = (movies, sortBy) => {
      switch (sortBy) {
        case "year":
          movies.sort(
            (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
          );
          break;

        case "popularity":
          setMovies((prevMovies) => [
            ...prevMovies.sort((a, b) => b.popularity - a.popularity),
          ]);

          break;

        case "voted":
          setMovies((prevMovies) => [
            ...prevMovies.sort((a, b) => b.vote_average - a.vote_average),
          ]);
          break;

        default:
          break;
      }

      return movies;
    };

    const loadFilteredMovies = (movies, genreID) => {
      const results = movies.filter((movie) => {
        return movie.genre_ids.includes(genreID);
      });

      return results;
    };

    const loadMoreMovies = async () => {
      let results = [];
      let filteredResults = [];
      let sortedResults = [];

      switch (title) {
        case "Popular Movies":
          results = await API.fetchPopularMovies(pageNumber);

          if (genreID !== 0)
            filteredResults = loadFilteredMovies(results, genreID);

          if (sortBy !== "clear")
            sortedResults = loadSortedMovies(results, sortBy);
          break;

        case "Upcoming":
          results = await API.fetchUpcomingMovies(pageNumber);

          if (genreID !== 0)
            filteredResults = loadFilteredMovies(results, genreID);

          if (sortBy !== "clear")
            sortedResults = loadSortedMovies(results, sortBy);
          break;

        case "Now Playing":
          results = await API.fetchNowPlayingMovies(pageNumber);

          if (genreID !== 0)
            filteredResults = loadFilteredMovies(results, genreID);

          if (sortBy !== "clear")
            sortedResults = loadSortedMovies(results, sortBy);
          break;

        default:
          break;
      }

      if (genreID !== 0) {
        setMovies((prevMovies) =>
          prevMovies ? prevMovies.concat(...filteredResults) : null
        );
      } else if (sortBy) {
        setMovies((prevMovies) =>
          prevMovies ? prevMovies.concat(...sortedResults) : null
        );
      } else {
        setMovies((prevMovies) =>
          prevMovies ? prevMovies.concat(...results) : null
        );
      }
    };

    if (pageNumber > 1) loadMoreMovies();
  }, [pageNumber, title, genreID, sortBy]);

  // "Infinite scroll" effect applied on search
  useEffect(() => {
    const loadMoreMoviesOnSearch = async () => {
      const results = await API.searchMovie(query, pageNumber);
      setMovies((prevMovies) =>
        prevMovies ? prevMovies.concat(...results) : null
      );
    };

    if (pageNumber > 1 && query) loadMoreMoviesOnSearch();
  }, [pageNumber, query]);

  // Filter movies effect
  useEffect(() => {
    const filterMovies = () => {
      setMovies((prevMovies) => [
        ...prevMovies.filter((movie) => {
          return movie.genre_ids.includes(genreID);
        }),
      ]);
    };

    if (genreID !== 0) filterMovies();
  }, [genreID]);

  // Sort movies effect
  useEffect(() => {
    const sortMovies = () => {
      switch (sortBy) {
        case "clear":
          setMovies((prevMovies) => [
            ...prevMovies.sort((a, b) => b.popularity - a.popularity),
          ]);
          break;

        case "year":
          setMovies((prevMovies) => [
            ...prevMovies.sort(
              (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
            ),
          ]);
          break;

        case "popularity":
          setMovies((prevMovies) => [
            ...prevMovies.sort((a, b) => b.popularity - a.popularity),
          ]);

          break;

        case "voted":
          setMovies((prevMovies) => [
            ...prevMovies.sort((a, b) => b.vote_average - a.vote_average),
          ]);
          break;

        default:
          break;
      }
    };

    if (sortBy) sortMovies();
  }, [sortBy]);

  const handleFetchMoviesByCategory = async (category) => {
    setSort("");
    setQuery("");
    setPage(1);
    setMovies(null);
    if (genreID !== 0) setID(0);

    switch (category) {
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

  const handleSearchMovies = async (query) => {
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

  const handleFilter = async (id) => {
    if (id === 0) {
      setID(0);
      setTitle("Now Playing");
      setPage(0);
      setMovies(await API.fetchNowPlayingMovies());
    } else setID(id);
  };

  const handleSort = (sort) => {
    setSort(sort);
  };

  return (
    <div className="home">
      <FeaturesBar
        fetchByCategory={handleFetchMoviesByCategory}
        search={handleSearchMovies}
        filter={handleFilter}
        sort={handleSort}
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
