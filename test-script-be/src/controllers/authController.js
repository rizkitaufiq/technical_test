const { User } = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authController = {
  async login(req, res) {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const { email, password } = JSON.parse(body);

        const user = await User.findByEmail(email);
        if (!user) {
          return res.writeHead(401, { "Content-Type": "application/json" }).end(
            JSON.stringify({
              status: "error",
              message: "User not found",
            })
          );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.writeHead(401, { "Content-Type": "application/json" }).end(
            JSON.stringify({
              status: "error",
              message: "Password Invalid",
            })
          );
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          "jwt_secret",
          { expiresIn: "1h" }
        );

        res.writeHead(200, { "Content-Type": "application/json" }).end(
          JSON.stringify({
            status: "success",
            message: "Login successful",
            token,
            user: {
              nama: user.name,
              email: user.email,
              npp: user.npp,
            },
          })
        );
      });
    } catch (err) {
      console.error("Error during login:", err);
      return res.writeHead(500, { "Content-Type": "application/json" }).end(
        JSON.stringify({
          status: "error",
          message: "Login failed",
        })
      );
    }
  },
};

module.exports = authController;
