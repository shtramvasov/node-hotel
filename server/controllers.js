const HotelService = require('./services');
const service = new HotelService();

class HotelController {
	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await service.login(username, password);

			req.session.user = {
				id: user.user_id,
				username: user.user_name,
				vip: user.is_vip,
			};
			res.json(user);
		} catch (error) {
			res.status(404).json('Пользователя не существует');
		}
	}

	async getRooms(req, res) {
		try {
			const allRooms = await service.getAllRooms();
			res.json(allRooms);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getAvailableRooms(req, res) {
		try {
      const { startDate, endDate } = req.query;
      const rooms = await service.getAvailableRooms(startDate, endDate);
      res.json(rooms)
    } catch (error) {
      res.status(500).json(error)
    }
	}

	async reserveRoom(req, res) {
		try {
			const { roomId, userId, startDate, endDate, isVip } = req.body;
			const reservation = await service.reserveRoom(
				roomId,
				userId,
				startDate,
				endDate,
				isVip
			);
			res.json(reservation);
		} catch (error) {
			res.status(409).json('В это время комната занята');
		}
	}

	async cancelReservation(req, res) {
		try {
			const { roomId, userId } = req.body;

			const responce = await service.cancelReservation(roomId, userId);
			res.json(responce);
		} catch (error) {
			res.status(403).json(error);
		}
	}
}

module.exports = HotelController;
