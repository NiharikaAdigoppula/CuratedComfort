import { Link } from "react-router-dom";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="bg-brand-cream min-h-screen py-24 px-4 flex items-center justify-center font-sans" id="not-found-page">
      <SEO
        title="404 - A Broken Cup"
        description="The page you seek could not be located in our slow lifestyle directories."
      />

      <div className="max-w-md text-center bg-white border border-brand-beige-light p-8 md:p-12 rounded-3xl shadow-pinterest flex flex-col items-center">
        {/* Poetic Icon Accent */}
        <div className="w-14 h-14 bg-brand-beige-light text-brand-beige-dark border border-brand-beige-medium rounded-full flex items-center justify-center mb-6">
          <Sparkles size={22} className="text-brand-brown-light" />
        </div>

        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-beige-dark mb-2">
          PAGE DESIGN NOT FOUND
        </span>

        <h1 className="font-serif text-3xl md:text-4xl font-black text-brand-brown-dark leading-tight mb-4">
          Wabi-Sabi Aesthetics
        </h1>

        <p className="text-xs md:text-sm text-brand-brown-light leading-relaxed mb-8 font-sans">
          In traditional philosophy, broken porcelain and empty voids contain beauty. However, this specific link contains no active design curations. Let's redirect you back to cozy bedrooms or pantry layouts.
        </p>

        <div className="space-y-3 w-full">
          <Link
            to="/"
            className="w-full bg-brand-brown-light hover:bg-brand-brown-dark text-brand-cream text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2"
          >
            <span>Return to Frontpage</span>
            <ArrowRight size={13} />
          </Link>
          
          <Link
            to="/categories"
            className="w-full bg-brand-cream hover:bg-brand-beige-light border border-brand-beige-light text-brand-brown-dark text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2"
          >
            <span>Browse Directories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
