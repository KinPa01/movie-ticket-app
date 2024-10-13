import React from 'react';
import { useLocation } from 'react-router-dom';
import SeatSelection from './SeatSelection';

const MovieDetails = ({ movies }) => {
  const location = useLocation();
  const { movie, theater: selectedTheater, time: selectedTime } = location.state || {}; // ดึงข้อมูลจาก state

  // ถ้า movie ไม่ถูกส่งมาให้หาจาก movies
  const movieId = movie?.id || parseInt(window.location.pathname.split('/')[2]);
  const movieData = movie || movies.find((m) => m.id === movieId);

  return (
    <div className="movie-details">
      {movieData ? (
        <>
          <h2>{movieData.title}</h2>
          <p>Time: {selectedTime}</p> {/* แสดงเวลาฉายที่เลือก */}
          <p>Theater: {selectedTheater}</p> {/* แสดงหมายเลขโรงภาพยนตร์ที่เลือก */}
          <p>Price: {movieData.price} THB</p>
          {/* แสดง component สำหรับเลือกที่นั่ง */}
          <SeatSelection 
            movie={movieData} 
            onPayment={() => alert(`Ticket purchased for ${movieData.title}`)} 
          />
        </>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
};

export default MovieDetails;
