const pool = require('./db');
const { isRoomReserved } = require('./utils');

class HotelService {
	async login(username, password) {
		const loggedUser = await pool.query(
			`SELECT * FROM users WHERE user_name = $1 AND password = $2`,
			[username, password]
		);
		if (loggedUser.rowCount === 0) {
			throw new Error();
		}
		return loggedUser.rows[0];
	}

	async getAllRooms() {
		const allRooms = await pool.query(`
    SELECT
      hotel_rooms.*,
      reservations.start_date AS start_date,
      reservations.end_date AS end_date,
      reservations.is_vip
    FROM hotel_rooms
    LEFT JOIN reservations ON hotel_rooms.room_id = reservations.room_id
    `);
		return allRooms.rows.map((row) => ({
			...row,
			is_reserved: !!row.start_date,
		}));
	}

	async getAvailableRooms(startDate, endDate) {
		const result = await pool.query(
			`
    SELECT *
    FROM hotel_rooms r
    LEFT JOIN reservations rv
    ON r.room_id = rv.room_id
    WHERE rv.room_id IS NULL
    OR (rv.start_date > $2 OR rv.end_date < $1);
  `,
			[startDate, endDate]
		);
		return result.rows;
	}

	async reserveRoom(roomId, userId, startDate, endDate, isVip) {
		const isReserved = await isRoomReserved(roomId, startDate, endDate);

		if (isReserved) {
			throw new Error();
		}

		const reservation = await pool.query(
			`INSERT INTO reservations (room_id, user_id, start_date, end_date, is_vip) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
			[roomId, userId, startDate, endDate, isVip]
		);
		return reservation.rows[0];
	}

	async cancelReservation(roomId, userId) {
		const responce = await pool.query(
			`DELETE FROM reservations WHERE room_id = $1 AND user_id = $2 RETURNING *`,
			[roomId, userId]
		);

		if (responce.rowCount === 0) {
			throw new Error();
		}

		return { message: 'Бронирование отменено успешно' };
	}
}

module.exports = HotelService;
