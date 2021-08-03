import { useState, useEffect, useRef } from "react";
import FeaturesBar from "../FeaturesBar";
import MovieCard from "../MovieCard";
import API from "../../Services/api";
import "./styles.css";

function Home() {
  const observerTarget = useRef(null);
  const initialState = {
    title: "Now Playing",
    movies: null,
    pageNumber: 1,
    query: "",
    genreID: 0,
    sortBy: "",
  };
  const [homeState, setHomeState] = useState(initialState);

  useEffect(() => {
    if (homeState.title === "Now Playing" && !homeState.movies)
      (async () => {
        const results = await API.fetchNowPlayingMovies();
        setHomeState((prevState) => {
          return {
            ...prevState,
            movies: results,
          };
        });
      })();
  }, [homeState.title, homeState.movies]);

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
        setHomeState((prevState) => {
          return {
            ...prevState,
            pageNumber: prevState.pageNumber + 1,
          };
        });
      }
    };

    const observer = new IntersectionObserver(handleInfiniteScroll, {
      root: null,
      rootMargin: "20px",
      thresold: 1.0,
    });

    observer.observe(observerTarget.current);
    if (homeState.genreID !== 0) observer.disconnect();

    return () => {
      observer.disconnect();
    };
  }, [homeState.genreID]);

  //"Infinite scroll" effect
  useEffect(() => {
    const loadMoreMovies = async () => {
      let results = [];

      switch (homeState.title) {
        case "Popular Movies":
          results = await API.fetchPopularMovies(homeState.pageNumber);
          break;

        case "Upcoming":
          results = await API.fetchUpcomingMovies(homeState.pageNumber);
          break;

        case "Now Playing":
        default:
          results = await API.fetchNowPlayingMovies(homeState.pageNumber);
          break;
      }

      setHomeState((prevState) => {
        return {
          ...prevState,
          movies: prevState.movies ? prevState.movies.concat(...results) : null,
        };
      });
    };

    if (homeState.pageNumber > 1) loadMoreMovies();
  }, [homeState.title, homeState.sortBy, homeState.pageNumber]);

  // "Infinite scroll" effect applied on search
  useEffect(() => {
    const loadMoreMoviesOnSearch = async () => {
      const results = await API.searchMovie(homeState.query, homeState.pageNumber);

      setHomeState((prevState) => {
        return {
          ...prevState,
          movies: prevState.movies ? prevState.movies.concat(...results) : null,
        };
      });
    };

    if (homeState.pageNumber > 1 && homeState.query) loadMoreMoviesOnSearch();
  }, [homeState.pageNumber, homeState.query]);

  //Search movies effect
  useEffect(() => {
    if (homeState.query)
      (async () => {
        const results = await API.searchMovie(homeState.query);

        if (results.length === 0)
          setHomeState((prevState) => {
            return {
              ...prevState,
              title: "No results",
              query: "",
            };
          });
        else
          setHomeState((prevState) => {
            return {
              ...prevState,
              pageNumber: 1,
              title: `Results for "${homeState.query}"`,
              movies: results,
              query: "",
            };
          });
      })();
  }, [homeState.query]);

  // Filter movies effect
  useEffect(() => {
    const filterMovies = () => {
      setHomeState((prevState) => {
        return {
          ...prevState,
          movies: [
            ...prevState.movies.filter((movie) => movie.genre_ids.includes(homeState.genreID)),
          ],
        };
      });
    };

    if (homeState.genreID !== 0) filterMovies();
  }, [homeState.genreID]);

  // Sort movies effect
  useEffect(() => {
    const sortMovies = () => {
      switch (homeState.sortBy) {
        case "year":
          setHomeState((prevState) => {
            return {
              ...prevState,
              movies: [
                ...prevState.movies.sort(
                  (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
                ),
              ],
            };
          });
          break;

        case "popularity":
          setHomeState((prevState) => {
            return {
              ...prevState,
              movies: [...prevState.movies.sort((a, b) => b.popularity - a.popularity)],
            };
          });
          break;

        case "voted":
          setHomeState((prevState) => {
            return {
              ...prevState,
              movies: [...prevState.movies.sort((a, b) => b.vote_average - a.vote_average)],
            };
          });
          break;

        case "clear":
        default:
          setHomeState((prevState) => {
            return {
              ...prevState,
              sortBy: "",
              movies: [...prevState.movies.sort((a, b) => b.popularity - a.popularity)],
            };
          });
          break;
      }
    };

    if (homeState.sortBy) sortMovies();
  }, [homeState.sortBy]);

  const handleFetchMoviesByCategory = async (category) => {
    const { genreID } = homeState;
    let results = null;

    if (genreID !== 0)
      setHomeState((prevState) => {
        return {
          ...prevState,
          genreID: 0,
        };
      });

    switch (category) {
      case "trending":
        results = await API.fetchTrendingMovies();
        setHomeState((prevState) => {
          return {
            ...prevState,
            title: "Trending Movies",
            movies: results,
          };
        });
        break;

      case "popular":
        results = await API.fetchPopularMovies();
        setHomeState((prevState) => {
          return {
            ...prevState,
            title: "Popular Movies",
            movies: results,
          };
        });
        break;

      case "upcoming":
        results = await API.fetchUpcomingMovies();
        setHomeState((prevState) => {
          return {
            ...prevState,
            title: "Upcoming",
            movies: results,
          };
        });
        break;

      default:
        results = await API.fetchNowPlayingMovies();
        setHomeState((prevState) => {
          return {
            ...prevState,
            title: "Now Playing",
            movies: results,
          };
        });
        break;
    }
  };

  const handleSearchMovies = (query) => {
    setHomeState((prevState) => {
      return {
        ...prevState,
        query,
      };
    });
  };

  const handleFilter = async (id) => {
    if (id === 0) {
      setHomeState((prevState) => {
        return {
          ...prevState,
          genreID: 0,
          title: "Now Playing",
          movies: null,
        };
      });
    } else
      setHomeState((prevState) => {
        return {
          ...prevState,
          genreID: id,
        };
      });
  };

  const handleSort = (sort) => {
    setHomeState((prevState) => {
      return {
        ...prevState,
        sortBy: sort,
      };
    });
  };

  return (
    <div className="home">
      <FeaturesBar
        fetchByCategory={handleFetchMoviesByCategory}
        search={handleSearchMovies}
        filter={handleFilter}
        sort={handleSort}
      />
      <h1 className="home__title">{homeState.title}</h1>
      {homeState.movies ? (
        <div className="home__movies">
          {homeState.movies.map((movie, index) => {
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
