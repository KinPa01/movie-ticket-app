import React from 'react';
import SeatSelection from './SeatSelection';

const MovieDetails = ({ movies }) => {
  // ดึง id จาก URL และหาภาพยนตร์ที่ตรงกัน
  const movieId = parseInt(window.location.pathname.split('/')[2]);
  const movie = movies.find((m) => m.id === movieId);

  return (
    <div className="movie-details">
      {movie ? (
        <>
          <h2>{movie.title}</h2>
          <p>Time: {movie.time}</p>
          <p>Theater: {movie.theater}</p>
          <p>Price: {movie.price} THB</p>
          {/* แสดง component สำหรับเลือกที่นั่ง */}
          <SeatSelection movie={movie} onPayment={() => alert(`Ticket purchased for ${movie.title}`)} />
        </>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
};

export default MovieDetails;
