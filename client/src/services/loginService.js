import api from './api'

async function login(username, password) {
	const response = await api.post('/login', { username, password })
	return response.data
}

export default { login }
