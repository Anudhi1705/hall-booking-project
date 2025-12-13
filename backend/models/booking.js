// models/booking.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // your DB connection

const Booking = sequelize.define("Booking", {
  hall_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  bookingType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "General", // default booking type
  },
  rent: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0, // default rent
  },
  additionalCharge: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0, // default additional charges
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "", // default empty string to avoid NULL error
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "", // default empty string
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "", // default empty string
  },
});

module.exports = Booking;


