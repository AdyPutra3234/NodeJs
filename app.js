const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
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

    const tableItems = 'CREATE TABLE IF NOT EXISTS items (id INT NOT NULL AUTO_INCREMENT , name VARCHAR (10) NOT NULL, PRIMARY KEY (id))';

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

app.get('/new', (req , res) => {
    res.render('new.ejs');
})

app.post('/create', (req, res) => {

    connection.query('INSERT INTO items (name) VALUES (?)', [req.body.itemName], (error) => {   
        if (error) console.log(error);
        res.redirect('/index');
    });
});

app.post('/delete/:id', (req, res) => {
    connection.query('DELETE FROM items WHERE id = ?', [req.params.id], (error, result) => {
        res.redirect('/index');
    });
});

app.get('/edit/:id', (req, res) => {
    connection.query('SELECT * FROM items WHERE id = ?', [req.params.id], (error, result) => {
        res.render('edit.ejs', {item: result[0]});
    });
});

app.post('/update/:id', (req, res) => {
    connection.query('UPDATE items SET name = ? WHERE id = ?', [req.body.itemName, req.params.id], (error, result) => {
        res.redirect('/index');
    })
})

app.listen(3234 , () => {
    console.log('Server started');
});