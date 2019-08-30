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

function Login(userid, password, callback){
    let sql = `SELECT userid from user WHERE userid = '${userid}' AND password ='${password}' `;
    console.log(`userid : ${userid}, password : ${password}` );
    connection.query(sql, function(error, rows){
        if(error) console.error(error);
        if(rows[0].userid===userid){
            callback('success');
        } else {
            callback('fail');
        }
    });
}

/* 페이지 갯수 정할려고 쓰는 함수 */
function page (callback){
    let sql = `select count(*) as idx from board`;
    connection.query(sql, function(error, rows){
        if (error) { console.log(error); } 
        callback(rows);
    }); 
}

/* 게시판 글보기 */
function Board_List(a, b, callback){
    //  게시판 글 보기 
    let sql = `select * from board limit ${a},${b}`;
    
    connection.query(sql, function(error, rows) {
      //  에러가 뜬다면
        if (error) { console.log(error); } 
        // console.log(rows);
      //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
        callback(rows, a, b);
    });
}

function Board_Paging(a, b, callback){
    /* 페이징 기능 */
    console.log(`a :${a} ,b : ${b}`);
    let sql = `select * from board limit ${a},${b}`;
    
    connection.query(sql, function(error, rows) {
      //  에러가 뜬다면
        if (error) { console.log(error); } 
        // console.log(rows);
      //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
        callback(rows, a, b);
    });
}

function View(idx, callback){
    let sql = `select idx, title, text, writer from board where idx=${idx};`;
    console.log(idx);
    connection.query(sql, function(error, rows) {
        //  에러가 뜬다면
        if (error) { console.log(error); } 
          // console.log(rows);
        //  게시판 글쓰기할려는 데이터가 들어왔는지 확인
        callback(rows);
    });
}

function Delete(idx, callback) {
    let sql = `Delete From board where idx=${idx}`;
    connection.query(sql, function(error, rows){
        console.log(`idx : ${idx}`);
        if(error) console.error(error);
        
        callback(rows);
    });
}

function Update(idx, title, text, writer, callback){
    let sql = `Update board SET title=${title}, text=${text}, writer=${writer} Where idx=${idx}`;
    connection.query(sql, function(error, rows){
        
        if(error) console.error(error);
        
        callback('success');
    });
}
/* 임폴트 시키는것 */
module.exports = {
    Login, Board_List, Board_Paging, page, View, Delete, Update
};