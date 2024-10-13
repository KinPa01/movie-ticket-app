import React from 'react';
import './Ticket.css';

const Ticket = ({ movie, selectedSeats, showtime, theater }) => {
  return (
    <div className="ticket">
      <h2 className="branch-name">Bangna</h2>
      <p className="movie-title">{movie.title}</p>
      <div className="ticket-details">
        <p><strong>Theater:</strong> {theater}</p> {/* หมายเลขโรงภาพยนตร์ */}
        <p><strong>Date:</strong> {showtime.split(' ')[0]}</p>
        <p><strong>Showtime:</strong> {showtime.split(' ')[1]}</p>
        <p className="seat-number"><strong>Seat No:</strong> {selectedSeats.join(', ')}</p>
        <p><strong>Total:</strong> ฿{selectedSeats.length * movie.price}</p> {/* ราคารวม */}
      </div>
      <button onClick={() => window.print()} className="print-button">Print Ticket</button>
    </div>
  );
};

export default Ticket;
