import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Components/Home/Home";
import MoviesList from "./Components/MoviesLists/MoviesLists";
import Movie from "./Components/Movie/Movie";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <Route path="/lists/:list">
          <MoviesList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
