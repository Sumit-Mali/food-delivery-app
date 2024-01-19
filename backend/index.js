const express = require('express');
const app = express();
const port = 5000;
const connectDB = require('./db');
connectDB();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.get('/', (req, res) => {
	res.send('hello world');
});

app.use(express.json());
app.use('/api', require('./Routes/createUser'));
app.use('/api', require('./Routes/displayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
	console.log(port);
});
