import React from 'react'
import { 
  X, 
  Calendar, 
  Tag, 
  Star, 
  ExternalLink,
  Edit,
  Trash2,
  ArrowLeft,
  Clock,
  Code,
  Image as ImageIcon,
  FileText,
  Download
} from 'lucide-react'

const ProjectDetails = ({ 
  project, 
  showDetails, 
  setShowDetails, 
  onEditProject,
  onDeleteProject 
}) => {
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

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) {
      return <FileText className="text-red-400" size={20} />
    } else if (fileType?.includes('presentation') || fileType?.includes('powerpoint')) {
      return <FileText className="text-orange-400" size={20} />
    }
    return <FileText className="text-gray-400" size={20} />
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateShort = (dateString) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleClose = () => {
    setShowDetails(false)
  }

  const handleEdit = () => {
    onEditProject(project)
    setShowDetails(false)
  }

  const handleDelete = () => {
    onDeleteProject(project)
    setShowDetails(false)
  }

  if (!showDetails || !project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Back to list"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {project.title || 'Untitled Project'}
                {project.featured && (
                  <Star size={20} className="text-yellow-500" />
                )}
              </h2>
              <p className="text-gray-400 text-sm">{project.category || 'No Category'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Quick Info */}
            <div className="lg:col-span-1">
              {/* Cover Image */}
             <div className="mb-6">
  <label className="text-sm font-medium text-gray-400 mb-2 block">Cover Image</label>
  <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden">
    {project.coverImage ? ( // Ubah dari project.image ke project.coverImage
      <img 
        src={project.coverImage} 
        alt={`${project.title} cover`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.parentElement.classList.add('flex', 'items-center', 'justify-center')
          e.target.parentElement.innerHTML = '<div class="text-gray-400 text-center"><ImageIcon size={48} /><div>Image Failed to Load</div></div>'
        }}
      />
    ) : (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <ImageIcon size={48} className="mx-auto mb-4" />
          <div>No Cover Image</div>
        </div>
      </div>
    )}
    {project.coverImage && (
      <button
        onClick={() => window.open(project.coverImage, '_blank')}
        className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
        title="View Full Image"
      >
        <ExternalLink size={16} />
      </button>
    )}
  </div>
</div>

              {/* Quick Info Card */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Project Info</h3>
                
                <div className="space-y-3">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {project.status || 'Unknown'}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Category:</span>
                    <div className="flex items-center gap-1">
                      <Tag size={14} className="text-gray-400" />
                      <span className="text-white text-sm">{project.category || 'No Category'}</span>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Year:</span>
                    <span className="text-white text-sm">{project.year || 'N/A'}</span>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Created:</span>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-white text-sm">{formatDateShort(project.createdAt)}</span>
                    </div>
                  </div>

                  {/* Updated Date */}
                  {project.updatedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Updated:</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-white text-sm">{formatDateShort(project.updatedAt)}</span>
                      </div>
                    </div>
                  )}

                  {/* Featured */}
                  {project.featured && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Featured:</span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" />
                        <span className="text-yellow-500 text-sm">Yes</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2">
              {/* Description Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  {project.description ? (
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">No description available</p>
                  )}
                </div>
              </div>

              {/* Technologies Section */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Code size={20} />
                    Technologies Used
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-2 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-lg text-sm font-medium hover:bg-blue-600/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Keywords Section */}
              {project.keywords && project.keywords.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Tag size={20} />
                    Keywords
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(project.keywords) ? project.keywords : []).map((keyword, index) => (
                        <span 
                          key={index}
                          className="px-3 py-2 bg-purple-600/10 text-purple-400 border border-purple-600/20 rounded-lg text-sm font-medium hover:bg-purple-600/20 transition-colors"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            

              {/* Gallery Images Section */}
            {project.galleryImages && project.galleryImages.length > 0 && ( // Ubah dari images ke galleryImages
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <ImageIcon size={20} />
      Project Gallery ({project.galleryImages.length})
    </h3>
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="grid grid-cols-2 gap-4">
        {project.galleryImages.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => window.open(image.url || image, '_blank')}
          >
            <img 
              src={image.url || image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3Ctext fill="%239CA3AF" font-size="14" font-family="sans-serif" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E'
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ExternalLink size={24} className="text-white" />
            </div>
            {image.name && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-xs truncate">{image.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)}
              {/* Files/Documents Section */}
              {project.files && project.files.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Project Files ({project.files.length})
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="space-y-3">
                      {project.files.map((file, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {getFileIcon(file.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate">
                                {file.name || `Document ${index + 1}`}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={file.url || file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                              title="Open file"
                            >
                              <ExternalLink size={16} className="text-white" />
                            </a>
                            <a
                              href={file.url || file}
                              download
                              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                              title="Download file"
                            >
                              <Download size={16} className="text-white" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Project Timeline */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Project Timeline</h3>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-medium">Project Created</h4>
                        <p className="text-gray-400 text-sm">{formatDate(project.createdAt)}</p>
                      </div>
                    </div>
                    
                    {project.updatedAt && (
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="text-white font-medium">Last Updated</h4>
                          <p className="text-gray-400 text-sm">{formatDate(project.updatedAt)}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        project.status === 'Completed' ? 'bg-green-500' :
                        project.status === 'In Progress' ? 'bg-blue-500' :
                        project.status === 'Planned' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                      <div>
                        <h4 className="text-white font-medium">Current Status</h4>
                        <p className="text-gray-400 text-sm">{project.status || 'Unknown'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {(project.links || project.demo || project.github) && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Links & Resources</h3>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                    <div className="space-y-3">
                      {project.demo && (
                        <a 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                        >
                          <ExternalLink size={16} className="text-blue-400" />
                          <span className="text-white group-hover:text-blue-400 transition-colors">Live Demo</span>
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                        >
                          <Code size={16} className="text-green-400" />
                          <span className="text-white group-hover:text-green-400 transition-colors">Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails