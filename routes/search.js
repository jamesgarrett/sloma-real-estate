// search.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/search', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			res.locals.cosmic = cosmic
			res.render('search.html', { partials })
		})
	})
}