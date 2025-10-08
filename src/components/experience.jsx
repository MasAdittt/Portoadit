import React, { useState, useEffect, useRef } from 'react'
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ChevronRight } from 'lucide-react'

function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(null)
  const timelineRef = useRef(null)

  const experiences = [
    {
      type: "work",
      title: "Junior Frontend Developer",
      company: "PT. Incognito Asia Agency",
      location: "Remote",
      period: "2024 - 2025",
      description: "Developing responsive web applications using React and modern JavaScript. Collaborating with design team to implement pixel-perfect UI/UX.",
      achievements: [
        "Built 5+ client projects with 98% satisfaction rate",
        "Reduced page load time by 40% through optimization",
        "Implemented reusable component library"
      ],
      icon: <Briefcase size={20} />,
      color: "blue"
    },
    {
      type: "work",
      title: "IT Support ",
      company: "PT. Angkasa Pura Support",
      location: "Remote",
      period: "2022",
      description: "Managing social media campaigns and SEO strategies for multiple clients. Creating engaging content and analyzing marketing metrics.",
      achievements: [
        "Increased organic traffic by 150% in 6 months",
        "Managed social media accounts with 50K+ followers",
        "Created content strategy resulting in 200% engagement boost"
      ],
      icon: <Briefcase size={20} />,
      color: "purple"
    },
    
  ]

  const colorClasses = {
    blue: {
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      text: "text-blue-400",
      hover: "hover:border-blue-400/60",
      glow: "group-hover:shadow-blue-500/20"
    },
    purple: {
      bg: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
      text: "text-purple-400",
      hover: "hover:border-purple-400/60",
      glow: "group-hover:shadow-purple-500/20"
    },
    green: {
      bg: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
      text: "text-green-400",
      hover: "hover:border-green-400/60",
      glow: "group-hover:shadow-green-500/20"
    },
    orange: {
      bg: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30",
      text: "text-orange-400",
      hover: "hover:border-orange-400/60",
      glow: "group-hover:shadow-orange-500/20"
    }
  }

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/20 via-black to-purple-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-sm sm:text-base text-blue-400 font-medium tracking-wider uppercase mb-4">
            My Journey
          </h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Experience &{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Education
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A timeline of my professional journey and learning experiences
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const colors = colorClasses[exp.color]
              const isLeft = index % 2 === 0
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-12`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} border-2 ${colors.border} flex items-center justify-center z-10 ${colors.text} backdrop-blur-sm`}>
                    {exp.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`group w-full md:w-5/12 ml-24 md:ml-0 ${isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}`}>
                    <div 
                      className={`relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border ${colors.border} ${colors.hover} ${colors.glow} transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm cursor-pointer`}
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                      {/* Period Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${colors.bg} border ${colors.border} ${colors.text} text-sm mb-4`}>
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
                        {exp.title}
                      </h3>

                      {/* Company & Location */}
                      <div className="flex flex-col gap-1 mb-4">
                        <p className="text-white font-medium flex items-center gap-2">
                          <Briefcase size={16} className={colors.text} />
                          {exp.company}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <MapPin size={16} />
                          {exp.location}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements - Expandable */}
                      {activeIndex === index && (
                        <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-2 animate-fadeIn">
                          <div className="flex items-center gap-2 mb-3">
                            <Award size={16} className={colors.text} />
                            <span className={`font-semibold ${colors.text}`}>Key Achievements:</span>
                          </div>
                          {exp.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-300">
                              <ChevronRight size={16} className={`${colors.text} mt-1 flex-shrink-0`} />
                              <span className="text-sm">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Expand Indicator */}
                      <div className={`text-xs ${colors.text} mt-4 flex items-center gap-1 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span>{activeIndex === index ? 'Click to collapse' : 'Click to see achievements'}</span>
                        <ChevronRight 
                          size={14} 
                          className={`transform transition-transform ${activeIndex === index ? 'rotate-90' : ''}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

       
      </div>
    </section>
  )
}

export default ExperienceSection