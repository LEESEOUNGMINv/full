const express = require('express');
const port = process.env.PORT || 3007;
const path = require('path');
const bodyParser = require('body-parser');
const hdb = require('hdb');
const app = express();
const cds = require('@sap/cds');

async function init() {
  // CDS 모델 로드
  await cds.connect();
  await cds.load('srv/cat-service.cds');

  // OData 엔드포인트 설정
  app.use('/odata', cds.server);
}

init();

// JSON 형식의 데이터를 파싱하기 위한 미들웨어 추가
app.use(bodyParser.json());

// 정적 파일을 제공하기 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, '../webapp')));

// HANA 데이터베이스 연결 설정
const client = hdb.createClient({
  host: '04c5a0f8-8e74-49a6-90f1-b7e973dbb6fc.hana.trial-us10.hanacloud.ondemand.com',
  port: 443, // HANA 포트 (기본값)
  user: 'DBADMIN',
  password: 'F0d9qwjig!',
});

// HANA 데이터베이스 연결 오류
client.connect((err) => {
  if (err) {
    console.error('Error connecting to HANA database:', err);
    return;
  }
  console.log('Connected to HANA database');
});

// 사용자 생성 (회원가입)
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const sql = `INSERT INTO Users (username, password) VALUES ('${username}', '${password}')`;
  client.exec(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error creating user');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});

// 사용자 인증 (로그인)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`;
  client.exec(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error authenticating user');
    } else {
      if (result.length > 0) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid username or password');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
