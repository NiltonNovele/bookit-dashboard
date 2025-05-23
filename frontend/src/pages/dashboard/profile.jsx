import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
];

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    services: [{ name: "", price: "" }],
    schedule: {}, // { "Mon_08:00 - 10:00": true, ... }
    pictures: [],
  });

  // Handle text input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  // Handle schedule checkbox toggle
  function toggleSchedule(day, slot) {
    const key = `${day}_${slot}`;
    setProfile((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [key]: !prev.schedule[key],
      },
    }));
  }

  // Handle services changes
  function handleServiceChange(index, field, value) {
    const newServices = [...profile.services];
    newServices[index][field] = value;
    setProfile((prev) => ({ ...prev, services: newServices }));
  }

  // Add new service entry
  function addService() {
    setProfile((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", price: "" }],
    }));
  }

  // Remove service entry
  function removeService(index) {
    const newServices = profile.services.filter((_, i) => i !== index);
    setProfile((prev) => ({ ...prev, services: newServices }));
  }

  // Handle image upload
  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setProfile((prev) => ({
      ...prev,
      pictures: [...prev.pictures, ...urls],
    }));
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">
        Edit Your Profile
      </h1>

      <form className="space-y-6">
        {/* Basic info */}
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Business Name
          </label>
          <input
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            type="text"
            placeholder="Your full name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            type="tel"
            placeholder="+1 555 123 4567"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-semibold mb-1">
            Location
          </label>
          <input
            id="location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            type="text"
            placeholder="City, Address or Area"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block font-semibold mb-1">
            Short Bio / Description
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Write a short bio that will appear on your listings."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Services */}
        <div>
          <label className="block font-semibold mb-2">Services & Prices</label>
          {profile.services.map((service, i) => (
            <div key={i} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Service name"
                value={service.name}
                onChange={(e) => handleServiceChange(i, "name", e.target.value)}
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="number"
                placeholder="Price"
                value={service.price}
                onChange={(e) =>
                  handleServiceChange(i, "price", e.target.value)
                }
                className="w-24 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                min="0"
              />
              <button
                type="button"
                onClick={() => removeService(i)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="mt-2 px-4 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
          >
            + Add Service
          </button>
        </div>

        {/* Schedule */}
        <div>
          <label className="block font-semibold mb-2">
            Open Slots / Schedule
          </label>
          <div className="overflow-auto max-w-full border border-gray-300 rounded p-2 grid grid-cols-7 gap-2">
            {/* Header */}
            {days.map((day) => (
              <div key={day} className="font-bold text-center">
                {day}
              </div>
            ))}

            {/* For each time slot, show checkboxes under each day */}
            {timeSlots.map((slot) =>
              days.map((day) => {
                const key = `${day}_${slot}`;
                return (
                  <label
                    key={key}
                    className="text-xs flex items-center justify-center cursor-pointer select-none"
                    title={`${day} ${slot}`}
                  >
                    <input
                      type="checkbox"
                      checked={!!profile.schedule[key]}
                      onChange={() => toggleSchedule(day, slot)}
                      className="mr-1"
                    />
                    <span className="truncate max-w-[50px]">{slot}</span>
                  </label>
                );
              })
            )}
          </div>
          <p className="text-sm mt-1 text-gray-600">
            Select days and times when you are open for bookings.
          </p>
        </div>

        {/* Pictures */}
        <div>
          <label htmlFor="pictures" className="block font-semibold mb-2">
            Upload Pictures
          </label>
          <input
            id="pictures"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block mb-4"
          />
          <div className="flex flex-wrap gap-4">
            {profile.pictures.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Uploaded pic ${i + 1}`}
                className="w-24 h-24 object-cover rounded border border-gray-300"
              />
            ))}
          </div>
        </div>
      </form>

      {/* Preview */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-orange-700">
          Profile Preview
        </h2>
        <div className="border border-gray-300 rounded p-6 bg-orange-50 shadow-sm max-w-md">
          <h3 className="text-xl font-bold mb-1">
            {profile.name || "Your Name"}
          </h3>
          <p className="text-gray-700 mb-1">
            {profile.bio || "Your bio or description will appear here."}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Email:</strong> {profile.email || "your.email@example.com"}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Phone:</strong> {profile.phone || "+1 555 123 4567"}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            <strong>Location:</strong> {profile.location || "Your location"}
          </p>

          <div>
            <strong>Services Offered:</strong>
            {profile.services.length === 0 ||
            profile.services.every((s) => !s.name) ? (
              <p className="text-gray-600 italic">No services added yet.</p>
            ) : (
              <ul className="list-disc list-inside">
                {profile.services.map((service, i) =>
                  service.name ? (
                    <li key={i}>
                      {service.name}{" "}
                      {service.price ? `- $${service.price}` : ""}
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>

          <div className="mt-4">
            <strong>Open Slots:</strong>
            {Object.entries(profile.schedule).filter(([, val]) => val)
              .length === 0 ? (
              <p className="text-gray-600 italic">No open slots selected.</p>
            ) : (
              <ul className="list-disc list-inside max-h-32 overflow-auto text-sm">
                {Object.entries(profile.schedule)
                  .filter(([, val]) => val)
                  .map(([key]) => (
                    <li key={key}>{key.replace("_", " ")}</li>
                  ))}
              </ul>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.pictures.length === 0 ? (
              <p className="text-gray-600 italic">No pictures uploaded.</p>
            ) : (
              profile.pictures.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Uploaded pic ${i + 1}`}
                  className="w-20 h-20 object-cover rounded border border-gray-300"
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
