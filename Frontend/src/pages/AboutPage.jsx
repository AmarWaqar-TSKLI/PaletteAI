import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            PaletteAI
          </Link>
          <Link to="/" className="text-slate-300 hover:text-white transition-colors">
            ← Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            About PaletteAI
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Creating beautiful, professional color palettes with the power of AI
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - About the Project */}
          <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-3xl font-bold mb-6 text-indigo-300">The Project</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                PaletteAI was born from a simple observation: choosing the right colors for a brand or project shouldn't be overwhelming. As a solo developer, I noticed many creators struggle with color theory and palette selection.
              </p>
              <p>
                This tool combines artificial intelligence with design principles to generate professional, harmonious color palettes tailored to your specific business needs and aesthetic preferences.
              </p>
              <p>
                Whether you're launching a startup, refreshing your brand, or working on a creative project, PaletteAI provides color combinations that work beautifully together while considering psychological impact and visual accessibility.
              </p>
            </div>
          </div>

          {/* Right Column - About the Developer */}
          <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-3xl font-bold mb-6 text-indigo-300">The Developer</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Hi there! I'm a passionate solo developer who loves creating tools that make design more accessible. I believe great design shouldn't require years of training or expensive software.
              </p>
              <p>
                With a background in both development and design, I enjoy building applications that bridge the gap between technical functionality and creative expression.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new design trends, experimenting with color combinations, or working on my next project that hopefully makes someone's creative process a little bit easier.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700/50 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-indigo-300 text-center">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", description: "Frontend Framework" },
              { name: "FastAPI", description: "Backend API" },
              { name: "AI/ML", description: "Intelligent Color Generation" },
              { name: "TailwindCSS", description: "Styling & Design" }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 mb-3">
                  <h3 className="font-bold text-white">{tech.name}</h3>
                </div>
                <p className="text-sm text-slate-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Highlight */}
        <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700/50 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-indigo-300 text-center">What Makes PaletteAI Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered",
                description: "Smart color generation based on business context and design principles",
                icon: "🤖"
              },
              {
                title: "User-Friendly",
                description: "Simple step-by-step process that anyone can follow",
                icon: "✨"
              },
              {
                title: "Professional",
                description: "Color palettes designed for real-world business applications",
                icon: "🎨"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl p-8 border border-indigo-500/30 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-300">Mission</h2>
          <blockquote className="text-xl text-center text-slate-200 italic leading-relaxed">
            "To democratize good design by making professional color selection accessible to everyone, 
            regardless of their design background or budget."
          </blockquote>
        </div>

        {/* Contact/Connect Section */}
        <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700/50 text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-300">Let's Connect</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Have feedback, suggestions, or just want to say hi? I'd love to hear from you! 
            Your input helps make PaletteAI better for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:hello@paletteai.com" 
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Get in Touch
            </a>
            <Link 
              to="/" 
              className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-700/50 transition-all"
            >
              Try PaletteAI
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Made with ❤️ by a solo developer who believes great design should be accessible to all
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
