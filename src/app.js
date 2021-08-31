'use strict'


const app = require('./config')
const port = process.env.PORT | '8080'


app.listen(port)