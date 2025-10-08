import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Github, ExternalLink, Calendar, Star, ArrowRight } from 'lucide-react'
import { useProjects } from '../hook/useProjects'

function RelatedProjects({ currentProjectId, category, maxItems = 3 }) {
  const { projects } = useProjects()
  const [relatedProjects, setRelatedProjects] = useState([])

  useEffect(() => {
    if (projects.length > 0) {
      // Filter projects by same category, exclude current project
      let filtered = projects.filter(
        p => p.id !== currentProjectId && p.category === category
      )

      // If not enough projects in same category, get random projects
      if (filtered.length < maxItems) {
        const otherProjects = projects.filter(
          p => p.id !== currentProjectId && p.category !== category
        )
        filtered = [...filtered, ...otherProjects]
      }

      // Shuffle and limit
      const shuffled = filtered.sort(() => 0.5 - Math.random())
      setRelatedProjects(shuffled.slice(0, maxItems))
    }
  }, [projects, currentProjectId, category, maxItems])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400 bg-green-900/30 border-green-700/30'
      case 'In Progress':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-700/30'
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-700/30'
    }
  }

  if (relatedProjects.length === 0) {
    return null
  }

  return (
    <section className="py-16 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              More{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-400">Explore other projects you might like</p>
          </div>
          <Link
            to="/#projects"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <span>View All</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl overflow-hidden border border-gray-700/30 hover:border-blue-600/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full text-xs border border-yellow-600/30">
                  <Star size={10} fill="currentColor" />
                  Featured
                </div>
              )}

              {/* Project Image */}
              <Link to={`/project/${project.id}`} className="block relative h-44 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link
                    to={`/project/${project.id}`}
                    className="p-2 bg-blue-600/90 text-white rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
                  >
                    <Eye size={16} />
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-gray-800/90 text-white rounded-full hover:bg-gray-700 transform hover:scale-110 transition-all duration-300"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-green-600/90 text-white rounded-full hover:bg-green-700 transform hover:scale-110 transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-blue-400 font-medium">{project.category}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={10} />
                    {project.year}
                  </span>
                </div>

                <Link to={`/project/${project.id}`}>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                </Link>

                <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Status */}
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    {project.status}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-blue-900/30 text-blue-300 rounded border border-blue-700/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-gray-700/30 text-gray-400 rounded border border-gray-600/30">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Button */}
                <Link
                  to={`/project/${project.id}`}
                  className="block w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
                >
                  <Eye size={14} />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RelatedProjects