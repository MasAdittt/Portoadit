import React, { useState, useEffect, useRef } from 'react'
import { ExternalLink, Github, Eye, Calendar, Tag, Star, ArrowLeft, Clock, Users, Award, ChevronRight } from 'lucide-react'

function PortfolioApp() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Frontend Development",
      description: "A modern e-commerce platform built with React and Tailwind CSS, featuring responsive design, shopping cart functionality, and payment integration.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
      technologies: ["React", "Tailwind CSS", "JavaScript", "API Integration"],
      status: "Completed",
      year: "2024",
      featured: true,
      fullDescription: "This comprehensive e-commerce platform represents a complete digital shopping solution built from the ground up. The platform features a modern, responsive design that adapts seamlessly across all devices, ensuring customers can shop comfortably whether they're on desktop, tablet, or mobile.",
      features: [
        "Responsive Design",
        "Shopping Cart System",
        "Payment Gateway Integration",
        "User Authentication",
        "Product Search & Filtering",
        "Order Management",
        "Admin Dashboard",
        "Real-time Inventory"
      ],
      challenges: "The main challenge was implementing a seamless payment integration while maintaining security standards and providing a smooth user experience across different payment methods.",
      duration: "3 months",
      teamSize: "4 people",
      client: "Tech Startup",
      githubUrl: "#",
      liveUrl: "#",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb"
      ]
    },
    {
      id: 2,
      title: "Digital Marketing Dashboard",
      category: "Digital Marketing",
      description: "Analytics dashboard for tracking social media campaigns, SEO performance, and content marketing metrics with real-time data visualization.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
      technologies: ["Analytics", "SEO", "Content Strategy", "Data Visualization"],
      status: "In Progress",
      year: "2024",
      featured: true,
      fullDescription: "A comprehensive analytics dashboard designed to provide marketing teams with actionable insights across all digital channels. The platform aggregates data from multiple sources to create a unified view of marketing performance.",
      features: [
        "Real-time Analytics",
        "Social Media Tracking",
        "SEO Performance Metrics",
        "Campaign ROI Analysis",
        "Content Performance Insights",
        "Automated Reporting",
        "Custom KPI Dashboards",
        "Competitor Analysis"
      ],
      challenges: "Integrating multiple APIs and ensuring real-time data synchronization while maintaining dashboard performance and user experience.",
      duration: "4 months",
      teamSize: "3 people",
      client: "Marketing Agency",
      githubUrl: "#",
      liveUrl: "#",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb"
      ]
    },
    {
      id: 3,
      title: "Portfolio Website",
      category: "UI/UX Design",
      description: "Creative portfolio website with interactive animations, smooth scrolling effects, and modern design principles for a creative agency.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
      technologies: ["Figma", "React", "CSS Animations", "Responsive Design"],
      status: "Completed",
      year: "2024",
      featured: false,
      fullDescription: "An award-winning portfolio website that showcases creative work through innovative design and seamless user experience. The site features cutting-edge animations and interactions that engage visitors.",
      features: [
        "Interactive Animations",
        "Smooth Scrolling",
        "Modern Design System",
        "Performance Optimized",
        "SEO Friendly",
        "Contact Integration",
        "Blog System",
        "Gallery Showcase"
      ],
      challenges: "Balancing creative animations with performance optimization to ensure fast loading times without compromising the visual impact.",
      duration: "2 months",
      teamSize: "2 people",
      client: "Creative Agency",
      githubUrl: "#",
      liveUrl: "#",
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb"
      ]
    },
    {
      id: 4,
      title: "Restaurant App",
      category: "Frontend Development",
      description: "Mobile-first restaurant application with online ordering system, menu management, and customer review functionality.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
      technologies: ["React Native", "Node.js", "MongoDB", "Payment Gateway"],
      status: "Completed",
      year: "2023",
      featured: false,
      fullDescription: "A comprehensive restaurant management application that bridges the gap between restaurants and their customers through digital innovation. The app streamlines ordering processes and enhances customer experience.",
      features: [
        "Online Ordering System",
        "Menu Management",
        "Customer Reviews",
        "Table Reservations",
        "Loyalty Program",
        "Push Notifications",
        "Analytics Dashboard",
        "Multi-location Support"
      ],
      challenges: "Creating a seamless mobile experience that works reliably across different devices and network conditions while maintaining real-time order synchronization.",
      duration: "3.5 months",
      teamSize: "5 people",
      client: "Restaurant Chain",
      githubUrl: "#",
      liveUrl: "#",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb"
      ]
    },
    {
      id: 5,
      title: "Brand Identity Campaign",
      category: "Digital Marketing",
      description: "Complete brand identity redesign and digital marketing campaign that increased brand awareness by 150% across multiple platforms.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
      technologies: ["Brand Strategy", "Social Media", "Content Creation", "Analytics"],
      status: "Completed",
      year: "2023",
      featured: false,
      fullDescription: "A transformative brand identity project that redefined a company's visual presence and market positioning. The campaign successfully increased brand recognition and customer engagement across all digital touchpoints.",
      features: [
        "Brand Strategy Development",
        "Logo & Visual Identity",
        "Social Media Campaigns",
        "Content Marketing",
        "Influencer Partnerships",
        "Performance Analytics",
        "Brand Guidelines",
        "Market Research"
      ],
      challenges: "Developing a cohesive brand identity that resonates with diverse target audiences while maintaining consistency across multiple marketing channels.",
      duration: "6 months",
      teamSize: "6 people",
      client: "Technology Company",
      githubUrl: "#",
      liveUrl: "#",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb"
      ]
    },
    {
      id: 6,
      title: "Task Management Tool",
      category: "Frontend Development",
      description: "Collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
      technologies: ["React", "Socket.io", "Express", "Real-time Updates"],
      status: "In Progress",
      year: "2024",
      featured: false,
      fullDescription: "A powerful project management solution designed for modern teams. The application focuses on seamless collaboration and real-time communication to boost productivity and project delivery.",
      features: [
        "Task Creation & Assignment",
        "Real-time Collaboration",
        "Project Timeline Tracking",
        "Team Communication",
        "File Sharing",
        "Progress Analytics",
        "Custom Workflows",
        "Integration Support"
      ],
      challenges: "Implementing real-time synchronization across multiple users while maintaining data consistency and handling network interruptions gracefully.",
      duration: "5 months",
      teamSize: "4 people",
      client: "Software Company",
      githubUrl: "#",
      liveUrl: "#",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&crop=entropy&cs=tinysrgb"
      ]
    }
  ]

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setCurrentPage('detail')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    setSelectedProject(null)
  }

  if (currentPage === 'detail' && selectedProject) {
    return <ProjectDetailPage project={selectedProject} onBack={handleBackToHome} />
  }

  return <ProjectListPage projects={projects} onProjectClick={handleProjectClick} />
}

