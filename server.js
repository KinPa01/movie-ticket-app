const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // เพื่อให้ Express อ่าน JSON ได้

// ตัวแปรเพื่อเก็บที่นั่งที่จอง
let bookedSeats = [];

// เส้นทางสำหรับจองที่นั่ง
app.post('/api/bookSeat', (req, res) => {
  const seats = req.body.seats; // รับที่นั่งที่จองจาก client

  // ตรวจสอบว่าที่นั่งถูกจองไปแล้วหรือไม่
  const alreadyBooked = seats.filter(seat => bookedSeats.includes(seat));
  if (alreadyBooked.length > 0) {
    return res.status(400).send({ message: 'Some seats are already booked.', booked: alreadyBooked });
  }

  // เพิ่มที่นั่งที่จองใน bookedSeats
  bookedSeats.push(...seats);

  // ส่งข้อมูลกลับไปยัง client
  res.status(200).send({ message: 'Seats booked successfully!', bookedSeats });
});

// เส้นทางสำหรับตรวจสอบที่นั่งที่จอง
app.get('/api/bookedSeats', (req, res) => {
  res.status(200).send(bookedSeats);
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
