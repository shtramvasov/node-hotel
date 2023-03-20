import api from './api'

async function fetchAllRooms() {
	const response = await api.get('/rooms')
	return response.data
}

async function getAvailableRooms(startDate, endDate) {
	const response = await api.get('/rooms/available', {
		params: { startDate, endDate },
	})
	return response.data
}

async function reserveRoom(roomId, startDate, endDate) {
	const user = JSON.parse(localStorage.getItem('user'))
	const userId = user.user_id
	const isVip = user.is_vip

	const response = await api.post('/rooms/reserve', {
		roomId,
		userId,
		startDate,
		endDate,
		isVip,
	})
	return response.data
}

async function cancel(roomId) {
	const user = JSON.parse(localStorage.getItem('user'))
	const userId = user.user_id

	const response = await api.delete('/rooms/cancel', {
		data: { roomId, userId },
	})
	return response.data
}

export default { fetchAllRooms, getAvailableRooms, reserveRoom, cancel }
