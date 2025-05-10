require("dotenv").config();
const http = require("http");
const routes = require("./src/routes");

const server = http.createServer((req, res) => {
  routes(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
