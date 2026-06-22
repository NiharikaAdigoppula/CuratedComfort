import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, Sparkles, Filter, Grid, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useBlog } from "../context/BlogContext";
import ArticleCard from "../components/ArticleCard";
import Newsletter from "../components/Newsletter";
import SEO from "../components/SEO";

export default function Home() {
  const { articles: allArticles, products } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter out drafts from reader views
  const articles = allArticles.filter((a) => (a as any).status !== "draft");

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Extract featured/trending articles
  const featuredArticle = articles.find(
    (item) => item.slug === "cozy-home-decor-finds-under-1000"
  ) || articles[0];

  const popularArticles = articles.filter(
    (item) =>
      item.slug === "minimal-bedroom-ideas-for-serene-sleep" ||
      item.slug === "best-amazon-desk-accessories" ||
      item.slug === "kitchen-organization-tips-every-home-needs"
  ).length > 0 ? articles.filter(
    (item) =>
      item.slug === "minimal-bedroom-ideas-for-serene-sleep" ||
      item.slug === "best-amazon-desk-accessories" ||
      item.slug === "kitchen-organization-tips-every-home-needs"
  ) : articles.slice(1, 4);

  const remainingArticles = articles.filter(
    (item) =>
      item && featuredArticle && item.slug !== featuredArticle.slug &&
      !popularArticles.some((pop) => pop.slug === item.slug)
  ).slice(0, 6);

  // Categories metadata with beautiful Unsplash pictures
  const categoriesList = [
    {
      name: "Home Decor",
      count: articles.filter((a) => a.category === "Home Decor").length,
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400",
      path: "/categories/home-decor",
      tagline: "Warm, textured, sensory spaces."
    },
    {
      name: "Workspace",
      count: articles.filter((a) => a.category === "Workspace").length,
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400",
      path: "/categories/workspace",
      tagline: "Calm desks, productive thoughts."
    },
    {
      name: "Kitchen",
      count: articles.filter((a) => a.category === "Kitchen").length,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400",
      path: "/categories/kitchen",
      tagline: "Organic bakes, barista corners."
    },
    {
      name: "Organization",
      count: articles.filter((a) => a.category === "Organization").length,
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400",
      path: "/categories/organization",
      tagline: "Clear shelves, spacious minds."
    },
    {
      name: "Fashion",
      count: articles.filter((a) => a.category === "Fashion").length,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
      path: "/categories/fashion",
      tagline: "Flax linens, neutral palettes."
    },
    {
      name: "Gift Guides",
      count: articles.filter((a) => a.category === "Gift Guides").length,
      image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=400",
      path: "/categories/gift-guides",
      tagline: "Thoughtful objects, loved hands."
    }
  ];

  // Pick top rated products for "Popular Picks"
  const popularPicks = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-cream" id="homepage-root">
      
      {/* 1. SEO Head Updates */}
      <SEO
        title="Breathe. Design. Warmth. Premium Lifestyle Edit"
        description="Curated Comfort helps you discover Scandinavian and Wabi-Sabi interior ideas, tidy workspace setups, linen fashion, kitchen lists, and beautiful Amazon essentials."
      />

      {/* 2. Hero Section */}
      <section className="relative py-20 px-4 md:px-8 border-b border-brand-beige-light/45 overflow-hidden">
        {/* Soft background textures */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-beige-light/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-sage-light/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-brand-beige-light/60 border border-brand-beige-medium/40 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold uppercase text-brand-brown-light mb-6 shadow-sm"
          >
            <Sparkles size={11} className="text-brand-beige-dark" />
            <span>Slow Living & Design Curations</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-brown-dark max-w-4xl leading-[1.12]"
          >
            Sincere design curation that crafts a physical <span className="italic font-normal font-serif text-brand-beige-dark">resting sanctuary</span>.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 mb-2 max-w-md mx-auto text-center bg-white/60 border border-brand-beige-medium/30 p-4 rounded-2xl shadow-sm"
          >
            <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-brand-brown-dark mb-1">
              Affiliate Disclosure
            </h4>
            <p className="text-xs text-brand-brown-light font-sans leading-relaxed">
              Curated Comfort may earn a small commission when you purchase through links on this page. This never costs you anything extra.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-brand-brown-light text-sm sm:text-base md:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            Explore our daily slow-living visual logs. Discover textured bedrooms, silent study docks, organic kitchens, and beautifully reviewed homewares.
          </motion.p>

          {/* Integrated Editorial Search Box */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSearchSubmit}
            className="w-full max-w-md mt-10"
          >
            <div className="flex items-center gap-2 bg-white rounded-full border border-brand-beige-medium/50 p-2 shadow-pinterest focus-within:ring-2 focus-within:ring-brand-sage-dark/20 focus-within:border-brand-beige-dark transition-all">
              <input
                type="text"
                placeholder="Search cozy planters, linen coats, desk mats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs sm:text-sm outline-none pl-4 text-brand-brown-dark placeholder-brand-beige-dark/60 font-sans"
              />
              <button
                type="submit"
                className="bg-brand-brown-light hover:bg-brand-brown-dark text-white p-3 rounded-full transition-colors flex items-center justify-center shrink-0"
              >
                <Search size={14} />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-[11px] font-sans text-brand-beige-dark">
              <span>Popular searches:</span>
              <Link to="/search?q=linen" className="underline hover:text-brand-brown-dark">Linen</Link>
              <span>•</span>
              <Link to="/search?q=desk" className="underline hover:text-brand-brown-dark">WFH Setup</Link>
              <span>•</span>
              <Link to="/search?q=organizers" className="underline hover:text-brand-brown-dark">Pantry</Link>
            </div>
          </motion.form>
        </div>
      </section>

      {/* 3. Featured Categories Grid Section (Pinterest Inspired cards) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-beige-dark block mb-2">
              Browse Inspiration
            </span>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-brand-brown-dark">
              Aesthetic Portals
            </h2>
          </div>
          <Link
            to="/categories"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-brown-light hover:text-brand-brown-dark font-sans tracking-wide mt-3 md:mt-0"
          >
            <span>Explore all directories</span>
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-brand-beige-light group hover:shadow-pinterest transition-shadow"
            >
              <Link to={cat.path} className="block relative aspect-[5/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown-dark/50 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 text-white z-10 w-4/5">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-brand-beige-medium block mb-1">
                    {cat.count} articles
                  </span>
                  <h3 className="font-serif text-xl font-bold leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </Link>
              <div className="p-4 flex items-center justify-between text-xs text-brand-brown-light font-sans bg-brand-cream/10">
                <span>{cat.tagline}</span>
                <Link to={cat.path} className="text-brand-brown-dark hover:underline font-semibold flex items-center gap-1">
                  <span>Enter</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Editorial Highlight / Trending Article */}
      <section className="py-12 px-4 md:px-8 border-t border-b border-brand-beige-light/45 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1 bg-brand-sage-medium/20 text-brand-sage-dark px-3.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold">
              <Sparkles size={11} />
              <span>Spotlight Curation</span>
            </span>
          </div>
          <ArticleCard article={featuredArticle} featured={true} />
        </div>
      </section>

      {/* 5. Trending / Popular Picks (Amazon Affiliate Showcase) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-beige-dark block mb-2">
            Independent Reviews
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-brown-dark">
            Our Companion Picks
          </h2>
          <p className="text-sm font-sans text-brand-brown-light mt-3 max-w-md mx-auto leading-relaxed">
            Beautiful design objects evaluated and found on Amazon. Zero sponsored reviews; only genuine materials we cherish and use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {popularPicks.map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-brand-beige-light p-4 shadow-pinterest flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square bg-brand-cream rounded-xl overflow-hidden mb-4 scroll-container">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                  <Star size={11} className="fill-amber-500 text-amber-500" />
                  <span className="text-[10px] font-semibold text-brand-brown-light">
                    {prod.rating} ({prod.reviewCount})
                  </span>
                </div>
                <h3 className="font-serif text-sm font-bold text-brand-brown-dark line-clamp-2 leading-snug mb-1">
                  {prod.title}
                </h3>
                <p className="text-[11px] font-sans text-brand-brown-light line-clamp-2 leading-relaxed mb-4">
                  {prod.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-brand-beige-light pt-3 mt-4">
                <span className="text-sm font-bold text-brand-brown-dark">
                  {prod.price}
                </span>
                <a
                  href={prod.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-brown-light/10 hover:bg-brand-brown-light text-brand-brown-dark hover:text-white transition-all text-[11px] font-semibold tracking-wide py-2 px-3.5 rounded-full"
                >
                  View Details
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Latest Curate Stories */}
      <section className="py-20 px-4 md:px-8 border-t border-brand-beige-light/45 max-w-7xl mx-auto">
        <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-beige-dark block mb-2">
              Fresh Off the Press
            </span>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-brand-brown-dark">
              The Daily Edit
            </h2>
          </div>
          <Link
            to="/categories"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-brown-light hover:text-brand-brown-dark font-sans tracking-wide mt-3 md:mt-0"
          >
            <span>Browse all visual articles</span>
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Pinterest Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <Newsletter />
    </div>
  );
}
