// events-single.js
const Cosmic = require('cosmicjs')
const moment = require('moment')

module.exports = (app, config, partials) => {
	app.get('/events/:slug', (req, res) => {
  const slug = req.params.slug
  Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    const events = response.objects.type.events
    res.locals.events = events

    events.forEach(page => {
    if (page.slug === slug) 
      res.locals.page = page
      page.date = moment(page.metadata.date).format('MMMM Do YYYY')
    })

    if (!res.locals.page) {
      return res.status(404).render('404.html', { partials })  
    } else {

    	
      return res.render('events-single.html', {partials})
    }
  })
})
}