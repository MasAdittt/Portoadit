import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import Section1 from './components/Section1'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import ContactUs from './components/Contact'
import ExperienceSection from './components/experience'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 1000,
    })

    // Simulasi loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + 10
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center px-4">
          {/* Logo/Icon Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Loading Portfolio
            </span>
          </h2>
          
          <p className="text-gray-400 mb-8 animate-pulse">
            Preparing something awesome...
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-3">{progress}%</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <Section1 />
      <Section2 />
      <ExperienceSection />
      <Section3 />
      <ContactUs />
      <Footer />
    </>
  )
}

export default App