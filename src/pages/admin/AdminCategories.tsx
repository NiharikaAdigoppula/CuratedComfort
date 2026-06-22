import React, { useState, useMemo } from "react";
import { FolderTree, Plus, Trash2, Sparkles, Database, HelpCircle } from "lucide-react";
import { useBlog } from "../../context/BlogContext";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminCategories() {
  const { categories, articles, createCategory, deleteCategory } = useBlog();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Calculate article count mapped to each category
  const categoryStats = useMemo(() => {
    return categories.map((cat) => {
      const count = articles.filter((a) => a.category === cat).length;
      return {
        name: cat,
        count
      };
    });
  }, [categories, articles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setAlertMessage("This category taxonomy already exists!");
      return;
    }

    createCategory(trimmed);
    setNewCategoryName("");
    setAlertMessage(`Category "${trimmed}" successfully established!`);
  };

  const handleDelete = (name: string, count: number) => {
    if (count > 0) {
      setAlertMessage(`The category "${name}" contains ${count} linked articles. Please re-assign those articles in the Editor before deleting this category.`);
      return;
    }

    setDeleteTarget(name);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteCategory(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <AdminDashboardLayout activeTab="/admin/categories">
      <div className="space-y-6 max-w-4xl" id="cms-categories-hub">
        
        {/* Header summary */}
        <div>
          <h1 className="text-xl font-bold font-serif text-brand-brown-dark">
            Categories & Taxonomy Hub
          </h1>
          <p className="text-xs text-brand-beige-dark">
            Add or prune active lifestyle indices. Re-aligning taxonomy helps organic readers find relevant articles easily.
          </p>
        </div>

        {alertMessage && (
          <div className="bg-brand-sage-light/40 border border-brand-sage-medium/30 p-3.5 rounded-xl text-xs text-brand-sage-dark flex justify-between items-center">
            <span>{alertMessage}</span>
            <button 
              onClick={() => setAlertMessage(null)} 
              className="text-brand-brown-light hover:text-brand-brown-dark font-bold text-xs px-2 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Create category panel */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm h-fit space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-bold text-brand-brown-light flex items-center gap-1.5 border-b pb-2.5 border-brand-beige-light/50">
              <Plus size={14} className="text-brand-sage-dark" />
              <span>Establish New Category</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wellness"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full bg-brand-cream/25 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs sm:text-xs text-brand-brown-dark"
                />
              </div>

              <div className="text-[10px] text-brand-beige-dark leading-relaxed">
                Make sure the name aligns with high-converting search intent (e.g. "Gift Guides").
              </div>

              <button
                type="submit"
                className="w-full bg-brand-brown-light hover:bg-brand-brown-dark text-brand-cream text-xs uppercase font-bold py-2.5 rounded-lg transition-colors cursor-pointer select-none"
              >
                Establish Coordinates
              </button>
            </form>
          </div>

          {/* List and Statistics Table panel */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm md:col-span-2 space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-bold text-brand-brown-light flex items-center gap-1.5 border-b pb-2.5 border-brand-beige-light/50">
              <Database size={14} />
              <span>Active Taxonomy indices</span>
            </h2>

            <div className="divide-y divide-brand-beige-light/40">
              {categoryStats.length > 0 ? (
                categoryStats.map((cat) => (
                  <div key={cat.name} className="py-3 flex items-center justify-between text-xs hover:bg-brand-cream/10 px-1 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-sage-dark shrink-0" />
                      <span className="font-serif font-bold text-brand-[13px] text-brand-brown-dark">{cat.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[10.5px] font-semibold text-brand-beige-dark font-mono bg-brand-cream border border-brand-beige-light/60 px-2 py-0.5 rounded">
                        {cat.count} {cat.count === 1 ? 'article' : 'articles'}
                      </span>
                      
                      <button
                        onClick={() => handleDelete(cat.name, cat.count)}
                        className="text-brand-beige-dark hover:text-red-600 transition-colors cursor-pointer p-1"
                        title={cat.count > 0 ? "Cannot delete: holds articles" : "Remove index"}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-brand-beige-dark italic text-xs">
                  Taxonomy list is completely empty. Create a index category above.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-brand-brown-dark/20 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-brand-beige-light shadow-xl p-6 max-w-md w-full space-y-4">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg font-bold font-serif text-brand-brown-dark">
                Delete Category Taxonomy?
              </h3>
              <p className="text-xs text-brand-beige-dark leading-relaxed">
                Are you sure you want to permanently delete the <strong className="text-brand-brown-dark font-medium">"{deleteTarget}"</strong> category?<br />
                This action cannot be undone.
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
