const express = require('express');

var app = express();

var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var exercisesRouter = require('./routes/exercises');
var calendarRouter = require('./routes/calendar');
var workoutsRouter = require('./routes/workouts');

var app = express();


var cookieParser = require('cookie-parser');

app.use(session({
    secret: 'ManoSlaptasKeyKurioPagalbaUzkoduosVartotojuSlaptazodziuIDB',
    resave: false,
    saveUninitialized: false
}))
  
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

mongoose.Promise = global.Promise;

//http:// -> mysql:// ->
mongoose.connect('mongodb://localhost/mano-projekto-db', { useNewUrlParser: true })
.then(() => console.log('Success connect to Database'))
.catch((error)=> console.log(error));

var port = 3000;

app.listen(port, () => {console.log(`Server is running on http://localhost:${port}/`)});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap-material-design/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));


app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/exercises', exercisesRouter);
app.use('/calendar', calendarRouter);
app.use('/workouts', workoutsRouter);

//routes from index.js
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404');
});