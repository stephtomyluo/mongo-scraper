const scrape = require('../utils/scrape')
const { Article } = require('../models')

const handleScrape = async (req, res) => {
  const articles = await scrape()

  try {
    Article.insertMany(articles)
  } catch (error) {
    res.status(500).send()
  }
  res.send('OK')
}

module.exports = {
  handleScrape,
}