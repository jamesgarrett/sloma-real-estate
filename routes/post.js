// posts.js
const Cosmic = require('cosmicjs')
const moment = require('moment')

module.exports = (app, config, partials) => {
	app.get('/blog/:slug', (req, res) => {
		const slug = req.params.slug
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
			const cosmic = response
			const posts = response.objects.type.posts
			res.locals.posts = posts

			posts.forEach(page => {
			if (page.slug === slug) 
			  res.locals.page = page
			})

			if (!res.locals.page) {
			  return res.status(404).render('404.html', { partials })  
			} else {
			  res.locals.page.timestamp = new Date(res.locals.page.created_at).getTime()
			  const date = moment(res.locals.page.created_at).format('MMMM Do YYYY')
			  res.locals.date = date
			  return res.render('post.html', {partials})
			}
		})
	})
}