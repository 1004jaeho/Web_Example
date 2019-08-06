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


function a (require, callback) {
  connection.query('SELECT userid from user', (error, rows) => {
    let userid = null;
    if (error) throw error;
    console.log('userid : ', rows);
    for (let i = 0; i < rows.length; i++) {
      userid = rows[i];
      if (userid === rows[i]) {
        callback('success');
      } else {
        callback('fail');
      }
    }
  });
  connection.end();
}

module.exports = a;
