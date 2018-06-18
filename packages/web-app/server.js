const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/patternfly', express.static(__dirname + '/node_modules/patternfly/'));
app.use('/assets', express.static(__dirname + '/assets/'));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    let restApiUrl = process.env.REST_API_URL || '/';
    res.render('pages/index', {restApiUrl});
});

/*
app.get('/about', function (req, res) {
    res.render('pages/about');
});
*/

app.listen(PORT, () => console.log(`> Listening on ${ PORT }`));