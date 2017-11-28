// videos.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/videos', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			const page = response.object.videos
			res.locals.cosmic = cosmic
			res.render('videos.html', { partials })
		})
	})
}