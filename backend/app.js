var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

var db = require('./app/config/db.config.js');

db.sequelize.sync({force: false});

var genre = require('./app/route/genre.js');
genre(app);

var writer = require('./app/route/writer.js');
writer(app);

var book = require('./app/route/book.js');
book(app);

var auth = require('./app/route/auth.js');
auth(app);

var wallet = require('./app/route/wallet.js');
wallet(app);

app.listen(3000);