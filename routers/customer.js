const express = require('express')
const mysql = require('../mysql')

const router = express.Router()

router.post('/upData', (req,res) => {

    mysql.query()
})

module.exports = router