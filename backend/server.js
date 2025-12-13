const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./db");         // DB connection
const Booking = require("./models/booking"); // Booking model

const app = express();
app.use(cors());
app.use(express.json());

// Test DB connection
sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB connection error:", err));

// Sync tables with new columns
sequelize.sync({ alter: true });

// ------------------- ROUTES -------------------

// Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [["id", "ASC"]] });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add new booking
app.post("/book-hall", async (req, res) => {
  try {
    const {
      hall_name,
      customer_name,
      email,
      phone,
      purpose,
      booking_type,
      rent,
      additional_charge,
      date,
      start_time,
      end_time,
    } = req.body;

    const booking = await Booking.create({
      hall_name,
      customer_name,
      email,
      phone,
      purpose,
      booking_type,
      rent,
      additional_charge,
      date,
      start_time,
      end_time,
    });

    res.status(201).json({ message: "Hall booked successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
});

// Update booking
app.put("/update-booking/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      hall_name,
      customer_name,
      email,
      phone,
      purpose,
      booking_type,
      rent,
      additional_charge,
      date,
      start_time,
      end_time,
    } = req.body;

    await Booking.update(
      {
        hall_name,
        customer_name,
        email,
        phone,
        purpose,
        booking_type,
        rent,
        additional_charge,
        date,
        start_time,
        end_time,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

// Approve booking
app.put("/update-status/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Booking.update(
      { status: "Approved" },
      { where: { id } }
    );

    res.json({ message: "Status updated to Approved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

// Delete booking
app.delete("/delete-booking/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.destroy({ where: { id } });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



