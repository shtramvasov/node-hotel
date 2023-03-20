const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const router = require('./router');
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: 'my-secret-key',
		resave: false,
		saveUninitialized: true,
	})
);

// router
app.use('/api', router);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
