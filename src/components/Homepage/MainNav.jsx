import { Link, useLocation } from "react-router-dom";
import { useProfile } from "../../contexts/profileContext";
import ProfileAvatar from "../profile/profileAvatar";
const MainNav = () => {
  const location = useLocation();
  const { profile } = useProfile();

  // Helper function to determine if a link is active
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Get active link styles
  const getLinkStyles = (path) => {
    const baseStyles =
      "font-medium transition-all duration-200 px-3 py-2 rounded-lg";
    if (isActivePath(path)) {
      return `${baseStyles} bg-blue-100 text-blue-700 border-b-2 border-blue-600`;
    }
    return `${baseStyles} text-gray-700 hover:text-blue-600 hover:bg-gray-50`;
  };

  // TODO all of these should be separated into components
  return (
    <header className="w-full font-sans bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl mr-3 group-hover:shadow-lg transition-all duration-200">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Germany-Assist
            </div>
          </Link>

          {/*TODO this nav should be dynamic depending on the rule for deferent needs */}
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/" className={getLinkStyles("/")}>
              Home
            </Link>
            <Link to="/about" className={getLinkStyles("/about")}>
              About
            </Link>
            <Link to="/services" className={getLinkStyles("/services")}>
              Services
            </Link>
            <Link to="/jobs" className={getLinkStyles("/jobs")}>
              Jobs
              <span className="ml-1 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                Soon
              </span>
            </Link>
            {/* Only show Profile link when user is logged in */}
            {profile && (
              <Link to="/userProfile" className={getLinkStyles("/userProfile")}>
                Profile
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons - Conditional based on login status */}
            <div className="flex items-center space-x-3">
              {profile ? (
                // Logged in: Show user info and logout
                <>
                  <div className="hidden lg:flex items-center space-x-3">
                    <div className="text-sm text-gray-600">
                      {profile && <ProfileAvatar navDir={"/dashboard"} />}
                    </div>
                  </div>
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

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
