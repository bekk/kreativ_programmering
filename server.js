var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/particle', function(req, res) {
    res.render('particle');
});

app.listen(port, function() {
    console.log('Kreativ programmering is running on http://localhost:' + port);
});
