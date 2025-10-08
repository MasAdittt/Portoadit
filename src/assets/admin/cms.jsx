// src/components/cms/CMSDashboard.jsx
import React, { useState } from 'react'

// Import Firebase auth
import { auth } from '../../firebase'

// Import components
import Sidebar from './Sidebar'
import CMSHeader from './Header'
import DashboardStats from './Dashboard'
import ProjectsList from './ProjectList'
import ProjectModal from './Modal'
import ContentView from './Content'
import SettingsView from './Settings'

// Import Firebase hooks - Fixed paths
import { useProjects } from '../../hook/useProjects'
import { useImageUpload } from '../../hook/useImageUpluoad'

console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('Current user:', auth.currentUser);

function CMSDashboard() {
  // Firebase hooks
  const { 
    projects, 
    loading: projectsLoading, 
    error: projectsError,
    createProject,
    editProject,
    removeProject,
    refreshProjects
  } = useProjects();

  const { 
    upload: uploadImage, 
    remove: removeImage,
    uploading: imageUploading, 
    progress: uploadProgress,
    error: uploadError,
    clearError: clearUploadError
  } = useImageUpload();

  // UI States
  const [currentView, setCurrentView] = useState('dashboard')
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })

// Initial formData state
const [formData, setFormData] = useState({
  title: '',
  category: '',
  description: '',
  shortDescription: '',
  // image: '',
  // imagePath: '',
  technologies: '',
  status: 'In Progress',
  year: new Date().getFullYear().toString(),
  featured: false,
  coverImage: '', // Add if using cover image
  images: [], // Add if using multiple images
  files: [] // Add if using file attachments
})

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' })
    }, 5000)
  }

  // Debug auth status
  const debugAuth = () => {
    console.log('Auth debug:');
    console.log('- Current user:', auth.currentUser);
    console.log('- User UID:', auth.currentUser?.uid);
    console.log('- User email:', auth.currentUser?.email);
    
    if (auth.currentUser) {
      auth.currentUser.getIdToken().then(token => {
        console.log('- Token exists:', !!token);
        console.log('- Token length:', token.length);
      }).catch(err => {
        console.error('- Token error:', err);
      });
    }
  }

  // Handle image upload with Firebase
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Debug auth before upload
    debugAuth();

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('Please select an image file', 'error')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image size should be less than 5MB', 'error')
      return
    }

    try {
      clearUploadError()
      
      // Check auth before upload
      if (!auth.currentUser) {
        showNotification('Please login again to upload images', 'error')
        return
      }

      console.log('Starting upload for user:', auth.currentUser.uid);
      const { url, path } = await uploadImage(file);
      
      setFormData(prev => ({ 
        ...prev, 
        image: url,
        imagePath: path 
      }))
      showNotification('Image uploaded successfully')
    } catch (error) {
      console.error('Image upload error:', error)
      showNotification('Failed to upload image: ' + error.message, 'error')
    }
  }

  // Remove current image
  const handleRemoveImage = async () => {
    if (!formData.imagePath) return

    try {
      // Check auth before remove
      if (!auth.currentUser) {
        showNotification('Please login again to remove images', 'error')
        return
      }

      await removeImage(formData.imagePath)
      setFormData(prev => ({ 
        ...prev, 
        image: '',
        imagePath: '' 
      }))
      showNotification('Image removed successfully')
    } catch (error) {
      console.error('Image removal error:', error)
      showNotification('Failed to remove image: ' + error.message, 'error')
    }
  }

 // In cms.jsx
const handleSaveProject = async () => {
  if (!formData.title.trim() || !formData.category.trim()) {
    showNotification('Please fill in required fields (Title & Category)', 'error')
    return
  }

  setIsLoading(true)
  
  try {
    const projectData = {
      title: formData.title?.trim() || '',
      category: formData.category?.trim() || '',
      description: formData.description?.trim() || '',
      shortDescription: formData.shortDescription?.trim() || '',
      technologies: formData.technologies
        ? formData.technologies.split(',').map(t => t.trim()).filter(t => t.length > 0)
        : [],
      keywords: formData.keywords
        ? formData.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
        : [],
      status: formData.status || 'In Progress',
      year: formData.year || new Date().getFullYear().toString(),
      featured: Boolean(formData.featured),
      
      // Update image fields
      coverImage: formData.coverImage || null,
      coverImagePath: formData.coverImagePath || null,
      images: formData.images || [], // This will be saved as galleryImages
      files: formData.files || [],
      
      updatedAt: new Date().toISOString()
    }

    if (editingProject) {
      await editProject(editingProject.id, projectData)
      showNotification('Project updated successfully')
    } else {
      projectData.createdAt = new Date().toISOString()
      await createProject(projectData)
      showNotification('Project created successfully')
    }

    resetForm()
  } catch (error) {
    console.error('Save project error:', error)
    showNotification('Failed to save project: ' + error.message, 'error')
  } finally {
    setIsLoading(false)
  }
}
  // Delete project with Firebase
  const handleDeleteProject = async (project) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    
    try {
      // Check auth before delete
      if (!auth.currentUser) {
        showNotification('Please login again to delete projects', 'error')
        return
      }

      await removeProject(project.id, project.imagePath)
      showNotification('Project deleted successfully')
    } catch (error) {
      console.error('Delete project error:', error)
      showNotification('Failed to delete project: ' + error.message, 'error')
    }
  }

  // Edit project
