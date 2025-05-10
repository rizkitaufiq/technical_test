const pool = require("../../config/db");
const bcrypt = require("bcrypt");

const seedUsers = async () => {
  const users = [
    {
      nama: "Ananda Bayu",
      email: "bayu@gmail.com",
      npp: "12345",
      npp_supervisor: "11111",
      password: "password",
    },

    {
      nama: "Supervisor",
      email: "spv@gmail.com",
      npp: "11111",
      npp_supervisor: "-",
      password: "password",
    },
  ];

  try {
    for (let user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await pool.query(
        `INSERT INTO users (nama, email, npp, npp_supervisor, password) VALUES ($1, $2, $3, $4, $5)`,
        [user.nama, user.email, user.npp, user.npp_supervisor, hashedPassword]
      );
    }
    console.log("Users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  } finally {
    pool.end();
  }
};

seedUsers();
