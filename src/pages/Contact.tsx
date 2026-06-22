import React, { useState } from "react";
import { Mail, MapPin, Feather, Check, Send, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SEO from "../components/SEO";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Pitch Curation",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please input a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate standard server API dispatching
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "Pitch Curation", message: "" });
    }, 1500);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 md:px-8" id="contact-page-root">
      <SEO
        title="Contact Our Studio"
        description="Pitch us design curations, recommend premium Amazon homewares, or explore affiliate collaboration coordinates."
        slug="contact"
      />

      <div className="max-w-5xl mx-auto">
        {/* Title portion */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 bg-brand-sage-light text-brand-sage-dark border border-brand-sage-medium/30 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold uppercase mb-3">
            <Feather size={11} />
            <span>PITCH & TALK</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown-dark tracking-tight">
            Connect with Our Editorial Studio
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-brown-light max-w-lg mx-auto mt-2.5 leading-relaxed">
            Have a cozy homeware piece we must assess? Sourced a beautiful cabin retreat? Pitch your stories and collaborate directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-brand-beige-light shadow-pinterest p-6 md:p-10 max-w-4xl mx-auto">
          {/* Studio Contact Cards (Left column) */}
          <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-brand-beige-light pb-8 lg:pb-0 lg:pr-8">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-brown-dark mb-4">
                Inquiry Channels
              </h3>

              <div className="flex items-start gap-3.5 text-brand-brown-light">
                <div className="w-9 h-9 bg-brand-cream text-brand-brown-light rounded-full flex items-center justify-center shrink-0 border border-brand-beige-light">
                  <Mail size={15} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-brown-dark mb-0.5">
                    General & Press
                  </h4>
                  <p className="text-[11px] text-brand-beige-dark mb-0.5">For general inquiries and press kits</p>
                  <a href="mailto:hello@curatedcomfort.com" className="text-xs font-semibold text-brand-brown-light hover:underline">
                    hello@curatedcomfort.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-brand-brown-light">
                <div className="w-9 h-9 bg-brand-cream text-brand-brown-light rounded-full flex items-center justify-center shrink-0 border border-brand-beige-light">
                  <Feather size={15} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-brown-dark mb-0.5">
                    Pitch Curation
                  </h4>
                  <p className="text-[11px] text-brand-beige-dark mb-0.5">Sourced design stories & styling logs</p>
                  <a href="mailto:curated@curatedcomfort.com" className="text-xs font-semibold text-brand-brown-light hover:underline">
                    curated@curatedcomfort.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-brand-brown-light">
                <div className="w-9 h-9 bg-brand-cream text-brand-brown-light rounded-full flex items-center justify-center shrink-0 border border-brand-beige-light">
                  <MapPin size={15} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-brown-dark mb-0.5">
                    Physical Studio
                  </h4>
                  <p className="text-xs leading-relaxed font-sans mt-0.5">
                    Curated Comfort Lab<br />
                    102, Sage Circle Way<br />
                    Pune, MH - 411001, IN
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-brand-beige-dark font-sans leading-relaxed mt-10 pt-4 border-t border-brand-beige-light/40">
              <p>We aim to evaluate all styling pitches within 48 business hours. Thank you for celebrating slower design spaces with us.</p>
            </div>
          </div>

          {/* Interactive Form (Right column) */}
          <div className="lg:col-span-7 pt-4 lg:pt-0">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <h3 className="font-serif text-lg font-bold text-brand-brown-dark mb-4">
                    Send a Studio Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light font-sans block">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Sophia"
                        className="w-full bg-brand-cream/40 px-4 py-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs sm:text-sm text-brand-brown-dark font-sans"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light font-sans block">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sophia@example.com"
                        className="w-full bg-brand-cream/40 px-4 py-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs sm:text-sm text-brand-brown-dark font-sans"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light font-sans block">
                      Inquiry Topic
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-brand-cream/40 px-3 py-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs sm:text-sm text-brand-brown-dark font-sans appearance-none pointer-events-auto"
                    >
                      <option value="Pitch Curation">Pitch Design Curation</option>
                      <option value="Suggest Product">Suggest Amazon Homeware</option>
                      <option value="Affiliate Inquiry">Affiliate Cooperation</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light font-sans block">
                      Message Corpus *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Clara, Sophia, and Marcus... I absolutely adore your minimal bedroom logs..."
                      className="w-full bg-brand-cream/40 px-4 py-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs sm:text-sm text-brand-brown-dark font-sans resize-none"
                      required
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-xs text-red-600 font-sans font-medium bg-red-50 p-2.5 rounded-lg">
                      <AlertCircle size={14} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-brown-light hover:bg-brand-brown-dark disabled:bg-brand-beige-dark text-brand-cream text-xs font-semibold uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300 pointer-events-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Dispatching Letter...</span>
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-sage-light/30 border border-brand-sage-medium text-center p-8 rounded-2xl max-w-sm mx-auto my-6"
                >
                  <div className="w-14 h-14 bg-brand-sage-light text-brand-sage-dark border border-brand-sage-medium rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-brand-brown-dark mb-2">
                    Curation Pitch Dispelled
                  </h4>
                  <p className="font-sans text-xs text-brand-brown-light leading-relaxed mb-6">
                    Our editors have received your pitch letter! We appreciate you participating in the Curated Comfort slow aesthetic narrative.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-brand-brown-light hover:bg-brand-brown-dark text-white text-xs font-semibold uppercase tracking-wider py-2 px-5 rounded-full"
                  >
                    Draft another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
