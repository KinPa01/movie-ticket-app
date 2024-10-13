const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // เพื่อให้ Express อ่าน JSON ได้

// เชื่อมต่อกับฐานข้อมูล
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Poomlu-89', // เปลี่ยนเป็นรหัสผ่านที่ถูกต้อง
    database: 'movie_booking'
});

// ตรวจสอบการเชื่อมต่อ
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database successfully!');
});

// เส้นทางสำหรับจองที่นั่ง
app.post('/api/bookSeat', (req, res) => {
    const { seats, showtime } = req.body; // รับที่นั่งและเวลาจาก client
    const purchaseTime = new Date(); // เวลาที่กดซื้อ

    // บันทึกที่นั่งที่จองในฐานข้อมูล
    const sql = 'INSERT INTO bookings (seats, showtime, purchase_time) VALUES ?';
    const values = seats.map(seat => [seat, showtime, purchaseTime]); // แปลงที่นั่ง เวลา และเวลาที่กดซื้อเป็นรูปแบบที่เหมาะสมสำหรับ SQL

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error saving booked seats:', err);
            return res.status(500).send({ message: 'Error saving booked seats.' });
        }

        // ส่งข้อมูลกลับไปยัง client
        res.status(200).send({ message: 'Seats booked successfully!', bookedSeats: seats });
    });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
