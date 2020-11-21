const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('hello.ejs');
});

app.get('/top', (req, res) => {
    res.render('top.ejs');
});

app.listen(3234 , () => {
    console.log('Server started');
});