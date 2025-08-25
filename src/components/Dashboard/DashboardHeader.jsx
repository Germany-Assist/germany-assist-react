import { Link } from 'react-router-dom';
import { useState } from 'react';

const DashboardHeader = () => {
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

  return (
    <header className="w-full font-sans bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl mr-3 group-hover:shadow-lg transition-all duration-200">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Germany-Assist
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Services
            </Link>
            <Link to="/pages" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Pages
            </Link>
            {/* Only show Profile link when user is logged in */}
            {isLoggedIn && (
              <Link to="/userProfile" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
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
