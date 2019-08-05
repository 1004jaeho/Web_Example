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

// 정상적안 요청 200..
server = http.createServer((req, res) => {
  let { url } = req;
  if (req.url === '/') {
    url = 'Main.html';
    res.writeHead(200, { 'Content-Type': 'text/html' }); // 웹페이지 출력
    fs.createReadStream('./Main.html').pipe(res); // 같은 페이지에 있는 Main.html을 response함
  } else {
    // file이 존재 하지 않을때,
    send404Message(res);
  }
  const LoginList = {
    list(req, res) {
      let sql = 'SELECT * FROM Web'; // 웹 목록
      dbconn.query(sql, (err, results, field) => {
                res.render('Web/Weblist', {data : ''})
            });
    },
  };
});

server.listen(8080);
console.log('Server Created');
