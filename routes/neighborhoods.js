// neighborhoods.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/neighborhoods', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			res.locals.cosmic = cosmic
			const page = response.object.neighborhoods
			const neighborhoods = response.objects.type.neighborhoods

			res.locals.page = page
			res.locals.neighborhoods = neighborhoods
			res.render('neighborhoods.html', { partials }) 
		})
	})
}