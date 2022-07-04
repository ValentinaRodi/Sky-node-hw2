// Написать обработчик запроса:
// - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
// - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
// - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
// - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
// - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

const http = require("http");
const showUsers = require("./module/users");
const hostname = "127.0.0.1";
const users = showUsers()

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");

  let name = url.searchParams.get("name");
  let usersreq = url.searchParams.get("users");
  
  if (usersreq === '') {
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.write(users);
  } else if (name) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain')
    response.statusMessage = `Hello, ${name}`;
    response.write(`Hello, ${name}`);
    response.end();
  } else if (name === '') {
    response.statusCode = 400;
    response.setHeader('Content-Type', 'text/plain')
    response.statusMessage = 'Enter a name';
    response.write('Enter a name');
    response.end();
  } else if (url.search === '') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain')
    response.statusMessage = 'Hello, World';
    response.write('Hello, World');
    response.end();
  } else {
    response.statusCode = 500;
    response.statusMessage = '';
    response.end();
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
