/* eslint-disable no-loop-func */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-use-before-define */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-const-assign */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line prefer-destructuring
// eslint-disable-next-line no-plusplus
// eslint-disable-next-line no-plusplus
// eslint-disable-next-line no-continue
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '1004Yoon!',
  database: 'Web',
});

connection.connect();


function a(id, pw, callback) { 
  connection.query(`SELECT userid from user WHERE userid = '${id}' AND password = '${pw}' LIMIT 1`, (error, rows) => {
    if (error) console.log(error);
    console.log(rows);
    
    if (rows.length !== 0) {
      console.log('rows====================');
      console.log(rows);
      console.log(rows.userid);
      console.log(rows[0].userid);
      callback('success');
    } else {
      callback('fail'); 
    }
    // connection.end();
  });
}

module.exports = a;
