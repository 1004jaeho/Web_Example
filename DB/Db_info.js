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


function a (require, callback) { 
  connection.query('SELECT userid,password from user', (error, rows) => {
    if (error) throw error;
    console.log('rows : ', rows);
    for (let i = 0; i < rows.length; i++) {
      db_userid = rows[i].userid;
      db_password = rows[i].password;
      console.log(`db_userid : ${db_userid} db_password : ${db_password}`);
      set(db_userid, db_password);
      
      if (db_userid === rows[i].userid && db_password === rows[i].db_password) {
        callback('success');
      } else {

        callback('fail'); 
      }
      
      
    }
    
  });
  connection.end();
}

function set (db_userid, db_password) { 
  console.log(` set 함수 db_userid : ${db_userid} db_password : ${db_password}`);
}


module.exports = a;
