import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WatchList from "./Pages/WatchList";
import MovieDetails from "./Pages/MovieDetails";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
          <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
