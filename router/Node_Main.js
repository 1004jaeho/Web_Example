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
    response.writeHead(200, { 'Content-Type': 'text/html' }); // 웹페이지 출력
    fs.createReadStream('./Main.html').pipe(response); // 같은 디렉토리에 있는 index.html를 response 함
    post(request);
    request.on('data', (chunk) => {
      console.log(chunk.toString());
      const data = querystring.parse(chunk.toString());
      response.writeHead(200, { 'Content-Type': 'text/html' }); // header 설정
      response.end(`id : ${  data.userid  } pw : ${  data.password}`);
    });
    
  } else {
    response.send404Message = 404;
    // file이 존재 하지않을때,
    send404Message(response);
  }
}

function post(request, response) {
  const path = url.parse(request.url, true).pathname; // url에서 path 추출
  if (path === '/Login') { // 주소가 /Login이면
    a(request, (result) => {
      console.log(result);
    });
  } else { // 매칭되는 주소가 없으면
    response.statusCode = 404; // 404 상태 코드
    response.end('주소가 없습니다');
  }
}

http.createServer(onRequest).listen(8080);
console.log('Server Created...');
