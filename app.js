var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground');

require('dotenv').config();

// Set up MongoDB/mongoose using ATLAS to make it server-independent (code pulled from MongoDB atlas page )
const mongoURI = process.env.databaseURL;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    dbName: 'test',
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch(err => {
    console.log('ERROR:', err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('landing');
});

//INDEX - show all campgrounds
app.get('/campgrounds', function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allCampgrounds });
    }
  });
});

//CREATE - add new campground to DB
app.post('/campgrounds', function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id).exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      //render show template with that campground
      res.render('show', { campground: foundCampground });
    }
  });
});

// Start the remote server
let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}
app.listen(port);
