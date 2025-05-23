import { useState, useRef } from "react";

export default function Bookings() {
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      person: {
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "123-456-7890",
      },
      service: "Haircut",
      date: "2025-06-01T14:00:00",
      status: "Pending",
    },
    {
      id: 2,
      person: {
        name: "Bob Smith",
        email: "bob@example.com",
        phone: "987-654-3210",
      },
      service: "Dental Checkup",
      date: "2025-04-10T10:00:00",
      status: "Confirmed",
    },
    {
      id: 3,
      person: {
        name: "Carol Lee",
        email: "carol@example.com",
        phone: "555-222-1111",
      },
      service: "Massage Therapy",
      date: "2025-03-20T16:30:00",
      status: "Cancelled",
    },
  ]);

  const now = new Date();

  // Separate upcoming and past bookings
  const upcoming = bookings.filter((b) => new Date(b.date) >= now);
  const past = bookings.filter((b) => new Date(b.date) < now);

  // Confirm booking handler
  function confirmBooking(id) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Confirmed" } : b))
    );
  }

  // Cancel booking handler
  function cancelBooking(id) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Print handler
  function handlePrint() {
    // Prepare HTML content for printing all bookings
    const printContent = `
      <html>
        <head>
          <title>All Bookings</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1 { color: #ea580c; }
            h2 { color: #c2410c; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f97316; color: white; }
            .status-Pending { background-color: #fef3c7; color: #92400e; }
            .status-Confirmed { background-color: #bbf7d0; color: #166534; }
            .status-Cancelled { background-color: #fecaca; color: #991b1b; }
          </style>
        </head>
        <body>
          <h1>All Bookings</h1>

          <h2>Upcoming Bookings</h2>
          ${
            upcoming.length === 0
              ? "<p>No upcoming bookings.</p>"
              : `<table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Date & Time</th>
                      <th>Booked By</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${upcoming
                      .map(
                        (b) => `
                      <tr>
                        <td>${b.service}</td>
                        <td>${formatDate(b.date)}</td>
                        <td>${b.person.name}</td>
                        <td>${b.person.email}</td>
                        <td>${b.person.phone}</td>
                        <td class="status-${b.status}">${b.status}</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>`
          }

          <h2>Past Bookings</h2>
          ${
            past.length === 0
              ? "<p>No past bookings.</p>"
              : `<table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Date & Time</th>
                      <th>Booked By</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${past
                      .map(
                        (b) => `
                      <tr>
                        <td>${b.service}</td>
                        <td>${formatDate(b.date)}</td>
                        <td>${b.person.name}</td>
                        <td>${b.person.email}</td>
                        <td>${b.person.phone}</td>
                        <td class="status-${b.status}">${b.status}</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>`
          }
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-orange-600 flex justify-between items-center">
        Your Bookings
        <button
          onClick={handlePrint}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded transition"
        >
          Print All Bookings
        </button>
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-orange-700">
          Upcoming Bookings
        </h2>
        {upcoming.length === 0 ? (
          <p>No upcoming bookings.</p>
        ) : (
          <ul className="space-y-6">
            {upcoming.map((b) => (
              <li
                key={b.id}
                className="border border-orange-300 rounded p-4 shadow-sm bg-orange-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{b.service}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      b.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : b.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <p>
                  <strong>Date & Time:</strong> {formatDate(b.date)}
                </p>
                <p>
                  <strong>Booked by:</strong> {b.person.name}
                </p>
                <p>
                  <strong>Email:</strong> {b.person.email}
                </p>
                <p>
                  <strong>Phone:</strong> {b.person.phone}
                </p>

                <div className="mt-4 flex space-x-4">
                  {b.status !== "Confirmed" && b.status !== "Cancelled" && (
                    <>
                      <button
                        onClick={() => confirmBooking(b.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition"
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}

                  {(b.status === "Confirmed" || b.status === "Cancelled") && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      disabled={b.status === "Cancelled"}
                      className={`${
                        b.status === "Cancelled"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white font-semibold px-4 py-2 rounded transition`}
                    >
                      {b.status === "Cancelled"
                        ? "Cancelled"
                        : "Cancel Booking"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-orange-700">
          Past Bookings
        </h2>
        {past.length === 0 ? (
          <p>No past bookings.</p>
        ) : (
          <ul className="space-y-6">
            {past.map((b) => (
              <li
                key={b.id}
                className="border border-gray-300 rounded p-4 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{b.service}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      b.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : b.status === "Cancelled"
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <p>
                  <strong>Date & Time:</strong> {formatDate(b.date)}
                </p>
                <p>
                  <strong>Booked by:</strong> {b.person.name}
                </p>
                <p>
                  <strong>Email:</strong> {b.person.email}
                </p>
                <p>
                  <strong>Phone:</strong> {b.person.phone}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
