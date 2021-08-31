'use strict'

const express = require('express')
const hbs = require('hbs')
const path = require('path')
const routes = require('./routes')

const app = express()

app.set('view engine', 'html')
app.engine('html', require('hbs')
    .__express)

hbs.registerPartials(path.join(__dirname, 'src/hbs'))
hbs.registerPartials(path.join(__dirname, 'src/hbs/parts'))

app.use('/static', express.static(path.join(__dirname, '/../node_modules/uikit/dist/css')))
app.use('/static', express.static(path.join(__dirname, '/../node_modules/uikit/dist/js')))
app.set('/static', express.static(path.join(__dirname, '/src/css')))
app.set('/static', express.static(path.join(__dirname, '/src/css/index.css')))
app.set(express.static(path.join(__dirname, '/src/hbs')))

app.set('views', path.join(__dirname, 'src/hbs'))

app.use('/', routes['index'])

module.exports = app
