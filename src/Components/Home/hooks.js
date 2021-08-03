import { useState, useEffect, useRef } from "react";
import { fetchMoviesByCategory, searchMovies, filterMovies, sortMovies } from "./handlers";
import API from "../../Services/api";

const initialState = {
  title: "Now Playing",
  movies: null,
  pageNumber: 1,
  query: "",
  genreID: 0,
  sortBy: "",
};

export default function useMoviesApp() {
  const [appState, setAppState] = useState(initialState);
  const observerTarget = useRef(null);

  useEffect(() => {
    if (appState.title === "Now Playing" && !appState.movies)
      (async () => {
        const results = await API.fetchNowPlayingMovies();
        setAppState((prevState) => {
          return {
            ...prevState,
            movies: results,
          };
        });
      })();
  }, [appState.title, appState.movies]);

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
        setAppState((prevState) => {
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
    if (appState.genreID !== 0) observer.disconnect();

    return () => {
      observer.disconnect();
    };
  }, [appState.genreID]);

  //"Infinite scroll" effect
  useEffect(() => {
    const loadMoreMovies = async () => {
      let results = [];

      switch (appState.title) {
        case "Popular Movies":
          results = await API.fetchPopularMovies(appState.pageNumber);
          break;

        case "Upcoming":
          results = await API.fetchUpcomingMovies(appState.pageNumber);
          break;

        case "Now Playing":
        default:
          results = await API.fetchNowPlayingMovies(appState.pageNumber);
          break;
      }

      setAppState((prevState) => {
        return {
          ...prevState,
          movies: prevState.movies ? prevState.movies.concat(...results) : null,
        };
      });
    };

    if (appState.pageNumber > 1) loadMoreMovies();
  }, [appState.title, appState.sortBy, appState.pageNumber]);

  // "Infinite scroll" effect applied on search
  useEffect(() => {
    const loadMoreMoviesOnSearch = async () => {
      const results = await API.searchMovie(appState.query, appState.pageNumber);

      setAppState((prevState) => {
        return {
          ...prevState,
          movies: prevState.movies ? prevState.movies.concat(...results) : null,
        };
      });
    };

    if (appState.pageNumber > 1 && appState.query) loadMoreMoviesOnSearch();
  }, [appState.pageNumber, appState.query]);

  //Search movies effect
  useEffect(() => {
    if (appState.query)
      (async () => {
        const results = await API.searchMovie(appState.query);

        if (results.length === 0)
          setAppState((prevState) => {
            return {
              ...prevState,
              title: "No results",
              query: "",
            };
          });
        else
          setAppState((prevState) => {
            return {
              ...prevState,
              pageNumber: 1,
              title: `Results for "${appState.query}"`,
              movies: results,
              query: "",
            };
          });
      })();
  }, [appState.query]);

  // Filter movies effect
  useEffect(() => {
    const filterMovies = () => {
      setAppState((prevState) => {
        return {
          ...prevState,
          movies: [
            ...prevState.movies.filter((movie) => movie.genre_ids.includes(appState.genreID)),
          ],
        };
      });
    };

    if (appState.genreID !== 0) filterMovies();
  }, [appState.genreID]);

  // Sort movies effect
  useEffect(() => {
    const sortMovies = () => {
      switch (appState.sortBy) {
        case "year":
          setAppState((prevState) => {
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
          setAppState((prevState) => {
            return {
              ...prevState,
              movies: [...prevState.movies.sort((a, b) => b.popularity - a.popularity)],
            };
          });
          break;

        case "voted":
          setAppState((prevState) => {
            return {
              ...prevState,
              movies: [...prevState.movies.sort((a, b) => b.vote_average - a.vote_average)],
            };
          });
          break;

        case "clear":
        default:
          setAppState((prevState) => {
            return {
              ...prevState,
              sortBy: "",
              movies: [...prevState.movies.sort((a, b) => b.popularity - a.popularity)],
            };
          });
          break;
      }
    };

    if (appState.sortBy) sortMovies();
  }, [appState.sortBy]);

  return {
    appState,
    observerTarget,
    fetchMoviesByCategory: (category) => fetchMoviesByCategory(category, appState, setAppState),
    searchMovies: (query) => searchMovies(query, setAppState),
    filterMovies: (movieId) => filterMovies(movieId, setAppState),
    sortMovies: (sortBy) => sortMovies(sortBy, setAppState),
  };
}
