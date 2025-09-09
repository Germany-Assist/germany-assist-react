import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNotifyMe = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with actual API call to save email for notifications
    // const response = await fetch('/api/newsletter/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, source: 'jobs-coming-soon' })
    // });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-8">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>

          {/* Main Content */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Jobs Coming Soon
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
            We're building a powerful job marketplace to connect talented professionals with German employers
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Soon, businesses will be able to post jobs and find qualified candidates who are ready to work in Germany. 
            Candidates will have access to exclusive opportunities from companies that value international talent.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2m0 0h4m-5 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">For Businesses</h3>
              <p className="text-gray-600 text-sm">
                Post jobs, find qualified international candidates, and streamline your hiring process for global talent.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">For Candidates</h3>
              <p className="text-gray-600 text-sm">
                Access exclusive job opportunities from German companies actively seeking international professionals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Seamless Integration</h3>
              <p className="text-gray-600 text-sm">
                Connect job opportunities with our existing services like visa assistance and relocation support.
              </p>
            </div>
          </div>

          {/* Email Signup */}
          {!isSubscribed ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Notified First</h2>
              <p className="text-gray-600 mb-6">
                Be the first to know when our jobs platform launches
              </p>
              
              <form onSubmit={handleNotifyMe}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      'Notify Me'
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">You're on the list!</h2>
              <p className="text-green-700">
                We'll notify you as soon as our jobs platform is ready to launch.
              </p>
            </div>
          )}

          {/* Timeline */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">What's Coming</h2>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 w-4 h-4 rounded-full mt-1 mr-4"></div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Q2 2024 - Platform Development</h3>
                    <p className="text-gray-600 text-sm">Building the core job matching technology and user interface</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gray-300 w-4 h-4 rounded-full mt-1 mr-4"></div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Q3 2024 - Business Partnerships</h3>
                    <p className="text-gray-600 text-sm">Partnering with German companies looking for international talent</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gray-300 w-4 h-4 rounded-full mt-1 mr-4"></div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Q4 2024 - Beta Launch</h3>
                    <p className="text-gray-600 text-sm">Invite-only beta testing with select companies and candidates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gray-300 w-4 h-4 rounded-full mt-1 mr-4"></div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">2025 - Full Launch</h3>
                    <p className="text-gray-600 text-sm">Complete platform launch with full features and integrations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <p className="text-gray-600 mb-6">
              In the meantime, explore our current services to get started on your German journey
            </p>
            <Link 
              to="/services"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Browse Services
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
