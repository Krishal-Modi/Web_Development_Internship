const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3306;

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'DESKTOP-M0EH5SO\Krishal',
    password: '',
    database: 'users'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Set up express to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/payment.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { firstname, secondname, email, addresss, city } = req.body;
    
    // Insert form data into MySQL database
    const sql = `INSERT INTO payment1 
                (
                    firstname,
                    secondname,
                    email,
                    addresss,
                    city
                ) 
                VALUES (
                    "${firstname}",
                    "${secondname}",
                    "${email}",
                    "${addresss}",
                    "${city}"
                );`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Form data inserted');
    });

    res.send('<h1>Order submitted successfully! <br>Will Be Delivered Soon</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});