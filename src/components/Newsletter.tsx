import React, { useState } from "react";
import { Mail, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please key in a valid email address.");
      return;
    }
    setError("");
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-brand-sage-light text-brand-brown-dark rounded-3xl max-w-6xl mx-auto my-16 border border-brand-sage-medium/40 relative overflow-hidden shadow-sm" id="newsletter">
      {/* Decorative leaf motifs */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-brand-sage-medium/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-brand-beige-medium/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-brand-sage-medium/30 border border-brand-sage-dark/10 px-3 py-1 rounded-full text-xs font-semibold text-brand-sage-dark mb-4">
          <Sparkles size={13} />
          <span>JOIN THE CLUB</span>
        </div>

        <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-brown-dark mb-3">
          Weekly Curation to Your Inbox
        </h3>

        <p className="font-sans text-sm md:text-base text-brand-brown-light leading-relaxed mb-8 max-w-lg mx-auto">
          Get beautiful design stories, cozy home-office ideas, styling guides, and carefully-screened Amazon product alerts. No spam, ever.
        </p>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-3 max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-white p-1.5 rounded-full border border-brand-sage-dark/10 shadow-sm focus-within:ring-2 focus-within:ring-brand-sage-dark/20 transition-all">
                <div className="flex items-center gap-2 px-3 pl-4 flex-grow">
                  <Mail size={16} className="text-brand-beige-dark shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent border-none text-sm outline-none text-brand-brown-dark placeholder-brand-beige-dark/80 font-sans"
                    aria-label="Email address for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-sage-dark hover:bg-brand-brown-dark text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-full transition-colors duration-300 pointer-events-auto"
                >
                  Subscribe
                </button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-600 font-sans font-medium"
                >
                  {error}
                </motion.p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-brand-sage-medium max-w-sm mx-auto shadow-md"
            >
              <div className="w-12 h-12 bg-brand-sage-light text-brand-sage-dark rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-sage-medium">
                <Check size={20} />
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-brown-dark mb-1">
                You are on the list!
              </h4>
              <p className="font-sans text-xs text-brand-brown-light leading-relaxed">
                Thank you for subscribing! Your first curation packet will slide into your inbox this Sunday.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
