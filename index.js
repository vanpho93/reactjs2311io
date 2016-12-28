var express = require('express');
var parser = require('body-parser').urlencoded({extended: false});
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000,() => console.log('Server started'));

app.get('/', require('./controler/indexRoute.js'));
app.post('/insert', parser, require('./controler/insert.js'));
app.post('/update', parser, require('./controler/update.js'));
app.post('/select', parser, require('./controler/select.js'));
app.post('/remove', parser, require('./controler/remove.js'));
