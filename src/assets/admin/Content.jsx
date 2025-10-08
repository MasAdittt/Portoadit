import React, { useState } from 'react'
import { FileText, Plus, Edit2, Trash2, Eye, Calendar } from 'lucide-react'

const ContentView = () => {
  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      title: "About Me Page",
      type: "Page",
      status: "Published",
      lastModified: "2024-01-15",
      author: "Admin"
    },
    {
      id: 2,
      title: "Latest Web Development Trends",
      type: "Blog Post",
      status: "Draft",
      lastModified: "2024-01-20",
      author: "Admin"
    },
    {
      id: 3,
      title: "Contact Information",
      type: "Page",
      status: "Published",
      lastModified: "2024-01-10",
      author: "Admin"
    }
  ])

  const [activeTab, setActiveTab] = useState('all')

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-900/30 text-green-400 border-green-700/30'
      case 'Draft':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-700/30'
      case 'Archived':
        return 'bg-gray-900/30 text-gray-400 border-gray-700/30'
      default:
        return 'bg-blue-900/30 text-blue-400 border-blue-700/30'
    }
  }

  const filteredContent = contentItems.filter(item => {
    if (activeTab === 'all') return true
    if (activeTab === 'pages') return item.type === 'Page'
    if (activeTab === 'posts') return item.type === 'Blog Post'
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Content Management</h2>
          <p className="text-gray-400">Manage your website pages and blog posts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Plus size={16} />
          New Content
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-800 p-1 rounded-lg w-fit">
        {[
          { id: 'all', label: 'All Content' },
          { id: 'pages', label: 'Pages' },
          { id: 'posts', label: 'Blog Posts' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Content Items</h3>
          <p className="text-sm text-gray-400 mt-1">
            {filteredContent.length} item{filteredContent.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 font-medium text-gray-300">Title</th>
                <th className="text-left p-4 font-medium text-gray-300">Type</th>
                <th className="text-left p-4 font-medium text-gray-300">Status</th>
                <th className="text-left p-4 font-medium text-gray-300">Last Modified</th>
                <th className="text-left p-4 font-medium text-gray-300">Author</th>
                <th className="text-left p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((item) => (
                <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-gray-400" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-400">{item.type}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={14} />
                      <span className="text-sm">{item.lastModified}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-400">{item.author}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        title="View"
                        className="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        title="Edit"
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        title="Delete"
                        className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h4 className="text-sm text-gray-400 mb-2">Total Pages</h4>
          <p className="text-2xl font-bold text-blue-400">
            {contentItems.filter(item => item.type === 'Page').length}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h4 className="text-sm text-gray-400 mb-2">Blog Posts</h4>
          <p className="text-2xl font-bold text-green-400">
            {contentItems.filter(item => item.type === 'Blog Post').length}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h4 className="text-sm text-gray-400 mb-2">Published</h4>
          <p className="text-2xl font-bold text-purple-400">
            {contentItems.filter(item => item.status === 'Published').length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContentView