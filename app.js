
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
  footer: 'partials/footer'
}

// Create global variables for the lifespan of the app

Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const logos = response.object.logos
    const footer = response.object.footer
    const header = response.object.header
    const icons = response.object.icons
    app.locals.header = header
    app.locals.icons = icons
    app.locals.logos = logos
    app.locals.footer = footer
})

app.use('/', (req, res, next) => {
  res.locals.year = new Date().getFullYear()
  next()
})

// Unique Templates


app.get('/' || '/home', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    const testimonials = response.objects.type.testimonials.slice(0,5)
    const listings = response.objects.type.listings
    res.locals.listings = listings
    res.locals.testimonials = testimonials
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

app.get('/videos', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    const page = response.object.videos
    res.locals.cosmic = cosmic
    res.render('videos.html', { partials })
  })
})

app.get('/contact', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    res.render('contact.html', { partials })
  })
})

app.get('/search-mls', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    res.render('search.html', { partials })
  })
})

app.get('/explore', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    const openhouse = response.objects.type.openhouses
    res.locals.openhouse
    const page = response.object.explore
    res.locals.page = page
    res.render('explore.html', { partials })
  })
})

app.get('/testimonials', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    const page = response.object.testimonials
    res.locals.page = page
    res.render('testimonials.html', { partials })
  })
})

app.get('/listings', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const page = response.object.listings
    const listings = response.objects.type.listings
    res.locals.page = page
    res.locals.listings = listings
    res.render('listings.html', { partials })
  })
})

// Get data for individual listing using slug, if no data exists, serve a 404. If it does display with listings-single template

app.get('/listings/:slug', (req, res) => {
  const slug = req.params.slug
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    const listings = response.objects.type.listings
    res.locals.listings = listings
    listings.forEach(page => {
    if (page.slug === slug) 
      res.locals.page = page
    })
    res.locals.page.timestamp = new Date(res.locals.page.created).getTime()
    if (!res.locals.page) {
      return res.status(404).render('404.html', { partials })  
    }
    if (res.locals.page.metadata.category === 'Coming Soon' ){
      return res.render('upcoming.html', {partials})
    }
    if (res.locals.page.metadata.category === 'Featured' ){
        return res.render('featured.html', {partials})
    }
    if (res.locals.page.metadata.category === 'Sold' ){
        return res.render('sold.html', {partials})
    }
    // console.log('page.category');
  })
})

// Serve generic template if pages exists but does not have unique template. Serve 404 if it does not exist

app.get('/:slug', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
  const cosmic = response
  const all_pages = response.objects.type.pages
  const slug = req.params.slug
  const page = response.object.slug
  res.locals.page = page
  res.locals.cosmic = cosmic
  all_pages.forEach(page => {
    if (page.slug === slug)
      res.locals.page = page
    })
    if(!res.locals.page) {
      return res.status(404).render('404.html', { partials })  
    }
    return res.render('page.html', { partials })
  })
});

http.listen(app.get('port'), () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
})