const express = require('express')
const path = require('path')
const http = require('http')
const logger = require('morgan')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const mongoose = require('mongoose')
const moment = require('moment')

// load .env
require('dotenv').config()

// create app
const app = express()

// view engine setup
app.engine(
  '.hbs',
  exphbs({
    extname: '.hbs',
    helpers: {
      navLink(context) {
        const { href, match } = context.hash
        const { title } = context.data.root
        const active = title === match ? 'active' : ''
        return new Handlebars.SafeString(`<a class="nav-link ${active}" href="${href}">${match}</a>`)
      },
      dateLong(context) {
        const { value } = context.hash
        return moment(value).format('dddd, MMMM Do YYYY, h:mm:ss a')
      },
    },
  })
)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')

// middleware setup
app.use(logger('dev'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.static(path.join(__dirname, 'public')))

// route setup
app.use(require('./routes'))

// serve app
const serve = () => {
  const server = http.createServer(app)
  const onListening = () => console.log(`Listening on port ${server.address().port}`)
  server
    .listen(process.env.PORT || '3000')
    .on('error', console.error)
    .on('listening', onListening)
}

// db setup
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'
const onMongoConnectionError = error => console.log(error)
mongoose
  .connect(MONGODB_URI)
  .then(serve)
  .catch(onMongoConnectionError)