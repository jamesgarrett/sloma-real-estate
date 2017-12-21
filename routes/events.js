// events.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/events', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			res.locals.cosmic = cosmic
			const page = response.object.events
			const events = response.objects.type.events

			res.locals.page = page
			res.locals.events = events
			res.render('events.html', { partials }) 
		})
	})
}