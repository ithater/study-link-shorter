const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const { request, response } = require('express');



const app = express();
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));
	app.get('*', (request, response) => {
		response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = config.get('port') || 5000;

const start = async () => {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
	} catch (error) {
		console.error('Server Error', error.message);
		process.exit(1);
	}
};

start();
