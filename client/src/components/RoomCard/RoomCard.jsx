import hotelService from '../../services/hotelService'
import { dateToString } from '../../utils/convertDates'
import styles from './roomcard.module.scss'

function RoomCard({ data, onReservation, dates }) {
	const {
		room_id,
		room_type,
		capacity,
		price_per_night,
		start_date,
		end_date,
		is_reserved,
		is_vip,
	} = data

	const reserve = async (roomId, startDate, endDate) => {
		await hotelService.reserveRoom(roomId, startDate, endDate)
		onReservation()
	}

	const cancel = async roomId => {
		try {
			await hotelService.cancel(roomId)
			onReservation()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={styles.card}>
			<h2>{room_type}</h2>
			<p className={styles.description}>
				Эта комната на {capacity} человек за {price_per_night} в день.
			</p>
			{is_reserved && (
				<div className={styles.reservation}>
					<p>
						Зарезервирована {is_vip && <b>VIP</b>} с {dateToString(start_date)}{' '}
						по {dateToString(end_date)}
					</p>
				</div>
			)}
			<fieldset>
				<button
					onClick={() => reserve(room_id, dates.startDate, dates.endDate)}
				>
					Разерезвировать
				</button>
				{is_reserved && (
					<button
						onClick={() => cancel(room_id, dates.startDate, dates.endDate)}
					>
						Отменить бронь
					</button>
				)}
			</fieldset>
		</div>
	)
}
export default RoomCard
