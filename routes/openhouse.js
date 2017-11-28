// openhouse.js
const Cosmic = require('cosmicjs')
const moment = require('moment')

module.exports = (app, config, partials) => {
	app.get('/openhouses/:slug', (req, res) => {
  const slug = req.params.slug
  Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
    const cosmic = response
    const openhouses = response.objects.type.openhouses
    res.locals.openhouses = openhouses

    openhouses.forEach(page => {
    if (page.slug === slug) 
      res.locals.page = page
    })

    if (!res.locals.page) {
      return res.status(404).render('404.html', { partials })  
    } else {
      const date = moment(page.metadata.date).format('MMMM Do YYYY')
      res.locals.date = date
      return res.render('openhouse-single.html', {partials})
    }
  })
})
}