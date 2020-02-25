const router = require('express').Router()
const { saveArticle, deleteAll, deleteNote } = require('../../controllers/articles')

router
  .delete('/', deleteAll)
  .put('/:id', saveArticle)
  .delete('/notes/:id', deleteNote)

module.exports = router