// listings.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/listings', (req, res) => {
	  Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
	    const page = response.object.listings
	    const listings = response.objects.type.listings
	    const sold_listings = []
	    const featured_listings = []
	    const upcoming_listings = []
	    listings.forEach(page => {
	      if (page.metafield.category.value === 'Featured')
	        featured_listings.push(page)
	      if (page.metafield.category.value === 'Coming Soon')
	        upcoming_listings.push(page)
	      if (page.metafield.category.value === 'Sold')
	        sold_listings.push(page)
	    })
	    res.locals.page = page
	    res.locals.listings = listings
	    res.locals.featured_listings = featured_listings
	    res.locals.upcoming_listings = upcoming_listings
	    res.locals.sold_listings = sold_listings
	    res.render('listings.html', { partials })
	  })
	})
}