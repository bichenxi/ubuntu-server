const mysql = require('mysql')

const connection = mysql.createConnection({
    host     : 'localhost',     //你的主机名
    user     : 'root',            //用户名
    password : '123456',    //密码(字符串格式)
    database : 'content'  //数据库名
}); 

connection.connect()

module.exports = connection