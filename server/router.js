const express = require('express');
const router = express.Router();
const HotelController = require('./controllers');

const controller = new HotelController();

// User simple login
router.post('/login', controller.login);

// Get all hotel rooms
router.get('/rooms', controller.getRooms);

// Get available rooms for a certain date range
router.get('/rooms/available', controller.getAvailableRooms);

// Reserve a hotel room
router.post('/rooms/reserve', controller.reserveRoom);

// Delete deservation in the hotel room
router.delete('/rooms/cancel', controller.cancelReservation);

module.exports = router;
