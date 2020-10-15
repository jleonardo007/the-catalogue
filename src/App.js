import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Components/Home/Home";
import MovieList from "./Components/Lists/MovieList";
import Movie from "./Components/Movie/Movie";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <Route path="/lists/">
          <MovieList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
