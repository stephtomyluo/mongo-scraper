const router = require('express').Router()

const scrape = require('./scrape')
const articles = require('./articles')

router.use('/scrape', scrape)
router.use('/articles', articles)

module.exports = router