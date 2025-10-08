import React, { useState, useEffect } from 'react'
import { 
  X, 
  Save, 
  Upload, 
  ImageIcon, 
  FileText, 
  Presentation, 
  Trash2,
  Star,
  Plus,
  Eye,
  Download,
  Sparkles,
  Folder,
  RefreshCw
} from 'lucide-react'
import { useImageUpload } from '../../hook/useImageUpluoad'

const ProjectModal = ({ 
  showModal, 
  setShowModal, 
  editingProject, 
  setEditingProject,
  formData, 
  setFormData, 
  isLoading,
  onSave
}) => {
  const categories = ["Frontend Development", "Digital Marketing", "UI/UX Design", "Website Development", "Random Thoughts"]
  const statuses = ["Completed", "In Progress", "Planned", "On Hold"]
  
  const { 
    uploadImage,
    uploadCoverImage,
    uploadFile, 
    uploadMultipleImages, 
    uploadMultipleFiles, 
    removeItem,
    generateProjectPath,
    uploading, 
    error: uploadError,
    clearError 
  } = useImageUpload()
  
  const [imageUploadProgress, setImageUploadProgress] = useState({})
  const [fileUploadProgress, setFileUploadProgress] = useState({})
  const [projectId, setProjectId] = useState('')
  const [autoCoverEnabled, setAutoCoverEnabled] = useState(false)

  useEffect(() => {
    if (showModal && !editingProject) {
      const newProjectId = `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setProjectId(newProjectId);
    } else if (editingProject) {
      setProjectId(editingProject.id);
    }
  }, [showModal, editingProject]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleClose = () => {
    setShowModal(false)
    setEditingProject(null)
    setFormData({
      title: '',
      category: '',
      description: '',
      shortDescription: '',
      keywords: '',
      coverImage: '',
      coverImagePath: '',
      images: [],
      files: [],
      technologies: '',
      status: 'In Progress',
      year: new Date().getFullYear().toString(),
      featured: false
    })
    setImageUploadProgress({})
    setFileUploadProgress({})
    setProjectId('')
    setAutoCoverEnabled(false)
    clearError()
  }

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setImageUploadProgress(prev => ({ ...prev, cover: 0 }));
      
      const result = await uploadCoverImage(
        file, 
        projectId, 
        formData, 
        (progress) => {
          setImageUploadProgress(prev => ({ ...prev, cover: progress }));
        }
      );
      
      setFormData(prev => ({
        ...prev,
        coverImage: result.url,
        coverImagePath: result.path
      }));
      
      setImageUploadProgress(prev => ({ ...prev, cover: 100 }));
      
      setTimeout(() => {
        setImageUploadProgress(prev => ({ ...prev, cover: 0 }));
      }, 2000);
      
    } catch (error) {
      console.error('Cover upload failed:', error);
      alert(`Upload failed: ${error.message}`);
      setImageUploadProgress(prev => ({ ...prev, cover: 0 }));
    }
  };

  const handleGenerateAutoCover = async () => {
    if (!formData.title) {
      alert('Please enter a project title first')
      return
    }

    try {
      setImageUploadProgress(prev => ({ ...prev, cover: 0 }))
      
      const result = await uploadCoverImage(
        null, 
        projectId, 
        formData, 
        (progress) => {
          setImageUploadProgress(prev => ({ ...prev, cover: progress }))
        },
        true
      )
      
      setFormData(prev => ({
        ...prev,
        coverImage: result.url,
        coverImagePath: result.path
      }))
      
      setImageUploadProgress(prev => ({ ...prev, cover: 100 }))
      
      setTimeout(() => {
        setImageUploadProgress(prev => ({ ...prev, cover: 0 }))
      }, 2000)
      
    } catch (error) {
      console.error('Auto cover generation failed:', error)
      alert(`Generation failed: ${error.message}`)
    }
  }

  // ✅ FIXED: Handle multiple images upload with proper logging
  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    console.log('📤 Starting upload for', files.length, 'files')
    console.log('📁 Project ID:', projectId)

    try {
      files.forEach((_, index) => {
        const uploadId = `img_${Date.now()}_${index}`
        setImageUploadProgress(prev => ({ ...prev, [uploadId]: 0 }))
      })

      const results = await uploadMultipleImages(files, projectId, (uploadId, progress) => {
        setImageUploadProgress(prev => ({ ...prev, [uploadId]: progress }))
      })
      
      console.log('✅ Upload results:', results)
      console.log('📝 Current formData.images BEFORE update:', formData.images)
      
      const updatedImages = [...(formData.images || []), ...results]
      console.log('📝 Updated images array:', updatedImages)
      
      setFormData(prev => {
        const newFormData = {
          ...prev,
          images: updatedImages
        }
        console.log('💾 New formData being set:', newFormData)
        return newFormData
      })

      setTimeout(() => {
        results.forEach(result => {
          setImageUploadProgress(prev => ({ ...prev, [result.id]: 0 }))
        })
      }, 2000)
      
    } catch (error) {
      console.error('❌ Multiple images upload failed:', error)
      alert(`Upload failed: ${error.message}`)
    }
  }

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    console.log('📤 Starting file upload for', files.length, 'files')

    try {
      files.forEach((_, index) => {
        const uploadId = `file_${Date.now()}_${index}`
        setFileUploadProgress(prev => ({ ...prev, [uploadId]: 0 }))
      })

      const results = await uploadMultipleFiles(files, projectId, (uploadId, progress) => {
        setFileUploadProgress(prev => ({ ...prev, [uploadId]: progress }))
      })
      
      console.log('✅ File upload results:', results)
      
      const updatedFiles = [...(formData.files || []), ...results]
      
      setFormData(prev => ({
        ...prev,
        files: updatedFiles
      }))

      setTimeout(() => {
        results.forEach(result => {
          setFileUploadProgress(prev => ({ ...prev, [result.id]: 0 }))
        })
      }, 2000)
      
    } catch (error) {
      console.error('❌ File upload failed:', error)
      alert(`Upload failed: ${error.message}`)
    }
  }

  const removeImage = async (imageId) => {
    const image = formData.images.find(img => img.id === imageId)
    if (image?.path) {
      try {
        await removeItem(image.path, projectId, 'gallery', image.url)
      } catch (error) {
        console.error('Failed to delete image from storage:', error)
      }
    }
    
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }))
  }

  const removeFile = async (fileId) => {
    const file = formData.files.find(f => f.id === fileId)
    if (file?.path) {
      try {
        await removeItem(file.path, projectId, 'files', file.url)
      } catch (error) {
        console.error('Failed to delete file from storage:', error)
      }
    }
    
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(file => file.id !== fileId)
    }))
  }

  const removeCoverImage = async () => {
    if (formData.coverImagePath) {
      try {
        await removeItem(formData.coverImagePath, projectId, 'covers', formData.coverImage)
      } catch (error) {
        console.error('Failed to delete cover image from storage:', error)
      }
    }
    
    setFormData(prev => ({ 
      ...prev, 
      coverImage: '',
      coverImagePath: ''
    }))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return <FileText className="text-red-500" size={20} />
    if (fileType?.includes('presentation') || fileType?.includes('powerpoint')) {
      return <Presentation className="text-orange-500" size={20} />
    }
    return <FileText className="text-gray-500" size={20} />
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-800 rounded-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            {projectId && (
              <div className="flex items-center gap-2 mt-1">
                <Folder size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-mono">
                  projects/{projectId}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {uploadError && (
          <div className="mx-6 mt-4 p-3 bg-red-900/50 border border-red-600 rounded-lg">
            <p className="text-red-300 text-sm">{uploadError}</p>
            <button 
              onClick={clearError}
              className="text-red-400 hover:text-red-300 text-xs mt-1"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  placeholder="Enter project title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                    min="2020"
                    max="2030"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  placeholder="e.g. React, Tailwind CSS, JavaScript"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Keywords (comma-separated)</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  placeholder="e.g. web development, portfolio, design"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-300">Featured Project</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Cover Image</label>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoCoverEnabled}
                      onChange={(e) => setAutoCoverEnabled(e.target.checked)}
                      className="w-3 h-3 text-blue-600 bg-gray-700 border-gray-600 rounded"
                    />
                    Auto-generate
                  </label>
                  <button
                    onClick={handleGenerateAutoCover}
                    disabled={uploading || !formData.title}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                      uploading || !formData.title
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                    title={!formData.title ? 'Enter project title first' : 'Generate automatic cover'}
                  >
                    <Sparkles size={12} />
                    Generate
                  </button>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                {formData.coverImage ? (
                  <div className="relative">
                    <img 
                      src={formData.coverImage} 
                      alt="Cover Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={removeCoverImage}
                      className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full text-white"
                      disabled={uploading}
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute top-2 left-2">
                      <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star size={12} />
                        Cover
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <button
                        onClick={() => window.open(formData.coverImage, '_blank')}
                        className="p-1 bg-gray-800/80 hover:bg-gray-700 rounded text-white"
                        title="View Full Size"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400 mb-4">Upload cover image or generate automatically</p>
                    <div className="flex gap-2 justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                        id="cover-image-upload"
                        disabled={uploading}
                      />
                      <label
                        htmlFor="cover-image-upload"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors text-white ${
                          uploading 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        <Upload size={16} />
                        {uploading ? 'Uploading...' : 'Choose File'}
                      </label>
                    </div>
                  </div>
                )}
                
                {imageUploadProgress.cover > 0 && imageUploadProgress.cover < 100 && (
                  <div className="mt-4">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${imageUploadProgress.cover}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Processing cover... {imageUploadProgress.cover}%</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Short Description</label>
              <span className="text-xs text-gray-400 ml-2">(max 150 characters)</span>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              rows="2"
              maxLength={150}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-white"
              placeholder="Enter short Description (max 150 characters)"
            ></textarea>
            <div className="flex justify-end">
    <span className="text-xs text-gray-400 mt-1">
      {formData.shortDescription?.length || 0}/150
    </span>
  </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-white"
              placeholder="Enter project description"
            ></textarea>
          </div>

          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Folder size={16} className="text-blue-400" />
              File Organization Structure
            </h4>
            <div className="text-xs text-gray-400 space-y-1 font-mono">
              <div>├── Storage: projects/{projectId}/</div>
              <div>│   ├── covers/ (cover image)</div>
              <div>│   ├── gallery/ (project images)</div>
              <div>│   └── files/ (documents: PDF, PPT)</div>
              <div>└── Database: Saved in project data when you click Save</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <ImageIcon size={16} className="text-green-400" />
                Image Gallery ({formData.images?.length || 0} images)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultipleImagesUpload}
                className="hidden"
                id="gallery-images-upload"
                disabled={uploading}
              />
              <label
                htmlFor="gallery-images-upload"
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer transition-colors text-white text-sm ${
                  uploading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <Plus size={14} />
                {uploading ? 'Uploading...' : 'Add Images'}
              </label>
            </div>

            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {formData.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <button
                        onClick={() => window.open(image.url, '_blank')}
                        className="p-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                        title="View Image"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="p-1 bg-red-600 hover:bg-red-700 rounded text-white"
                        title="Remove Image"
                        disabled={uploading}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="absolute bottom-1 left-1">
                      <div className="bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                        {formatFileSize(image.size)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {Object.entries(imageUploadProgress).map(([id, progress]) => {
              if (id === 'cover' || progress >= 100 || progress === 0) return null
              return (
                <div key={id} className="mb-2">
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Uploading image... {progress}%</p>
                </div>
              )
            })}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FileText size={16} className="text-purple-400" />
                File Attachments ({formData.files?.length || 0} files)
              </label>
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer transition-colors text-white text-sm ${
                  uploading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                <Plus size={14} />
                {uploading ? 'Uploading...' : 'Add Files'}
              </label>
            </div>

            {formData.files && formData.files.length > 0 && (
              <div className="space-y-3 mb-4">
                {formData.files.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                    {getFileIcon(file.type)}
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{file.name}</p>
                      <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(file.url, '_blank')}
                        className="p-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                        title="View/Download File"
                      >
                        <Download size={14} />
                      </button>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 bg-red-600 hover:bg-red-700 rounded text-white"
                        title="Remove File"
                        disabled={uploading}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {Object.entries(fileUploadProgress).map(([id, progress]) => {
              if (progress >= 100 || progress === 0) return null
              return (
                <div key={id} className="mb-2">
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Uploading file... {progress}%</p>
                </div>
              )
            })}
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-700">
            <button
              onClick={onSave}
              disabled={isLoading || uploading || !formData.title || !formData.category}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-white"
            >
              {isLoading || uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {uploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save size={16} />
                  {editingProject ? 'Update Project' : 'Save Project'}
                </>
              )}
            </button>
            <button
              onClick={handleClose}
              disabled={uploading}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg transition-colors text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal