console.log("======> Starting ....<=======");

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.listen(PORT, () => console.log(`> Listening on ${ PORT }`));