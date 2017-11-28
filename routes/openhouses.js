// openhouses.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/openhouses', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			res.locals.cosmic = cosmic
			const page = response.object.openhouses
			const openhouses = response.objects.type.openhouses

			res.locals.page = page
			res.locals.openhouses = openhouses
			res.render('openhouse.html', { partials }) 
		})
	})
}