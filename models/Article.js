const mongoose = require('mongoose')
const Note = require('./Note')

const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: {
      index: {
        unique: true,
      },
    },
  },
  summary: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  saved: {
    type: Boolean,
    default: false,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
}).pre('remove', async function preRemoveArticle() {
  await Note.deleteMany({ _id: { $in: this.notes } })
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article