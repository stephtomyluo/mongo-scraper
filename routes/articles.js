const router = require('express').Router()

const { getAll, getSaved, getArticle, addNote } = require('../controllers/articles')

router
  .get('/', getAll)
  .get('/saved', getSaved)
  .get('/:id', getArticle)
  .post('/:id/notes', addNote)

module.exports = router