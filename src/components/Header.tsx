import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useBlog } from "../context/BlogContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser } = useBlog();

  // Scroll detection for slim floating bars
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on layout transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "About CC", path: "/about" },
    { name: "Search Curation", path: "/search" },
    { name: "Contact", path: "/contact" }
  ];

  const categoryMenu = [
    { name: "Home Decor", path: "/categories/home-decor" },
    { name: "Workspace", path: "/categories/workspace" },
    { name: "Kitchen", path: "/categories/kitchen" },
    { name: "Organization", path: "/categories/organization" },
    { name: "Fashion", path: "/categories/fashion" },
    { name: "Gift Guides", path: "/categories/gift-guides" }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-brand-cream/90 backdrop-blur-md border-b border-brand-beige-light shadow-sm py-3"
          : "bg-brand-cream py-5"
      }`}
      id="main-app-header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-brand-brown-dark hover:text-brand-brown-light p-1"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Primary Desktop Brand Navigation Links (Left-aligned) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-sans uppercase tracking-widest font-semibold pb-1 border-b-2 transition-all duration-300 ${
                isActive(link.path)
                  ? "border-brand-brown-light text-brand-brown-dark"
                  : "border-transparent text-brand-beige-dark hover:text-brand-brown-dark"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Center Logo branding */}
        <div className="text-center">
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[-0.03em] text-brand-brown-dark group-hover:text-brand-brown-light transition-colors duration-300">
              Curated Comfort
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-sans text-brand-beige-dark mt-0.5 group-hover:text-brand-brown-light transition-colors duration-300 ml-1">
              EST. 2026 • LIFESTYLE EDIT
            </span>
          </Link>
        </div>

        {/* Primary Desktop Brand Navigation Links (Right-aligned) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden lg:flex items-center gap-7 mr-4">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-sans uppercase tracking-widest font-semibold pb-1 border-b-2 transition-all duration-300 ${
                  isActive(link.path)
                    ? "border-brand-brown-light text-brand-brown-dark"
                    : "border-transparent text-brand-beige-dark hover:text-brand-brown-dark"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Quick search shortcut icon */}
          <Link
            to="/search"
            className="text-brand-brown-dark hover:text-brand-brown-light p-1.5 rounded-full hover:bg-brand-beige-light transition-colors"
            title="Search premium reviews"
          >
            <Search size={18} />
          </Link>

          {currentUser?.role === "Admin" ? (
            <Link
              to="/admin/editor"
              className="hidden sm:inline-flex items-center gap-1 bg-brand-sage-dark text-white hover:bg-brand-brown-dark font-sans text-[11px] uppercase tracking-wider font-semibold py-2 px-3.5 rounded-full transition-all duration-300 shadow-sm"
            >
              <Sparkles size={12} className="animate-pulse" />
              <span>Write a Blog</span>
            </Link>
          ) : (
            <Link
              to="/categories"
              className="hidden sm:inline-flex items-center gap-1 bg-brand-sage-dark text-white hover:bg-brand-brown-dark font-sans text-[11px] uppercase tracking-wider font-semibold py-2 px-3.5 rounded-full transition-all duration-300 shadow-sm"
            >
              <Sparkles size={12} />
              <span>Explore Articles</span>
            </Link>
          )}
          
          <Link
            to="/categories"
            className="hidden sm:inline-flex items-center gap-1 bg-brand-brown-light text-brand-cream hover:bg-brand-brown-dark font-sans text-[11px] uppercase tracking-wider font-semibold py-2 px-3.5 rounded-full transition-all duration-300 pointer-events-auto"
          >
            <ShoppingBag size={12} />
            <span>shop our picks</span>
          </Link>
        </div>
      </div>

      {/* Under-Navbar Category Horizontal Scrollbar for fast filtering (Pinterest vibe) */}
      <div className="hidden lg:block border-t border-b border-brand-beige-light/40 mt-3 pt-2.5 pb-2">
        <div className="scroll-container max-w-4xl mx-auto flex items-center justify-center gap-8 text-xs font-sans font-medium text-brand-beige-dark">
          {categoryMenu.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className={`hover:text-brand-brown-dark transition-colors tracking-wide ${
                location.pathname === cat.path ? "text-brand-brown-dark font-semibold underline underline-offset-4 decoration-brand-sage-dark/40" : ""
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation menu for mobile screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-brand-cream border-b border-brand-beige-light overflow-hidden shadow-md"
          >
            <div className="flex flex-col gap-4 py-6 px-6 font-sans">
              <span className="text-[10px] uppercase tracking-widest text-brand-beige-dark font-semibold pb-1 border-b border-brand-beige-light">
                Main Pages
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path) ? "text-brand-brown-dark font-semibold" : "text-brand-brown-light hover:text-brand-brown-dark"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {currentUser?.role === "Admin" ? (
                <Link
                  to="/admin/editor"
                  className="text-sm font-semibold text-brand-sage-dark flex items-center gap-1.5 transition-colors pt-1"
                >
                  <Sparkles size={14} className="animate-pulse shrink-0" />
                  <span>Write a Blog</span>
                </Link>
              ) : (
                <Link
                  to="/categories"
                  className="text-sm font-semibold text-brand-sage-dark flex items-center gap-1.5 transition-colors pt-1"
                >
                  <Sparkles size={14} className="shrink-0" />
                  <span>Explore Articles</span>
                </Link>
              )}

              <span className="text-[10px] uppercase tracking-widest text-brand-beige-dark font-semibold pt-4 pb-1 border-b border-brand-beige-light">
                Browse Inspiration
              </span>
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                {categoryMenu.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className={`text-xs ${
                      location.pathname === cat.path ? "text-brand-brown-dark font-bold" : "text-brand-brown-light"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
