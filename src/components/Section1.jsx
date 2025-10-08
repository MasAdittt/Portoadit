import React from 'react'
import ShinyText from '../ui/ShinyText/ShinyText'
import { Github, Linkedin, Mail, ArrowDown, Instagram } from 'lucide-react'
import Aurora from '../Design/auroreg'

function Section1() {
  return (
<section id="home" className="pt-16 relative overflow-hidden bg-black text-white">
  
  {/* Aurora Background */}
  <div className="absolute inset-0 z-0">
<Aurora
  colorStops={["#1e40af", "#6B3F69", "#006A67"]} // Blue gradient
  blend={0.5}
  amplitude={1.5}
  speed={1.1}
/>
  </div>

      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        {/* Main content */}
        <div className="mb-8">
      <h2
  className="text-sm sm:text-base font-medium tracking-wider uppercase mb-4 font-sora 
             bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 
             bg-clip-text text-transparent"
  data-aos="fade-up"
  data-aos-offset="0"
  data-aos-duration="800"
>
  Welcome to my portfolio
</h2>

         
          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-sora"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Aditya Bayu
            </span>
          </h1>

          <ShinyText 
            text="Junior Web Developer & Digital Marketing Enthusiast" 
            disabled={false} 
            speed={5} 
            className="text-xl sm:text-2xl text-gray-300 mb-8 font-sora shimmer-blue" 
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          />

          <p 
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 font-sora"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
          >
            Eager to grow in the world of digital marketing while developing engaging and functional digital experiences through creative and user-focused design.
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="800"
        >
         
          <button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">Download CV</span>
            <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>

      
      </div>

    
    </section>
  )
}

export default Section1
