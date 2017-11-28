// testimonials.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/testimonials', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			res.locals.cosmic = cosmic
			const page = response.object.testimonials
			res.locals.page = page
			res.render('testimonials.html', { partials })
		})
	})
}