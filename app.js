
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
  testimonials: 'partials/testimonials',
}

app.use('/', (req, res, next) => {
  res.locals.year = new Date().getFullYear()
  next()
})
// Home
app.get('/' || '/home', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    const logos = response.object.logos
    const footer = response.object.footer
    const header = response.object.header
    const icons = response.object.icons
    app.locals.header = header
    app.locals.icons = icons
    app.locals.logos = logos
    app.locals.footer = footer
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

app.get('/listings', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const page = response.object.listings
    const listings = response.objects.type.listings
    res.locals.page = page
    res.locals.listings = listings
    res.render('listings.html', { partials })
  })
})

// app.get('/listings', (req, res) => {
//     Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
//       const cosmic = response
//       const page = response.object.listings
//       const listings = response.objects.type.listings

// if (req.query.filter && req.query.filter === 'active') {
//   ... do some filtering here then
//   res.locals.listings = filtered_listings

//       return res.render('listings.html', {
//         partials
//       })
//     })
//   })

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
      return res.status(404).render('404.html', {
        partials
      })  
    }
    return res.render('listings-single.html', { partials })
  })
})

app.get('/:slug', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
  const cosmic = response
  const all_pages = response.objects.type.pages
  const slug = req.params.slug
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