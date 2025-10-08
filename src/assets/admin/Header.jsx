// src/components/cms/Header.jsx
import React from 'react'
import AdminInfo from './info/akun'

function CMSHeader({ currentView, setSidebarOpen, setShowModal, onRefresh, projectsCount }) {
  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard'
      case 'projects':
        return 'Projects'
      case 'content':
        return 'Content Management'
      case 'settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        {/* Left side - Menu button & Title */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Title */}
          <div>
            <h1 className="text-xl font-bold text-white">{getViewTitle()}</h1>
            {currentView === 'projects' && (
              <p className="text-sm text-gray-400">{projectsCount} projects total</p>
            )}
          </div>
        </div>

        {/* Right side - Actions & Admin Info */}
        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Refresh data"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden md:inline">Refresh</span>
          </button>

          {/* Add Project Button (hanya tampil di view projects) */}
          {currentView === 'projects' && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden md:inline">Add Project</span>
            </button>
          )}

          {/* Admin Info with Logout */}
          <AdminInfo />
        </div>
      </div>
    </header>
  )
}

export default CMSHeader