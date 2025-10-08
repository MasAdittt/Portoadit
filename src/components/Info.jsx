import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, ExternalLink, Github, Tag, Lightbulb, CheckCircle, Clock, Star, Image as ImageIcon, FileText, Download } from 'lucide-react'
import { useProjects } from '../hook/useProjects'
import RelatedProjects from './Related'

function Info() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProjectById } = useProjects()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const projectData = await getProjectById(id)
        setProject(projectData)
        setSelectedImage(projectData.coverImage)
      } catch (err) {
        console.error('Error fetching project:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id, getProjectById])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Project Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The project you are looking for does not exist.'}</p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header Navigation */}
        <div className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Project Header */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-blue-400 font-medium">{project.category}</span>
                  <span className="text-gray-600">•</span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    {project.year}
                  </span>
                  {project.featured && (
                    <>
                      <span className="text-gray-600">•</span>
                      <span className="flex items-center gap-1 text-yellow-400 text-sm">
                        <Star size={14} fill="currentColor" />
                        Featured
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            {/* Status & Links */}
            <div className="flex flex-wrap items-center gap-4">
              <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full border ${getStatusColor(project.status)}`}>
                {project.status === 'Completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                {project.status}
              </span>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
              <img
                src={selectedImage || project.coverImage}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Gallery Thumbnails */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                <button
                  onClick={() => setSelectedImage(project.coverImage)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === project.coverImage
                      ? 'border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <img src={project.coverImage} alt="Cover" className="w-full h-full object-cover" />
                </button>
                {project.galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img.url
                        ? 'border-blue-500 ring-2 ring-blue-500/30'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <img src={img.url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section className="bg-gray-900/30 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="text-blue-400" size={24} />
                  About This Project
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>
              </section>

              {/* Technologies */}
              <section className="bg-gray-900/30 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Tag className="text-blue-400" size={24} />
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg border border-blue-700/30 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Keywords */}
              {project.keywords && project.keywords.length > 0 && (
                <section className="bg-gray-900/30 rounded-2xl p-8 border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className="text-blue-400" size={24} />
                    Keywords
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700/30"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info Card */}
              <div className="bg-gray-900/30 rounded-2xl p-6 border border-gray-800 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Project Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="text-white font-medium">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Year</p>
                    <p className="text-white font-medium">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      {project.status}
                    </span>
                  </div>
                  {project.createdAt && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Created</p>
                      <p className="text-white font-medium">
                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Files Download */}
                {project.files && project.files.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Download size={16} />
                      Project Files
                    </h4>
                    <div className="space-y-2">
                      {project.files.map((file, index) => (
                        <a
                          key={index}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700/30"
                        >
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-blue-400" />
                            <span className="text-sm text-gray-300 truncate">{file.name}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
<RelatedProjects 
  currentProjectId={project.id} 
  category={project.category}
  maxItems={3}
/>
          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info