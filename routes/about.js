// about.js
const Cosmic = require('cosmicjs')

module.exports = (app, config, partials) => {
	app.get('/about', (req, res) => {
		Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.READ_KEY } }, (err, response) => {
		    const cosmic = response
		    res.locals.cosmic = cosmic
		    const listings = response.objects.type.listings
		    const sold_listings = []
		    const recent_transactions = response.object.about.metadata.recent_transactions
		    res.locals.recent_transactions
		    listings.forEach(page => {
		    if (page.metafield.category.value === 'Sold')
		        sold_listings.push(page)
		    })
		    res.locals.sold_listings = sold_listings
		    res.render('about.html', { partials })
		})
	})
}