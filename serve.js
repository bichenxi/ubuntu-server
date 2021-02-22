const express = require('express')
const bodParser = require('body-parser')

const App = express()

App.listen(4000,() => {
    console.log('start-up 4000')
})

App.use(bodParser.urlencoded({ extended: false }))
App.use(bodParser.json())

// import
const register = require('./routers/register')
const customer = require('./routers/customer')

// public
App.use('/static', express.static('public'))

// use router
App.use('/register',register)
App.use('/customer', customer)