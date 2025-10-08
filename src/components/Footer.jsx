import React from 'react'
import { Heart, ArrowUp } from 'lucide-react'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-black text-white border-none">
      {/* Background gradient - sama dengan Contact */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/15 via-black to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright Text */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span>© {currentYear} Aditya Bayu Wicaksono.</span>
                <span className="hidden sm:inline">All rights reserved.</span>
              </p>
              <p className="text-gray-500 text-xs mt-1 flex items-center justify-center md:justify-start gap-1">
                Made with <Heart size={12} className="text-red-500 animate-pulse" fill="currentColor" /> and lots of coffee
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-6">
              <a 
                href="#home" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
              >
                About
              </a>
              <a 
                href="#projects" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
              >
                Contact
              </a>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-400 rounded-lg border border-blue-600/30 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Border Line */}
        <div className="border-t border-gray-800/50 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>Designed & Built by Aditya Bayu Wicaksono</p>
            <p>Last updated: October 2025</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer