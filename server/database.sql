CREATE DATABASE hotel_system;

CREATE TABLE hotel_rooms (
    room_id SERIAL PRIMARY KEY,
    room_type VARCHAR(50) NOT NULL,
    capacity INTEGER NOT NULL,
    price_per_night INTEGER NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_vip BOOLEAN DEFAULT FALSE
);

CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES hotel_rooms(room_id),
    user_id INTEGER REFERENCES users(user_id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_vip BOOLEAN NOT NULL DEFAULT false
);