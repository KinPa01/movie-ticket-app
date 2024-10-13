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
    const { seats, showtime, theater } = req.body; // รับ theater จาก client
    const purchaseTime = new Date(); // เวลาที่กดซื้อ

    // ตรวจสอบว่าที่นั่งที่ส่งมานั้นเป็น array และไม่ว่าง
    if (!Array.isArray(seats) || seats.length === 0) {
        return res.status(400).send({ message: 'Invalid seats format. Seats should be a non-empty array.' });
    }

    // ตรวจสอบว่าที่นั่งมีอยู่แล้วในฐานข้อมูล
    const placeholders = seats.map(() => '?').join(','); // สร้าง placeholders สำหรับการ query
    const checkSeatsQuery = `SELECT seats FROM bookings WHERE showtime = ? AND theater = ? AND seats IN (${placeholders})`;
    const queryParams = [showtime, theater, ...seats]; // เพิ่ม theater เข้าไปใน query params

    db.query(checkSeatsQuery, queryParams, (err, results) => {
        if (err) {
            console.error('Error checking booked seats:', err);
            return res.status(500).send({ message: 'Error checking booked seats.' });
        }

        if (results.length > 0) {
            return res.status(400).send({ message: 'Some of the selected seats are already booked.' });
        }

        // บันทึกที่นั่งที่จองในฐานข้อมูล
        const sql = 'INSERT INTO bookings (seats, showtime, purchase_time, theater) VALUES ?';
        const values = seats.map(seat => [seat, showtime, purchaseTime, theater]); // เพิ่ม theater เข้าไปใน values

        // ใช้ query หลายแถว
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error saving booked seats:', err);
                return res.status(500).send({ message: 'Error saving booked seats.' });
            }

            // ส่งข้อมูลกลับไปยัง client
            res.status(200).send({ message: 'Seats booked successfully!', bookedSeats: seats });
        });
    });
});

// เส้นทางสำหรับดึงที่นั่งที่จองแล้ว
app.get('/api/bookedSeats', (req, res) => {
    const { showtime } = req.query; // รับ showtime จาก query params

    // ตรวจสอบว่า showtime ถูกส่งเข้ามาหรือไม่
    if (!showtime) {
        return res.status(400).send({ message: 'Showtime is required.' });
    }

    const query = 'SELECT seats FROM bookings WHERE showtime = ?';
    db.query(query, [showtime], (err, results) => {
        if (err) {
            console.error('Error fetching booked seats:', err);
            return res.status(500).send({ message: 'Error fetching booked seats.' });
        }

        // แปลงผลลัพธ์ให้เป็น Array ของที่นั่งที่จองแล้ว
        const bookedSeats = results.map(row => row.seats);
        res.status(200).send(bookedSeats);
    });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
