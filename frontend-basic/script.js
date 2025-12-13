document.getElementById("bookingForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // page reload rokta hai

  const bookingData = {
    hall_name: document.getElementById("hall_name").value,
    customer_name: document.getElementById("customer_name").value,
    date: document.getElementById("date").value,
    start_time: document.getElementById("start_time").value,
    end_time: document.getElementById("end_time").value
  };

  try {
    const response = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById("message").innerText = "✅ Booking Successful!";
    } else {
      document.getElementById("message").innerText = "❌ " + result.error;
    }

  } catch (error) {
    document.getElementById("message").innerText = "❌ Server error";
  }
});
