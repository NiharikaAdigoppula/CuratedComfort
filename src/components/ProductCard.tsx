import React, { useState } from "react";
import { ShoppingBag, Star, HelpCircle } from "lucide-react";
import { animate, motion } from "motion/react";
import { Product } from "../data/products";
import { useBlog } from "../context/BlogContext";

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { trackEvent, settings } = useBlog();

  // Support custom button texts if appended
  const customBtnText = (product as any).buttonText || "Discover on Amazon";
  
  // Custom pros/cons arrays
  const pros: string[] = (product as any).pros || product.features || [];
  const cons: string[] = (product as any).cons || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-brand-beige-light overflow-hidden shadow-pinterest flex flex-col md:flex-row gap-6 p-5 md:p-6 my-8 max-w-3xl mx-auto text-left"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div className="w-full md:w-2/5 aspect-square bg-brand-cream rounded-xl overflow-hidden relative flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-brown-light shadow-md border border-brand-beige-light">
          {product.category}
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          {/* Header & Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? "fill-amber-500" : "text-gray-200"}
                />
              ))}
              <span className="text-xs font-medium text-brand-brown-light ml-1">
                {product.rating} ({product.reviewCount || 100} Reviews)
              </span>
            </div>

            {/* Affiliate Disclosure tooltip */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-brand-beige-dark hover:text-brand-brown-light transition-colors p-1 cursor-help"
                aria-label="Affiliate link disclosure information"
              >
                <HelpCircle size={15} />
              </button>
              {showTooltip && (
                <div className="absolute right-0 bottom-full mb-2 w-64 bg-brand-brown-dark text-brand-cream text-[11px] p-3 rounded-lg leading-relaxed shadow-lg z-20 border border-brand-beige-dark/20 animate-fade-in text-justify">
                  As an Amazon Associate with TagID "{settings.amazonTag || 'unconfigured'}", Curated Comfort earns a tiny commission from qualifying purchases, at zero extra cost to you.
                </div>
              )}
            </div>
          </div>

          <h3 className="font-serif text-lg md:text-xl font-semibold leading-snug text-brand-brown-dark mb-2 hover:text-brand-brown-light transition-colors">
            {product.title}
          </h3>

          <p className="text-sm text-brand-brown-light font-sans leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Pros & Cons side-by-side */}
          {(pros.length > 0 || cons.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 p-3 rounded-xl bg-brand-cream/40 border border-brand-beige-light/30">
              {pros.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Pros</span>
                  <ul className="space-y-1">
                    {pros.map((p, idx) => (
                      <li key={idx} className="text-[11px] text-emerald-950 font-medium flex items-start gap-1">
                        <span className="text-emerald-700 font-bold">&#10003;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cons.length > 0 && cons[0] !== "None specified" && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-red-800 tracking-wider">Cons</span>
                  <ul className="space-y-1">
                    {cons.map((c, idx) => (
                      <li key={idx} className="text-[11px] text-red-950/90 font-medium flex items-start gap-1">
                        <span className="text-red-700">&#8211;</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer & Buy Action */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-brand-beige-light">
          <div>
            <span className="text-xs block text-brand-beige-dark uppercase tracking-widest font-sans">
              Amazon Price
            </span>
            <span className="text-xl font-serif font-semibold text-brand-brown-dark">
              {product.price}
            </span>
          </div>

          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click", product.title)}
            className="flex items-center gap-2 bg-brand-brown-light hover:bg-brand-brown-dark text-brand-cream font-sans font-medium text-xs py-3 px-5 rounded-full transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg hover:translate-y-[-1px] cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>{customBtnText}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
