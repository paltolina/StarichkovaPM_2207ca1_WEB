const http = require('http');
const fs = require('fs');

const filePath = 'C:\Users\polin\Desktop\domashka\веб\lab4\text.txt';
function handleGetRequest(req, res) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      console.error('Ошибка чтения файла:', err);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(data);
  });
}
function handlePostRequest(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    fs.appendFile(filePath, body, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        console.error('Ошибка записи в файл:', err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Готово');
    });
  });
}
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    handleGetRequest(req, res);
  } else if (req.method === 'POST' && req.url === '/') {
    handlePostRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Страница не найдена');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});