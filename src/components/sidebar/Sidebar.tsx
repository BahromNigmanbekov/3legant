import { NavLink } from "react-router-dom";
import { X, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function Sidebar({ open, onClose }: SidebarProps) {
  // ✅ useTranslation — tarjima uchun
  const { t } = useTranslation();

  // ✅ navLinks t() orqali dinamik tarjima qilinadi
  const navLinks = [
    { label: t("nav_home", "Home"), to: "/" },
    { label: t("nav_shop", "Shop"), to: "/shop" },
    { label: t("nav_blog", "Blog"), to: "/blog" },
    { label: t("nav_contact", "Contact Us"), to: "/contact" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + yopish */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <NavLink
            to="/"
            onClick={onClose}
            className="text-xl font-semibold text-gray-900"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            3legant.
          </NavLink>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Close menu"
          >
            <X strokeWidth={1.8} className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2.5">
            <Search strokeWidth={1.8} className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              // ✅ placeholder ham tarjima qilinadi
              placeholder={t("search_placeholder", "Search...")}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 py-4 gap-1">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-gray-900 bg-gray-100 font-semibold"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;