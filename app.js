const express = require('express');
const hbs = require('hbs');
const path = require('path');
const mysql = require('./utils/sql');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

app.get('/', (req, res) => {
	res.render('home', { homemessage: "hey there", bio: "some generic bio info"});
})

app.get('/users', (req, res) => {
	//get user data when we hit this route

	//try a database connection
	//if the connection fails, log errors to the console and quit
	sql.getConnection((err, connection) => {
		if (err) {
			return console.log(err.message);
		}

		let query = "SELECT * FROM tbl_card";

		sql.query(query, (err, rows) => {
			//done with DB connection so we release it to let someone else use it
			connection.release();

			//if something broke, quit and show an error message
			if (err) { return console.log(err.message); }
			
			///show the data
			console.log(rows);

			res.render('user), rows[0]);
		})
	})
})

app.listen(port, () => {
	console.log(`app is running on port ${port}`);
})