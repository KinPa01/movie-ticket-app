import React from 'react';
import './Ticket.css';

const Ticket = ({ movie, selectedSeats, showtime }) => {
  return (
    <div className="ticket">
      <h2>Movie Ticket</h2>
      <p><strong>Movie:</strong> {movie.title}</p>
      <p><strong>Showtime:</strong> {showtime}</p>
      <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
      <p><strong>Theater:</strong> {movie.theater || 'Main Theater'}</p>
      <button onClick={() => window.print()} className="print-button">Print Ticket</button>
    </div>
  );
};

export default Ticket;
