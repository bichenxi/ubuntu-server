const express = require('express')
const mysql = require('../mysql')

const router = express.Router()

// const addEmil = 'alter table account123456 add COLUMN emil VARCHAR(255) DEFAULT NULL;'

router.post('/upData', (req,res) => {
    const account = req.headers.account
    mysql.query(`select * from account${req.headers.account}`, (err,result) => {
        const [ data ] = result
        if (!data) {
            res.send({ success: false, message: 'not a account' })
            return
        }
        // get query key
        const key = Object.getOwnPropertyNames(req.body)
        const val = Object.values(req.body)[0]
        const upData = `update account${account} set ${key}='${val}'`
        if (!data[key]) {
            const addTable = `alter table account123456 add COLUMN ${key} VARCHAR(255) DEFAULT NULL;`
            mysql.query(addTable, (err,result1) => {
                if (err) {
                    res.statusCode = 400
                    res.send({ success: false, message: 'add fail' })
                    return
                }
                mysql.query(upData, (err,result) => {
                    if (err) {
                        res.send({err, success: false})
                        return
                    }

                    mysql.query(`select * from account${account}`,(err,result) => {
                        res.send({ data: result[0] })
                    })
                })
            })
            return
        } 
        mysql.query(upData,(err, result) => {
            if (err) {
                res.statusCode = 400
                res.send({err, success:false, message: 'add fail'})
                return
            }
            
            mysql.query(`select * from account${account}`,(err,result) => {
                res.send({ data: result[0] })
            })

        })
    })
})

module.exports = router