import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page Imports
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import CategoryView from "./pages/CategoryView";
import ArticlePage from "./pages/ArticlePage";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";

// Admin Imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminArticleEditor from "./pages/admin/AdminArticleEditor";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from "./pages/admin/AdminProfile";

// Scroll Restoration helper component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth reset viewport position on route changes
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream selection:bg-brand-sage-medium/30 selection:text-brand-brown-dark">
      {/* Persistent Brand Header - Hidden in dashboard workspace */}
      {!isAdminPath && <Header />}

      {/* Dynamic page routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryId" element={<CategoryView />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          
          {/* Admin Platform routing coordinates */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/editor" element={<AdminArticleEditor />} />
          <Route path="/admin/editor/:id" element={<AdminArticleEditor />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/media" element={<AdminMedia />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* Catch-all 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Persistent Brand Footer - Hidden in dashboard workspace */}
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Resets browser scroll coordinates instantly on layout jumps */}
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
