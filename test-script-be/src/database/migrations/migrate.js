const pool = require("../../config/db");

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    npp VARCHAR(20) NOT NULL,
    npp_supervisor VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL
)`;

const createEpresenceTable = `
CREATE TABLE IF NOT EXISTS epresence (
    id SERIAL PRIMARY KEY,
    id_users INT NOT NULL,
    type VARCHAR(10) CHECK (type IN ('IN', 'OUT')) NOT NULL,
    is_approve BOOLEAN DEFAULT FALSE,
    waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_users) REFERENCES users(id) ON DELETE CASCADE
)`;

const migrate = async () => {
  try {
    await pool.query(createUsersTable);
    console.log("Create users table");

    await pool.query(createEpresenceTable);
    console.log("Create epresence table");

    pool.end();
  } catch (err) {
    console.error("Error during migration:", err);
    pool.end();
  }
};

migrate();