function ProjectListPage({ projects, onProjectClick }) {
  const categories = ["All", "Frontend Development", "Digital Marketing", "UI/UX Design"]
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [hasAnimated, setHasAnimated] = useState(false)
  const projectsRef = useRef(null)

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory))
    }
  }, [activeCategory])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current)
      }
    }
  }, [hasAnimated])

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-400 bg-green-900/30 border-green-700/30"
      case "In Progress":
        return "text-yellow-400 bg-yellow-900/30 border-yellow-700/30"
      default:
        return "text-gray-400 bg-gray-900/30 border-gray-700/30"
    }
  }

  return (
    <section className="py-24 relative overflow-hidden bg-black text-white min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/20 via-black to-blue-900/15"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-400/8 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm sm:text-base text-blue-400 font-medium tracking-wider uppercase mb-4">
            My Work
          </h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of creative solutions that blend functionality with aesthetic appeal
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onProjectClick(project)}
              className="group relative bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl overflow-hidden border border-gray-700/30 hover:border-blue-600/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-600/30">
                  <Star size={12} fill="currentColor" />
                  Featured
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* View Details Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="px-6 py-3 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 flex items-center gap-2">
                    <Eye size={18} />
                    View Details
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-400 font-medium">{project.category}</span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={12} />
                    {project.year}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    {project.status}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded border border-blue-700/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-700/30 text-gray-400 rounded border border-gray-600/30">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-8">
            Interested in seeing more of my work?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              <span className="flex items-center gap-2">
                <Github size={16} />
                View All Projects
              </span>
            </button>
            <button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <ExternalLink size={16} />
                Visit GitHub
              </span>
              <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectDetailPage({ project, onBack }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-400 bg-green-900/30 border-green-700/30"
      case "In Progress":
        return "text-yellow-400 bg-yellow-900/30 border-yellow-700/30"
      default:
        return "text-gray-400 bg-gray-900/30 border-gray-700/30"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/20 via-black to-blue-900/15"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-lg">Back to Projects</span>
        </button>

        {/* Project Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative">
              <img
                src={project.images[currentImageIndex]}
                alt={project.title}
                className="w-full h-96 object-cover rounded-xl"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                  >
                    <ChevronRight size={20} className="transform rotate-180" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {project.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'ring-2 ring-blue-500 opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-blue-400 font-medium">{project.category}</span>
                {project.featured && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-600/30">
                    <Star size={12} fill="currentColor" />
                    Featured
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Clock size={16} />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="text-white font-semibold">{project.duration}</p>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Users size={16} />
                  <span className="text-sm font-medium">Team Size</span>
                </div>
                <p className="text-white font-semibold">{project.teamSize}</p>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Award size={16} />
                  <span className="text-sm font-medium">Client</span>
                </div>
                <p className="text-white font-semibold">{project.client}</p>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="text-sm font-medium">Status</span>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                <span className="flex items-center justify-center gap-2">
                  <ExternalLink size={16} />
                  View Live
                </span>
              </button>
              
              <button className="flex-1 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Github size={16} />
                  View Code
                </span>
                <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Project Details Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Technologies Used */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Tag size={20} className="text-blue-400" />
              Technologies Used
            </h3>
            <div className="space-y-3">
              {project.technologies.map((tech, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Star size={20} className="text-blue-400" />
              Key Features
            </h3>
            <div className="space-y-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Award size={20} className="text-blue-400" />
              Challenges & Solutions
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {project.challenges}
            </p>
          </div>
        </div>

        {/* Project Timeline or Additional Info */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-700/30">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Interested in Similar Projects?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can bring your ideas to life with cutting-edge technology and creative design.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioApp