import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);  // Auto-close menu after navigation
  };

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "sessions", label: "Sessions", icon: "💃" },
    { id: "shop", label: "Shop", icon: "👕" },
    { id: "team", label: "Meet the Team", icon: "👥" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-xl sm:text-2xl font-bold text-red-900 hover:text-red-700 transition-colors"
            >
              <span className="hidden sm:inline">Sababa Nights Israeli Partner Dancing</span>
              <span className="sm:hidden">Sababa Nights</span>
            </button>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-red-900 hover:bg-red-50"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-600">
              Welcome Dancers!
            </div>

            {/* Hamburger menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-red-900 hover:text-red-700 focus:outline-none focus:text-red-700"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - conditionally rendered */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-600 hover:text-red-900 hover:bg-red-50 w-full text-left"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
