import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Home, Calendar, Mail, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-3 text-white">
            Stay Updated
          </h3>
          <p className="text-zinc-400 mb-4">
            Subscribe to our newsletter and never miss a new service or deal.
          </p>
          <form
            action="https://formsubmit.co/nilton.novele@gmail.com"
            method="POST"
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            {/* Optional: Disable CAPTCHA */}
            <input type="hidden" name="_captcha" value="false" />

            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="bg-transparent border border-zinc-600 text-white px-3 py-2 w-full sm:w-auto rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition text-sm w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <div className="flex flex-col gap-2 text-zinc-400">
            <Link
              href="/"
              className="hover:text-red-500 transition flex items-center gap-2"
            >
              <Home size={16} /> Home
            </Link>
            <Link
              href="/events"
              className="hover:text-red-500 transition flex items-center gap-2"
            >
              <Calendar size={16} /> About BookIt!
            </Link>
            <Link
              href="/events"
              className="hover:text-red-500 transition flex items-center gap-2"
            >
              <Brain size={16} />
              BookAI
            </Link>
            <Link
              href="/contact"
              className="hover:text-red-500 transition flex items-center gap-2"
            >
              <Mail size={16} /> Contact
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Get in Touch
          </h3>
          <div className="text-zinc-400 space-y-2">
            <p>
              Email:{" "}
              <a
                href="mailto:info@synctechx.com"
                className="hover:text-red-500"
              >
                info@synctechx.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+27761915804" className="hover:text-red-500">
                +27 (76) 191-5804
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-800 my-8" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/synctechxmz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
          >
            <FaInstagram size={18} />
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <FaTiktok size={18} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61574813828863"
            className="hover:text-red-500 transition"
          >
            <FaFacebook size={18} />
          </a>
        </div>
        <div className="text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} BookIt! All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://www.niltonnovele.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 underline"
            >
              Nilton Novele
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
