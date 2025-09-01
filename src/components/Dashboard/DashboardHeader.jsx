import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const DashboardHeader = () => {
  const location = useLocation();
  // TODO: Replace with actual authentication context/state management
  // For now, using local state - in production, this would come from:
  // - AuthContext, Redux, Zustand, or similar state management
  // - JWT token validation
  // - Session storage/cookies
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // TODO: Replace with actual logout functionality
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // In production: clear tokens, call logout API, redirect, etc.
  };

  // TODO: This would typically be handled by your auth system
  // Example: After successful login, you would call:
  // setIsLoggedIn(true);
  // setUser({ name: 'John Doe', email: 'john@example.com' });

  // Temporary function for testing - remove in production
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) {
      setUser({ name: 'Test User', email: 'test@example.com' });
    } else {
      setUser(null);
    }
  };

  // Helper function to determine if a link is active
  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Get active link styles
  const getLinkStyles = (path) => {
    const baseStyles = "font-medium transition-all duration-200 px-3 py-2 rounded-lg";
    if (isActivePath(path)) {
      return `${baseStyles} bg-blue-100 text-blue-700 border-b-2 border-blue-600`;
    }
    return `${baseStyles} text-gray-700 hover:text-blue-600 hover:bg-gray-50`;
  };

  return (
    <header
      className="w-full font-sans text-gray-800 shadow-sm bg-cover bg-center min-h-[400px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
 
      <div className="px-8 py-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Dashboard"
              className="h-10 w-10 mr-3 rounded-full object-cover"
            />
            <div className="text-2xl font-bold text-black">Germany-Assist</div>
          </div>

          <nav className="flex items-center space-x-6">
            <a href="/" className="text-black hover:text-blue-700 text-base">Home</a>
            <a href="/businessProfile" className="text-black hover:text-blue-700 text-base">Business</a>
            <a href="#services" className="text-black hover:text-blue-700 text-base">Services</a>
            <a href="/pages" className="text-black hover:text-blue-700 text-base">Pages</a>
            <a href="/userProfile" className="text-black hover:text-blue-700 text-base">Profile</a>
            <a href="/login" className="text-black hover:text-blue-700 text-base">Login</a>
 
          <Link to="/signup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base">
              Sign Up
            </button>
            </Link>
            {/* Only show Profile link when user is logged in */}
            {isLoggedIn && (
              <Link to="/userProfile" className={getLinkStyles('/userProfile')}>
                Profile
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons - Conditional based on login status */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                // Logged in: Show user info and logout
                <>
                  <div className="hidden lg:flex items-center space-x-3">
                    <div className="text-sm text-gray-600">
                      Welcome back!
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 font-medium px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Logged out: Show login and signup
                <>
                  <Link to="/login">
                    <button className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Temporary Test Button - Remove in production */}
            <button 
              onClick={toggleLoginState}
              className="hidden lg:block bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-300 transition-colors duration-200"
              title="Test login state toggle"
            >
              {isLoggedIn ? 'Test Logout' : 'Test Login'}
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>


      </div>
    </header>
  );
};

export default DashboardHeader;
