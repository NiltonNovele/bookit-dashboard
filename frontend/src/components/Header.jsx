"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  LogIn,
  BookOpen,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-orange-600"
        >
          <BookOpen className="w-8 h-8" />
          BookIt!
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          <NavItem href="/" icon={<Home size={16} />} label="Home" />
          <NavItem href="/about" icon={<Info size={16} />} label="About" />
          <NavItem href="/AI" icon={<Brain size={16} />} label="BookAI" />
          <NavItem href="/contact" icon={<Mail size={16} />} label="Contact" />
        </nav>

        {/* Mobile menu toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden px-4 pb-4 space-y-2"
        >
          <NavItem
            href="/"
            icon={<Home size={18} />}
            label="Home"
            onClick={toggleMenu}
            block
          />
          <NavItem
            href="/about"
            icon={<Info size={18} />}
            label="About BookIt!"
            onClick={toggleMenu}
            block
          />
          <NavItem
            href="/AI"
            icon={<Brain size={18} />}
            label="BookAI"
            onClick={toggleMenu}
            block
          />
          <NavItem
            href="/contact"
            icon={<Mail size={18} />}
            label="Contact"
            onClick={toggleMenu}
            block
          />
        </motion.nav>
      )}
    </header>
  );
};

const NavItem = ({
  href,
  icon,
  label,
  className = "",
  textClass = "",
  onClick,
  block = false,
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`${
      block ? "flex" : "inline-flex"
    } items-center gap-2 hover:text-orange-600 transition ${textClass} ${className}`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);
export default Header;
