const { presenceController } = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");

const presenceRoutes = (req, res) => {
  if (req.url === "/api/presence" && req.method === "POST") {
    authMiddleware(req, res, async () => {
      await presenceController.recordPresence(req, res);
    });
  }

  if (req.method === "GET" && req.url === "/api/presence/get") {
    return authMiddleware(req, res, () =>
      presenceController.getUserPresence(req, res)
    );
  }

  res
    .writeHead(404, { "Content-Type": "application/json" })
    .end(JSON.stringify({ message: "Route not found" }));
};

module.exports = presenceRoutes;
