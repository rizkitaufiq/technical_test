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

  async getUserPresence(req, res) {
    try {
      const userId = req.user.id;

      const query = `
      SELECT 
        u.id AS id_user, 
        u.nama AS nama_user, 
        DATE(e_in.waktu) AS tanggal,
        TO_CHAR(e_in.waktu, 'HH24:MI:SS') AS waktu_masuk,
        TO_CHAR(e_out.waktu, 'HH24:MI:SS') AS waktu_pulang,
        CASE WHEN e_in.is_approve = true THEN 'APPROVE' ELSE 'REJECT' END AS status_masuk,
        CASE WHEN e_out.is_approve = true THEN 'APPROVE' ELSE 'REJECT' END AS status_pulang
      FROM users u
      LEFT JOIN epresence e_in ON u.id = e_in.id_users AND e_in.type = 'IN'
      LEFT JOIN epresence e_out ON u.id = e_out.id_users AND e_out.type = 'OUT'
      WHERE u.id = $1
      ORDER BY tanggal DESC;
    `;

      const result = await pool.query(query, [userId]);

      return res.writeHead(200, { "Content-Type": "application/json" }).end(
        JSON.stringify({
          message: "Absence history found",
          data: result.rows,
        })
      );
    } catch (error) {
      console.error("Error get presence data:", error);
      return res
        .writeHead(500, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "A server error occurred" }));
    }
  },
};

module.exports = presenceController;
