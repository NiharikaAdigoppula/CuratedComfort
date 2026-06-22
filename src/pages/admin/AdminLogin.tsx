import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, User, Sparkles, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useBlog } from "../../context/BlogContext";
import SEO from "../../components/SEO";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useBlog();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  // If already logged in, send directly to dashboard or target workspace
  React.useEffect(() => {
    if (currentUser?.role === "Admin") {
      if (redirect === "editor") {
        navigate("/admin/editor");
      } else {
        navigate("/admin/dashboard");
      }
    }
  }, [currentUser, navigate, redirect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      setIsLoading(false);
      if (success) {
        if (redirect === "editor") {
          navigate("/admin/editor");
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        setError("Invalid username or password.");
      }
    }, 800);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 flex flex-col justify-center items-center font-sans">
      <SEO title="Admin Gateway" description="Log in to access the Curated Comfort CMS studio dashboard." />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-brand-beige-light rounded-3xl p-8 md:p-10 shadow-pinterest"
      >
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-brand-sage-light text-brand-sage-dark border border-brand-sage-medium/30 px-3 py-1 rounded-full text-[10px] tracking-widest font-semibold uppercase mb-3">
            <Sparkles size={11} />
            <span>STUDIO GATEWAY</span>
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown-dark tracking-tight">
            Curated CMS Core
          </h2>
          <p className="text-xs text-brand-beige-dark mt-2 leading-relaxed">
            Configure catalogs, draft slow articles, and edit affiliate products.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light block">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-brand-beige-dark">
                <User size={15} />
              </span>
              <input
                type="text"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-brand-cream/40 pl-10 pr-4 py-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs sm:text-sm text-brand-brown-dark"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light block">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-brand-beige-dark">
                <Lock size={15} />
              </span>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-cream/40 pl-10 pr-4 py-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs sm:text-sm text-brand-brown-dark"
                required
              />
            </div>
          </div>

{error && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 font-medium">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-brown-light hover:bg-brand-brown-dark disabled:bg-brand-beige-dark text-brand-cream text-xs font-semibold uppercase tracking-wider py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 mt-6"
          >
            {isLoading ? "Authenticating Entry..." : "Unlock Studio Workspace"}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-brand-beige-light/40 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1 text-[11px] text-brand-beige-dark hover:text-brand-brown-dark transition-colors font-semibold"
          >
            <ArrowLeft size={13} />
            <span>Return to Visitor Magazine</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
