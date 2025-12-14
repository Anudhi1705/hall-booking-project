import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  // Form states
  const [hallName, setHallName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [rent, setRent] = useState("");
  const [additionalCharge, setAdditionalCharge] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Data states
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  };

  const handleBooking = async () => {
    if (
      !hallName ||
      !customerName ||
      !email ||
      !phone ||
      !purpose ||
      !bookingType ||
      !rent ||
      !date ||
      !startTime ||
      !endTime
    ) {
      alert("Please fill all fields");
      return;
    }

    const bookingData = {
      hall_name: hallName,
      customer_name: customerName,
      email,
      phone,
      purpose,
      booking_type: bookingType,
      rent,
      additional_charge: additionalCharge,
      date,
      start_time: startTime,
      end_time: endTime,
    };



    const url = editingId
      ? `http://localhost:5000/update-booking/${editingId}`
      : "http://localhost:5000/book-hall";

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      alert(data.message);

      fetchBookings();
      setEditingId(null);

      // Clear form
      setHallName("");
      setCustomerName("");
      setEmail("");
      setPhone("");
      setPurpose("");
      setBookingType("");
      setRent("");
      setAdditionalCharge("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error(error);
      alert("Booking failed!");
    }
  };

  const handleBack = () => {
  // Previous page pe le jaata hai
  window.history.back();
};

const handleDoNotBook = () => {
  // Form clear + editing cancel
  setEditingId(null);

  setHallName("");
  setCustomerName("");
  setEmail("");
  setPhone("");
  setPurpose("");
  setBookingType("");
  setRent("");
  setAdditionalCharge("");
  setDate("");
  setStartTime("");
  setEndTime("");

  alert("Booking cancelled");
};


  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/delete-booking/${id}`, {
      method: "DELETE",
    });
    fetchBookings();
  };

  const handleApprove = async (id) => {
    await fetch(`http://localhost:5000/update-status/${id}`, {
      method: "PUT",
    });
    fetchBookings();
  };

  const handleEdit = (b) => {
    setEditingId(b.id);
    setHallName(b.hall_name);
    setCustomerName(b.customer_name);
    setEmail(b.email);
    setPhone(b.phone);
    setPurpose(b.purpose);
    setBookingType(b.booking_type);
    setRent(b.rent);
    setAdditionalCharge(b.additional_charge);
    setDate(b.date);
    setStartTime(b.start_time);
    setEndTime(b.end_time);
  };

  return (
    <div className="container">
      {/* FORM */}
      <div className="card">
        <h2>{editingId ? "Edit Booking" : "Hall Booking Form"}</h2>

        <label>Hall Name</label>
        <input value={hallName} onChange={(e) => setHallName(e.target.value)} />

        <label>Customer Name</label>
        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Phone Number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Purpose of Booking</label>
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} />

        <label>Booking Type</label>
        <select value={bookingType} onChange={(e) => setBookingType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Conference">Conference</option>
          <option value="Wedding">Wedding</option>
          <option value="Meeting">Meeting</option>
          <option value="Party">Party</option>
        </select>

        <label>Rent</label>
        <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} />

        <label>Additional Charges</label>
        <input
          type="number"
          value={additionalCharge}
          onChange={(e) => setAdditionalCharge(e.target.value)}
        />

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Start Time</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

        <label>End Time</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
  <button className="primary" onClick={handleBooking}>
    {editingId ? "Update Booking" : "Book Hall"}
  </button>

  <button onClick={handleBack}>
    Back
  </button>

  <button className="danger" onClick={handleDoNotBook}>
    Do Not Book
  </button>
</div>

      </div>

      {/* TABLE */}
      <div className="card">
        <h3>All Bookings</h3>

        {/* Scrollable wrapper */}
        <div style={{ overflowX: "auto", border: "1px solid #ccc", borderRadius: "5px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px" }}>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>Hall</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Purpose</th>
                <th>Type</th>
                <th>Rent</th>
                <th>Extra</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.hall_name}</td>
                  <td>{b.customer_name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.purpose}</td>
                  <td>{b.booking_type}</td>
                  <td>{b.rent}</td>
                  <td>{b.additional_charge}</td>
                  <td>{b.date}</td>
                  <td>{b.start_time}</td>
                  <td>{b.end_time}</td>
                  <td>{b.status}</td>
                  <td>
                    <button onClick={() => handleEdit(b)}>Edit</button>
                    <button className="danger" onClick={() => handleDelete(b.id)}>
                      Delete
                    </button>
                    {b.status === "Pending" && (
                      <button className="success" onClick={() => handleApprove(b.id)}>
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;







