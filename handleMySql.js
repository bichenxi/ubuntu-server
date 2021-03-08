const mysql = require('./mysql')

function handleMysql(sql,value = null) {

    return new Promise((resolve,reject) => {

        if (value) {
            mysql.query(sql,value,(err,res) => {

                if (err) {
                    reject(err)
                    return
                }
                resolve(res)

            })
        } else {

            mysql.query(sql,(err,res) => {
                if (err) {
                    reject(false)
                    console.error(err)
                    return
                }
                resolve(res)
            })
        }

    })
}

module.exports = handleMysql