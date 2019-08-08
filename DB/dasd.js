/* eslint-disable prefer-destructuring */
const mysql = require('mysql');

let userid = null;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '1004Yoon!',
  database: 'Web',
});

connection.connect();

connection.query('SELECT * from user', (error, rows) => {
  if (error) throw error;
  // eslint-disable-next-line no-const-assign
  userid = rows[0];
  // eslint-disable-next-line prefer-destructuring
  console.log('The solution is: ', userid);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rows.length; i++) {
    console.log('The solution is: ', userid);
    if (userid === rows[i].userid) {
      console.log('똑같은 단어입니다.');
    } else {
      console.log('아닙니다.');
    }
  }
});

// connection.end();
module.exports = connection;
