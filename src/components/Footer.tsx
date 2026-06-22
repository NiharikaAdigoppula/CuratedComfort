import { Link } from "react-router-dom";
import { Sparkles, Heart, Pin, Instagram, Mail, Info } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-brown-dark text-brand-cream pt-16 pb-8 border-t border-brand-brown-light/20 font-sans" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-brand-brown-light/20">
        
        {/* Brand Mission & Column */}
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-serif text-2xl font-extrabold tracking-[-0.02em] text-brand-cream group-hover:text-brand-beige-light transition-colors">
              Curated Comfort
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-brand-beige-medium mt-0.5">
              your premium lifestyle edit
            </span>
          </Link>
          <p className="text-xs md:text-sm text-brand-beige-light leading-relaxed max-w-sm mt-2">
            Curated Comfort is a slow lifestyle magazine and shopping resource. We explore the design architectures that turn physical rooms into sensory resting sanctuaries.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3.5 mt-3">
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-brand-brown-light flex items-center justify-center text-brand-beige-light hover:text-white hover:border-white transition-all hover:translate-y-[-2px]"
              title="Follow our boards on Pinterest"
            >
              <Pin size={14} className="fill-brand-beige-light hover:fill-white" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-brand-brown-light flex items-center justify-center text-brand-beige-light hover:text-white hover:border-white transition-all hover:translate-y-[-2px]"
              title="Follow daily life edit on Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href="mailto:hello@curatedcomfort.com"
              className="w-8 h-8 rounded-full border border-brand-brown-light flex items-center justify-center text-brand-beige-light hover:text-white hover:border-white transition-all hover:translate-y-[-2px]"
              title="Mail us design stories"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>

        {/* Quick Directories Column */}
        <div className="md:col-span-2.5">
          <h4 className="text-xs uppercase tracking-widest font-bold text-brand-beige-medium mb-4">
            The Directories
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Home Page</Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">All Categories</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Our Editorial Craft</Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Search Library</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Pitch Curation</Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium italic font-semibold">&#10142; Admin Panel</Link>
            </li>
          </ul>
        </div>

        {/* Categories Directories Column */}
        <div className="md:col-span-2.5">
          <h4 className="text-xs uppercase tracking-widest font-bold text-brand-beige-medium mb-4">
            Spaces & Aesthetics
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/categories/home-decor" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Home Decor</Link>
            </li>
            <li>
              <Link to="/categories/workspace" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Workspace</Link>
            </li>
            <li>
              <Link to="/categories/kitchen" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Kitchen Edit</Link>
            </li>
            <li>
              <Link to="/categories/organization" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Organization</Link>
            </li>
            <li>
              <Link to="/categories/fashion" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Style Capsule</Link>
            </li>
            <li>
              <Link to="/categories/gift-guides" className="hover:text-brand-beige-light transition-colors text-xs text-brand-beige-medium">Aesthetic Gifts</Link>
            </li>
          </ul>
        </div>

        {/* Mandated Disclaimers & Ethics */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-brand-beige-medium font-bold text-xs uppercase tracking-widest">
            <Info size={13} />
            <span>Integrity Edit</span>
          </div>
          <p className="text-[11px] text-brand-beige-light/85 leading-relaxed">
            All reviews are independent. We never accept payment for 5-star ratings. Sincere recommendations remain at the heart of Curated Comfort.
          </p>
        </div>
      </div>

      {/* Footer Bottom Block */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-brand-beige-medium/82 text-center md:text-left">
          <span>&copy; {currentYear} Curated Comfort. Crafted as a pristine minimalist affiliate showcase. Dedicated to clean design.</span>
        </div>

        {/* Legal Policies links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-sans font-medium text-brand-beige-medium">
          <Link to="/affiliate-disclosure" className="hover:text-white transition-colors">
            Affiliate Disclosure
          </Link>
          <Link to="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
