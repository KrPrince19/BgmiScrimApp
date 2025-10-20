import React from 'react';
// Assuming lucide-react is installed: npm install lucide-react
import { Instagram, Youtube } from 'lucide-react';

// --- Component: BGMI Scrim App Footer ---
const Footer = () => {
  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/your_bgmi_team', 
      icon: <Instagram className="w-6 h-6" />, 
      color: 'hover:text-pink-500' 
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/your_bgmi_channel', 
      icon: <Youtube className="w-6 h-6" />, 
      color: 'hover:text-red-600' 
    },
    // You can add Discord, Twitch, etc. here
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 py-10 border-t-4 border-red-600 shadow-2xl shadow-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* App Title/Logo */}
        <div className="text-3xl font-extrabold text-white tracking-widest mb-4">
          Fr<span className="text-red-600">ag</span>  <span className="text-white">Zo</span>
          <span className='text-red-600'>ne</span>
        </div>
        
        {/* Navigation & Social Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-10 text-lg font-semibold mb-6">
          
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-300 ${link.color} transition duration-300 transform hover:scale-110 flex items-center`}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          {/* Footer Navigation (Example Links) */}
          <div className="flex space-x-6 text-gray-400">
            <a href="/rule" className="hover:text-red-500 transition duration-300">Rules</a>
            {/* <a href="/faq" className="hover:text-red-500 transition duration-300">FAQ</a> */}
            {/* <a href="/privacy" className="hover:text-red-500 transition duration-300">Privacy</a> */}
          </div>

        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-sm mt-8">
          &copy; {currentYear} FragZone. All Rights Reserved. | Designed for competitive BGMI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;