const handleEditProject = (project) => {
  setEditingProject(project)
  setFormData({
    title: project.title || '',
    category: project.category || '',
    description: project.description || '',
    shortDescription: project.shortDescription || '',
    technologies: Array.isArray(project.technologies) 
      ? project.technologies.join(', ') 
      : project.technologies || '',
    keywords: Array.isArray(project.keywords)
      ? project.keywords.join(', ')
      : project.keywords || '',
    status: project.status || 'In Progress',
    year: project.year || new Date().getFullYear().toString(),
    featured: project.featured || false,
    
    // ✅ TAMBAHKAN INI:
    coverImage: project.coverImage || '',
    coverImagePath: project.coverImagePath || '',
    images: project.galleryImages || [],  // ← dari database key "galleryImages"
    files: project.files || []
  })
  setShowModal(true)
}

const resetForm = () => {
  setFormData({
    title: '',
    category: '',
    description: '',
    shortDescription: '',
    // Hapus image & imagePath
    technologies: '',
    keywords: '',
    status: 'In Progress',
    year: new Date().getFullYear().toString(),
    featured: false,
    
    // ✅ TAMBAHKAN INI:
    coverImage: '',
    coverImagePath: '',
    images: [],
    files: []
  })
  setEditingProject(null)
  setShowModal(false)
  clearUploadError()
}
  // Handle view change
  const handleViewChange = (view) => {
    setCurrentView(view)
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  // Refresh data
  const handleRefresh = async () => {
    try {
      await refreshProjects()
      showNotification('Data refreshed successfully')
    } catch (error) {
      showNotification('Failed to refresh data', 'error')
    }
  }

  // Render main content based on current view
  const renderMainContent = () => {
    if (projectsLoading) {
      return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      )
    }

    if (projectsError) {
      return (
        <div className="bg-gray-800 rounded-lg border border-red-500 p-8 text-center">
          <h3 className="text-xl font-semibold mb-2 text-red-400">Error Loading Projects</h3>
          <p className="text-gray-400 mb-4">{projectsError}</p>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Retry
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Reload Page
            </button>
            <button 
              onClick={debugAuth}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
            >
              Debug Auth
            </button>
          </div>
        </div>
      )
    }

    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <DashboardStats projects={projects} />
            <ProjectsList 
              projects={projects.slice(0, 6)}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              title="Recent Projects"
              showViewAll={projects.length > 6}
              onViewAll={() => handleViewChange('projects')}
            />
          </>
        )
      
      case 'projects':
        return (
          <ProjectsList 
            projects={projects}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            title="All Projects"
            showAddButton={true}
            onAddProject={() => setShowModal(true)}
          />
        )
      
      case 'content':
        return <ContentView />
      
      case 'settings':
        return <SettingsView />
      
      default:
        return (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Page Not Found</h3>
            <p className="text-gray-400 mb-4">The requested page could not be found.</p>
            <button 
              onClick={() => handleViewChange('dashboard')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border max-w-md ${
          notification.type === 'error' 
            ? 'bg-red-900 border-red-500 text-red-100' 
            : 'bg-green-900 border-green-500 text-green-100'
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-sm">{notification.message}</p>
            <button 
              onClick={() => setNotification({ show: false, message: '', type: '' })}
              className="ml-2 text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Auth Debug Info (only in development) */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 left-4 bg-gray-800 border border-gray-600 rounded p-2 text-xs z-40">
          <div>User: {auth.currentUser?.email || 'Not logged in'}</div>
          <div>UID: {auth.currentUser?.uid || 'N/A'}</div>
          <button 
            onClick={debugAuth}
            className="mt-1 px-2 py-1 bg-blue-600 rounded text-xs"
          >
            Debug
          </button>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentView={currentView}
        setCurrentView={handleViewChange}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <CMSHeader 
          currentView={currentView}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
          onRefresh={handleRefresh}
          projectsCount={projects.length}
        />

        {/* Dashboard Content */}
        <main className="p-6">
          {renderMainContent()}
        </main>
      </div>

      {/* Modal for Add/Edit Project */}
      <ProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading || imageUploading}
        uploadProgress={uploadProgress}
        uploadError={uploadError}
        onSave={handleSaveProject}
        onImageUpload={handleImageUpload}
        onRemoveImage={handleRemoveImage}
        onCancel={resetForm}
      />
    </div>
  )
}

export default CMSDashboard