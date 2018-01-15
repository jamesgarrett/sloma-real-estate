// openhouses.js
const Cosmic = require('cosmicjs')
const moment = require('moment')

module.exports = (app, config, partials) => {
	app.get('/openhouses', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			res.locals.cosmic = cosmic
			const page = response.object.openhouses
			const openhouses = response.objects.type.openhouses
			res.locals.page = page
			res.locals.openhouses = openhouses
		    openhouses.forEach(page => { 
				page.date = moment(page.metadata.date).format('MMMM Do YYYY')
		    })
		    // res.locals.page.date = date
			res.render('openhouse.html', { partials }) 
		})
	})
}