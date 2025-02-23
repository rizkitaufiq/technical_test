const pool = require("../config/db");

const presenceController = {
  async recordPresence(req, res) {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const { type } = JSON.parse(body);
        const userId = req.user.id;

        if (!type || !["IN", "OUT"].includes(type)) {
          return res.writeHead(400, { "Content-Type": "application/json" }).end(
            JSON.stringify({
              status: "error",
              message: "Presence type must be 'IN' or 'OUT'",
            })
          );
        }

        const today = new Date().toISOString().split("T")[0];
        const checkQuery = `
          SELECT COUNT(*) AS count FROM Epresence 
          WHERE id_users = $1 AND type = $2 AND DATE(waktu) = $3
        `;
        const checkResult = await pool.query(checkQuery, [userId, type, today]);

        if (parseInt(checkResult.rows[0].count) > 0) {
          return res.writeHead(400, { "Content-Type": "application/json" }).end(
            JSON.stringify({
              status: "error",
              message: `You have done your presence ${type} today`,
            })
          );
        }

        const insertQuery = `
          INSERT INTO Epresence (id_users, type, is_approve) 
          VALUES ($1, $2, FALSE) RETURNING *
        `;
        const result = await pool.query(insertQuery, [userId, type]);

        res.writeHead(201, { "Content-Type": "application/json" }).end(
          JSON.stringify({
            status: "success",
            message: `Presence ${type} successfully recorded`,
            data: result.rows[0],
          })
        );
      });
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" }).end(
        JSON.stringify({
          status: "error",
          message: "A server error occurred",
        })
      );
    }
  },
};

module.exports = presenceController;
