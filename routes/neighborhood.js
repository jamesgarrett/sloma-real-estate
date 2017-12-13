// neighborhood.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/neighborhoods/:slug', (req, res) => {
  const slug = req.params.slug
  Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
    const cosmic = response
    res.locals.cosmic = cosmic
    const neighborhoods = response.objects.type.neighborhoods
    res.locals.neighborhoods = neighborhoods

    neighborhoods.forEach(page => {
    if (page.slug === slug) 
      res.locals.page = page
    })

    if (!res.locals.page) {
      return res.status(404).render('404.html', { partials })  
    } else {
      return res.render('neighborhood-single.html', {partials})
    }
  })
})
}