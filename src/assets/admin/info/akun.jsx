// src/components/cms/AdminInfo.jsx
// Komponen untuk menampilkan info admin yang sedang login

import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AdminInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = auth.currentUser;

  const handleLogout = async () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    
    setLoading(true);
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
      >
        {user.photoURL ? (
          <img 
            src={user.photoURL} 
            alt={user.displayName || 'Admin'} 
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user.email?.[0].toUpperCase()}
            </span>
          </div>
        )}
        <div className="text-left hidden md:block">
          <p className="text-sm font-medium text-white">
            {user.displayName || 'Admin'}
          </p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowDropdown(false)}
          ></div>
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'Admin'} 
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.displayName || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-900 text-green-300 text-xs rounded-full">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="px-3 py-2 text-xs text-gray-500">
                UID: <span className="font-mono text-gray-400">{user.uid}</span>
              </div>
            </div>

            <div className="p-2 border-t border-gray-700">
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminInfo;