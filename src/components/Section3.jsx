import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, Eye, Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProjects } from '../hook/useProjects'

function Section3() {
  const { projects, loading } = useProjects()
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [hasAnimated, setHasAnimated] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const projectsRef = useRef(null)
  
  const ITEMS_PER_PAGE = 6

  // Filter category dan extract unique categories
  useEffect(() => {
    if (projects.length > 0) {
      const uniqueCategories = [...new Set(projects.map(p => p.category))]
      setCategories(['All', ...uniqueCategories])
    }
  }, [projects])

  // Filter ketika kategori berubah
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory))
    }
    setCurrentPage(1) // Reset ke halaman pertama saat kategori berubah
  }, [activeCategory, projects])

  // Animasi observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) setHasAnimated(true)
        })
      },
      { threshold: 0.3 }
    )

    if (projectsRef.current) observer.observe(projectsRef.current)
    return () => projectsRef.current && observer.unobserve(projectsRef.current)
  }, [hasAnimated])

  const getStatusColor = status => {
    switch (status) {
      case 'Completed':
        return 'text-green-400 bg-green-900/30 border-green-700/30'
      case 'In Progress':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-700/30'
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-700/30'
    }
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  const goToPage = (page) => {
    setCurrentPage(page)
    // Scroll ke atas section saat pindah halaman
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goToPrevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1)
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-green-900/15"></div>

      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-400/8 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No projects found in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={projectsRef}>
              {currentProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl overflow-hidden border border-gray-700/30 hover:border-blue-600/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-600/30">
                      <Star size={12} fill="currentColor" />
                      Featured
                    </div>
                  )}

                  {/* Project Image */}
                  <Link to={`/project/${project.id}`} className="block relative h-48 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Link
                        to={`/project/${project.id}`}
                        className="p-3 bg-blue-600/90 text-white rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
                      >
                        <Eye size={18} />
                      </Link>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-800/90 text-white rounded-full hover:bg-gray-700 transform hover:scale-110 transition-all duration-300"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-green-600/90 text-white rounded-full hover:bg-green-700 transform hover:scale-110 transition-all duration-300"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-400 font-medium">{project.category}</span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={12} />
                        {project.year}
                      </span>
                    </div>

                    <Link to={`/project/${project.id}`}>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 hover:cursor-pointer">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Status */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        {project.status}
                      </span>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded border border-blue-700/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-700/30 text-gray-400 rounded border border-gray-600/30">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/project/${project.id}`}
                      className="mt-4 w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
                    >
                      <Eye size={16} />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transform hover:scale-105'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                        currentPage === pageNumber
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/30'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transform hover:scale-105'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Section3