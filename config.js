const config = {
	MAILGUN_KEY : 'key-e0ee1bf585745f8061349715233f74a1',
	COSMIC_BUCKET: process.env.COSMIC_BUCKET || 'sloma',
	COSMIC_READ_KEY: process.env.COSMIC_READ_KEY,
	COSMIC_WRITE_KEY: process.env.COSMIC_WRITE_KEY,
	SMTPS_STRING: process.env.SMTPS_STRING
}

module.exports = config