const pool = require('./db');

async function isRoomReserved(roomId, startDate, endDate) {
	const result = await pool.query(
		`SELECT COUNT(*) FROM reservations WHERE room_id = $1 AND start_date <= $3 AND end_date >= $2`,
		[roomId, startDate, endDate]
	);

	return result.rows[0].count > 0;
}

module.exports = {
	isRoomReserved,
};
