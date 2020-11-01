import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Components/Home/Home";
import MoviesList from "./Components/MoviesLists/MoviesLists";
import Movie from "./Components/Movie/Movie";

function App() {
  console.log(process.env.PUBLIC_URL);
  return (
    <Router basename={process.env.PUBLIC_URL || ""}>
      <Switch>
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <Route path="/lists/:listName">
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
