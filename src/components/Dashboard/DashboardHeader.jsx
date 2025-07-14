import React from 'react';

const DashboardHeader = () => {
  return (
    <header
      className="w-full font-sans text-gray-800 shadow-sm bg-cover bg-center min-h-[400px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Removed the blur wrapper */}
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
            <a href="/about" className="text-black hover:text-blue-700 text-base">About</a>
            <a href="/courses" className="text-black hover:text-blue-700 text-base">Courses</a>
            <a href="/pages" className="text-black hover:text-blue-700 text-base">Pages</a>
            <a href="/contact" className="text-black hover:text-blue-700 text-base">Contact</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base">
              Sign Up
            </button>
          </nav>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            <span className="font-medium text-black">HOME</span>
            <span className="font-medium text-black">CONTACT</span>
          </div>

          <div className="relative w-64">
            <input
              type="text"
              placeholder="Courses Keyword Search"
              className="w-full pl-4 pr-10 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-2.5 text-white hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
