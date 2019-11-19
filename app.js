var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgrounds = [
  {
    name: 'Salmon Creek',
    image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg'
  },
  {
    name: 'Granite Hill',
    image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg'
  },
  {
    name: "Mountain Goat's Rest",
    image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg'
  },
  {
    name: 'Salmon Creek',
    image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg'
  },
  {
    name: 'Granite Hill',
    image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg'
  },
  {
    name: "Mountain Goat's Rest",
    image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg'
  },
  {
    name: 'Salmon Creek',
    image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg'
  },
  {
    name: 'Granite Hill',
    image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg'
  },
  {
    name: "Mountain Goat's Rest",
    image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg'
  }
];

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  res.render('campgrounds', { campgrounds: campgrounds });
});

// Start the remote server
// app.listen(process.env.PORT, process.env.IP, function() {
//   console.log('The YelpCamp Server Has Started!');
// });

// Start the local server
app.listen(3000, function() {
  console.log('yelp-camp server started');
});
