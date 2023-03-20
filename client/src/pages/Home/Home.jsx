import { useEffect, useState } from 'react'
import RoomCard from '../../components/RoomCard/RoomCard'
import hotelService from '../../services/hotelService'
import styles from './home.module.scss'

function Home() {
	const fetchRooms = async () => {
		const rooms = await hotelService.fetchAllRooms()
		setRooms(rooms)
	}

	const [rooms, setRooms] = useState([])
	const [dates, setDates] = useState({
		startDate: null,
		endDate: null,
	})
	useEffect(() => {
		fetchRooms()
	}, [])

	const checkAvailable = async () => {
		const rooms = await hotelService.getAvailableRooms(
			dates.startDate,
			dates.endDate,
		)
		setRooms(rooms)
	}

	return (
		<main>
			<fieldset className={styles.search}>
				<input
					type='date'
					onChange={e => setDates({ ...dates, startDate: e.target.value })}
				/>
				<input
					type='date'
					onChange={e => setDates({ ...dates, endDate: e.target.value })}
				/>
				<button onClick={checkAvailable}>Проверить свободные комнаты</button>
			</fieldset>
			<section>
				<div className={styles.container}>
					{rooms.map(room => (
						<RoomCard
							key={room.room_id}
							dates={dates}
							data={room}
							onReservation={fetchRooms}
						/>
					))}
				</div>
			</section>
		</main>
	)
}

export default Home
