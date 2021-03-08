const express = require('express')
const mysql = require('../mysql')
const handleMysql = require('../handleMySql')

const router = express.Router()

// const addEmil = 'alter table account123456 add COLUMN emil VARCHAR(255) DEFAULT NULL;'

router.post('/upData', async (req,res) => {
    const account = req.headers.account

    const data  = await handleMysql(`select * from account${req.headers.account}`)
    if (!data) {
        res.send({ success: false, message: 'not a account' })
        return
    }

    // get query key
    const key = Object.getOwnPropertyNames(req.body)
    const val = Object.values(req.body)[0]
    const upData = `update account${account} set ${key}='${val}'`

    if (!data[0][key]) {
        const addTable = `alter table account123456 add COLUMN ${key} VARCHAR(255) DEFAULT NULL;`
        const result = handleMysql(addTable)
        if (!result) {
            res.statusCode = 400
            res.send({ success: false, message: 'add fail' })
            return
        }

        const searchData = await handleMysql(upData)

        if (!searchData) {
            res.send({searchData, success: false})
            return
        }

        const data = await handleMysql(`select * from account${account}`)
        res.send({data: data[0]})
        return
    } 

    const lastData = await handleMysql(upData)

    if (!lastData) {
        res.statusCode = 400
        res.send({lastData, success:false, message: 'add fail'})
        return
    }

    // change success
    const resultData = await handleMysql(`select * from account${account}`)
    res.send({ data: resultData[0] })
})

module.exports = router