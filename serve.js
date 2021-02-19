const express = require('express')
const bodParser = require('body-parser')

const App = express()

App.listen(4000,() => {
    console.log('start-up 4000')
})

App.use(bodParser.urlencoded({ extended: false }))
App.use(bodParser.json())

// register
const register = require('./routers/register')

App.use('/register',register)