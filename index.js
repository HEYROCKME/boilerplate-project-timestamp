// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res)=> {
  
  let input = req.params.date
  // convert to unix (number)
  let timestamp = !isNaN(new Date(input))? new Date(input).valueOf() : +input
  console.log("TS", timestamp, input )
  // Check if timestap is a number
  if (isNaN(timestamp)) {
    // NaN returns error to api  
    return res.json({error: "Invalid Date"})
  } else {
    // If number return send result (object)
    return res.json({unix: timestamp, utc: new Date(timestamp).toUTCString()})
  }
   
})
// If request is blank, send "now" as timestamp
app.get('/api/', (req, res)=> {
  res.send({unix: new Date().valueOf(), utc: new Date().toUTCString()})
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
