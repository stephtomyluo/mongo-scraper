const { Article, Note } = require('../models')

/* === html handlers === */
const getAll = async (req, res) => {
  const articles = await Article.find({})
    .limit(100)
    .lean()

  res.render('articles/index', { title: 'Articles', header: 'Recent Articles', articles })
}

const getSaved = async (req, res) => {
  const articles = await Article.find({})
    .where({ saved: true })
    .limit(100)
    .lean()

  res.render('articles/index', { title: 'Saved Articles', header: 'Saved Articles', articles })
}

const getArticle = async (req, res) => {
  const { id } = req.params
  const article = await Article.findOne({ _id: id })
    .populate('notes')
    .lean()

  res.render('articles/show', { title: article.title, article })
}

const addNote = async (req, res) => {
  const { id } = req.params
  const { note } = req.body

  try {
    const newNote = await Note.create({ text: note, article: id })
    await Article.updateOne({ _id: id }, { $push: { notes: newNote._id } })
  } catch (error) {
    console.error(error)
    res.redirect(500, 'back')
  }

  res.redirect('back')
}

/* === api handlers === */

const saveArticle = async (req, res) => {
  try {
    const { id } = req.params
    const { saved } = req.body
    await Article.updateOne({ _id: id }, { saved })
    res.send('ok')
  } catch (error) {
    res.status(500).send()
  }
}

const deleteAll = async (req, res) => {
  try {
    await Article.deleteMany({})
    res.send('ok')
  } catch (error) {
    res.status(500).send()
  }
}

const deleteNote = async (req, res) => {
  const { id } = req.params

  try {
    await (await Note.findById(id)).deleteOne()
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }

  res.json({ status: 'ok' })
}

module.exports = {
  addNote,
  getAll,
  getSaved,
  saveArticle,
  deleteAll,
  getArticle,
  deleteNote,
}