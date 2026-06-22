import React from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Article } from "../data/articles";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  key?: string | number;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (!article) return null;
  if (featured) {
    // Large visual layout for featured/editorial highlights on the frontpage
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl overflow-hidden border border-brand-beige-light shadow-pinterest p-6 lg:p-8 max-w-6xl mx-auto my-12"
        id={`featured-card-${article.slug}`}
      >
        {/* Large Media Cover */}
        <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[420px] rounded-2xl overflow-hidden relative group">
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold text-brand-sage-dark border border-brand-beige-light">
            Editorial Pick
          </div>
        </div>

        {/* content box */}
        <div className="lg:col-span-5 flex flex-col justify-center py-4">
          <div className="flex items-center gap-3 text-xs text-brand-beige-dark font-sans mb-3">
            <span className="bg-brand-sage-light text-brand-sage-dark px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>

          <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-brown-dark leading-tight tracking-tight mb-4 hover:text-brand-brown-light transition-colors">
            <Link to={`/article/${article.slug}`}>{article.title}</Link>
          </h3>

          <p className="text-sm lg:text-base text-brand-brown-light leading-relaxed font-sans mb-6">
            {article.description}
          </p>

          <div className="flex items-center justify-between pb-4 border-b border-brand-beige-light mb-6">
            <span className="text-xs font-semibold text-brand-brown-dark">
              Written by {article.author}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-brand-beige-dark">
              <Clock size={13} />
              <span>{article.readingTime}</span>
            </div>
          </div>

          <Link
            to={`/article/${article.slug}`}
            className="inline-flex items-center gap-2 text-brand-brown-light hover:text-brand-brown-dark font-sans font-semibold text-sm group"
          >
            <span>Read full curation</span>
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    );
  }

  // standard visual card (Pinterest Grid layout style)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden border border-brand-beige-light shadow-pinterest flex flex-col h-full"
      id={`article-card-${article.slug}`}
    >
      <Link to={`/article/${article.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden group">
        <img
          src={article.coverImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold text-brand-brown-light border border-brand-beige-light shadow-sm">
          {article.category}
        </div>
      </Link>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <span className="block text-[11px] text-brand-beige-dark uppercase tracking-widest font-sans mb-2">
            {article.date}
          </span>
          <h4 className="font-serif text-lg font-bold leading-snug text-brand-brown-dark mb-2.5 hover:text-brand-brown-light transition-colors line-clamp-2">
            <Link to={`/article/${article.slug}`}>{article.title}</Link>
          </h4>
          <p className="text-xs text-brand-brown-light leading-relaxed font-sans line-clamp-3 mb-4">
            {article.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-brand-beige-light mt-auto">
          <div className="text-[11px] font-sans">
            <span className="text-brand-beige-dark">By </span>
            <span className="font-medium text-brand-brown-dark">{article.author}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-brand-beige-dark font-sans">
            <Clock size={12} />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
