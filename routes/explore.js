// explore.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/explore', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			res.locals.cosmic = cosmic
			const page = response.object.explore
			res.locals.page = page
			const openhouses = response.objects.type.openhouses
			res.locals.openhouses = openhouses
			res.render('explore.html', { partials })
		})
	})
}