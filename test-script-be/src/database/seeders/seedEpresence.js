const pool = require("../../config/db");

const seedEpresence = async () => {
  const epresence = [
    {
      id_users: 1,
      type: "IN",
      is_approve: true,
    },

    {
      id_users: 1,
      type: "OUT",
      is_approve: false,
    },
  ];

  try {
    for (let presence of epresence) {
      await pool.query(
        `INSERT INTO epresence (id_users, type, is_approve) VALUES ($1, $2, $3)`,
        [presence.id_users, presence.type, presence.is_approve]
      );
    }
    console.log("Epresence seeded successfully!");
  } catch (err) {
    console.error("Error seeding epresence:", err);
  } finally {
    pool.end();
  }
};

seedEpresence();
