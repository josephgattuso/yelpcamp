var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.send('hello world!');
});

// Start the remote server
// app.listen(process.env.PORT, process.env.IP, function() {
//   console.log('The YelpCamp Server Has Started!');
// });

// Start the local server
app.listen(3000, function() {
  console.log('yelp-camp server started');
});
