const mysql = require('mysql');
const os = require('os'); // 호스트 이름을 가져오기 위한 모듈

const dbConnInfo = {
  // db 주소록
  local: {
    host: '127.0.0.1', // db ip address
    port: '3306', // db port Number
    user: 'root', // db id
    password: 'dudrbehd12!', // db password
    database: 'Web', // db schema name
  },
};

const dbConnection = {
  init() {
    const hostname = os.hostname();
    if (hostname === 'abcd') {
      return mysql.createConnection(dbConnInfo.local); // 로컬 개발 환경
    }
  },
  db_open(con) {
    con.connect((err) => {
      if (err) {
        console.error('mysql connect error');
      } else {
        console.info('mysql is connect success');
      }
    });
  },
};

module.exports = dbConnection;
