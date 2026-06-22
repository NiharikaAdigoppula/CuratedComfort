import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, Pin, Sparkles, BookOpen, AlertCircle, AlertTriangle } from "lucide-react";
import { useBlog } from "../context/BlogContext";
import ProductCard from "../components/ProductCard";
import ArticleCard from "../components/ArticleCard";
import SEO from "../components/SEO";

export default function ArticlePage() {
  const { slug } = useParams();
  const { articles, products, settings, currentUser } = useBlog();

  // Retrieve the requested article
  const currentPost = articles.find((article) => article.slug === slug);

  // If article not found, or is a draft and user is not Admin, display safe feedback state
  if (!currentPost || ((currentPost as any).status === "draft" && currentUser?.role !== "Admin")) {
    return (
      <div className="bg-brand-cream min-h-screen py-24 px-4 text-center">
        <AlertCircle size={40} className="text-brand-beige-dark mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-2">
          Journal Entry Displaced
        </h2>
        <p className="font-sans text-xs text-brand-brown-light max-w-sm mx-auto mb-6">
          The curated file you requested doesn't reside in our archive index. Let's return you back to home decor or desks!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-brown-light hover:bg-brand-brown-dark text-white text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full"
        >
          <span>Return to Frontpage</span>
        </Link>
      </div>
    );
  }

  // Pick related articles dynamically matching slug array
  const relatedFeed = articles.filter((art) =>
    currentPost.relatedPosts ? currentPost.relatedPosts.includes(art.slug) : false
  );

  return (
    <article className="bg-brand-cream min-h-screen pb-24" id={`article-page-${currentPost.slug}`}>
      
      {currentUser?.role === "Admin" && (
        <div className="bg-brand-sage-light/85 border-b border-brand-sage-medium/30 py-3.5 px-4 text-center select-none shadow-sm flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-sans">
          <span className="flex items-center gap-1.5 font-semibold text-brand-sage-dark uppercase tracking-wider">
            <Sparkles size={13} className="animate-pulse" />
            <span>Admin Control View</span>
          </span>
          <span className="text-brand-brown-light hidden sm:inline">&bull;</span>
          <span className="text-brand-brown-light font-medium">
            {(currentPost as any).status === "draft" ? "This post is currently a Draft (hidden from visitors)." : "This post is Published."}
          </span>
          <Link
            to={`/admin/editor?slug=${currentPost.slug}`}
            className="bg-brand-sage-dark hover:bg-brand-brown-dark text-white px-3.5 py-1 rounded-full text-[10.5px] uppercase font-bold tracking-wider transition-colors inline-block md:ml-3"
          >
            Edit this article
          </Link>
        </div>
      )}
      
      {/* Dynamic SEO Mapping */}
      <SEO
        title={currentPost.title}
        description={currentPost.description}
        image={currentPost.coverImage}
        type="article"
        slug={`article/${currentPost.slug}`}
        articleData={{
          publishedTime: currentPost.date,
          author: currentPost.author,
          category: currentPost.category,
          tags: currentPost.tags
        }}
      />

      {/* 1. Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-8 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-brand-beige-dark font-sans">
          <Link to="/" className="hover:text-brand-brown-dark">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-brand-brown-dark">Categories</Link>
          <span>/</span>
          <Link
            to={`/categories/${currentPost.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-brand-brown-dark"
          >
            {currentPost.category}
          </Link>
          <span>/</span>
          <span className="text-brand-brown-dark font-medium line-clamp-1">{currentPost.title}</span>
        </div>
      </div>

      {/* 2. Editorial Header */}
      <header className="max-w-4xl mx-auto px-4 md:px-6 pt-6 pb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-brand-sage-light border border-brand-sage-medium/30 px-3.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold text-brand-sage-dark mb-4">
          <Sparkles size={11} />
          <span>{currentPost.category}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown-dark leading-[1.12] tracking-tight mb-6 max-w-4xl">
          {currentPost.title}
        </h1>

        {/* Real-time Affiliate Disclosure */}
        <div className="mb-6 bg-white/70 border border-brand-beige-medium/30 p-4 rounded-2xl text-center md:text-left">
          <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-brand-brown-dark mb-1">
            Affiliate Disclosure
          </h4>
          <p className="text-xs text-brand-brown-light font-sans leading-relaxed">
            Curated Comfort may earn a small commission when you purchase through links on this page. This never costs you anything extra.
          </p>
        </div>

        {/* Author details & meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-b border-brand-beige-light/45 py-4 mb-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 bg-brand-beige-medium rounded-full overflow-hidden shrink-0 border border-brand-beige-light">
              <img
                src={
                  currentPost.author === "Clara Montgomery"
                    ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
                    : currentPost.author === "Sophia Chen"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                }
                alt={currentPost.author}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left font-sans">
              <span className="text-xs text-brand-beige-dark block uppercase tracking-widest font-bold">Author</span>
              <span className="text-sm font-semibold text-brand-brown-dark">{currentPost.author}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-brand-beige-dark font-sans">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} />
              <span>{currentPost.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} />
              <span>{currentPost.readingTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Article Core Cover Image */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-12">
        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-pinterest border border-brand-beige-light">
          <img
            src={currentPost.coverImage}
            alt={currentPost.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 4. Editorial Body Content & Side-Rails */}
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Affiliate FTC Legal Note */}
        <div className="bg-brand-beige-light/40 border border-brand-beige-medium/40 p-3.5 rounded-xl flex items-start gap-2.5 text-[11px] font-sans text-brand-brown-light/95 leading-relaxed mb-10 text-justify">
          <AlertTriangle size={15} className="text-brand-beige-dark shrink-0 mt-0.5" />
          <p>
            <strong>Reader Sincerity Note:</strong> {settings.ftcDisclosure}
          </p>
        </div>

        {/* Custom Article Dynamic Parsing Blocks */}
        <section className="magazine-body font-sans text-sm sm:text-base leading-relaxed text-brand-brown-light prose max-w-none">
          {currentPost.content.map((block, idx) => {
            switch (block.type) {
              case "p":
                return <p key={idx} className="mb-6">{block.text}</p>;
              
              case "heading":
                return (
                  <h2 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-brand-brown-dark leading-tight mt-10 mb-4 tracking-tight">
                    {block.text}
                  </h2>
                );
              
              case "quote":
                return (
                  <blockquote key={idx} className="border-l-4 border-brand-sage-dark pl-6 italic font-serif text-brand-brown-dark text-base sm:text-lg my-8 leading-relaxed max-w-xl">
                    "{block.text}"
                  </blockquote>
                );
              
              case "product-card": {
                // Find product from products DB
                const matchedProduct = products.find((prod) => prod.id === block.productId);
                if (!matchedProduct) return null;
                return <ProductCard key={idx} product={matchedProduct} />;
              }

              default:
                return null;
            }
          })}
        </section>

        {/* Post Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-10 border-t border-brand-beige-light/45 mt-12 mb-16">
          <span className="text-[10px] uppercase font-sans tracking-widest font-bold text-brand-beige-dark mr-1">Tags:</span>
          {currentPost.tags.map((tag) => (
            <Link
              key={tag}
              to={`/search?q=${encodeURIComponent(tag)}`}
              className="bg-brand-cream hover:bg-brand-brown-light hover:text-white border border-brand-beige-light px-3 py-1 rounded-full text-xs text-brand-brown-light transition-all cursor-pointer font-sans"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Related Posts Section FOOTER */}
        {relatedFeed.length > 0 && (
          <section className="border-t border-brand-beige-light/45 pt-16 mt-16 pb-8">
            <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between mb-10">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-beige-dark block mb-2">
                  Continue Reading
                </span>
                <h3 className="font-serif text-2xl font-extrabold text-brand-brown-dark">
                  Related Curated Files
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedFeed.map((post) => (
                <ArticleCard key={post.slug} article={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
