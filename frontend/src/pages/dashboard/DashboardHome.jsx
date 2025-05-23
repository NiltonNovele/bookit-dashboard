import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { Link, useLocation, Outlet } from "react-router-dom";

const SidebarLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-4 py-3 rounded-md font-semibold transition ${
        isActive
          ? "bg-orange-600 text-white"
          : "text-orange-700 hover:bg-orange-200 hover:text-orange-900"
      }`}
    >
      {label}
    </Link>
  );
};

const DashboardHome = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row bg-white overflow-hidden">
      {/* Sidebar - hidden on mobile, visible on sm+ */}
      <aside className="hidden sm:flex sm:w-64 bg-orange-50 border-r border-orange-300 flex-col">
        <div className="p-6 border-b border-orange-300">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">BookIt</h1>
          <p className="text-orange-700 font-medium">{user.name}</p>
          <p className="text-orange-700 text-sm">{user.email}</p>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          <SidebarLink to="/dashboard/profile" label="Profile" />
          <SidebarLink to="/dashboard/bookings" label="Bookings" />
          {/* <SidebarLink to="/dashboard/past-bookings" label="Past Bookings" /> */}
          <SidebarLink to="/dashboard/support" label="Support" />
          {/* <SidebarLink
            to="/dashboard/disable-account"
            label="Disable My Account"
          /> */}
        </nav>

        <div className="p-6 border-t border-orange-300">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-md shadow hover:from-orange-600 hover:to-orange-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="flex-grow p-4 sm:p-10 overflow-auto"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default DashboardHome;
