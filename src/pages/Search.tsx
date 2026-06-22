import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, Compass, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useBlog } from "../context/BlogContext";
import ArticleCard from "../components/ArticleCard";
import SEO from "../components/SEO";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { articles: allArticles } = useBlog();
  const articles = allArticles.filter((a) => (a as any).status !== "draft");
  
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(articles);
  const [activeCategory, setActiveCategory] = useState("All");

  // Sync state if query params change externally
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Handle Search Filtering
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    
    let filtered = articles;

    // Filter by query string
    if (trimmed) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(trimmed) ||
          article.description.toLowerCase().includes(trimmed) ||
          article.category.toLowerCase().includes(trimmed) ||
          article.tags.some((tag) => tag.toLowerCase().includes(trimmed))
      );
    }

    // Filter by selected category button
    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === activeCategory
      );
    }

    setResults(filtered);
  }, [query, activeCategory, allArticles]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    setSearchParams({ q: tag });
  };

  const handleReset = () => {
    setQuery("");
    setActiveCategory("All");
    setSearchParams({});
  };

  const categories = ["All", "Home Decor", "Workspace", "Kitchen", "Organization", "Fashion", "Gift Guides"];

  // Preset recommend keywords
  const popularTags = ["under-1000", "minimalist", "closet", "gifts", "amber jars", "desk accessories", "linen"];

  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 md:px-8" id="search-page-root">
      <SEO
        title="Search Our Design Records"
        description="Search through our 20+ premium aesthetic journals and Amazon affiliate product lists."
        slug="search"
      />

      <div className="max-w-6xl mx-auto">
        {/* Title portion */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-brand-sage-light text-brand-sage-dark border border-brand-sage-medium/30 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold uppercase mb-3">
            <Compass size={11} />
            <span>LIBRARY SEARCH</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown-dark tracking-tight">
            Explore Curated Journals
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-brown-light max-w-lg mx-auto mt-2.5">
            Query our Scandinavian layouts, closet lists, budget gift codes, and textured ceramic files instantly.
          </p>
        </div>

        {/* Input box */}
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-2 bg-white rounded-full border border-brand-beige-medium/50 p-2.5 shadow-pinterest focus-within:ring-2 focus-within:ring-brand-sage-dark/22 transition-all">
            <div className="flex items-center gap-2 pl-4 flex-grow">
              <SearchIcon size={18} className="text-brand-beige-dark shrink-0" />
              <input
                type="text"
                placeholder="Find organic linen bags, goosenecks, bedroom layouts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none text-sm outline-none text-brand-brown-dark placeholder-brand-beige-dark/70 font-sans"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-brown-light hover:bg-brand-brown-dark text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-full transition-colors"
            >
              Search
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-sans text-brand-brown-light">
            <span className="text-brand-beige-dark">Trending terms:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="bg-white/80 hover:bg-brand-brown-light hover:text-white border border-brand-beige-light px-3 py-1 rounded-full transition-all text-[11px] cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>
        </form>

        {/* Category Horizontal Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-brand-beige-light/45 pb-8 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-brown-dark text-white shadow-sm"
                  : "bg-white hover:bg-brand-beige-light border border-brand-beige-light text-brand-brown-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results Summary */}
        <div className="flex items-center justify-between mb-8 text-xs font-sans font-medium text-brand-beige-dark uppercase tracking-wider">
          <span>Found {results.length} matching journals</span>
          {(query || activeCategory !== "All") && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-brand-brown-light hover:text-brand-brown-dark cursor-pointer font-semibold"
            >
              <RefreshCw size={12} />
              <span>Reset Search</span>
            </button>
          )}
        </div>

        {/* Dynamic Items Content Grid */}
        <div className="scroll-container">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/70 border border-brand-beige-light rounded-2xl p-12 text-center max-w-md mx-auto my-12"
            >
              <AlertCircle size={32} className="text-brand-beige-dark mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-brand-brown-dark mb-1">
                No articles discovered
              </h3>
              <p className="font-sans text-xs text-brand-brown-light leading-relaxed mb-6">
                Your filter selections for "{query || "empty query"}" did not yield match results. Let's try searching for broader keywords like "linen", "decor", or "organize"!
              </p>
              <button
                onClick={handleReset}
                className="bg-brand-brown-light hover:bg-brand-brown-dark text-brand-cream text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-full transition-all"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
