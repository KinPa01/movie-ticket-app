import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SeatSelection.css';

const seatImages = {
  booked: 'https://img5.pic.in.th/file/secure-sv1/462638969_3559804917608139_6853518654884749436_n-Photoroom.png',
  selected: 'https://img2.pic.in.th/pic/461828597_503816429199425_991297528866013610_n-Photoroom.png',
  available: 'https://img2.pic.in.th/pic/462449664_1632754357452077_5643220750893270301_n-Photoroom.png',
};

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, time } = location.state || {};
  const price = movie?.price || 0;

  // Get theater information from showtimes
  const theater = movie?.showtimes.find(show => show.time === time)?.theater || 'undefined';

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Change number of seats to 30 (6 rows x 5 seats)
  const seats = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: String.fromCharCode(65 + Math.floor(index / 5)) + (index % 5 + 1),
  }));

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookedSeats', {
          params: {
            showtime: time,
            theater: theater // Send theater info
          }
        });
        if (Array.isArray(response.data)) {
          setBookedSeats(response.data);
          localStorage.setItem('bookedSeats', JSON.stringify(response.data));
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching booked seats:', error);
        const savedBookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];
        setBookedSeats(savedBookedSeats);
      }
    };

    fetchBookedSeats();
    const savedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    setSelectedSeats(savedSelectedSeats);
  }, [time, theater]);

  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const toggleSeatSelection = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      alert('This seat is already booked.');
      return;
    }
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
    const showtimeDate = `${currentDate.toISOString().split('T')[0]} ${time}:00`;

    const confirmPayment = window.confirm(`Confirm payment for ${selectedSeats.length} seat(s) at ${showtimeDate}? Total: ฿${selectedSeats.length * price}`);
    if (confirmPayment) {
      try {
        const response = await axios.post('http://localhost:5000/api/bookSeat', {
          seats: selectedSeats,
          showtime: showtimeDate,
          theater: theater // Send theater info
        });

        if (response.data && response.data.message === 'Seats booked successfully!') {
          const newBookedSeats = response.data.bookedSeats;
          setBookedSeats((prevBooked) => {
            const updatedSeats = [...prevBooked, ...newBookedSeats];
            localStorage.setItem('bookedSeats', JSON.stringify(updatedSeats));
            return updatedSeats;
          });
          setSelectedSeats([]);
          alert('Payment successful!');

          const ticketContent = `
            <html>
              <head>
                <title>Booking Confirmation</title>
                <style>
                  body { font-family: Arial, sans-serif; text-align: center; }
                  .ticket {
                    border: 1px solid #333;
                    padding: 20px;
                    margin: 20px auto;
                    width: 300px;
                    text-align: center;
                    background-color: #fff;
                  }
                  .movie-title { font-size: 24px; font-weight: bold; }
                  .seat-number { font-size: 18px; font-weight: bold; }
                  .branch-name { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
                  .ticket-details { text-align: left; margin: 15px 0; }
                </style>
              </head>
              <body>
                <div class="ticket">
                  <h2 class="branch-name">Bangna</h2>
                  <p class="movie-title">${movie.title}</p>
                  <div class="ticket-details">
                    <p><strong>Theater:</strong> ${theater}</p>
                    <p><strong>Date:</strong> ${showtimeDate.split(' ')[0]}</p>
                    <p><strong>Showtime:</strong> ${showtimeDate.split(' ')[1]}</p>
                    <p class="seat-number"><strong>Seat No:</strong> ${selectedSeats.join(', ')}</p>
                    <p><strong>Total:</strong> ฿${selectedSeats.length * price}</p>
                  </div>
                  <button onclick="window.print()" style="padding: 10px 20px; margin-top: 15px; cursor: pointer; font-size: 14px;">Print Ticket</button>
                </div>
              </body>
            </html>
          `;

          const ticketWindow = window.open('', '', 'height=500,width=400');
          ticketWindow.document.write(ticketContent);
          ticketWindow.document.close();
        }
      } catch (error) {
        console.error("Error booking seats:", error);
        alert('There was an error while booking seats. Please try again.');
      }
    }
  };

  return (
    <div className="seat-selection">
      <h1 className="movie-title">{movie?.title}</h1>
      <p className="movie-genre">{movie?.genre}</p>
      <p className="showtime">Showtime: {time}</p>
      <div className="screen-label">-- Screen --</div>
      <div className="seats-container">
        {Array.from({ length: 6 }, (_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {seats.slice(rowIndex * 5, rowIndex * 5 + 5).map(seat => {
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
      <div className="total-price">Total Price: ฿{selectedSeats.length * price}</div>
      <div className="button-container">
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
        <button className="payment-button" onClick={handlePayment}>Confirm Payment</button>
      </div>
    </div>
  );
};

export default SeatSelection;
