const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let savedData = ''; // Render 테스트용, 메모리 저장 (DB 아님)

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/save', (req, res) => {
  savedData = req.body.text;
  console.log('✅ 저장됨:', savedData);
  res.json({ status: 'ok' });
});

app.get('/api/load', (req, res) => {
  res.json({ text: savedData });
});

app.get('/', (req, res) => res.send('Render API 서버입니다.'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 서버 실행중 on port ${port}`));
