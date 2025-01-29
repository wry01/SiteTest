const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const app = express();
app.use(express.json());
const port = 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Muitas requisições. Tente novamente mais tarde."
});

app.use(limiter);

function logVisitorIP(req) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const date = new Date().toISOString();
  const logEntry = `IP: ${ip}, Date: ${date}\n`;

  fs.appendFile('visitor-logs.txt', logEntry, (err) => {
    if (err) {
      console.error("Erro ao registrar o IP:", err);
    }
  });
}

let questionsAndAnswers = [];
const maxAge = 5 * 24 * 60 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  questionsAndAnswers = questionsAndAnswers.filter(q => now - q.timestamp < maxAge);
}, 24 * 60 * 60 * 1000);

app.get('/questions', (req, res) => {
  logVisitorIP(req);
  res.json(questionsAndAnswers);
});

app.post('/questions', (req, res) => {
  logVisitorIP(req);
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).send('Pergunta e resposta são necessárias');
  }
  const newQuestion = {
    question,
    answer,
    timestamp: Date.now()
  };
  questionsAndAnswers.push(newQuestion);
  res.status(201).send('Pergunta e resposta adicionadas');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
