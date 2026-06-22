import { Link } from "react-router-dom";
import { ArrowRight, Compass, Grid, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useBlog } from "../context/BlogContext";
import SEO from "../components/SEO";

export default function Categories() {
  const { articles: allArticles } = useBlog();
  const articles = allArticles.filter((a) => (a as any).status !== "draft");

  const categoriesList = [
    {
      id: "home-decor",
      name: "Home Decor",
      count: articles.filter((a) => a.category === "Home Decor").length,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
      description: "Cozy wabi-sabi pots, pure linen covers, textured brass accents, and Scandinavian layout principles to relax residential spaces.",
      tagline: "SENSORY RESTING HAVENS"
    },
    {
      id: "workspace",
      name: "Workspace",
      count: articles.filter((a) => a.category === "Workspace").length,
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600",
      description: "Quiet, high-efficiency desk designs, wool keyboard blotters, natural blonde timber accessory docks, and diffused warm study tasks.",
      tagline: "SILENT DOCK ARCHITECTURE"
    },
    {
      id: "kitchen",
      name: "Kitchen",
      count: articles.filter((a) => a.category === "Kitchen").length,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600",
      description: "Artisanal clay espresso mugs, sage crossback aprons, decanting rituals into amber glass, and organic wood prep accessories.",
      tagline: "SLOW BREAKFAST CULINARY"
    },
    {
      id: "organization",
      name: "Organization",
      count: articles.filter((a) => a.category === "Organization").length,
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600",
      description: "Decluttering drawers with acrylic dividers, woven seagrass bins for blanket heaps, and beautiful transparent shelving models.",
      tagline: "CLEAR SHELVED PURITY"
    },
    {
      id: "fashion",
      name: "Fashion",
      count: articles.filter((a) => a.category === "Fashion").length,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
      description: "Tailored everyday capsule wardrobes constructed from authentic French flax, loose-knitted heavy loungewear, and clay shades.",
      tagline: "BREATHABLE ORGANIC CAPSULES"
    },
    {
      id: "gift-guides",
      name: "Gift Guides",
      count: articles.filter((a) => a.category === "Gift Guides").length,
      image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=600",
      description: "Under-₹1000 and Under-₹500 design-focused treasures, housewarming logs, elegant gift-wrap routines, and premium functional tech setups.",
      tagline: "THOUGHTFUL HOUSE TOKEN GUIDES"
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 md:px-8" id="categories-root">
      <SEO
        title="Browse All Portals"
        description="Navigate our 6 core design categories: Home Decor, Workspace, Style Capsule, Kitchen Edit, Organization, & Aesthetic Gifts."
        slug="categories"
      />

      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 bg-brand-beige-light border border-brand-beige-medium/40 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold uppercase text-brand-brown-light mb-3">
            <Grid size={11} />
            <span>DESIGN HUBS</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown-dark tracking-tight">
            The Portals of Comfort
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-brown-light max-w-lg mx-auto mt-2 leading-relaxed">
            Choose a visual index below to explore specialized reviews and styled photo logs. Sincere design stories await.
          </p>
        </div>

        {/* Widescreen list/grid style */}
        <div className="space-y-12">
          {categoriesList.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white rounded-3xl overflow-hidden border border-brand-beige-light shadow-pinterest grid grid-cols-1 md:grid-cols-12 gap-6 p-6 items-center"
            >
              {/* Cover media */}
              <div className="md:col-span-4 aspect-[16/10] md:aspect-square rounded-2xl overflow-hidden relative group shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* info body */}
              <div className="md:col-span-8 flex flex-col justify-between py-2 md:pl-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-brand-beige-dark bg-brand-cream px-3 py-1 rounded-full border border-brand-beige-light">
                      {cat.tagline}
                    </span>
                    <span className="text-xs text-brand-beige-dark">•</span>
                    <span className="text-xs font-semibold text-brand-sage-dark">{cat.count} curated journals</span>
                  </div>

                  <h2 className="font-serif text-2xl lg:text-3xl font-bold text-brand-brown-dark mb-3">
                    {cat.name}
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-brand-brown-light leading-relaxed max-w-2xl mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-brand-beige-light pt-4 mt-2">
                  <span className="text-[10px] uppercase font-sans tracking-widest font-bold text-brand-brown-light">
                    CC PORTAL • INDEX #{idx + 1}
                  </span>
                  <Link
                    to={`/categories/${cat.id}`}
                    className="inline-flex items-center gap-2 bg-brand-brown-light hover:bg-brand-brown-dark text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-full transition-all duration-300 transform active:scale-95"
                  >
                    <span>Enter Portal</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
