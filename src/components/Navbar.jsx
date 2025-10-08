import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-sm border-b border-blue-900/20' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-400 font-sora">Portfolio</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 font-sora">
              <a href="#home" className="text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium font-sora">
                Home
              </a>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium">
                About
              </a>
              <a href="#projects" className="text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium">
                Projects
              </a>
              <a href="#skills" className="text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium">
                Skills
              </a>
              <a href="#contact" className="text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium">
                Contact
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-400 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-900/20 font-sora">
              <a href="#home"   className="block text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium font-sora">
                Home
              </a>
              <a href="#about" className="block text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium font-sora">
                About
              </a>
              <a href="#projects" className="block text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium">
                Projects
              </a>
              <a href="#skills" className="block text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium">
                Skills
              </a>
              <a href="#contact" className="block text-white hover:text-blue-400 transition-colors duration-300 px-3 py-2 font-medium">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}