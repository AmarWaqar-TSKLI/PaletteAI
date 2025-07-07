import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas-pro'; // Changed to html2canvas-pro

const COLOR_KEYS = [
  "primary", "secondary", "accent", "neutral", "background",
  "highlight", "muted", "success"
];

const DEFAULT_COLOR_NAMES = [
  "Primary", "Secondary", "Accent", "Neutral", "Background",
  "Highlight", "Muted", "Success"
];

// Helper to get role and color name for each color
function getColorRoleAndName(palette, idx) {
  if (palette?.colorNamesDetailed && palette.colorNamesDetailed[idx]) {
    const { role, name } = palette.colorNamesDetailed[idx];
    return { role: role || DEFAULT_COLOR_NAMES[idx], name: name || "" };
  }
  return {
    role: palette?.colorNames?.[idx] || DEFAULT_COLOR_NAMES[idx],
    name: ""
  };
}

const CreatePage = () => {
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [palette, setPalette] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const paletteRef = useRef(null);

  const [form, setForm] = useState({
    businessType: "",
    industry: "",
    audience: "",
    designStyle: "",
    colorPref: "",
    usage: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (value) => {
    setForm(prev => ({
      ...prev,
      usage: prev.usage.includes(value)
        ? prev.usage.filter(v => v !== value)
        : [...prev.usage, value]
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowResult(false);

    try {
      const response = await fetch("http://localhost:5000/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error("Failed to generate palette");
      const data = await response.json();
      setPalette(data.palette);
      setShowResult(true);
    } catch (err) {
      alert("Error generating palette. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPaletteImage = async () => {
    if (!paletteRef.current || isDownloading) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(paletteRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `palette-${form.businessType || 'design'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
      alert("Could not generate image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (!palette && process.env.NODE_ENV === 'development') {
      setPalette({
        primary: "#3A86FF",
        secondary: "#8338EC",
        accent: "#FF006E",
        neutral: "#F8F9FA",
        background: "#212529",
        highlight: "#06B6D4",
        muted: "#94A3B8",
        success: "#10B981",
        fontSuggestion: "Inter, sans-serif",
        colorNamesDetailed: [
          { role: "Primary", name: "Sky Blue" },
          { role: "Secondary", name: "Royal Purple" },
          { role: "Accent", name: "Crimson Red" },
          { role: "Neutral", name: "Ivory" },
          { role: "Background", name: "Charcoal" },
          { role: "Highlight", name: "Turquoise" },
          { role: "Muted", name: "Slate Gray" },
          { role: "Success", name: "Emerald" }
        ],
        colorPsychology: [
          "Trustworthy and professional",
          "Creative and energetic",
          "Vibrant attention-grabber",
          "Balanced and clean",
          "Modern and sleek",
          "Fresh and innovative",
          "Subtle and understated",
          "Positive and successful"
        ]
      });
    }
  }, []);

  // Fixed stepper logic for ticks and active line
  const isStepComplete = idx => {
    if (showResult && idx <= 3) return true;
    return step > idx;
  };

  const isStepActive = idx => {
    if (showResult && idx === 3) return true;
    return step === idx;
  };

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

      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-10">
        {/* Fixed Stepper */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex justify-center items-center gap-0 w-full max-w-xl">
            {["Business", "Design", "Usage", "Result"].map((label, idx) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 shadow transition-all
                    ${isStepComplete(idx) || isStepActive(idx)
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white"
                      : "bg-slate-800 border-slate-600 text-slate-400"
                    }`}>
                    {isStepComplete(idx)
                      ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )
                      : (idx + 1)}
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm font-semibold ${isStepComplete(idx) || isStepActive(idx) ? "text-white" : "text-slate-400"}`}>{label}</span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-1 mx-1 sm:mx-2 rounded-full transition-all ${isStepComplete(idx) ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "bg-slate-700"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* FORM STEPS */}
        {!showResult && (
          <form className="bg-slate-800/60 rounded-2xl p-6 sm:p-10 border border-slate-700/50 space-y-8 shadow-lg" onSubmit={handleGenerate}>
            {step === 0 && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-center">Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Type</label>
                    <select name="businessType" value={form.businessType} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">Select...</option>
                      <option>Startup</option>
                      <option>Small Business</option>
                      <option>Corporate</option>
                      <option>Non-Profit</option>
                      <option>Personal Brand</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Industry</label>
                    <select name="industry" value={form.industry} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">Select...</option>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Education</option>
                      <option>Food & Beverage</option>
                      <option>Fashion & Beauty</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Audience</label>
                  <input name="audience" value={form.audience} onChange={handleChange} required
                    placeholder="e.g. Young professionals, families..."
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700">
                    Next →
                  </button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-center">Design Preferences</h2>
                <div>
                  <label className="block text-sm font-medium mb-1">Design Style</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["Modern", "Minimalist", "Bold", "Elegant", "Playful", "Corporate"].map(style => (
                      <button type="button" key={style}
                        className={`px-4 py-3 rounded-lg font-medium transition-all border-2
                          ${form.designStyle === style
                            ? "border-indigo-500 bg-indigo-600/20 text-white"
                            : "border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500"
                          }`}
                        onClick={() => setForm(f => ({ ...f, designStyle: style }))}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Color Preference</label>
                  <select name="colorPref" value={form.colorPref} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white">
                    <option value="">No preference</option>
                    <option>Warm</option>
                    <option>Cool</option>
                    <option>Neutral</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep}
                    className="px-6 py-3 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700/50">
                    ← Previous
                  </button>
                  <button type="button" onClick={nextStep}
                    disabled={!form.designStyle}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50">
                    Next →
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-center">Where Will You Use This Palette?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {["Website", "Logo", "Marketing", "Business Cards", "App", "Print"].map(usage => (
                    <button type="button" key={usage}
                      className={`px-4 py-3 rounded-lg font-medium transition-all
                        ${form.usage.includes(usage)
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                        }`}
                      onClick={() => handleMultiSelect(usage)}
                    >
                      {usage}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep}
                    className="px-6 py-3 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700/50">
                    ← Previous
                  </button>
                  <button type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700">
                    {loading ? (
                      <span className="flex items-center">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        Generating...
                      </span>
                    ) : "Generate Palette"}
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {/* RESULT */}
        {showResult && palette && (
          <div className="space-y-8">
            {/* Hidden div for image capture - FIXED WIDTH ISSUES */}
            <div className="fixed -left-[9999px] top-0" ref={paletteRef}>
              <div
                className="w-[800px] p-10 rounded-2xl shadow-2xl"
                style={{ background: "#212529" }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1
                      className="text-4xl font-bold mb-2"
                      style={{ color: "#a78bfa" }}
                    >
                      PaletteAI
                    </h1>
                    <p style={{ color: "#d1d5db" }}>
                      {form.businessType} • {form.industry} • {form.designStyle}
                    </p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Generated on</p>
                    <p style={{ color: "#d1d5db" }}>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Color Grid - SHOWING ROLE AND NAME WITH PROPER WIDTH */}
                <div className="grid grid-cols-4 gap-6 mb-10">
                  {COLOR_KEYS.map((key, idx) => {
                    if (!palette[key]) return null;
                    const { role, name } = getColorRoleAndName(palette, idx);
                    return (
                      <div key={key}>
                        <div
                          className="w-full h-32 rounded-xl mb-3 shadow-lg"
                          style={{ backgroundColor: palette[key] }}
                        />
                        <div className="text-center">
                          <div
                            style={{
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1rem",
                              width: "150px",
                              margin: "0 auto",
                              lineHeight: "1.2"
                            }}
                          >
                            <div style={{ color: "#a5b4fc", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                              {role}
                            </div>
                            <div
                              style={{
                                color: "#fff",
                                fontSize: "1rem",
                                wordWrap: "break-word",
                                whiteSpace: "normal"
                              }}
                            >
                              {name}
                            </div>
                          </div>
                          <p style={{ color: "#d1d5db", fontFamily: "monospace", marginTop: "0.5rem" }}>{palette[key]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Font Recommendation */}
                <div style={{
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  marginBottom: "2rem"
                }}>
                  <h3 style={{ color: "#a5b4fc", fontWeight: 600, fontSize: "1.25rem", marginBottom: "0.75rem" }}>Recommended Font</h3>
                  <p style={{
                    fontFamily: palette.fontSuggestion,
                    fontWeight: "bold",
                    fontSize: "2rem",
                    color: "#fff"
                  }}>
                    {palette.fontSuggestion}
                  </p>
                </div>

                {/* Footer */}
                <div style={{
                  marginTop: "2.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid #334155",
                  textAlign: "center",
                  color: "#64748b",
                  fontSize: "0.875rem"
                }}>
                  Generated by PaletteAI • {window.location.host}
                </div>
              </div>
            </div>

            {/* Visible result */}
            <div className="bg-slate-800/60 rounded-2xl p-6 sm:p-10 border border-slate-700/50 space-y-8 shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Your Color Palette</h2>
                <button
                  onClick={downloadPaletteImage}
                  disabled={isDownloading}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 flex items-center"
                >
                  {isDownloading ? (
                    <>
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Image...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Download Palette
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {COLOR_KEYS.map((key, idx) => {
                  if (!palette[key]) return null;
                  const { name } = getColorRoleAndName(palette, idx);
                  return (
                    <div key={key} className="group">
                      <div
                        className="w-full h-24 sm:h-32 rounded-lg mb-3 shadow-md transition-transform group-hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: palette[key] }}
                        onClick={() => navigator.clipboard.writeText(palette[key])}
                      />
                      <div className="text-center">
                        <span
                          className="font-bold text-white block"
                          style={{
                            maxWidth: "120px",
                            margin: "0 auto",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                          title={name}
                        >
                          {name}
                        </span>
                        <p className="text-slate-400 text-sm font-mono">{palette[key]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Color Psychology - ADDED ROLE WITH DESCRIPTION */}
              <div className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-300 mb-4">Color Psychology</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COLOR_KEYS.map((key, idx) => {
                    if (!palette[key] || !palette.colorPsychology?.[idx]) return null;
                    const { role } = getColorRoleAndName(palette, idx);
                    return (
                      <div key={key} className="flex items-start">
                        <div
                          className="w-8 h-8 rounded-full mr-3 flex-shrink-0 border border-slate-700"
                          style={{ backgroundColor: palette[key] }}
                        />
                        <div>
                          <h4 className="font-medium text-white mb-1">{role}</h4>
                          <p className="text-slate-300 text-sm">{palette.colorPsychology[idx]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-300 mb-3">Typography</h3>
                <p className="text-2xl font-bold mb-2" style={{ fontFamily: palette.fontSuggestion }}>
                  {palette.fontSuggestion}
                </p>
                <p className="text-slate-300">
                  Recommended for {form.designStyle.toLowerCase()} designs targeting {form.audience.toLowerCase()}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setStep(0);
                    setForm({
                      businessType: "",
                      industry: "",
                      audience: "",
                      designStyle: "",
                      colorPref: "",
                      usage: [],
                    });
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700"
                >
                  Create New Palette
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
