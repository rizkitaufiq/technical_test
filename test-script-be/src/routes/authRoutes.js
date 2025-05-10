const { authController } = require("../controllers");

const authRoutes = (req, res) => {
  if (req.method === "POST" && req.url === "/api/login") {
    authController.login(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        status: "error",
        message: "Route not found",
      })
    );
  }
};

module.exports = authRoutes;
