import FeaturesBar from "../FeaturesBar";
import MovieCard from "../MovieCard";
import useMoviesApp from "./hooks";
import "./styles.css";

function Home() {
  const { appState, observerTarget, ...actions } = useMoviesApp();

  return (
    <div className="home">
      <FeaturesBar
        fetchByCategory={actions.fetchMoviesByCategory}
        searchMovies={actions.searchMovies}
        filterMovies={actions.filterMovies}
        sortMovies={actions.sortMovies}
      />
      <h1 className="home__title">{appState.title}</h1>
      {appState.movies ? (
        <div className="home__movies">
          {appState.movies.map((movie, index) => {
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
