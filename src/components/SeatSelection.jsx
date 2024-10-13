import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SeatSelection.css';

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, time } = location.state || {};
  const price = movie?.price || 0;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const seats = [
    { id: 1, name: 'A1' },
    { id: 2, name: 'A2' },
    { id: 3, name: 'A3' },
    { id: 4, name: 'A4' },
    { id: 5, name: 'A5' },
    { id: 6, name: 'A6' },
    { id: 7, name: 'A7' },
    { id: 8, name: 'A8' },
    { id: 9, name: 'A9' },
    { id: 10, name: 'A10' },
    { id: 11, name: 'B1' },
    { id: 12, name: 'B2' },
    { id: 13, name: 'B3' },
    { id: 14, name: 'B4' },
    { id: 15, name: 'B5' },
    { id: 16, name: 'B6' },
    { id: 17, name: 'B7' },
    { id: 18, name: 'B8' },
    { id: 19, name: 'B9' },
    { id: 20, name: 'B10' },
    { id: 21, name: 'C1' },
    { id: 22, name: 'C2' },
    { id: 23, name: 'C3' },
    { id: 24, name: 'C4' },
    { id: 25, name: 'C5' },
    { id: 26, name: 'C6' },
    { id: 27, name: 'C7' },
    { id: 28, name: 'C8' },
    { id: 29, name: 'C9' },
    { id: 30, name: 'C10' },
  ];

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookedSeats');
        // response.data เป็น array ของชื่อที่นั่งที่จองอยู่
        console.log('Booked seats:', response.data); // ตรวจสอบที่นั่งที่จอง
        setBookedSeats(response.data);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };

    fetchBookedSeats();

    const savedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    console.log('Saved selected seats:', savedSelectedSeats); // ตรวจสอบที่นั่งที่ถูกบันทึก
    setSelectedSeats(savedSelectedSeats);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const toggleSeatSelection = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      alert('This seat is already booked.');
      return;
    }

    console.log('Current selected seats:', selectedSeats); // ตรวจสอบที่นั่งที่เลือก
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handlePayment = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to proceed.');
      return;
    }

    const confirmPayment = window.confirm(`Confirm payment for ${selectedSeats.length} seat(s) at ${time}? Total: ฿${selectedSeats.length * price}`);
    if (confirmPayment) {
      try {
        await axios.post('http://localhost:5000/api/bookSeat', { seats: selectedSeats });
        // อัปเดต bookedSeats หลังจากทำการจองสำเร็จ
        setBookedSeats([...bookedSeats, ...selectedSeats]);
        setSelectedSeats([]);
        alert('Payment successful!');
        localStorage.setItem('bookedSeats', JSON.stringify([...bookedSeats, ...selectedSeats]));
      } catch (error) {
        console.error("Error booking seats:", error);
        alert('There was an error while booking seats. Please try again.');
      }
    }
  };

  const seatImages = {
    available: 'https://img2.pic.in.th/pic/462449664_1632754357452077_5643220750893270301_n-Photoroom.png',
    selected: 'https://img2.pic.in.th/pic/461828597_503816429199425_991297528866013610_n-Photoroom.png',
    booked: 'https://img5.pic.in.th/file/secure-sv1/462638969_3559804917608139_6853518654884749436_n-Photoroom.png',
  };

  return (
    <div className="seat-selection">
      <h1 className="movie-title">{movie?.title}</h1>
      <p className="movie-genre">{movie?.genre}</p>
      <p className="showtime">Showtime: {time}</p>
      {movie && <img src={movie.poster} alt={movie.title} className="movie-poster" />}
      <div className="screen-label">-- Screen --</div>
      <div className="seats-container">
        {seats.map(seat => {
          const seatId = seat.name;
          const isSelected = selectedSeats.includes(seatId);
          const isBooked = bookedSeats.includes(seatId);
          const seatImage = isBooked ? seatImages.booked : isSelected ? seatImages.selected : seatImages.available;

          return (
            <div key={seatId} className="seat" style={{ display: 'inline-block', margin: '10px' }}>
              <img
                src={seatImage}
                alt={seatId}
                className="seat-image"
                onClick={() => toggleSeatSelection(seatId)}
                style={{ cursor: isBooked ? 'not-allowed' : 'pointer', width: '50px', height: '50px' }}
              />
              <div>{seatId}</div>
            </div>
          );
        })}
      </div>
      <div className='menu'>
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
        <button onClick={handlePayment} disabled={selectedSeats.length === 0} className="payment-button">
          Pay for {selectedSeats.length} Seat(s) - Total: ฿{selectedSeats.length * price}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
