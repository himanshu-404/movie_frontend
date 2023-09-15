import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WatchList from "./Pages/WatchList";
import MovieDetails from "./Pages/MovieDetails";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
