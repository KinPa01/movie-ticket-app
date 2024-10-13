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

  // สร้างที่นั่ง A1, A2,...,L10
  const seats = Array.from({ length: 120 }, (_, index) => ({
    id: index + 1,
    name: String.fromCharCode(65 + Math.floor(index / 12)) + (index % 12 + 1), // A1, A2, ..., L10
  }));

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookedSeats');
        setBookedSeats(response.data); // สมมติว่า response.data เป็น Array ของที่นั่งที่จองแล้ว
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };

    fetchBookedSeats();

    // โหลดที่นั่งที่เลือกไว้จาก localStorage
    const savedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    setSelectedSeats(savedSelectedSeats);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats)); // บันทึกที่นั่งที่เลือกใน localStorage
  }, [selectedSeats]);

  const toggleSeatSelection = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      alert('This seat is already booked.');
      return;
    }

    // สลับการเลือกที่นั่ง
    setSelectedSeats((prevSelected) => 
      prevSelected.includes(seatId) 
        ? prevSelected.filter(seat => seat !== seatId) 
        : [...prevSelected, seatId]
    );
  };

  const handlePayment = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to proceed.');
      return;
    }

    const currentDate = new Date();
    const showtimeDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${time}:00`;

    const confirmPayment = window.confirm(`Confirm payment for ${selectedSeats.length} seat(s) at ${showtimeDate}? Total: ฿${selectedSeats.length * price}`);
    if (confirmPayment) {
      try {
        console.log('Sending data to server:', {
          seats: selectedSeats,
          showtime: showtimeDate,
        }); // เพิ่ม log สำหรับข้อมูลที่ส่งไปยังเซิร์ฟเวอร์
        
        const response = await axios.post('http://localhost:5000/api/bookSeat', {
          seats: selectedSeats,
          showtime: showtimeDate,
        });

        console.log('Response from server:', response.data); // พิมพ์ข้อมูลที่ได้รับจากเซิร์ฟเวอร์

        if (response.data.message === 'Seats booked successfully!') {
          const newBookedSeats = response.data.bookedSeats; // ใช้ bookedSeats ที่ได้รับจากเซิร์ฟเวอร์
          setBookedSeats((prevBooked) => [...prevBooked, ...newBookedSeats]);
          setSelectedSeats([]);
          alert('Payment successful!');
          localStorage.setItem('bookedSeats', JSON.stringify([...bookedSeats, ...newBookedSeats])); // อัปเดต localStorage
        }
      } catch (error) {
        console.error("Error booking seats:", error);
        alert('There was an error while booking seats. Please try again.'); // ข้อความผิดพลาดที่เกิดขึ้น
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
        {Array.from({ length: 10 }, (_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {seats.slice(rowIndex * 12, rowIndex * 12 + 12).map(seat => {
              const seatId = seat.name;
              const isSelected = selectedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);
              const seatImage = isBooked ? seatImages.booked : isSelected ? seatImages.selected : seatImages.available;

              return (
                <div key={seatId} className="seat" style={{ margin: '5px' }}>
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
        ))}
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
