const express = require('express')
const bodParser = require('body-parser')
const path = require('path')

const App = express()

App.listen(80,() => {
    console.log('start-up 4000')
})

App.use(bodParser.urlencoded({ extended: false }))
App.use(bodParser.json())

// import
const register = require('./routers/register')
const customer = require('./routers/customer')

// public
App.use('/static', express.static('public'))
App.use(express.static(path.join(__dirname, 'dist')))

// use router
App.use('/api/register',register)
App.use('/api/customer', customer)