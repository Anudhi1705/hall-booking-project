// db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();  // .env file se DATABASE_URL load karne ke liye

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",       // PostgreSQL database
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,         // NeonDB ke liye SSL zaruri hai
      rejectUnauthorized: false  // Self-signed certificate allow karta hai
    }
  }
});

module.exports = sequelize;  // server.js me use karne ke liye

