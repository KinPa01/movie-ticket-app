import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handlePosterClick = () => {
    navigate(`/movie-details/${movie.id}`); // Navigate to movie details when clicking the poster
  };

  const handleShowtimeClick = () => {
    navigate('/showtime-selection', { state: { movieId: movie.id } });
  };

  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
      </div>
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-genre">{movie.genre}</p>

      {/* Button for showtimes */}
      <button className="showtimes-button" onClick={handleShowtimeClick}>
        ดูรอบฉาย
      </button>
    </div>
  );
};

export default MovieCard;
