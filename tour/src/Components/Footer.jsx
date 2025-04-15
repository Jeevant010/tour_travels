import './Footer.css';
import { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const popularDestinations = [
  { name: 'Goa', path: '/goa' },
  { name: 'Kerala', path: '/kerala' },
  { name: 'Rajasthan', path: '/rajasthan' },
  { name: 'Himachal Pradesh', path: '/himachal-pradesh' },
];

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/Gallery' },
  { name: 'Contact Us', path: '/contact' },
];

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4 text-amber-400">EasyTravels.com</h3>
            <p className="mb-4 text-gray-300">
              Exploring the incredible diversity of India since 2025. Let us show you the wonders of our incredible country.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="text-gray-300 hover:text-amber-400 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com" className="text-gray-300 hover:text-amber-400 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.twitter.com" className="text-gray-300 hover:text-amber-400 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.youtube.com" className="text-gray-300 hover:text-amber-400 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

         

          {/* Quick Links - Desktop */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Indian Destinations - Desktop */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Explore India</h3>
            <ul className="space-y-2">
              {popularDestinations.map((dest) => (
                <li key={dest.name}>
                  <a
                    href={dest.path}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
                  >
                    {dest.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-amber-400" />
                <span className="text-gray-300">D80, Kamrej, IIIT SURAT, SURAT, Gujarat, 321043</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-amber-400" />
                <a href="tel:+911123456789" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  +91 8882529563
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-amber-400" />
                <a href="mailto:info@easytravels.com" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  info@easytravels.com
                </a>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-amber-400">NEWSLETTER SIGNUP</h4>
              <p className="text-xs text-gray-300 mb-2">Get travel deals and updates about Indian destinations</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-3 py-2 text-sm text-gray-900 bg-gray-100 rounded-l focus:outline-none focus:ring-1 focus:ring-amber-400 w-full"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r transition-colors duration-300 text-sm font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} EasyTravels with us. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="/faq" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;