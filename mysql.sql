CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seats JSON NOT NULL,
    showtime DATETIME NOT NULL,
    purchase_time DATETIME NOT NULL,
    theater_id INT,  
    FOREIGN KEY (theater_id) REFERENCES theaters(id)  
);
USE movie_booking;
SELECT * FROM bookings;
ALTER TABLE bookings ADD COLUMN theater VARCHAR(255);
ADD FOREIGN KEY (theater_id) REFERENCES theaters(id);
TRUNCATE TABLE bookings;