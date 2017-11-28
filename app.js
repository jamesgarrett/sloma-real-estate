// app setup
const express = require('express')
const port = process.env.PORT || 8080;
const http_module = require('http')
const bodyParser = require('body-parser')
const Cosmic = require('cosmicjs')
const hogan = require('hogan-express')
const config = require('./config')

// declare express instance
const app = express()

// configure instance with views, engine, and express settings
app.use(bodyParser.json())
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/'))


// get an instance of the router
app.use(function(req, res, next) {
  // log each request to the console
  console.log(req.method, req.url);

  // set favicon
  if (req.url === '/public/favicon.ico')
    return res.end()

  // Set global variables
  res.locals.year = new Date().getFullYear()

  // Set dev
  if (process.env.NODE_ENV === 'development')
    res.locals.is_dev = true

  next();
});

// declare our partials
const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
}

// define our router and pass our app object, config, and partials to our routes
// this will route us through index.js in the route folder
require('./routes')(app, config, partials)

// create an instance of our app on the http server
const http = http_module.Server(app)

// listen on the port we set to see the app
http.listen(port, () => {
  console.info('==> 🌎  Go to http://localhost:%s', port);
})