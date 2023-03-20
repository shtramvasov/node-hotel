import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../../services/loginService'
import styles from './login.module.scss'

function Login() {
	const navigate = useNavigate()
	const [data, setData] = useState({
		username: '',
		password: '',
	})
	const [errors, setErrors] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await loginService.login(data.username, data.password)
			localStorage.setItem('user', JSON.stringify(response))
			navigate('/hotel')
		} catch (error) {
			setErrors(error.response.data)
		}
	}

	return (
		<div className={styles.container}>
			<h1>Войдите в систему</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Имя'
					onChange={e => setData({ ...data, username: e.target.value })}
				/>
				<input
					type='text'
					placeholder='Пароль'
					onChange={e => setData({ ...data, password: e.target.value })}
				/>
				{errors && <p className='error'>{errors}</p>}
				<button>Войти</button>
			</form>
			<div className={styles.reminder}>
				<p>
					Имя: <code>Обычный пользователь</code> или{' '}
					<code>Вип пользователь</code>
				</p>
				<p>
					Пароль: <code>1234</code>
				</p>
			</div>
		</div>
	)
}

export default Login
