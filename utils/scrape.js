const axios = require('axios')
const cheerio = require('cheerio')

async function scrape() {
  const rawHtml = (await axios.get('https://www.wsj.com/')).data
  const $ = cheerio.load(rawHtml)

  let articles = []

  const addArticle = (i, element) => {
    const header = $('div h3 a', element)
    const url = header.attr('href')
    const title = header.text()
    let summary = $('p', element)
      .first()
      .contents()
      .filter(function filterText() {
        return this.type === 'text'
      })
      .text()

    if (url && title && summary) {
      articles.push({
        title,
        url,
        summary,
      })
    }
  }

  $('article').each(addArticle)

  return articles
}

module.exports = scrape