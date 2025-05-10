const authRoutes = require("./authRoutes");
const presenceRoutes = require("./presenceRoutes");

const routes = (req, res) => {
  if (req.url.startsWith("/api/login")) {
    authRoutes(req, res);
  } else if (req.url.startsWith("/api/presence")) {
    presenceRoutes(req, res);
  } else {
    res
      .writeHead(404, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Route not found" }));
  }
};

module.exports = routes;
