

const express = require('express');
const app = express();

const path = require('path');

const sslRedirect = require('heroku-ssl-redirect');

const prenatal = require('./server/forms/prenatal');
const postpartum = require('./server/forms/postpartum');
const routes = require('./server/api');



app.use(sslRedirect());



app.use(express.urlencoded({ extended: false }));

// app.use(express.json());


// serve static html landingpage, login page, favicons, etc
app.use(express.static('static'));

// Serve static files JS React client
app.use(express.static('client/build'));


// api routes
app.use('/api/prenatal', prenatal);
app.use('/api/postpartum', postpartum);
app.use('/api/', routes);




// Send back React's index.html file.
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


// match one above, send back static login page.
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/login.html'));
});


// The "catchall" handler: for any request that doesn't
// match one above, send back static landing page.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});




const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port 8080!'));