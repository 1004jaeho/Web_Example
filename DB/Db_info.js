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
//  게시판 글쓰기
function c(title, text, writer, callback) {
  
  console.log(`왜 : ${title}, ${text}, ${writer}`);
  let sql = `INSERT INTO Board (title, text, writer) VALUES (${title}, ${text}, ${writer})`;
  connection.query(sql, function(error, rows) {
    //  에러가 뜬다면
    if (error) { console.log(error); } 
    //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
    if (title.length !== 0 && text.length !== 0
      && writer.length !== 0) {
      callback('success');
    } else {
      callback('fail');
    }
  });
}

//  게시판 글보기
function d(title, idx, writer, callback) {
  let sql = 'SELECT * FROM Board';
  connection.query(sql, function(error, rows) {
    //  에러가 뜬다면
    if (error) { console.log(error); } 
    //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
    
    callback(rows);
    // response.render('/Board', { title: 'Board List', rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
  });
}

function g(callback) {
  let sql = 'SELECT * FROM Board';
  connection.query(sql, function(error, rows) {
    //  에러가 뜬다면
    if (error) { console.log(error); } 
    //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
    callback(rows);
  });
}

//  게시판 글 삭제
function e(idx, title, writer, callback) {
  let sql = '';
  connection.query(sql, function(error, rows) {
    
  });
}
//  게시판 글 수정
function f(title, text, writer, callback) {
  let sql = '';
  connection.query(sql, function(err, rows) {
    //  수정 완료
    if (title.length !== 0 && text.length !== 0
      && writer.length !== 0) {
      callback('success');
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

module.exports = {
  a, b, c, d, g,
};
