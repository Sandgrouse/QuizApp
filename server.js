// MAIN SERVER ENTRY POINT FILE v0.5
// Author: MeanTemplates.com
// License: MIT

// Dependencies 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // grabs information from the POST data form.
const cors = require('cors');
const mongoose = require('mongoose');
const publicUrl = 'public/index.html';
const passport = require("passport");

const logger = require('morgan');
const flash = require('express-flash');


// Server & Port Initialization
const app = express();
const port = process.env.PORT || 5000;

// Route Files
const routeQuiz = require('./routes/quiz-routes');
const routeResults = require('./routes/results-routes');
const users = require('./routes/auth/users');


// Config Files
const dbConfig = require('./config/db');
const database = require('./config/keys');

// Passport Config
require('./config/passport')(passport);

// Database Connection Mongoose
// mongoose.connect(dbConfig.database);
mongoose.Promise = global.Promise;
mongoose.connect(database.mongoURI, {
    useNewUrlParser:true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + database.mongoURI);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});
/* .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err)); */

// CORS Middleware
app.use(cors());

//Rquest logger
app.use(logger('dev'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Listen to Port
app.listen(port, function () {
    console.log('Knowing Server started on port: ' + port);
});

app.use(flash());

// Passport middleware
app.use(passport.initialize());

// API Routes
app.use('/api/quiz', routeQuiz);
app.use('/api/scores', routeResults);
app.use('/auth/users', users);


// Server Routes
app.get('/', (req, res) => {
    res.send('Error: Cannot reach for public files!');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, publicUrl));
});
