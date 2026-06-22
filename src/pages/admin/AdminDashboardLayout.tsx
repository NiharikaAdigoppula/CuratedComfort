import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  BarChart2, 
  BookOpen, 
  ShoppingBag, 
  FolderTree, 
  Image, 
  Settings as SettingsIcon, 
  User, 
  LogOut, 
  Globe, 
  Menu, 
  X, 
  Plus, 
  Sparkles, 
  ShieldAlert 
} from "lucide-react";
import { useBlog } from "../../context/BlogContext";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
  onClick?: () => void;
}

export default function AdminDashboardLayout({ children, activeTab }: { children: React.ReactNode; activeTab: string }) {
  const { currentUser, logout, articles, products } = useBlog();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authenticated safety gate
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== "Admin") {
      navigate("/admin/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== "Admin") {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md bg-white border border-brand-beige-light p-8 rounded-3xl shadow-pinterest flex flex-col items-center">
          <ShieldAlert size={40} className="text-red-500 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-2">Gate Temporarily Closed</h2>
          <p className="text-xs text-brand-brown-light mb-6">
            You require verified Admin status to access these coordinates. Log in to establish your editorial workspace.
          </p>
          <button
            onClick={() => navigate("/admin/login")}
            className="bg-brand-brown-light hover:bg-brand-brown-dark text-white px-6 py-2.5 rounded-full text-xs uppercase font-medium tracking-wide transition-colors"
          >
            Authorize Session
          </button>
        </div>
      </div>
    );
  }

  // Count drafts vs published
  const draftsCount = articles.filter((a) => a.readingTime.toLowerCase().includes("draft") || !(a as any).published).length; // Wait, we can track published status. Let's make sure our context/drafts works.
  // Actually, we can check if it has a property `published: false` or if `readingTime` has some tag. Let's make sure we track dynamic status nicely: standardizing a `status: "published" | "draft"` or similar for CMS database layer! Excellent!

  const draftArticles = articles.filter((a) => (a as any).status === "draft");
  const publishedArticles = articles.filter((a) => (a as any).status !== "draft");

  const sidebarLinks: SidebarLinkProps[] = [
    { to: "/admin/dashboard", icon: <BarChart2 size={16} />, label: "Dashboard overview" },
    { to: "/admin/articles", icon: <BookOpen size={16} />, label: "Articles & Journals", badge: articles.length },
    { to: "/admin/products", icon: <ShoppingBag size={16} />, label: "Affiliate Products", badge: products.length },
    { to: "/admin/categories", icon: <FolderTree size={16} />, label: "Categories Hub" },
    { to: "/admin/media", icon: <Image size={16} />, label: "Media Library" },
    { to: "/admin/settings", icon: <SettingsIcon size={16} />, label: "Global Settings" },
    { to: "/admin/profile", icon: <User size={16} />, label: "Admin Profile" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-brown-dark text-white p-6 font-sans">
      {/* Brand logo portion */}
      <div className="flex items-center gap-3 pb-8 border-b border-white/10 mb-6">
        <div className="w-9 h-9 rounded-xl bg-brand-sage-dark flex items-center justify-center text-white font-serif italic text-lg font-bold">
          C
        </div>
        <div>
          <div className="text-[10px] tracking-widest uppercase text-brand-sage-light font-semibold opacity-75">
            HQ CONTROL CORE
          </div>
          <h1 className="font-serif text-sm font-bold leading-tight">
            Curated Comfort CMS
          </h1>
        </div>
      </div>

      {/* Primary Navigation actions */}
      <nav className="space-y-1.5 flex-1 select-none">
        <div className="text-[9px] uppercase tracking-widest font-bold text-brand-beige-dark mb-3 px-3 block">
          Studio Pages
        </div>
        {sidebarLinks.map((link) => {
          const isActive = activeTab === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? "bg-brand-sage-dark text-white font-semibold"
                  : "text-brand-beige-light/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? "text-white" : "text-brand-beige-light/40 group-hover:text-brand-beige-light"}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </div>
              {link.badge !== undefined && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isActive ? "bg-white/25 text-white" : "bg-white/10 text-brand-beige-light"}`}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom control links */}
      <div className="border-t border-white/10 pt-6 mt-6 space-y-2">
        <button
          onClick={() => navigate("/admin/editor")}
          className="w-full bg-white hover:bg-brand-cream text-brand-brown-dark text-[11px] uppercase tracking-wider font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all"
        >
          <Plus size={14} />
          <span>Write Journal</span>
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-xs text-brand-beige-light/50 hover:text-white justify-center border border-white/10 rounded-lg transition-colors"
        >
          <Globe size={13} />
          <span>Launch Live Website</span>
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/20 rounded-lg transition-colors justify-center"
        >
          <LogOut size={13} />
          <span>End Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream/40 flex flex-col md:flex-row font-sans" id="admin-dashboard-container">
      {/* 1. Mobile Top Notification Bar */}
      <div className="md:hidden bg-brand-brown-dark text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-brand-sage-dark flex items-center justify-center text-xs italic font-bold">
            C
          </div>
          <span className="font-serif text-sm font-semibold tracking-tight">Curated CMS</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/editor"
            className="bg-brand-sage-dark text-white text-[10px] uppercase font-bold py-1.5 px-3 rounded"
          >
            + Write
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-brand-beige-light hover:text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-4/5 max-w-xs h-full relative z-10 shadow-lg">
            <SidebarContent />
          </div>
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* 2. Desktop Left Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 shrink-0 select-none border-r border-[#E5E1DA]">
        <SidebarContent />
      </aside>

      {/* 3. Primary Administration Stage */}
      <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 overflow-x-hidden min-h-screen">
        {/* Header Breadcrumbs & Status info */}
        <header className="mb-8 border-b border-brand-beige-light pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-brown-dark tracking-tight capitalize select-none">
              {activeTab === "/admin/dashboard" ? "Dashboard overview" : activeTab.split("/").pop()}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-brand-beige-dark select-none">
              <span>Workspace</span>
              <span>/</span>
              <span className="text-brand-brown-light font-medium capitalize">{activeTab.split("/").pop()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-brand-sage-light text-brand-sage-dark border border-brand-sage-medium/30 px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
              <Sparkles size={11} />
              <span>Admin Mode</span>
            </span>
            <div className="text-[11px] text-right text-brand-beige-dark hidden sm:block leading-none">
              <span className="font-semibold text-brand-brown-dark block">demo@curatedcomfort.com</span>
              <span className="text-[9px] uppercase tracking-wider font-mono">active session</span>
            </div>
          </div>
        </header>

        {/* Child workspace output */}
        <div className="flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
