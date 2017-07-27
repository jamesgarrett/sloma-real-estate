
const express = require('express')
const app = express()
const hogan = require('hogan-express')
const http_module = require('http')
const http = http_module.Server(app)
app.engine('html', hogan)
app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname + '/'))
const Cosmic = require('cosmicjs')
const helpers = require('./helpers')
const bucket_slug = process.env.COSMIC_BUCKET || 'sloma'
const read_key = process.env.COSMIC_READ_KEY
const partials = {
  header: 'partials/header',
  footer: 'partials/footer',
}
const modules = {
  team: 'partials/team',
  portfolio: 'partials/portfolio',
  testimonials: 'partials/testimonials'
}
app.use('/', (req, res, next) => {
  res.locals.year = new Date().getFullYear()
  next()
})
// Home
app.get('/' || '/home', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    res.render('index.html', { partials })
  })
})

app.get('/about', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    res.render('about.html', { partials })
  })
})

app.get('/contact', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    res.render('contact.html', { partials })
  })
})

app.get('/listings', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    res.render('listings.html', { partials })
  })
})

http.listen(app.get('port'), () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
})