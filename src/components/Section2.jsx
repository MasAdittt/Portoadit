import React, { useState, useEffect, useRef } from 'react'
import { Code, Palette, TrendingUp, Users, Award, Coffee } from 'lucide-react'
import ProfileCard from '../Design/Profilecard'
import adityaImg from "../image/aditganteng.png";
import garis from "../image/Garis.jpeg";
import pp from "../image/Icon.jpg";

function Section2() {
  const skills = [
    {
      icon: <Code size={24} />,
      title: "Frontend Development",
      description: "Creating responsive and interactive web applications using modern technologies",
      technologies: ["React", "JavaScript", "HTML/CSS", "Tailwind CSS"]
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Digital Marketing",
      description: "Growing digital presence through strategic marketing campaigns and analytics",
      technologies: ["SEO", "Social Media", "Content Marketing", "Copywriting"]
    },
    {
      icon: <Palette size={24} />,
      title: "UI/UX Design",
      description: "Designing user-centered interfaces that combine aesthetics with functionality",
      technologies: ["Figma", "Canva", "Prototyping", "User Research"]
    }
  ]

  const stats = [
    { number: 15, label: "Projects Completed", suffix: "+" },
    { number: 2, label: "Years Learning", suffix: "+" },
    { number: 50, label: "Happy Clients", suffix: "+" },
    { number: 24, label: "Availability", suffix: "/7" }
  ]

  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            stats.forEach((stat, index) => {
              let current = 0
              const increment = stat.number / 50
              const timer = setInterval(() => {
                current += increment
                if (current >= stat.number) {
                  current = stat.number
                  clearInterval(timer)
                }
                setAnimatedStats(prev => {
                  const newStats = [...prev]
                  newStats[index] = Math.floor(current)
                  return newStats
                })
              }, 30)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [hasAnimated])

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black text-white">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/15 to-blue-800/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        {/* Section Header */}
        <div className="text-center mb-16 font-sora">
          <h2 className="text-sm sm:text-base text-blue-400 font-medium tracking-wider uppercase mb-4">
            Get to know me
          </h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Me
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content - Profile Card */}
          <div className="w-full max-w-lg mx-auto mt-0 px-4">
  <ProfileCard
    avatarUrl={adityaImg}
    miniAvatarUrl={pp}
    grainUrl={garis}
    name="Aditya Bayu"
    title="Web Developer & Digital Marketer"
    handle="adityabayu._"
    status="Online"
    contactText="Follow "
    showBehindGradient={true}
    enableTilt={true}
   onContactClick={() => window.open("https://www.instagram.com/adityabayu._", "_blank")}  />
</div>

          {/* Right Content - About Description */}
          <div>
            <div className="space-y-6 font-sora">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate Junior Frontend Developer with a growing expertise in Digital Marketing. 
                My journey began with a curiosity about how digital experiences shape our daily lives, 
                and has evolved into a dedicated pursuit of creating meaningful connections between 
                brands and users.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                I believe in the power of clean code, intuitive design, and strategic marketing to 
                create digital solutions that not only look great but also drive real business results. 
                Every project is an opportunity to learn, grow, and push the boundaries of what's possible.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Coffee size={20} />
                  <span className="text-sm">Fueled by coffee and creativity</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-lg bg-gradient-to-b from-blue-900/20 to-transparent border border-blue-800/30 hover:border-blue-600/50 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">
                    {animatedStats[index]}{stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section - Moved Below */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            My <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Skills</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl bg-gradient-to-r from-blue-900/10 to-blue-800/5 border border-blue-800/20 hover:border-blue-600/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform duration-300 mb-4">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {skill.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skill.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full border border-blue-700/30 hover:bg-blue-800/40 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  )
}

export default Section2