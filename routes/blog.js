// blog.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/blog', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
		    const cosmic = response
		    res.locals.cosmic = cosmic
		    const page = response.object.blog
		    const posts = response.objects.type.posts

		    res.locals.page = page
		    res.locals.posts = posts
		    res.render('blog.html', { partials }) 
		})
	})
}