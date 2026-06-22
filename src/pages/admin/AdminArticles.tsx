import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  FileText, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  FolderOpen
} from "lucide-react";
import { useBlog } from "../../context/BlogContext";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminArticles() {
  const { articles, deleteArticle, updateArticle } = useBlog();
  const navigate = useNavigate();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "published" | "draft">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Derive unique categories present on articles
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach(a => cats.add(a.category));
    return Array.from(cats);
  }, [articles]);

  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; title: string } | null>(null);

  // Handle direct toggle from Table
  const handleToggleStatus = (slug: string, currentStatus: string) => {
    const nextStatus = currentStatus === "draft" ? "published" : "draft";
    updateArticle(slug, { status: nextStatus } as any);
  };

  const handleDelete = (slug: string, title: string) => {
    setDeleteTarget({ slug, title });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteArticle(deleteTarget.slug);
      setDeleteTarget(null);
    }
  };

  // Filtered dataset
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // 1. Search Query
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        art.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Status Match
      // In initial state, some items might not have status. Let's fallback.
      const status = (art as any).status || "published"; 
      const matchesStatus = 
        selectedStatus === "all" || 
        (selectedStatus === "published" && status === "published") ||
        (selectedStatus === "draft" && status === "draft");

      // 3. Category Match
      const matchesCategory = selectedCategory === "all" || art.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, searchQuery, selectedStatus, selectedCategory]);

  // Paginated dataset
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage]);

  // Reset page when filters adjust
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedCategory]);

  return (
    <AdminDashboardLayout activeTab="/admin/articles">
      <div className="space-y-6">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold font-serif text-brand-brown-dark">
              Journal Database ({filteredArticles.length})
            </h1>
            <p className="text-xs text-brand-beige-dark">
              Write, edit, draft, and optimize lifestyle posts for high-quality affiliate search indexings.
            </p>
          </div>
          <Link
            to="/admin/editor"
            className="inline-flex items-center gap-1.5 bg-brand-sage-dark hover:bg-brand-brown-dark text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors shrink-0"
          >
            <Plus size={14} />
            <span>Write New Journal</span>
          </Link>
        </div>

        {/* Database Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-brand-beige-light shadow-sm space-y-3">
          <div className="flex flex-col lg:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-3 text-brand-beige-dark">
                <Search size={15} />
              </span>
              <input
                type="text"
                placeholder="Search articles by title, slug, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-cream/30 pl-10 pr-4 py-2 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark"
              />
            </div>

            {/* Middle Filters group */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              {/* Status Select */}
              <div className="flex items-center gap-1.5 bg-brand-cream/20 px-3 py-1.5 rounded-lg border border-brand-beige-light">
                <span className="text-[10px] uppercase font-bold text-brand-brown-light">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e: any) => setSelectedStatus(e.target.value)}
                  className="bg-transparent border-none text-xs focus:outline-none text-brand-brown-dark font-medium cursor-pointer"
                >
                  <option value="all">All Journals</option>
                  <option value="published">Published Only</option>
                  <option value="draft">Drafts Only</option>
                </select>
              </div>

              {/* Category selector */}
              <div className="flex items-center gap-1.5 bg-brand-cream/20 px-3 py-1.5 rounded-lg border border-brand-beige-light">
                <span className="text-[10px] uppercase font-bold text-brand-brown-light">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none text-xs focus:outline-none text-brand-brown-dark font-medium cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {availableCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Tabular Output */}
        <div className="bg-white rounded-2xl border border-brand-beige-light shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-cream/60 border-b border-brand-beige-light text-[10.5px] uppercase tracking-wider font-bold text-brand-brown-light">
                  <th className="py-3 px-4">Journal Article Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date Added</th>
                  <th className="py-3 px-4">Integrations</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-beige-light/40 text-xs text-brand-brown-dark">
                {paginatedArticles.length > 0 ? (
                  paginatedArticles.map((art) => {
                    const status = (art as any).status || "published";
                    const isDraft = status === "draft";
                    // Count linked product templates
                    const productCardsCount = art.content.filter(block => block.type === "product-card").length;

                    return (
                      <tr key={art.slug} className="hover:bg-brand-cream/15 transition-colors group">
                        <td className="py-4 px-4 max-w-sm">
                          <div className="flex gap-3 items-center">
                            <img
                              src={art.coverImage}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-lg object-cover bg-brand-cream shrink-0 border border-brand-beige-light"
                            />
                            <div className="truncate">
                              <h3 className="font-serif font-bold text-brand-brown-dark text-[13px] group-hover:text-brand-sage-dark transition-colors truncate">
                                {art.title}
                              </h3>
                              <p className="text-[10.5px] text-brand-beige-dark font-mono mt-0.5 truncate max-w-[280px]">
                                slug: /{art.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="bg-brand-cream text-brand-brown-light border border-brand-beige-medium/50 px-2 py-0.5 rounded text-[10.5px] font-medium">
                            {art.category}
                          </span>
                        </td>

                        <td className="py-4 px-4 font-mono text-[11px] text-brand-beige-dark">
                          {art.date}
                        </td>

                        <td className="py-4 px-4">
                          <span className="text-[10.5px] text-brand-brown-light font-medium inline-flex items-center gap-1">
                            <FolderOpen size={11} className="text-brand-beige-dark" />
                            <span>{productCardsCount} products</span>
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleStatus(art.slug, status)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all flex items-center gap-1 border cursor-pointer ${
                              isDraft
                                ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            }`}
                            title={`Click to change to ${isDraft ? "Published" : "Draft"}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isDraft ? "bg-amber-500" : "bg-emerald-500"}`} />
                            <span>{status}</span>
                          </button>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2 text-brand-brown-light">
                            <a
                              href={`/article/${art.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 px-1.5 hover:bg-brand-cream rounded transition-all text-brand-beige-dark hover:text-brand-brown-dark"
                              title="Live view"
                            >
                              <ExternalLink size={14} />
                            </a>
                            <button
                              onClick={() => navigate(`/admin/editor?slug=${art.slug}`)}
                              className="p-1 px-1.5 hover:bg-brand-cream hover:text-brand-brown-dark rounded transition-all flex items-center gap-1 cursor-pointer"
                              title="Modify post"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(art.slug, art.title)}
                              className="p-1 px-1.5 hover:bg-red-50 hover:text-red-600 rounded transition-all cursor-pointer"
                              title="Delete permanently"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-brand-beige-dark text-xs italic">
                      No matching journals found inside database. Search for another term or launch the writing terminal.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Database Pagination Panel */}
          {totalPages > 1 && (
            <div className="bg-brand-cream/30 border-t border-brand-beige-light px-4 py-3 flex items-center justify-between select-none">
              <span className="text-[11px] text-brand-beige-dark font-medium">
                Showing page <strong className="font-semibold text-brand-brown-dark">{currentPage}</strong> of <strong className="font-semibold text-brand-brown-dark">{totalPages}</strong>
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded border border-brand-beige-light bg-white hover:bg-brand-cream disabled:opacity-40 disabled:hover:bg-white text-brand-brown-light cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded border border-brand-beige-light bg-white hover:bg-brand-cream disabled:opacity-40 disabled:hover:bg-white text-brand-brown-light cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-brand-brown-dark/20 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-brand-beige-light shadow-xl p-6 max-w-md w-full space-y-4">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg font-bold font-serif text-brand-brown-dark">
                Delete Journal Post?
              </h3>
              <p className="text-xs text-brand-beige-dark leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-brand-brown-dark font-medium">"{deleteTarget.title}"</strong>?<br />
                This action cannot be undone and will erase this post's record from our active index.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="w-full sm:w-auto px-4 py-2 border border-brand-beige-light rounded-xl text-xs font-semibold text-brand-brown-light hover:bg-brand-cream transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
