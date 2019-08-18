/* eslint-disable no-new-wrappers */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/order */
/* eslint-disable prefer-template */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-empty */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const DB  = require('../DB/Db_info');
const http = require('http');
const fs = require('fs'); // 파일 읽기, 쓰기 등 을 할 수 있는 모듈
const url = require('url');
const querystring = require('querystring');
//  서버 접속 문구


// 서버에 접속을 못 했을 때
function send404Message(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' }); // 단순한 글자 출력
  response.write('404 ERROR... ');
  response.end();
}

//  데이터를 주고 그값을 a콜백으로 호출해서 데이터를 넘긴다음 값을 비교
function post(request, chunk_type, callback) {
  const path = url.parse(request.url, true).pathname; // url에서 path 추출
  //  로그인 데이터들
  const id = chunk_type.userid;
  const pw = chunk_type.password;
  //  로그인 페이지
  if (path === '/Login') { // 주소가 /Login이면
    DB.a(id, pw, (result) => {
      console.log(result);
      callback(result);
    });
  } else if (path === '/New_Member') {
    //  회원 가입 페이지
    const createid = chunk_type.userid;
    const name = chunk_type.username;
    const gender = chunk_type.gender;
    const p_n = chunk_type.Phone_Number;
    const e_m = chunk_type.E_mail;
    const age = chunk_type.userage;
    const createpw = chunk_type.password; 
  
    console.log('post : b에 접근합니다.');
    console.log(chunk_type);
    DB.b(createid, name, gender, p_n, e_m, age, createpw, function(result) {
      //  b함수의 callback 값을 들고온다
      callback(result);
    });
  } else if (path === '/Write_Action') {
    //  게시판 글쓰기
    const title = chunk_type.Write_title;
    const text = chunk_type.Write_text;
    const writer = chunk_type.Write_writer;

    console.log(chunk_type);
    
    DB.c(title, text, writer, function(result) {
      callback(result);
    });
  } else if (path === '/View') {
    //  게시판 보기
    const title = chunk_type.title;
    const idx = chunk_type.idx;
    const writer = chunk_type.writer;
    console.log(title, idx, writer);
    DB.d(title, idx, writer, function(result) {
      callback(result);
      console.log(request);
    });
  } else if (path === '/Update_Action') {
    //  수정 하기
    const title = chunk_type.Write_title;
    const text = chunk_type.Write_text;
    const writer = chunk_type.Write_writer;
  } else { // 매칭되는 주소가 없으면
    response.statusCode = 404; // 404 상태 코드
    response.end('주소가 없습니다');
  }
}

let server = http.createServer(function(request, response) {
  //  내가 받은 request.url 값
  console.log('request', request.url, request.method);
  
  //  메인 페이지 가는 경로
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' }); // 웹페이지 출력
    fs.createReadStream('./Main.html').pipe(response); // 같은 디렉토리에 있는 index.html를 response 함
  } else if (request.method === 'POST' && request.url === '/Login') {
    let data = '';
    request.on('data', (chunk) => {
      data += chunk;
    });
    //  ======로그인 기능=====
    request.on('end', () => {
      const chunk_type = querystring.parse(data);
      //  데이터 비교후 값 출력
      post(request, chunk_type, function(result) {
        console.log(result);
        if (result === 'success') {
          response.writeHead(200, { 'Content-Type': 'text/plain' }); // header 설정
          response.end('success');
        } else if (result === 'fail') {
          response.writeHead(200, { 'Content-Type': 'text/plain' }); // header 설정
          response.end('fail');
        }
      });
    });
    //  =========회원가입=======
  } else if (request.method === 'POST' && request.url === '/New_Member') {
    let information = '';
    request.on('data', (chunk) => {
      information += chunk;
    });
    console.log(`회원가입 데이터 : ${information}`);
    request.on('end', () => {
      const chunk_type = querystring.parse(information);
      //  데이터 비교후 값 출력
      post(request, chunk_type, function(result) {
        console.log(result);
        //  여기서부터 회원가입 성공 여부
        if (result === 'success') {
          response.writeHead(200, { 'Content-Type': 'text/plain' }); // header 설정
          response.end('success');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/plain' }); // header 설정
          response.end('fail');
        }
      });
    });
  } else if (request.method === 'GET' && request.url === '/Board.html') {
    //  ======게시판 사이트 들어가는곳=========
    fs.readFile('Board.html', function(error, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else if (request.method === 'GET' && request.url === '/Write.html') {
    //  ======글쓰기 사이트 들어가는곳========
    fs.readFile('Write.html', function(error, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else if (request.method === 'POST' && request.url === '/Write_Action') {
    //  게시판 글쓰는 곳
    let board = '';
    request.on('data', (chunk) => {
      board += chunk;
    });
    console.log(`게시판 데이터 : ${board}`);
    request.on('end', () => {
      const chunk_type = querystring.parse(board);
      post(request, chunk_type, function(result) {
        console.log(result);
        //  여기서부터 게시판 글쓰기  성공 여부
        if (result === 'success') {
          response.writeHead(200, { 'Content-Type': 'text/plain' }); // header 설정
          response.end('success');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/plain' }); // header 설정
          response.end('fail');
        }
      });
    });
  } else if (request.method === 'POST' && request.url === '/Board') {
    let board = '';
    request.on('data', (chunk) => {
      board += chunk;
    });
    request.on('end', () => {
      const chunk_type = querystring.parse(board);
      
      post(request, chunk_type, function(result) {
        response.writeHead(200, { 'Content-Type': 'ajax' }); // header 설정
        response.end('바보');
      });
    });
  } else if (request.method === 'GET' && request.url === '/Update.html') {
    //  수정 페이지 추출
    fs.readFile('Update.html', function(error, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else if (request.method === 'POST' && request.url === '/Update_Action') {
    let update = '';
    request.on('data', (chunk) => {
      update += chunk;
    });
    request.on('end', function(result) {
      chunk_type = querystring.parse(update);
      post(request, chunk_type, function(result) {
        console.log(result);
        //  수저 완료 비교
        if (result === 'success') {
          response.writeHead(200, { 'Content-Type': 'text/plain' }); // header 설정
          response.end('success');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/plain' }); // header 설정
          response.end('fail');
        }
      });
    });
  } else if (request.method === 'POST' && request.url === '/Delete') {
    //   글 삭제 
  } else if (request.url === '/View.html' && request.method === 'GET') {
    //  게시판 보기 페이지 
    fs.readFile('View.html', function(error, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
    request.on('data', (chunk) => {
      let data = [];
      data.push(chunk);
      console.log(chunk);
      DB.g(function(result) {
        console.log(result);
        // response.writeHead(200, { 'Content-Type': 'text/plain' });
        // response.end(result);
      });
    // }).on('end', () => {
    //   data = Buffer.concat(data).toString();
    //   console.log(data);
    });
  } else if (request.url === '/View' && request.method === 'POST') {
    let date = [];
    request.on('data', (chunk) => {
      date += chunk;
      console.log(date);
    }).on('end', () => {
      console.log('2');
      // date = querystring.parse(date);
      console.log('1');
      DB.g(function(result) {
        // console.log(result);
        date = JSON.stringify(result);
        
        console.log(date);
        response.writeHead(200, { 'Content-Type': 'application/JSON' });
        response.end(date);
      });
      // console.log(date);
    });
  } else {
    //  post도 아니고 get도 아닌 경우!
    response.send404Message = 404;
    send404Message(response);
  }
}).listen(8080);
