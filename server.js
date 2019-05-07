// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const wol = require('wake_on_lan');

const MAC=process.env.MAC;
const DDNS=process.env.DDNS;
const PORT=process.env.MY_PORT;

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/wake', function(request, response) {
  console.log('waking up');
  wol.wake(MAC, {
  address: DDNS,
  port: PORT
  }, function(error) {
    if(error) {
      response.send('Error');
      console.log('error');
    }
    else{
      response.send('Success');
      console.log('success');
    }
  });
});

app.get('/', function(request, response) {
   response.sendFile(__dirname + '/views/index.html');
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening');
});
