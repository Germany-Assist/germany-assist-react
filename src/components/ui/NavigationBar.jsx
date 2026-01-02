import { Link, useLocation } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import ProfileAvatar from "./ProfileAvatar";
import logo from "../../assets/brand/logo.png";
const NavigationBar = () => {
  const location = useLocation();
  const { profile } = useProfile();

  const isActivePath = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getLinkStyles = (path) => {
    const baseStyles =
      "relative font-medium transition-all duration-300 px-4 py-2 rounded-full text-sm tracking-wide";

    if (isActivePath(path)) {
      // Active state: Floating pill effect
      return `${baseStyles} text-cyan-400 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]`;
    }
    // Inactive state: Subtle dimming
    return `${baseStyles} text-gray-400 hover:text-white hover:bg-white/5`;
  };

  return (
    // Sticky floating container with Glassmorphism
    <header className=" pt-7 max-h-40 z-50 w-full px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#292929]/80 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl px-6 py-3 transition-all duration-500">
          <div className="flex justify-between items-center">
            {/* Logo Section - Floating Icon Style */}
            <Link to="/" className="flex items-center group">
              <img src={logo} alt="" className="max-w-40 max-h-60 " />
            </Link>

            {/* Desktop Navigation - Pill Style */}
            <nav className="hidden md:flex items-center space-x-1 p-1 bg-black/20 rounded-full border border-white/5">
              <Link to="/" className={getLinkStyles("/")}>
                Home
              </Link>

              <Link to="/services" className={getLinkStyles("/services")}>
                Services
              </Link>
              <Link to="/jobs" className={getLinkStyles("/jobs")}>
                Jobs
                <span className="ml-2 bg-cyan-500/10 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full border border-cyan-500/20 uppercase tracking-tighter">
                  Soon
                </span>
              </Link>
              <Link to="/about" className={getLinkStyles("/about")}>
                About
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {profile ? (
                <div className="flex items-center border-l border-white/10 pl-4">
                  <ProfileAvatar navDir={"/dashboard"} className={"max-w-15"} />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/auth">
                    <button className="relative overflow-hidden group bg-cyan-400 text-black text-sm font-bold px-6 py-2 rounded-full transition-all hover:scale-105 active:scale-95">
                      <span className="relative z-10 ">Log In</span>
                    </button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/10">
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
      </div>
    </header>
  );
};

export default NavigationBar;
