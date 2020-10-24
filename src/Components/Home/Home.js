import React from "react";
import { useState, useEffect } from "react";
import FeaturesBar from "../FeaturesBar/FeaturesBar";
import MovieCard from "../MovieCard/MovieCard";
import API from "../../Services/api";
import "./Home.css";

function Home() {
  const [currentMovies, setCurrent] = useState(null);
  const [title, setTitle] = useState("Recent Movies");

  useEffect(() => {
    (async () => {
      setCurrent(await API.fetchNowPlayingMovies());
    })();
  }, []);

  const fetchMovies = async (movies) => {
    setCurrent(null);
    switch (movies) {
      case "trending":
        setTitle("Trending Movies");
        setCurrent(await API.fetchTrendingMovies());
        break;

      case "popular":
        setTitle("Popular Movies");
        setCurrent(await API.fetchPopularMovies());
        break;

      case "upcoming":
        setTitle("Upcoming");
        setCurrent(await API.fetchUpcomingMovies());
        break;

      default:
        setTitle("Recent Movies");
        setCurrent(await API.fetchNowPlayingMovies());
        break;
    }
  };

  const searchMovies = async (query) => {
    const result = await API.searchMovie(query);

    if (result.length === 0) setTitle("No results");
    else {
      setCurrent(null);
      setTitle(`Results for "${query}"`);
      setCurrent(await API.searchMovie(query));
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

      {currentMovies ? (
        <div className="home__movies">
          {currentMovies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
        </div>
      ) : (
        <div className="fetching-movie">Fetching movies</div>
      )}
    </div>
  );
}

export default Home;
