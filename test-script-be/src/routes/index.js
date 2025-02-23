const authRoutes = require("./authRoutes");

const routes = (req, res) => {
  authRoutes(req, res);
};

module.exports = routes;
