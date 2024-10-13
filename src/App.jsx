import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import SeatSelection from './components/SeatSelection';
import ShowtimeSelection from './components/ShowtimeSelection';
import movies from './moviesData';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (email, password) => {
    setUser({ email });
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />
          <Route path="/showtime-selection" element={<ShowtimeSelection />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
