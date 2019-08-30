/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable indent */
const mysql = require('mysql');

/* DB 접속 조건 */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '1004Yoon!',
    database: 'Web',
});

export default connection;
