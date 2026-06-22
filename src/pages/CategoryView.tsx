import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Compass, Grid, Sparkles } from "lucide-react";
import { useBlog } from "../context/BlogContext";
import ArticleCard from "../components/ArticleCard";
import SEO from "../components/SEO";

export default function CategoryView() {
  const { categoryId } = useParams();
  const { articles: allArticles } = useBlog();
  const articles = allArticles.filter((a) => (a as any).status !== "draft");

  // Helper dictionary matching slugs to official database string labels
  const categoryMap: Record<string, { name: string; desc: string; banner: string; quote: string }> = {
    "home-decor": {
      name: "Home Decor",
      desc: "Immerse yourself in warm Minimalist, Scandinavian, and Japandi styling codes. Explore cozy organic cotton sheets, ceramic planters, and muted lighting tips.",
      banner: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200",
      quote: "A home is not a static warehouse, but a canvas that holds our daily resting states."
    },
    "workspace": {
      name: "Workspace",
      desc: "Build highly focused home-office ecosystems. Study our reviews on eco felt desk pads, solid hardwood desktop docks, and clever cords management.",
      banner: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1200",
      quote: "By establishing order on physical workspaces, our cognitive workflows naturally relax."
    },
    "kitchen": {
      name: "Kitchen",
      desc: "Slow down your coffee-making rituals. Organize cupboards and open shelving grids with apothecaries amber containers, linen aprons, and stoneware utensils.",
      banner: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200",
      quote: "Baking sourdough and pour-overs represent deliberate pauses in an otherwise fast world."
    },
    "organization": {
      name: "Organization",
      desc: "Achieve peaceful sensory environments with tidy, hidden storage. Implement drawers separators, natural woven handled hampers, and modular pantries.",
      banner: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200",
      quote: "Decluttering a physical shelf serves as a physical declaration of self-care."
    },
    "fashion": {
      name: "Fashion",
      desc: "Indulge in breathable, long-lasting flax, wool, and linen garments. Assemble cozy, high-quality, weather-adaptive color palettes with ease.",
      banner: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200",
      quote: "True style lies in fewer, premium organic fibers that relax naturally on physical lines."
    },
    "gift-guides": {
      name: "Gift Guides",
      desc: "Gift with deep affection and high design. Sift through affordable, custom-wrapped, and highly premium tokens of appreciation for any housewarming.",
      banner: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1200",
      quote: "Memorable gifting is the art of raising the quality level of someone's small daily rituals."
    }
  };

  const matchedId = categoryId || "";
  const info = categoryMap[matchedId];

  if (!info) {
    // Falls back to direct Categories summary list
    return (
      <div className="bg-brand-cream min-h-screen py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-4">Category not registered</h2>
        <Link to="/categories" className="text-brand-brown-light hover:underline font-semibold flex items-center justify-center gap-1">
          <ArrowLeft size={14} />
          <span>Return to categories</span>
        </Link>
      </div>
    );
  }

  // Filter articles that belong to this category name
  const filteredArticles = articles.filter(
    (article) => article.category.toLowerCase() === info.name.toLowerCase()
  );

  return (
    <div className="bg-brand-cream min-h-screen pb-20" id={`category-view-${matchedId}`}>
      <SEO
        title={`${info.name} Edit`}
        description={info.desc}
        image={info.banner}
        slug={`categories/${matchedId}`}
      />

      {/* Styled Wide Category Hero */}
      <div className="relative aspect-[21/9] lg:h-[360px] w-full overflow-hidden border-b border-brand-beige-light">
        <img
          src={info.banner}
          alt={info.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown-dark/75 via-brand-brown-dark/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2 text-xs text-brand-beige-medium">
            <Link to="/categories" className="hover:underline">Categories</Link>
            <span>/</span>
            <span className="font-semibold text-white">{info.name}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {info.name}
          </h1>

          <p className="font-sans text-xs md:text-sm text-brand-beige-light mt-2 max-w-xl hidden md:block">
            {info.desc}
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12">
        
        {/* Back Link */}
        <Link
          to="/categories"
          className="inline-flex items-center gap-1 text-xs text-brand-beige-dark hover:text-brand-brown-dark transition-colors font-semibold font-sans mb-10 group"
        >
          <ArrowLeft size={13} className="transition-transform duration-300 group-hover:translate-x-[-2px]" />
          <span>All Portals</span>
        </Link>

        {/* Editorial Quote Accent */}
        <div className="bg-white rounded-2xl border border-brand-beige-light p-5 md:p-6 mb-12 flex items-center gap-4 text-brand-brown-dark max-w-2xl">
          <div className="w-8 h-8 rounded-full bg-brand-sage-light flex-shrink-0 flex items-center justify-center text-brand-sage-dark">
            <Sparkles size={14} />
          </div>
          <p className="font-serif italic text-xs sm:text-sm leading-relaxed">
            "{info.quote}"
          </p>
        </div>

        {/* Category Articles Feed Feed */}
        <div className="scroll-container">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white/60 border border-brand-beige-light rounded-2xl p-12 text-center max-w-sm mx-auto">
              <BookOpen size={28} className="text-brand-beige-dark mx-auto mb-3" />
              <h3 className="font-serif text-base font-bold text-brand-brown-dark mb-1">
                Journals Pending Sifting
              </h3>
              <p className="font-sans text-xs text-brand-brown-light leading-relaxed mb-6">
                Our writers are still staging articles for this category. Check back shortly for brand new design files.
              </p>
              <Link
                to="/"
                className="bg-brand-brown-light hover:bg-brand-brown-dark text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-full"
              >
                Back to Frontpage
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
