import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ShowtimeSelection.css';
import movies from '../moviesData'; // Ensure the path to moviesData is correct

const ShowtimeSelection = () => {
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the selected movie ID from location state
  const movieId = location.state?.movieId; // Ensure you are passing movieId from the previous component
  const movie = movies.find((m) => m.id === movieId);

  // Handle errors if movie is not found
  if (!movie) {
    return <div>No movie found. Please go back and select a movie.</div>;
  }

  // Get unique list of theaters
  const uniqueTheaters = Array.from(new Set(movie.showtimes.map((showtime) => showtime.theater)));

  const handleTheaterSelection = (theater) => {
    setSelectedTheater(theater);
    setSelectedTime(null); // Reset selected time when theater changes
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const proceedToSeatSelection = () => {
    if (!selectedTime || !selectedTheater) {
      alert('Please select a theater and showtime to proceed.');
      return;
    }
    
    // Debugging logs to verify the selected values
    console.log(`Proceeding with: Movie: ${movie.title}, Theater: ${selectedTheater}, Time: ${selectedTime}`);
    
    navigate('/seat-selection', {
      state: { movie, theater: selectedTheater, time: selectedTime },
    });
  };
  

  return (
    <div className="showtime-selection">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <h2>Select Theater</h2>
      <div className="theater-selection">
        {uniqueTheaters.map((theater, index) => (
          <button
            key={index}
            onClick={() => handleTheaterSelection(theater)}
            className={selectedTheater === theater ? 'selected' : ''}
          >Theater 
            {theater}
          </button>
        ))}
      </div>

      {selectedTheater && (
        <>
          <h2>Select Showtime</h2>
          <div className="time-selection">
            {movie.showtimes
              .filter((showtime) => showtime.theater === selectedTheater)
              .map((showtime, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelection(showtime.time)}
                  className={selectedTime === showtime.time ? 'selected' : ''}
                >
                  {showtime.time}
                </button>
              ))}
          </div>
          <button className='button' onClick={proceedToSeatSelection}>Confirm and Proceed</button>
        </>
      )}
    </div>
  );
};

export default ShowtimeSelection;
