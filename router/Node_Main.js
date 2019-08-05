const http = require('http');
const fs = require('fs'); // 파일 읽기, 쓰기 등을 할 수 있는 모듈

const dbconObj = require('../DB/Db_info');
// 사용자 정의한 함수 사용
const dbconn = dbconObj.init();


// 비정상적인 요청 404...
function send404Message(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' }); // 단순한 글자 출력
  res.write('404 Error..');
  res.end();
}

function postHandler(req, res, reqUrl){
    req.setEncoding('utf8');
    req.on('data', (chunk)=>{
        res.writeHead(200);
        res.write('POST parameters : ' + chunk);
        res.end();
    });
}

.listen(8080);
console.log('Server Created');
