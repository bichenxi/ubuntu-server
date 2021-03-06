const express = require('express')
const mysql = require('../mysql')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', (req,res) => {
    const { account, name } = req.body
    const value = Object.values(req.body)
    mysql.query(`select * from account${account}`, (err, result) => {
        if (result) {
            res.statusCode = 401
            res.send({
                success: false,
                message: '此账号当前已经被注册!'
            })
            return
        }

        // if not this account && value.length > 0
        if (value.length) {
           const sql = `CREATE TABLE account${account} (token VARCHAR(255), account VARCHAR(255), name VARCHAR(255), password VARCHAR(255), created_date DATETIME)`

            mysql.query(sql, (err, just) => {
                
                jwt.sign({
                    "jti": 1,
                    iss: name,
                    user: account
                },"secretkey",{ expiresIn: '1day' },(err, token) => {
                    value.unshift(token)
                    const add = `INSERT INTO account${account}(token,name,account,password,created_date) VALUES(?,?,?,?,?)`
                    mysql.query(add,value,(err) => {
                        if (err) {
                            res.statusCode = 400
                            res.send({success: false, message: '注册失败', err})
                            return
                        }
                        res.send({
                            account,
                            success: true,
                            message: '恭喜您已注册成功快登录试试吧'
                        })
                    })
        
                })
           })
        }
    })
})

// login
router.post('/login', (req,res) => {
    
    const { account, password } = req.body
    const sql = `select * from account${account}`
    mysql.query(sql, (err,result) => {
        if (!result) {
            res.statusCode = 400
            res.send({ success: false, message: 'before search a not account' })
            return
        }
        if (password !== result[0].password) {
            res.send({ success: false, message: 'wrong password' })
            return
        } 
        res.send({...result[0], success: true})
        
    })
})

// fetch user
router.post('/user', (req,res) => {

    const { account, token } = req.body
    const sql = `select * from account${account}`
    mysql.query(sql, (err,result) => {
        if (!result) {
            res.statusCode = 431
            res.send({ success: false, message: 'auth fail search not account' })
            return
        }
        console.log(token)
        console.log(result[0])
        if (token !== result[0].token) {
            res.send({ success: false, message: 'wrong password' })
            return
        } 

        res.send({...result[0], success: true})
        
    })
})

module.exports = router