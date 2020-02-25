const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  createdAt: {
    type: Date,
    default() {
      return Date.now()
    },
  },
  text: String,
}).pre('deleteOne', { document: true, query: false }, async function preDeleteOne() {
  await mongoose.model('Article').update({ _id: this.article }, { $pull: { notes: this._id } })
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note