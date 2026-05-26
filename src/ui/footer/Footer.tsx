import React from "react";
import { Link } from "react-router-dom";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Product", path: "/product" },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact" },
];

const socialLinks = [
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <FacebookIcon />, href: "#", label: "Facebook" },
  { icon: <YoutubeIcon />, href: "#", label: "YouTube" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white w-full">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Logo + Divider + Tagline */}
        <div className="flex items-center gap-4">
          <span className="text-white text-xl font-semibold tracking-tight">
            3legant<span className="text-white">.</span>
          </span>
          <span className="hidden md:block w-px h-6 bg-gray-600" />
          <span className="text-gray-400 text-sm">Gift &amp; Decoration Store</span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <hr className="border-gray-700" />
      </div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright + Legal */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-gray-500">
          <span>Copyright © 2023 3legant. All rights reserved</span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-300 font-medium hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 font-medium hover:text-white transition-colors duration-200">
              Terms of Use
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;