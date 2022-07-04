const fs = require("fs");
const path = require("path");

function showUsers() {
  const filePath = path.join(__dirname, "../data/users.json");
  return fs.readFileSync(filePath);
}

module.exports = showUsers;
