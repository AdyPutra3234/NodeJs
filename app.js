const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Adi',
    password: '@mypass3234',
    database: 'list_belanja'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected');

    const tableItems = 'CREATE TABLE IF NOT EXISTS items (id INT NOT NULL , name VARCHAR (10) NOT NULL, PRIMARY KEY (id))';

    connection.query(tableItems, (error, result) => {
        if (error) console.log('Failed to create table items');
        else console.log('Table Items is ready');
    });
})

app.get('/', (req, res) => {
    res.render('top.ejs');
});

app.get('/index', (req, res) => {
    connection.query('SELECT * FROM items', (error, result) => {
        if (error) console.error(error);
        res.render('index.ejs', {items: result});
    });
});

app.listen(3234 , () => {
    console.log('Server started');
});