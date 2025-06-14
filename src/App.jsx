import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";

import Home from "./Pages/Home";
import Team from "./Pages/Team";
import Services from "./Pages/Services";
import CaseStudies from "./Pages/CaseStudies";
import CaseStudyDetail from "./Pages/CaseStudyDetail";
import TechLab from "./Pages/TechLab";
import Contact from "./Pages/Contact";
import CyberOps from './Pages/CyberOps';
import ApiDocumentation from "./ApiDocumentation";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { path: "/", name: "Home" },
    { path: "/team", name: "Team" },
    { path: "/services", name: "Services" },
    { path: "/casestudies", name: "Case Studies" },
    { path: "/cyberops", name: "Cyber Ops" },
    { path: "/techlab", name: "Tech Lab" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        {/* Header */}
        <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <NavLink
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="bg-gradient-to-r bg-gradient-to-r  from-slate-600 to-gray-700 p-2 rounded-md shadow-lg transform transition-transform duration-300 hover:rotate-3">
                  <span className="text-white font-extrabold text-2xl tracking-wide select-none">
                    I.N.S.I.G.H.T.
                  </span>
                </div>
              </NavLink>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {navigation.map(({ path, name }) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${isActive
                        ? " bg-gradient-to-r  from-slate-600 to-gray-700 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  aria-label="Toggle menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
                >
                  {mobileMenuOpen ? (
                    // X icon
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    // Hamburger icon
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-800 border-t border-gray-700">
              <div className="px-5 pt-2 pb-4 space-y-1">
                {navigation.map(({ path, name }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/api" element={<ApiDocumentation />} />

            {/* Case Studies Routes */}
            <Route path="/casestudies" element={<CaseStudies />} />
            <Route path="/casestudies/all" element={<CaseStudies showAll={true} />} />
            <Route path="/casestudies/:caseId" element={<CaseStudyDetail />} />

            <Route path="/cyberops" element={<CyberOps />} />
            <Route path="/techlab" element={<TechLab />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 text-gray-300 bg-cover bg-bottom bg-fingerprints bg-opacity-20 opacity-65">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  I.N.S.I.G.H.T.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Integrated Network for Surveillance, Investigation, Grid Hacking
                  & Thought‑mapping. Advanced solutions for complex security
                  challenges.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Services
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/cyberops">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white text-sm transition"
                      >
                        Threat Analysis
                      </a>
                    </Link>

                  </li>
                  <li>
                    <Link to="/techlab"> <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      Digital Forensics
                    </a></Link>

                  </li>
                  <li>
                    <Link to="/casestudies"> <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      Behavioral Profiling
                    </a></Link>

                  </li>
                  <li>
                    <Link to="/cyberops"> <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      Network Security
                    </a></Link>

                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/casestudies">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white text-sm transition"
                      >
                        Case Studies
                      </a> </Link>

                  </li>
                  <li>
                    <Link to="/api">
                       <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      API Documentation
                    </a>
                    </Link>
                 
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                <address className="not-italic text-gray-400 text-sm leading-relaxed">
                  <p>24/7 Operations Center</p>
                  <p className="mt-1">insightcore.helpdesk@gmail.com</p>
                  <p className="mt-1">+36 70 242 1586</p>
                  <div className="flex space-x-5 mt-4">
                    <a
                      href="mailto:insightcore.helpdesk@gmail.com"
                      className="text-gray-400 hover:text-white transition"
                      aria-label="Gmail"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 13.065L0 6.24V18c0 1.104.896 2 2 2h20a2 2 0 002-2V6.24l-12 6.825zM12 11L0 4.24V6.6l12 6.825 12-6.825V4.24L12 11z" />
                      </svg>
                    </a>

                    <a
                      href="https://github.com/CsikSzabi04"
                      className="text-gray-400 hover:text-white transition"
                      aria-label="GitHub"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/szabolcs-cs%C3%ADk-a4b767315/"
                      className="text-gray-400 hover:text-white transition"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </address>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} I.N.S.I.G.H.T. </p>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-6 md:gap-4 justify-center md:justify-start">
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition">
                  Security Protocols
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
