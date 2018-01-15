const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/:slug', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			const all_pages = response.objects.type.pages
			const slug = req.params.slug
			const page = response.object.slug
			res.locals.page = page
			res.locals.cosmic = cosmic
			all_pages.forEach(page => {
			if (page.slug === slug)
			  res.locals.page = page
				const hero = page.metadata.hero.imgix_url
				res.locals.hero = hero
			})
			if(!res.locals.page) {
			  return res.status(404).render('404.html', { partials })  
			}
			return res.render('page.html', { partials })
		})
	});
}

