import { Sparkles, Heart, Scale, Feather, Compass } from "lucide-react";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import Newsletter from "../components/Newsletter";

export default function About() {
  const editors = [
    {
      name: "Clara Montgomery",
      role: "Founder & Chief Editor",
      bio: "Former architectural director. Clara spends her spare hours harvesting local clays, sourcing vintage brass hooks, and styling old neutral linens.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Sophia Chen",
      role: "Design & Style Writer",
      bio: "Dedicated to the Japandi philosophy. Sophia writes about capsule organic wardrobes, slow sleep hygiene, and minimalist apartment flows.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Marcus Thorne",
      role: "Workspace Architecture Lead",
      bio: "Tech enthusiast turned focus expert. Marcus specializes in ergonomics, cables management, and solid blonde oak setup configurations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 md:px-8" id="about-page-root">
      <SEO
        title="Our Editorial Sincerity"
        description="Learn more about Curated Comfort's design sifting standards, our crew of cozy lifestyle writers, and our pledge toward honest product assessments."
        slug="about"
      />

      <div className="max-w-5xl mx-auto">
        {/* Editorial Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 bg-brand-beige-light border border-brand-beige-medium/40 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold uppercase text-brand-brown-light mb-4">
            <Compass size={12} />
            <span>THE CREATIVE CODES</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-brand-brown-dark tracking-tight leading-tight">
            Cultivating the art of <span className="italic font-normal font-serif text-brand-beige-dark">intentional living</span>.
          </h1>
          <p className="font-sans text-brand-brown-light max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
            In an era of disposable plastic fast-shipping and noisy commercial feeds, we stop and seek the quiet elements that anchor daily memory spaces.
          </p>
        </div>

        {/* Large Brand Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="aspect-[21/9] w-full rounded-2xl overflow-hidden relative mb-20 shadow-pinterest border border-brand-beige-light"
        >
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1200"
            alt="Warm bedroom morning light"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-brown-dark/20 mix-blend-multiply" />
        </motion.div>

        {/* Our Three Core Codes */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 bg-brand-sage-light rounded-full flex items-center justify-center text-brand-sage-dark border border-brand-sage-medium/30 mb-4">
              <Feather size={16} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-brown-dark mb-2">
              Sincere Materials
            </h3>
            <p className="text-xs text-brand-brown-light font-sans leading-relaxed">
              We look for pure French flax, clay stoneware, sustainable brass, and hardwoods that patina with age instead of cracking to landfill waste.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 bg-brand-beige-light rounded-full flex items-center justify-center text-brand-beige-dark border border-brand-beige-medium/30 mb-4">
              <Heart size={16} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-brown-dark mb-2">
              Sensory Architectures
            </h3>
            <p className="text-xs text-brand-brown-light font-sans leading-relaxed">
              A cozy chair is empty without soft triangulated task lamps and trailing green pothos vines. We detail the environment, not just individual products.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 bg-brand-sage-light rounded-full flex items-center justify-center text-brand-sage-dark border border-brand-sage-medium/30 mb-4">
              <Scale size={16} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-brown-dark mb-2">
              Affiliate Integrity
            </h3>
            <p className="text-xs text-brand-brown-light font-sans leading-relaxed">
              We list pricing clearly and label reviews transparently. If a piece does not pass our quality levels, we refuse to recommend it for click revenue.
            </p>
          </div>
        </section>

        {/* Philosophy breakdown in two columns */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 py-12 border-t border-b border-brand-beige-light/45">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-beige-dark block mb-2">
              Our Design Philosophy
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-brand-brown-dark leading-tight mb-4">
              Where Scandinavian calm meets Wabi-Sabi clay textures.
            </h2>
            <div className="text-sm font-sans text-brand-brown-light space-y-4 leading-relaxed">
              <p>
                We believe that physical rooms are extensions of human emotions. A busy dresser creates background cognitive noise, while natural linen layers resting under soft lighting anchor and signal standard sleep states.
              </p>
              <p>
                Our editor crew sifts through Amazon products under strict guidelines. Clara, Sophia, and Marcus test samples directly, evaluate review columns, confirm material specs, and construct premium pairings so that every pick feels intentional.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-pinterest border border-brand-beige-light">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=500"
                alt="Styled plants on console table"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* The Curating Editors Bios */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-beige-dark block mb-2">
              The Crew
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown-dark">
              Meet Creative Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editors.map((editor) => (
              <div
                key={editor.name}
                className="bg-white rounded-2xl p-5 border border-brand-beige-light shadow-md flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-beige-medium/40 mb-4 shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={editor.image}
                    alt={editor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-brown-dark">
                  {editor.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest font-medium text-brand-sage-dark mb-3">
                  {editor.role}
                </span>
                <p className="text-xs text-brand-brown-light font-sans leading-relaxed">
                  {editor.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter inclusion */}
        <Newsletter />
      </div>
    </div>
  );
}
