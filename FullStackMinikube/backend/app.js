const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'mysql-service',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
    db.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))', (err, result) => {
        if (err) throw err;
        console.log('Table created or exists');
    });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const query = 'INSERT INTO users (name) VALUES (?)';
    db.query(query, [name], (err, result) => {
        if (err) throw err;
        res.send(`Hello, ${name}! Your name has been saved.`);
    });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});