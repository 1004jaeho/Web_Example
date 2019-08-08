/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable camelcase */
/* eslint-disable import/order */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const http = require('http');
const fs = require('fs'); // 파일 읽기, 쓰기 등 을 할 수 있는 모듈
const url = require('url');
const a = require('../DB/Db_info');

const querystring = require('querystring');

// 404 error message : 페이지 오류가 발생했을때,
function send404Message(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' }); // 단순한 글자 출력
  response.write('404 ERROR... ');
  response.end();
}
// 200 Okay : 정상적인 요청
function onRequest(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' }); // 웹페이지 출력
    fs.createReadStream('./Main.html').pipe(response); // 같은 디렉토리에 있는 index.html를 response 함
  } else if (request.method === 'POST') {
    // response.writeHead(200, { 'Content-Type': 'text/html' }); // 웹페이지 출력
    // fs.createReadStream('./Main.html').pipe(response); // 같은 디렉토리에 있는 index.html를 response 함

    let data = '';
    request.on('data', (chunk) => {
      data += chunk;
    });
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
  } else {
    response.send404Message = 404;
    // file이 존재 하지않을때,
    send404Message(response);
  }
}


function post(request, chunk_type, callback) {
  const path = url.parse(request.url, true).pathname; // url에서 path 추출
  const id = chunk_type.userid;
  const pw = chunk_type.password; 
  if (path === '/Login') { // 주소가 /Login이면
    a(id, pw, (result) => {
      console.log(result);
      callback(result);
    });
  } else { // 매칭되는 주소가 없으면
    response.statusCode = 404; // 404 상태 코드
    response.end('주소가 없습니다');
  }
}

http.createServer(onRequest).listen(8080);
console.log('Server Created...');
