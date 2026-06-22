import React, { useState, useMemo } from "react";
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  TrendingUp,
  Image as ImageIcon
} from "lucide-react";
import { useBlog } from "../../context/BlogContext";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { Product } from "../../data/products";

export default function AdminProducts() {
  const { products, categories, mediaLibrary, createProduct, updateProduct, deleteProduct, settings } = useBlog();

  // Search/Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Editor states (For creation/modification)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("₹999");
  const [rating, setRating] = useState(4.8);
  const [reviewCount, setReviewCount] = useState(120);
  const [amazonUrl, setAmazonUrl] = useState("");
  const [productCategory, setProductCategory] = useState("Home Decor");
  const [buttonText, setButtonText] = useState("Buy on Amazon");
  
  // Pros and Cons text forms (Separated by commas or lines)
  const [prosInput, setProsInput] = useState("");
  const [consInput, setConsInput] = useState("");

  const [showImageBankSelector, setShowImageBankSelector] = useState(false);

  // Filtered dataset
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch = 
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        prod.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === "all" || prod.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleOpenCreateForm = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setImage("");
    setPrice("₹1,200");
    setRating(4.8);
    setReviewCount(150);
    setAmazonUrl("");
    setProductCategory("Home Decor");
    setButtonText("Buy on Amazon");
    setProsInput("Aesthetic, Natural texture, High durability");
    setConsInput("Requires light dusting");
    setIsEditing(true);
  };

  const handleOpenEditForm = (prod: Product) => {
    setEditId(prod.id);
    setTitle(prod.title);
    setDescription(prod.description);
    setImage(prod.image);
    setPrice(prod.price);
    setRating(prod.rating);
    setReviewCount(prod.reviewCount || 100);
    setAmazonUrl(prod.amazonUrl);
    setProductCategory(prod.category);
    setButtonText((prod as any).buttonText || "Buy on Amazon");
    
    // Fallback pros-cons split if present as features or arrays
    const pros = (prod as any).pros ? (prod as any).pros.join(", ") : (prod.features || []).slice(0, 3).join(", ");
    const cons = (prod as any).cons ? (prod as any).cons.join(", ") : "None specified";
    
    setProsInput(pros);
    setConsInput(cons);
    setIsEditing(true);
  };

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const handleDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const pros = prosInput.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
    const cons = consInput.split(",").map((p) => p.trim()).filter((p) => p.length > 0);

    // If custom affiliate URL does not have tag, append tag organically if configured
    let verifiedUrl = amazonUrl;
    if (settings.amazonTag && amazonUrl && !amazonUrl.includes("tag=")) {
      const glue = amazonUrl.includes("?") ? "&" : "?";
      verifiedUrl = `${amazonUrl}${glue}tag=${settings.amazonTag}`;
    }

    const payload = {
      title,
      description,
      image: image || "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400",
      price,
      rating: Number(rating) || 4.5,
      reviewCount: Number(reviewCount) || 80,
      amazonUrl: verifiedUrl,
      category: productCategory,
      features: pros, // fallback legacy align keys
      pros,
      cons,
      buttonText: buttonText || "Buy on Amazon"
    };

    if (editId) {
      updateProduct(editId, payload);
      alert(`Product "${title}" updated successfully!`);
    } else {
      createProduct(payload);
      alert(`Product "${title}" added to catalog!`);
    }

    setIsEditing(false);
  };

  return (
    <AdminDashboardLayout activeTab="/admin/products">
      <div className="space-y-6">

        {/* Action Panel Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold font-serif text-brand-brown-dark">
              Affiliate Products Catalog ({filteredProducts.length})
            </h1>
            <p className="text-xs text-brand-beige-dark">
              Manage Amazon listings, custom buttons, descriptions, and Pros/Cons loaded into article segments.
            </p>
          </div>
          {!isEditing && (
            <button
              onClick={handleOpenCreateForm}
              className="inline-flex items-center gap-1.5 bg-brand-sage-dark hover:bg-brand-brown-dark text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors shrink-0"
            >
              <Plus size={14} />
              <span>Add Affiliate Item</span>
            </button>
          )}
        </div>

        {/* Integrated form edit stage */}
        {isEditing ? (
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-md max-w-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-brand-beige-light pb-3">
              <h2 className="font-serif text-lg font-bold text-brand-brown-dark flex items-center gap-1.5">
                <Sparkles size={16} className="text-brand-sage-dark" />
                <span>{editId ? "Modify Catalog Item" : "Create Catalog Product"}</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs font-bold text-brand-beige-dark hover:text-brand-brown-dark"
              >
                Cancel Edit
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Title */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Handcrafted Ceramic Speckled Planter"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark font-medium"
                  />
                </div>

                {/* Categories */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Target Category</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-brand-brown-dark"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Display Price (e.g. ₹999)</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-brand-brown-dark font-mono font-bold"
                  />
                </div>

                {/* Rating */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light border-none">Stars Rating (e.g. 4.8)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-brand-brown-dark font-mono"
                  />
                </div>

                {/* Reviews count */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Reviews Volume</label>
                  <input
                    type="number"
                    value={reviewCount}
                    onChange={(e) => setReviewCount(Number(e.target.value))}
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-brand-brown-dark font-mono"
                  />
                </div>

                {/* Amazon Url */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light flex items-center gap-1">
                    <span>Amazon Affiliate Link</span>
                    <HelpCircle size={11} className="text-brand-beige-dark cursor-help" title="Will stitch global tags automatically if tag tracker omitted" />
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://www.amazon.in/dp/..."
                    value={amazonUrl}
                    onChange={(e) => setAmazonUrl(e.target.value)}
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-brand-brown-dark font-mono"
                  />
                </div>

                {/* Button text */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Outbound Button Text (e.g. Buy on Amazon)</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-brand-brown-dark font-medium"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Introductory Product Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a highly persuasive paragraph detailing why this specific item fits comfortable lifestyle aesthetics..."
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-brand-brown-dark leading-relaxed"
                  />
                </div>

                {/* Pros list */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">Pros (Separated by commas)</label>
                  <input
                    type="text"
                    value={prosInput}
                    onChange={(e) => setProsInput(e.target.value)}
                    placeholder="Highly aesthetic, Natural textures, Durable"
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-emerald-950 font-medium"
                  />
                </div>

                {/* Cons list */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-red-800">Cons (Separated by commas)</label>
                  <input
                    type="text"
                    value={consInput}
                    onChange={(e) => setConsInput(e.target.value)}
                    placeholder="Slightly heavy, Needs delicate washing"
                    className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-red-950 font-medium"
                  />
                </div>

                {/* Image field with lookups */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light block">Product Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full bg-brand-cream/20 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowImageBankSelector(true)}
                      className="bg-brand-cream px-3 py-2 text-brand-brown-dark border border-brand-beige-light hover:border-brand-beige-dark hover:bg-brand-beige-light/30 font-semibold rounded-lg flex items-center gap-1 whitespace-nowrap cursor-pointer select-none transition-colors"
                    >
                      <ImageIcon size={14} />
                      <span>Bank Pick</span>
                    </button>
                  </div>
                  {image && (
                    <div className="mt-2 bg-brand-cream/10 p-2 border rounded-lg border-brand-beige-light/40 w-28 h-28 flex items-center justify-center">
                      <img src={image} referrerPolicy="no-referrer" alt="" className="max-w-full max-h-full rounded object-cover" />
                    </div>
                  )}
                </div>

              </div>

              <div className="pt-4 border-t border-brand-beige-light/45 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-white hover:bg-brand-cream border border-brand-beige-light px-4 py-2 rounded-lg text-brand-brown-light font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-sage-dark hover:bg-brand-brown-dark text-white px-5 py-2 rounded-lg font-bold shadow-sm"
                >
                  {editId ? "Update Product" : "Save and Insert"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Search/Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-3 text-brand-beige-dark">
                  <Search size={15} />
                </span>
                <input
                  type="text"
                  placeholder="Search products by title, tag, catalog id..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-cream/30 pl-10 pr-4 py-2 rounded-lg border border-brand-beige-light focus:outline-none text-xs text-brand-brown-dark"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-brand-cream/15 p-2 px-3 border border-brand-beige-light rounded-lg text-xs font-semibold text-brand-brown-dark cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Catalog Grid list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl border border-brand-beige-light shadow-sm overflow-hidden flex flex-col justify-between group">
                    <div className="p-4 space-y-4">
                      
                      {/* Visual top */}
                      <div className="relative aspect-video rounded-xl bg-brand-cream overflow-hidden border border-brand-beige-light/40">
                        <img
                          src={p.image}
                          referrerPolicy="no-referrer"
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-[102%] duration-300"
                        />
                        <span className="absolute left-2.5 top-2.5 bg-brand-brown-dark/80 backdrop-blur-md text-brand-cream text-[9.5px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                        <span className="absolute right-2.5 top-2.5 bg-brand-sage-dark text-white text-[10.5px] font-bold font-mono px-2.5 py-0.5 rounded-full">
                          {p.price}
                        </span>
                      </div>

                      {/* Content Info */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-brand-beige-dark font-mono">
                          <span>ID: {p.id}</span>
                          <span>&bull;</span>
                          <span className="text-amber-500 font-bold">★ {p.rating} ({p.reviewCount || 100})</span>
                        </div>
                        <h3 className="font-serif font-bold text-brand-brown-dark text-sm sm:text-base leading-snug line-clamp-1">
                          {p.title}
                        </h3>
                        <p className="text-[11.5px] text-brand-brown-light line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      {/* Outward Link */}
                      <div className="text-[10px] bg-brand-cream p-2 rounded-lg border border-brand-beige-light/45 font-mono truncate text-brand-beige-dark flex items-center gap-1">
                        <LinkIcon size={11} className="shrink-0 text-brand-brown-light" />
                        <span className="truncate">{p.amazonUrl}</span>
                      </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="bg-brand-cream/40 border-t border-brand-beige-light/45 px-4 py-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide font-bold text-brand-sage-dark font-mono">
                        {(p as any).buttonText || "Buy on Amazon"}
                      </span>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleOpenEditForm(p)}
                          className="p-1.5 hover:bg-white border hover:border-brand-beige-dark bg-white/50 border-brand-beige-light/70 rounded transition-all text-brand-brown-light hover:text-brand-brown-dark cursor-pointer"
                          title="Modify catalog record"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 bg-white/50 hover:bg-red-50 hover:text-red-600 rounded border border-brand-beige-light/70 transition-all cursor-pointer"
                          title="Delete permanently"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-brand-beige-dark italic text-xs">
                  No matching affiliate products found inside the catalog database. Add an item to populate the CMS list.
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-white border border-brand-beige-light rounded-2xl px-4 py-3 flex items-center justify-between select-none">
                <span className="text-[11px] text-brand-beige-dark font-medium">
                  Showing page <strong className="font-semibold text-brand-brown-dark">{currentPage}</strong> of <strong className="font-semibold text-brand-brown-dark">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded border border-brand-beige-light bg-white hover:bg-brand-cream disabled:opacity-40 disabled:hover:bg-white text-brand-brown-light cursor-pointer"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded border border-brand-beige-light bg-white hover:bg-brand-cream disabled:opacity-40 disabled:hover:bg-white text-brand-brown-light cursor-pointer"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Image-bank select modal */}
        {showImageBankSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm select-none">
            <div className="bg-white rounded-3xl border border-brand-beige-light max-w-2xl w-full p-6 space-y-4 shadow-pinterest">
              <div className="flex items-center justify-between border-b pb-3 border-brand-beige-light">
                <h3 className="font-serif text-lg font-bold text-brand-brown-dark">
                  Select Product Lifestyle Image
                </h3>
                <button
                  type="button"
                  onClick={() => setShowImageBankSelector(false)}
                  className="text-xs font-bold text-brand-beige-dark hover:text-brand-brown-dark transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-1 text-center">
                {mediaLibrary.map((url, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      setImage(url);
                      setShowImageBankSelector(false);
                    }}
                    className="group overflow-hidden rounded-xl border border-brand-beige-light cursor-pointer relative aspect-square"
                  >
                    <img 
                      src={url} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                    />
                    <div className="absolute inset-0 bg-brand-brown-dark/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] uppercase font-bold transition-opacity">
                      Select
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-brand-brown-dark/20 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-brand-beige-light shadow-xl p-6 max-w-md w-full space-y-4">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg font-bold font-serif text-brand-brown-dark">
                Delete Shop Product?
              </h3>
              <p className="text-xs text-brand-beige-dark leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-brand-brown-dark font-medium">"{deleteTarget.name}"</strong> from our picks?<br />
                This action cannot be undone and might leave some articles with reference paths unresolved.
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
