import { Outlet, Link, useLocation } from "react-router";
import { Phone, X, AlertTriangle, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo, Wordmark } from "./Logo";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const quickExit = () => {
    window.location.replace("https://www.google.com");
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        quickExit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/mission", label: "Our Mission" },
    { path: "/story", label: "Our Story" },
    { path: "/why-donate", label: "Why Donate" },
    { path: "/donate", label: "How to Donate" },
    { path: "/resources", label: "Resources" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#2c3a30]">
      {/* Emergency Banner */}
      <div className="bg-[#4a6a52] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#FFCF63]" />
            <span className="text-sm tracking-wide">
              <strong className="font-semibold">In danger?</strong> Call 911 · National Hotline 1-800-799-7233
            </span>
          </div>
          <button
            onClick={quickExit}
            className="bg-[#FFCF63] text-[#4a6a52] px-4 py-1 rounded-full text-sm font-semibold hover:bg-white transition-colors"
          >
            Quick Exit (ESC)
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#fbf9f4]/95 backdrop-blur border-b border-[#e7e1d2] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex items-center gap-3 group" aria-label="Sunflower Haven home">
              <Wordmark height={72} className="shrink-0" />
              <span className="hidden xl:inline-block text-[10px] tracking-[0.22em] uppercase text-[#698F72] border-l border-[#e7e1d2] pl-3 ml-1">
                Chesterton, IN
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm tracking-wide transition-colors relative ${
                      active
                        ? "text-[#4a6a52] font-semibold"
                        : "text-[#5b6b5f] hover:text-[#4a6a52]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#FFCF63] rounded-full" />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/donate"
                className="ml-2 bg-[#FFCF63] hover:bg-[#ffc347] text-[#4a6a52] px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
              >
                Donate
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4a6a52]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-[#e7e1d2]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm ${
                    location.pathname === link.path
                      ? "text-[#4a6a52] font-semibold"
                      : "text-[#5b6b5f]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#4a6a52] text-[#e8efe9] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Logo size={40} />
                <div>
                  <div
                    className="text-white text-xl font-semibold"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Sunflower Haven
                  </div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-[#FFCF63]">
                    Dignity · Independence · Growth
                  </div>
                </div>
              </div>
              <p className="text-[#cdd9cf] text-sm leading-relaxed">
                Transitional housing and comprehensive support for women rebuilding
                their lives in Chesterton, Indiana.
              </p>
              <p className="text-[#9fb3a4] text-xs mt-3 tracking-wider uppercase">Est. 2025</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-wide">Emergency Resources</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FFCF63]" />
                  <span>Emergency: 911</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FFCF63]" />
                  <span>National Hotline: 1-800-799-7233</span>
                </div>
                <div className="text-[#9fb3a4]">24/7 confidential support</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-wide">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/resources" className="block hover:text-[#FFCF63] transition-colors">
                  Resources
                </Link>
                <Link to="/donate" className="block hover:text-[#FFCF63] transition-colors">
                  Donate Now
                </Link>
                <Link to="/contact" className="block hover:text-[#FFCF63] transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#5e7a66] mt-10 pt-6 text-center text-xs text-[#9fb3a4] tracking-wider">
            <p>&copy; 2026 Sunflower Haven · All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
