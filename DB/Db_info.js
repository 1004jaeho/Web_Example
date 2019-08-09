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


//  회원가입 기능
function b(userid, username, gender, Phone_Number, E_Mail, User_age, password, callback) {
  let seq = 1;
  console.log(`왜 : ${userid}, ${username}, ${gender}, ${Phone_Number}, ${E_Mail}, ${User_age}, ${password}`);
  
  let sql = `INSERT INTO user (userid, username, gender, Phone_Number, E_mail, User_age, password) VALUES (${userid}, ${username}, ${gender}, ${Phone_Number}, ${E_Mail}, ${User_age}, ${password})`;
  connection.query(sql, function(error, rows) {
    //  에러가 뜬다면
    if (error) { console.log(error); } 
    //  회원가입할려는 데이터가 들어왔는지 확인
    if (userid.length !== 0 && password.length !== 0
      && username.length !== 0 && gender.length !== 0
      && Phone_Number.length !== 0 && E_Mail.length !== 0
      && User_age.length !== 0 
    ) {
      callback('success');
      seq++;
    } else {
      callback('fail');
    }
  });
}

//  로그안 기능
function a(id, pw, callback) { 
  connection.query(`SELECT userid from user WHERE userid = '${id}' AND password = '${pw}'`, (error, rows) => {
    
    console.log(`a == == id : ${id} pw : ${pw}`);
    
    if (error) console.log(error);
    
    
    if (rows[0].userid === id) {
      console.log(`success : ${rows.length}`);
      callback('success');
    } else {
      callback('fail'); 
    }
    // connection.end();
  });
}

module.exports = { a, b };
