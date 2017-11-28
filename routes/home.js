// home.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
  app.get('/' || '/home', (req, res) => {
	  Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
	    const cosmic = response
	    const testimonials = response.objects.type.testimonials.slice(0,5)
	    const agents = response.objects.type.authors
	    const listings = response.objects.type.listings
	    const upcoming_listings = listings.filter(function(listing){
	       return listing.metafield.category.value === 'Coming Soon';
	    })
	    const featured_listings = listings.filter(function(listing){
	       return listing.metafield.category.value === 'Featured';
	    })
	    res.locals.featured_listings = featured_listings
	    res.locals.upcoming_listings = upcoming_listings
	    res.locals.agents = agents
	    res.locals.testimonials = testimonials
	    res.locals.cosmic = cosmic
	    res.render('index.html', { partials })
	  })
	})
}