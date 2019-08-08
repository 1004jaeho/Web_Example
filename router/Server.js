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
const http = require('http');
const fs = require('fs'); // 파일 읽기, 쓰기 등 을 할 수 있는 모듈
const url = require('url');
const querystring = require('querystring');
const a = require('../DB/Db_info');
const pathname = require('path');
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
  const id = chunk_type.userid;
  const pw = chunk_type.password;

  //  로그인 페이지
  if (path === '/Login') { // 주소가 /Login이면
    a(id, pw, (result) => {
      console.log(result);
      callback(result);
    });
  } else { // 매칭되는 주소가 없으면
    response.statusCode = 404; // 404 상태 코드
    response.end('주소가 없습니다');
  }
  //  회원 가입 페이지
  // if (path === '/New_Member') {
  //   b(id, pw, username, gender, p_n, E_M, age, function(result) {
  //     //  b함수의 callback 값을 들고온다
  //     callback(result);
  //   });
  // } else { // 매칭되는 주소가 없으면
  //   response.send404Message = 404;
  //   response.end('주소가 없습니다');
  // }
}

let server = http.createServer(function(request, response) {
  //  내가 받은 request.url 값
  console.log('request', request.url, request.method);
  
  //  메인 페이지 가는 경로
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' }); // 웹페이지 출력
    fs.createReadStream('./Main.html').pipe(response); // 같은 디렉토리에 있는 index.html를 response 함
  } else if (request.method === 'POST' && request.url === '/login') {
    let data = '';
    request.on('data', (chunk) => {
      data += chunk;
    });
    //  로그인 기능
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
  } else if (request.method === 'GET' && request.url === '/New_Member.html') {
    console.log('회원가입');
  } else {
    //  post도 아니고 get도 아닌 경우!
    response.send404Message = 404;
    send404Message(response);
  }
  //  회원가입 기능
}).listen(8080);
