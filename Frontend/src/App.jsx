import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import AboutPage from './pages/AboutPage';
import ExamplesPage from './pages/ExamplePage'; // Make sure filename matches!
import PrivacyPage from './pages/PrivacyPage';

// Landing Page Component
const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent background scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                PaletteAI
              </h2>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </Link>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="text-slate-300 hover:text-white p-2"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  // X icon
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Burger icon
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              {/* Slide-down mobile menu */}
              <div
                className={`fixed left-0 top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out z-40 ${
                  menuOpen ? 'translate-y-0' : '-translate-y-full pointer-events-none'
                }`}
                style={{ }}
              >
                <nav className="flex flex-col px-6 py-8 space-y-3">
                  <Link
                    to="/"
                    className="text-slate-200 text-lg font-semibold py-2 px-2 rounded hover:bg-slate-800 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-slate-200 text-lg font-semibold py-2 px-2 rounded hover:bg-slate-800 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/create"
                    className="text-slate-200 text-lg font-semibold py-2 px-2 rounded hover:bg-slate-800 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Create
                  </Link>
                  <Link
                    to="/examples"
                    className="text-slate-200 text-lg font-semibold py-2 px-2 rounded hover:bg-slate-800 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Examples
                  </Link>
                  <Link
                    to="/privacy"
                    className="text-slate-200 text-lg font-semibold py-2 px-2 rounded hover:bg-slate-800 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Privacy
                  </Link>
                </nav>
              </div>
              {/* Overlay for closing menu by clicking outside */}
              {menuOpen && (
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setMenuOpen(false)}
                  style={{ background: 'rgba(30, 41, 59, 0.4)' }}
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Generate Perfect
                  <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Color Palettes
                  </span>
                  <span className="block">for Your Business</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl">
                  Transform your business vision into stunning color schemes using AI.
                  Get professional palettes tailored to your brand, industry, and target audience in seconds.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                      <span className="text-indigo-400 text-sm">🎨</span>
                    </div>
                  </div>
                  <span className="text-slate-300">AI-Powered Generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 text-sm">🎯</span>
                    </div>
                  </div>
                  <span className="text-slate-300">Business-Focused</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                      <span className="text-pink-400 text-sm">📱</span>
                    </div>
                  </div>
                  <span className="text-slate-300">Download as Image</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/create"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Start Creating
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/examples"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all duration-200"
                >
                  View Examples
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="space-y-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  {/* Palette Card 1 */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-10 h-10 bg-indigo-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-purple-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-cyan-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-emerald-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-amber-500 rounded-lg shadow-sm"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Tech Startup</h3>
                    <p className="text-slate-400 text-sm">Modern & Trustworthy</p>
                  </div>

                  {/* Palette Card 2 */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-10 h-10 bg-red-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-orange-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-lime-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-green-500 rounded-lg shadow-sm"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Food & Beverage</h3>
                    <p className="text-slate-400 text-sm">Appetizing & Warm</p>
                  </div>

                  {/* Palette Card 3 */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/10">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-slate-600 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-slate-500 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-slate-400 rounded-lg shadow-sm"></div>
                      <div className="w-10 h-10 bg-slate-300 rounded-lg shadow-sm"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Professional</h3>
                    <p className="text-slate-400 text-sm">Elegant & Sophisticated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose PaletteAI?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Transform your brand with AI-powered color intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Intelligence</h3>
              <p className="text-slate-300 leading-relaxed">
                Our advanced AI understands color psychology and business branding to create palettes that resonate with your audience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-300 leading-relaxed">
                Get professional color palettes in seconds. No more hours spent tweaking colors or second-guessing your choices.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-4">Business-Ready</h3>
              <p className="text-slate-300 leading-relaxed">
                Tailored for real business needs with industry-specific recommendations and brand psychology insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                PaletteAI
              </h3>
              <p className="text-slate-400 max-w-md">
                AI-powered color palettes for modern businesses. Transform your brand with intelligent color recommendations.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/create" className="text-slate-400 hover:text-white transition-colors">Generator</Link></li>
                <li><Link to="/examples" className="text-slate-400 hover:text-white transition-colors">Examples</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-center text-slate-400">
              © 2025 PaletteAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App Component with Router
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
