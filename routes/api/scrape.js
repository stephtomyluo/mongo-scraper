const router = require('express').Router()
const { handleScrape } = require('../../controllers/scrape')

router.post('/', handleScrape)

module.exports = router