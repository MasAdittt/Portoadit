// src/components/cms/ProjectList.jsx (Updated with ProjectDetails integration)
import React, { useState } from 'react'
import { 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Tag, 
  Star, 
  Plus,
  Search,
  Filter,
  Grid,
  List,
  ExternalLink
} from 'lucide-react'
import ProjectDetails from './ProjectDetails'

const ProjectsList = ({ 
  projects = [], 
  onEditProject, 
  onDeleteProject, 
  title = "Projects",
  showAddButton = false,
  showViewAll = false,
  onAddProject,
  onViewAll
}) => {
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showDetails, setShowDetails] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (Array.isArray(project.technologies) ? project.technologies.join(' ') : project.technologies || '')
                           .toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Get unique categories and statuses from projects
  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))]
  const statuses = [...new Set(projects.map(p => p.status).filter(Boolean))]

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Planned': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'On Hold': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Handle view details
  const handleViewDetails = (project) => {
    setSelectedProject(project)
    setShowDetails(true)
  }

  // Project Card Component
  const ProjectCard = ({ project }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-200 group">
      {/* Project Image */}
      <div className="relative h-48 bg-gray-700 overflow-hidden">
        {project.coverImage ? (
          <img 
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.classList.add('flex', 'items-center', 'justify-center')
              e.target.parentElement.innerHTML = '<div class="text-gray-400 text-center"><div class="text-4xl mb-2">📁</div><div>No Image</div></div>'
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">📁</div>
              <div>No Image</div>
            </div>
          </div>
        )}
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star size={12} />
              Featured
            </div>
          </div>
        )}

        {/* Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button
            onClick={() => handleViewDetails(project)}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-full text-white transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEditProject(project)}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors"
            title="Edit Project"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDeleteProject(project)}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors"
            title="Delete Project"
          >
            <Trash2 size={16} />
          </button>
          {project.image && (
            <button
              onClick={() => window.open(project.image, '_blank')}
              className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-colors"
              title="View Image"
            >
              <ExternalLink size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 
            className="text-lg font-semibold text-white hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer"
            onClick={() => handleViewDetails(project)}
          >
            {project.title || 'Untitled Project'}
          </h3>
          <span className="text-sm text-gray-400 ml-2 flex-shrink-0">
            {project.year || 'N/A'}
          </span>
        </div>

        {/* Category */}
        {project.category && (
          <div className="flex items-center gap-1 mb-2">
            <Tag size={14} className="text-gray-400" />
            <span className="text-sm text-gray-300">{project.category}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {project.description || 'No description available'}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {(Array.isArray(project.technologies) ? project.technologies : []).slice(0, 3).map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
              {(Array.isArray(project.technologies) ? project.technologies : []).length > 3 && (
                <span className="px-2 py-1 bg-gray-600 text-gray-400 rounded text-xs">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Status and Date */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {project.status || 'Unknown'}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            {formatDate(project.createdAt)}
          </div>
        </div>
      </div>
    </div>
  )

  // List View Component
  const ProjectListItem = ({ project }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-200">
      <div className="flex items-center gap-4">
        {/* Project Image Thumbnail */}
        <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
          {project.coverImage ? (
            <img 
              src={project.coverImage} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 
              className="text-lg font-semibold text-white truncate hover:text-blue-400 cursor-pointer transition-colors"
              onClick={() => handleViewDetails(project)}
            >
              {project.title || 'Untitled Project'}
            </h3>
            {project.featured && (
              <Star size={16} className="text-yellow-500 flex-shrink-0" />
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
            <span>{project.category || 'No Category'}</span>
            <span>•</span>
            <span>{project.year || 'N/A'}</span>
            <span>•</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>

          <p className="text-gray-400 text-sm truncate mb-2">
            {project.description || 'No description available'}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {(Array.isArray(project.technologies) ? project.technologies : []).slice(0, 4).map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {project.status || 'Unknown'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => handleViewDetails(project)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-green-400 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEditProject(project)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
            title="Edit Project"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDeleteProject(project)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
            title="Delete Project"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <div className="text-sm text-gray-400">
                {filteredProjects.length} of {projects.length} projects
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                  title="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>

              {/* Add Project Button */}
              {showAddButton && onAddProject && (
                <button
                  onClick={onAddProject}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Add Project
                </button>
              )}

              {/* View All Button */}
              {showViewAll && onViewAll && (
                <button
                  onClick={onViewAll}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <Eye size={16} />
                  View All
                </button>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-xl font-semibold mb-2">
                {projects.length === 0 ? 'No Projects Yet' : 'No Projects Found'}
              </h3>
              <p className="text-gray-400 mb-4">
                {projects.length === 0 
                  ? 'Create your first project to get started'
                  : 'Try adjusting your search or filters'
                }
              </p>
              {projects.length === 0 && showAddButton && onAddProject && (
                <button
                  onClick={onAddProject}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Create First Project
                </button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ProjectListItem key={project.id} project={project} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetails
        project={selectedProject}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
      />
    </>
  )
}

export default ProjectsList