// listing.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/listings/:slug', (req, res) => {
		const slug = req.params.slug
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
		    const cosmic = response
		    const listings = response.objects.type.listings
		    res.locals.listings = listings

		    listings.forEach(page => {
		    if (page.slug === slug) 
		      res.locals.page = page
		    })
		    res.locals.page.timestamp = new Date(res.locals.page.created).getTime()
		    if (!res.locals.page) {
		      return res.status(404).render('404.html', { partials })  
		    }
		    if (res.locals.page.metadata.category === 'Coming Soon' ){
		      return res.render('upcoming.html', {partials})
		    }
		    if (res.locals.page.metadata.category === 'Featured' ){
		        return res.render('featured.html', {partials})
		    }
		    if (res.locals.page.metadata.category === 'Sold' ){
		        return res.render('sold.html', {partials})
		    }
		    // console.log('page.category');
		})
	})
}