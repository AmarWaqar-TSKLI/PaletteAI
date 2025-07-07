import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
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

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700/50 shadow-lg space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Your Privacy Matters</h2>
            <p className="text-slate-300 mb-3">
              PaletteAI is committed to protecting your privacy. This page explains what information we collect, how we use it, and your choices regarding your data.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">Information We Collect</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>
                <span className="font-semibold text-white">Usage Data:</span> We collect basic, anonymous usage statistics (such as page visits and palette generation counts) to improve our service.
              </li>
              <li>
                <span className="font-semibold text-white">Palette Inputs:</span> When you generate a palette, the information you provide (like business type, industry, and preferences) is used only to generate your palette. It is not stored or shared.
              </li>
              <li>
                <span className="font-semibold text-white">No Personal Accounts:</span> PaletteAI does not require you to create an account or submit personal information to use the core features.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">How We Use Your Data</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>To generate color palettes tailored to your inputs.</li>
              <li>To analyze usage trends and improve the PaletteAI experience.</li>
              <li>To ensure the reliability and security of the service.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">Cookies & Analytics</h3>
            <p className="text-slate-300">
              PaletteAI may use cookies or similar technologies for basic analytics (such as Google Analytics or Plausible). These do not collect personally identifiable information and are used solely to understand how the site is used.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">Data Sharing</h3>
            <p className="text-slate-300">
              We do not sell, trade, or share your data with third parties. PaletteAI may use third-party AI services for palette generation, but your inputs are not stored or used for any other purpose.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">Your Choices</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>You can use PaletteAI without creating an account or providing personal details.</li>
              <li>You may clear cookies in your browser at any time.</li>
              <li>If you contact us, your email will only be used to respond to your inquiry.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">Contact</h3>
            <p className="text-slate-300">
              If you have questions about this privacy policy or your data, please reach out at <a href="mailto:amarwaqar15@gmail.com" className="text-indigo-300 underline">amarwaqar15@gmail.com</a>.
            </p>
          </section>

          <div className="text-slate-500 text-xs text-center pt-6 border-t border-slate-700 mt-8">
            Last updated: July 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
