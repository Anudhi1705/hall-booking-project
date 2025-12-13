const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// 🔹 TEST ROUTE
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 CREATE BOOKING
// CREATE booking with clash check
router.post("/", async (req, res) => {
  try {
    const { hall_name, date, start_time, end_time } = req.body;

    // Step 3a: DB se existing bookings fetch karo same hall & date ke liye
    const existingBookings = await Booking.findAll({
      where: { hall_name, date }
    });

    // Step 3b: Check for time overlap
    const isOverlap = existingBookings.some(booking => {
      return (
        start_time < booking.end_time && end_time > booking.start_time
      );
    });

    if (isOverlap) {
      // Overlap hua → reject
      return res.status(400).json({ error: "Booking time clash! Choose another time." });
    }

    // No clash → create booking
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

