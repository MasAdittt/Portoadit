import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isAdmin } from '../assets/admin/info/Daftar';

function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isAdmin(user.uid)) {
        // User is logged in and is an admin
        setAuthenticated(true);
        setLoading(false);
      } else {
        // User is either not logged in or not an admin
        setAuthenticated(false);
        setLoading(false);
        navigate('/login', { replace: true });
        if (user) {
          // If user is logged in but not admin
          alert('Access denied. Admin privileges required.');
          auth.signOut(); // Sign out non-admin user
        }
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [navigate]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated and admin
  return authenticated ? children : null;
}

export default AuthGuard;