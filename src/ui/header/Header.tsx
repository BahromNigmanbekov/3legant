import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/sidebar/Sidebar";

// ✅ Har bir til uchun haqiqiy dumaloq ikonka (rasm) havolalari
const languages = [
  { code: "en", label: "EN", flagUrl: "https://flagcdn.com/w40/gb.png" },
  { code: "ru", label: "RU", flagUrl: "https://flagcdn.com/w40/ru.png" },
  { code: "uz", label: "UZ", flagUrl: "https://flagcdn.com/w40/uz.png" },
];

const cartCount = 2;

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleChangeLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setLangOpen(false);
  };

  const navLinks = [
    { label: t("nav_home", "Home"), to: "/" },
    { label: t("nav_shop", "Shop"), to: "/shop" },
    { label: t("nav_blog", "Blog"), to: "/blog" },
    { label: t("nav_contact", "Contact Us"), to: "/contact" },
  ];

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100">
        <nav className="flex items-center justify-between px-6 md:px-10 h-16 max-w-screen-xl mx-auto">
          
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
              <Menu strokeWidth={1.8} className="w-5 h-5" />
            </button>
            <NavLink to="/" className="text-xl font-semibold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              3legant.
            </NavLink>
          </div>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} className={({ isActive }) => `px-4 py-2 text-sm font-medium ${isActive ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button className="hidden md:flex p-2.5 text-gray-500"><Search className="w-5 h-5" /></button>
            <button className="hidden md:flex p-2.5 text-gray-500"><User className="w-5 h-5" /></button>
            <button className="relative p-2.5 text-gray-500">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-semibold text-white bg-gray-900">{cartCount}</span>}
            </button>

            {/* ✅ Haqiqiy dumaloq rasm-ikonkali til tugmasi */}
            <div className="relative ml-1">
              <button
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 border border-gray-200 transition-all"
              >
                {/* Dumaloq bayroqcha rasmi */}
                <img 
                  src={currentLang.flagUrl} 
                  alt={currentLang.label}
                  className="w-4 h-4 rounded-full object-cover border border-gray-100"
                />
                <span className="font-semibold text-gray-800">{currentLang.label}</span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <ul className="absolute right-0 mt-2 z-20 bg-white border border-gray-200 rounded-xl shadow-xl py-1 min-w-[120px]">
                    {languages.map(({ code, label, flagUrl }) => (
                      <li key={code}>
                        <button
                          onClick={() => handleChangeLang(code)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${i18n.language === code ? "bg-gray-50 text-gray-900 font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                          {/* Dropdown ichidagi dumaloq rasm */}
                          <img 
                            src={flagUrl} 
                            alt={label}
                            className="w-4 h-4 rounded-full object-cover border border-gray-100"
                          />
                          <span>{label}</span>
                          {i18n.language === code && <div className="w-1.5 h-1.5 rounded-full bg-black ml-auto" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;