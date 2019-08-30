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

connection.connect();

function Login(userid, password, callback) {
    const sql = `SELECT userid from user WHERE userid = '${userid}' AND password ='${password}' `;
    console.log(`userid : ${userid}, password : ${password}`);
    connection.query(sql, (error, rows) => {
        if (error) console.error(error);

        if (rows[0].userid === userid) {
            callback('success');
        } else {
            callback('fail');
        }
    });
}

/* 페이지 갯수 정할려고 쓰는 함수 */
function page(callback) {
    const sql = 'select count(*) as idx from board';
    connection.query(sql, (error, rows) => {
        if (error) { console.log(error); }
        callback(rows);
    });
}

/* 게시판 글보기 */
function Board_List(a, b, callback) {
    //  게시판 글 보기
    const sql = `select * from board limit ${a},${b}`;

    connection.query(sql, (error, rows) => {
      //  에러가 뜬다면
        if (error) { console.log(error); }
        // console.log(rows);
      //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
        callback(rows, a, b);
    });
}

function Board_Paging(a, b, callback) {
    /* 페이징 기능 */
    console.log(`a :${a} ,b : ${b}`);
    const sql = `select * from board limit ${a},${b}`;

    connection.query(sql, (error, rows) => {
      //  에러가 뜬다면
        if (error) { console.log(error); }
        // console.log(rows);
      //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
        callback(rows, a, b);
    });
}

function View(idx, callback) {
    const sql = `select idx, title, text, writer from board where idx=${idx};`;
    console.log(idx);
    connection.query(sql, (error, rows) => {
        //  에러가 뜬다면
        if (error) { console.log(error); }
          // console.log(rows);
        //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
        callback(rows);
    });
}

function Delete(idx, callback) {
    const sql = `Delete From board where idx=${idx}`;
    connection.query(sql, (error, rows) => {
        console.log(`idx : ${idx}`);
        if (error) console.error(error);

        callback(rows);
    });
}

function Update(idx, title, text, writer, callback) {
    const sql = `Update board SET title=${title}, text=${text}, writer=${writer} Where idx=${idx}`;
    connection.query(sql, (error, rows) => {
        if (error) console.error(error);

        callback('success');
    });
}

function New_Member(userid, username, gender, Phone_Number, E_Mail, User_age, password, callback) {
    let seq = 1;
    const sql = `INSERT INTO user (userid, username, gender, Phone_Number, E_mail, User_age, password) VALUES (${userid}, ${username}, ${gender}, ${Phone_Number}, ${E_Mail}, ${User_age}, ${password})`;
    connection.query(sql, (error, rows) => {
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
function Write(title, text, writer, callback) {   
    const sql = `INSERT INTO Board (title, text, writer) VALUES (${title}, ${text}, ${writer})`;
    connection.query(sql, (error, rows) => {
      //  에러가 뜬다면
        if (error) { console.log(error); } 
        //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
        if (title.length !== 0 && text.length !== 0 && writer.length !== 0) {
            callback('success');
        } else {
            callback('fail');
        }
    });
}


/* 임폴트 시키는것 */
module.exports = {
    Login, Board_List, Board_Paging, page, View, Delete, Update, New_Member, Write,
};
