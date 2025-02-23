const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.writeHead(401, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        status: "error",
        message: "Akses denie, token not available",
      })
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        status: "error",
        message: "Invalid Token",
      })
    );
  }
};

module.exports = authMiddleware;
