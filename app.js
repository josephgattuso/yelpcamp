// included modules
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer'),
  flash = require('connect-flash');

// Constant for environment variables and bindings
const PORT = process.env.PORT || 3000;

// Models for database
const Campground = require('./models/campground'),
  User = require('./models/user'),
  Comment = require('./models/comment');
// seedDB = require('./seeds');
// seedDB(); // Seed the database

//requring routes
const commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

require('dotenv').config();

// Set up MongoDB/mongoose using ATLAS to make it server-independent (code pulled from MongoDB atlas page )
const mongoURI = process.env.databaseURL;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    dbName: 'test',
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch(err => {
    console.log('ERROR:', err.message);
  });

// Config and init of Passport module
app.use(
  require('express-session')({
    secret: 'Once again Gizmo wins cutest dog!',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// module activation and linking
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// seedDB(); //seed the database

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// Server start!
app.listen(PORT, () => {
  console.log('The YelpCamp application server has started!');
});
