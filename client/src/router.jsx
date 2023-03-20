import { createBrowserRouter, redirect } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: '/hotel',
		element: <Home />,
	},
	{
		path: '/*',
		element: <Login />,
		loader: () => redirect('/'),
	},
])