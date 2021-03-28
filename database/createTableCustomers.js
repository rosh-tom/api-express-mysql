const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected`);
    var sql = "CREATE TABLE customers (id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, active BOOLEAN DEFAULT false)";
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(`table Created`);
    })
});