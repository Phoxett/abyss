'use strict'


const express = require('express')
const hbs = require('hbs')
const path = require('path')
const routes = require('./route')

const app = express()



hbs.registerPartials(path.join(__dirname, 'src/hbs'))
hbs.registerPartials(path.join(__dirname, 'src/hbs/**/'))

app.set('view engine', 'html')
app.engine('html', require('hbs').__express)

app.set('/css', express.static(path.join(__dirname, '/src/css')))
app.set('/data/', express.static(path.join(__dirname, '/src/data')))
app.set(express.static(path.join(__dirname, '/src/hbs')))
app.set('view', path.join(__dirname, 'src/hbs'))

app.use('/', routes['index'])

module.exports = app