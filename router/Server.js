
/* DB 연결 */
const DB = require('../DB/DB_info');
/* http 연결 */
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

    /* 서버 시작 */
let server = http.createServer(function(request, response){
    console.log(`Server : ${request.url}, ${request.method}`);
    /* 메인페이지 받는 공간 */
    /* GET일때 받는 공간 js파일과 html파일 읽을때 */
    if(request.method==='GET'){
        const url_parts = url.parse(request.url, true).query;
        console.log(url_parts);
        if(request.url==='/Main.html'){
            fs.readFile('HTML/Main.html', function(error, data) {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            });
        } else if (request.url==='/HTML/Login.html'){
            /* Login페이지 띄어준다. */
            fs.readFile('HTML/Login.html', function(error, data) {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            });
        } else if (request.url==='/JS/Login.js') {
            request.on('data', function(){});
            request.on('end', function() {
                fs.readFile(`${__dirname}/../JS/Login.js`, function(error, data) {
                    // console.log(`${__dirname}/JS/Login.js`);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                });
            });
        } else if (request.url==='/JS/Board_List.js'){
            /* 바닐라 자바스크립트 다운 */
            request.on('data', function(){});
            request.on('end', function() {
                fs.readFile(`${__dirname}/../JS/Board_List.js`, function(error, data) {
                    // console.log(`${__dirname}/JS/Board.js`);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                });
            });
        } else if ( request.url==='/HTML/Board_List.html'){
            /* Board.html 사이트 get */
            fs.readFile(`${__dirname}/../HTML/Board_List.html`, function(error, data) {
                // console.log(`${__dirname}/HTML/Board.html`);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            });
        } else if (request.url.indexOf('/HTML/Board_List')!==-1){
             /* (페이징)js파일 사이트로 get */
            request.on('data', function(){
            });
            console.log(`a: ${url_parts.a}`);
            request.on('end', function() {
                DB.Board_List(url_parts.a, url_parts.b, function(result) {
                Board_List = JSON.stringify(result); 
                response.writeHead(200, { 'Content-Type': 'text/plain'});
                response.end(Board_List);
                });
            });
        } else if (request.url ===`/HTML/Page`){
                /* 게시판 목록 게시글 갯수 전달 */
                request.on('data', () => {
                }).on('end', function() {
                    DB.page(function(result){
                        let a = JSON.stringify(result);
                        response.writeHead(200, { 'Content-Type': 'text/plain'});
                        response.end(a);
                    });
                });
        } else if (request.url.indexOf('/HTML/Update.html')!==-1){
            /* 게시글 하나 보고 안에서 수정할려고 만든 페이지 */
            fs.readFile(`${__dirname}/../HTML/Update.html`, function(error, data) {
                
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            });
        } else if (request.url==='/JS/Update.js'){
            /* 바닐라 자바스크립트 다운 */
            request.on('data', function(){});
            request.on('end', function() {
                fs.readFile(`${__dirname}/../JS/Update.js`, function(error, data) {
                    // console.log(`${__dirname}/JS/Board.js`);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                });
            });
        } else if (request.url.indexOf('/HTML/Update?idx')!==-1) {
            /* 게시판 글 클릭해서 데이터 받는 곳 */ 
            console.log('1');
            request.on('data', () =>{});
            console.log('2');
            request.on('end', function() {
                console.log('3');
                DB.View (url_parts.idx, function(result) {
                Board_List = JSON.stringify(result); 
                response.writeHead(200, { 'Content-Type': 'text/plain'});
                response.end(Board_List);
                });
            });
        } else if (request.url.indexOf('/HTML/Delete?')!== -1) {    
            /* 삭제 액션  */
            request.on('data', ()=>{}).on('end',() => {
                DB.Delete(url_parts.idx, function(result){
                let Board_List = JSON.stringify(result); 
                response.writeHead(200, { 'Content-Type': 'text/plain'});
                response.end(Board_List);
                });
            }); 
        
        } else if (request.url.indexOf('/HTML/Update_Action.html') !== -1){
            //  update버튼 클릭하는 다음 일어나는 
            fs.readFile(`${__dirname}/../HTML/Update_Action.html`, function(error, data){
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            })
        } else if (request.url==='/JS/Board_List.js'){
            /* 바닐라 자바스크립트 다운 */
            request.on('data', function(){});
            request.on('end', function() {
                fs.readFile(`${__dirname}/../JS/Board_List.js`, function(error, data) {
                    // console.log(`${__dirname}/JS/Board.js`);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                });
            });
        } else if (request.url.indexOf('Update_Action.js')!== -1){
            /* 수정 페이지 바닐라자바스크립트 다운 */
            request.on('data', function(){});
            request.on('end', function() {
                fs.readFile(`${__dirname}/../JS/Update_Action.js`, function(error, data) {
                    // console.log(`${__dirname}/JS/Board.js`);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                });
            });
        } else {
             /* 서버가 없을때  */
            response.writeHead(404, {'content-Type' : 'text/plain' });
            response.write('404 Error');
        }    
    } 

    /* POST일때 받는 공간 데이터 주고 받을때 */
    if(request.method==='POST'){
        if (request.url==='/HTML/Login') {          
            console.log('1.Login, POST');
            let data = '';
            /* 'data'는 이벤트에서 발생시킨 buffer(chunk)입니다. */
            request.on('data', function(chunk){
                data += chunk;
            });
            request.on('end', function() {
                console.log('Login, end');
                const chunk_type = querystring.parse(data);
                post(request, chunk_type, function(result){
                    console.log('2. Login, post');
                    if(result ==='success'){
                        response.writeHead(200, {'Content-Type' : 'text/plain'});
                        response.end('success');
                    }else if (result ==='fail'){
                        response.writeHead(200, {'Content-Type' : 'text/plain'});
                        response.end('fail');
                    }
                });
            });
        } else if (request.url === '/HTML/Update_Action'){
            /* 데이터를 수정할때  */
            console.log('1.Update_Action, POST');
            let data = '';
            /* 'data'는 이벤트에서 발생시킨 buffer(chunk)입니다. */
            request.on('data', function(chunk){
                data += chunk;
            });
            request.on('end', function() {
                console.log('1. Update_Action, end');
                const chunk_type = querystring.parse(data);
                post(request, chunk_type, function(result){
                    console.log('2. Update_Action, post');
                    console.log(`result : ${result}`);
                    if(result === 'success'){
                        response.writeHead(200, {'Content-Type' : 'text/plain'});
                        response.end('success');
                    }else if (result ==='fail'){
                        response.writeHead(200, {'Content-Type' : 'text/plain'});
                        response.end('fail');
                    }
                });
            });
        
        
        } else {
            /* 서버가 없을때  */
            response.writeHead(404, {'content-Type' : 'text/plain' });
            response.write('404 Error');
        }
    }
    
}).listen(2019);

/* 데이터베이스에 데이터를 넣을려는 함수 */
function post(request, chunk_type, callback) {
    
    const path = url.parse(request.url, true).pathname;  //  url.parse 는 분해하는 것. tur
    if(path==='/HTML/Login'){
        /* 로그인 페이지 */
        console.log(chunk_type);
        const userid = chunk_type.userid;
        const password = chunk_type.password;
        console.log(`id : ${userid} pw : ${password}`);
        DB.Login(userid, password, function(result) { 
            console.log(`DB.Login : ${userid} ${password}`);
            callback(result);
        });
    }else if(path==='/HTML/Update_Action'){
        const idx = chunk_type.idx
        const title = chunk_type.title;
        const text = chunk_type.text;
        const writer = chunk_type.writer;
        DB.Update(idx, title, text, writer ,function(result){
            console.log(`post : ${result}`);
            callback(result);
        });
    }
};

// else if (request.url ===`/HTML/Page`){
//     /* 게시판 목록 게시글 갯수 전달 */
//     let Page = [];
//     request.on('data', (chunk) => {
//         Page += chunk;
//     }).on('end', function() {
//         DB.page(function(result){
//             let a = JSON.stringify(result);
//             response.writeHead(200, { 'Content-Type': 'text/plain'});
//             response.end(a);
//         });
//     });
// }

// else if (request.url ===`/HTML/Board_List`){
//     /* 게시판 목록(첫게시판) */
//     let Board_List = [];
//     request.on('data', (chunk) => {
//         Board_List += chunk;
//     }).on('end', function() {
//         const chunk_type = querystring.parse(Board_List);
//         console.log(chunk_type.a, chunk_type.b);
//         DB.Board_List(chunk_type.a, chunk_type.b, function(result) {
//         Board_List = JSON.stringify(result); 
//         response.writeHead(200, { 'Content-Type': 'text/plain'});
//         response.end(Board_List);
//         });
//     });
// }


// //else if (request.url.indexOf(`/HTML/Paging`) !== -1) {
//             /* 게시판 페이징 (2번째 페이지부터) */
//             let Page = [];
//             request.on('data', (chunk) => {
//                 Page += chunk;
//             }).on('end', function() {
//                 /* ajax에서 온 데이터 변환 */
//                 const chunk_type = querystring.parse(Page);
//                 let a = chunk_type.a;
//                 let b = chunk_type.b;
//                 console.log(`Page : ${Page}`);
//                 DB.Board_Paging(a, b, function(result){
//                     let data= JSON.stringify(result);
//                     response.writeHead(200, { 'Content-Type': 'text/plain'});
//                     response.end(data);
//                 });
//             });
//         }

