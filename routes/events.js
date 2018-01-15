// events.js
const Cosmic = require('cosmicjs')
const moment = require('moment')

module.exports = (app, config, partials) => {
	app.get('/events', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			res.locals.cosmic = cosmic
			const page = response.object.events
			res.locals.page = page
			const events = response.objects.type.events
			res.locals.events = events
			page.date = moment(page.metadata.date).format('MMMM Do YYYY')
			res.render('events.html', { partials }) 
		})
	})
}