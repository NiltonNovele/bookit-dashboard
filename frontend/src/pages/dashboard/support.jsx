import { useState } from "react";

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Simple validation
    if (
      !form.subject.trim() ||
      !form.description.trim() ||
      !form.email.trim()
    ) {
      setError("Please fill all fields.");
      return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Create ticket object
    const newTicket = {
      id: Date.now(),
      subject: form.subject,
      description: form.description,
      email: form.email,
      status: "Open",
      createdAt: new Date().toLocaleString(),
    };

    // Add ticket to list
    setTickets((prev) => [newTicket, ...prev]);

    // Reset form
    setForm({ subject: "", description: "", email: "" });
    setSuccessMessage("Ticket submitted successfully!");

    // Log ticket (replace this with API call in future)
    console.log("New Support Ticket:", newTicket);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">
        Need Help? Submit a Ticket
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-semibold mb-1" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className="w-full border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.subject}
            onChange={handleChange}
            placeholder="Brief summary of your issue"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={5}
            className="w-full border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.description}
            onChange={handleChange}
            placeholder="Detailed description of the problem"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {successMessage && (
          <p className="text-green-600 font-semibold">{successMessage}</p>
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-6 py-3 rounded shadow hover:from-orange-600 hover:to-orange-700 transition"
        >
          Submit Ticket
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4 text-orange-700">
        Submitted Tickets
      </h2>

      {tickets.length === 0 ? (
        <p>No tickets submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="border border-orange-300 rounded p-4 shadow-sm bg-orange-50"
            >
              <h3 className="font-bold text-lg">{ticket.subject}</h3>
              <p className="text-sm italic text-orange-700 mb-1">
                {ticket.createdAt}
              </p>
              <p>{ticket.description}</p>
              <p className="mt-2 text-sm font-semibold">
                Status: {ticket.status}
              </p>
              <p className="text-xs text-orange-600">Contact: {ticket.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
