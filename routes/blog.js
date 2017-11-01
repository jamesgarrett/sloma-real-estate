module.exports = function(app){

	app.get('/blog', (req, res) => {
	  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
	    const cosmic = response
	    res.locals.cosmic = cosmic
	    const page = response.object.blog
	    const posts = response.objects.type.post

	    res.locals.page = page
	    res.locals.posts = posts
	    res.render('post.html', { partials }) 

	  })
	})
	// Get data for individual listing using slug, if no data exists, serve a 404. If it does display with listings-single template

	app.get('/blog/:slug', (req, res) => {
	  const slug = req.params.slug
	  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
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
	      res.locals.page.timestamp = new Date(res.locals.page.created).getTime()
	      const date = moment(res.locals.page.metadata.date).format('MMMM Do YYYY')
	      res.locals.date = date
	      return res.render('posts-single.html', {partials})
	    }
	  })
	})

}

