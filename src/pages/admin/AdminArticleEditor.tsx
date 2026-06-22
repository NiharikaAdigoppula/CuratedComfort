import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Check, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Image as ImageIcon, 
  Eye, 
  Settings as ConfigIcon, 
  HelpCircle,
  Sparkles,
  Link as LinkIcon,
  Tag,
  AlertCircle,
  Search,
  ShoppingCart
} from "lucide-react";
import { useBlog } from "../../context/BlogContext";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { ArticleBlock, Article } from "../../data/articles";
import SEO from "../../components/SEO";

export default function AdminArticleEditor() {
  const { articles, products, categories, mediaLibrary, createArticle, updateArticle } = useBlog();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get("slug");

  // Editorial states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Home Decor");
  const [tagsInput, setTagsInput] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("Clara Montgomery");
  const [readingTime, setReadingTime] = useState("5 mins read");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  });

  // Dynamic state for blocks
  const [blocks, setBlocks] = useState<ArticleBlock[]>([
    { type: "p", text: "Start writing your organic slow-living journey here..." }
  ]);

  // SEO states
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [pinterestTitle, setPinterestTitle] = useState("");
  const [pinterestDescription, setPinterestDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("draft");

  // Media picker helper state
  const [showMediaPickerTarget, setShowMediaPickerTarget] = useState<{ type: "cover" | "block"; blockIndex?: number } | null>(null);
  
  // Preview modal dynamic state
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Auto-slug sync trigger helper
  const [userEditedSlug, setUserEditedSlug] = useState(false);

  // Load article values if editing
  useEffect(() => {
    if (editSlug) {
      const art = articles.find((a) => a.slug === editSlug);
      if (art) {
        setTitle(art.title);
        setSlug(art.slug);
        setDescription(art.description);
        setCategory(art.category);
        setTagsInput(art.tags.join(", "));
        setCoverImage(art.coverImage);
        setAuthor(art.author);
        setReadingTime(art.readingTime || "5 mins read");
        setBlocks(art.content);
        setStatus((art as any).status || "published");

        // SEO and Pinterest values
        setSeoTitle((art as any).seoTitle || art.title);
        setSeoDescription((art as any).seoDescription || art.description);
        setPinterestTitle((art as any).pinterestTitle || art.title);
        setPinterestDescription((art as any).pinterestDescription || art.description);
        setMetaKeywords((art as any).metaKeywords || art.tags.join(", "));
        setUserEditedSlug(true);
      }
    }
  }, [editSlug, articles]);

  // Handle title to slug derivation on key strokes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!userEditedSlug) {
      const derivedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 50);
      setSlug(derivedSlug);
    }
  };

  // Block management actions
  const addBlock = (type: "p" | "heading" | "quote" | "product-card") => {
    const newBlock: ArticleBlock = { type };
    if (type === "p") newBlock.text = "";
    if (type === "heading") {
      newBlock.text = "";
      newBlock.level = 2;
    }
    if (type === "quote") newBlock.text = "";
    if (type === "product-card") {
      newBlock.productId = products[0]?.id || "";
    }
    setBlocks((prev) => [...prev, newBlock]);
  };

  const removeBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBlockText = (index: number, text: string) => {
    setBlocks((prev) =>
      prev.map((blk, i) => (i === index ? { ...blk, text } : blk))
    );
  };

  const updateHeadingLevel = (index: number, level: number) => {
    setBlocks((prev) =>
      prev.map((blk, i) => (i === index ? { ...blk, level } : blk))
    );
  };

  const updateBlockProductId = (index: number, productId: string) => {
    setBlocks((prev) =>
      prev.map((blk, i) => (i === index ? { ...blk, productId } : blk))
    );
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === blocks.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const reordered = [...blocks];
    const removed = reordered.splice(index, 1)[0];
    reordered.splice(targetIndex, 0, removed);
    setBlocks(reordered);
  };

  // Handle Save
  const handleSave = (forcedStatus?: "published" | "draft") => {
    if (!title.trim()) {
      alert("Please specify a blog Title!");
      return;
    }

    const currentStatus = forcedStatus || status;
    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const coreArticleData = {
      title,
      description,
      category: category as any,
      tags: tagsArray,
      coverImage: coverImage || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      author,
      readingTime: isNaN(Number(readingTime)) ? readingTime : `${readingTime} mins read`,
      date,
      content: blocks,
      status: currentStatus,
      relatedPosts: articles.slice(0, 2).map((a) => a.slug), // default link
      
      // Extension tags
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || description,
      pinterestTitle: pinterestTitle || title,
      pinterestDescription: pinterestDescription || description,
      metaKeywords: metaKeywords || tagsInput
    };

    if (editSlug) {
      // update record
      updateArticle(editSlug, {
        ...coreArticleData,
        slug: slug.trim() || editSlug
      } as any);
      alert(`Journal "${title}" updated successfully!`);
    } else {
      // create record
      const actualSlug = createArticle({
        ...coreArticleData,
      } as any);
      alert(`Journal "${title}" created successfully!`);
    }
    navigate("/admin/articles");
  };

  // Select photo from media photobank
  const handleSelectMedia = (url: string) => {
    if (showMediaPickerTarget) {
      if (showMediaPickerTarget.type === "cover") {
        setCoverImage(url);
      } else if (showMediaPickerTarget.type === "block" && showMediaPickerTarget.blockIndex !== undefined) {
        // Change photo of that block blockIndex
        updateBlockText(showMediaPickerTarget.blockIndex, url);
      }
    }
    setShowMediaPickerTarget(null);
  };

  return (
    <AdminDashboardLayout activeTab="/admin/articles">
      <div className="space-y-6 max-w-5xl" id="cms-editor-workspace">
        <SEO title="Studio Editor" description="Manage typography, embed product links and organize descriptions." />

        {/* Top bar with triggers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-beige-light pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/articles")}
              className="p-2 bg-white hover:bg-brand-cream border border-brand-beige-light hover:border-brand-beige-dark transition-colors rounded-xl text-brand-brown-light cursor-pointer"
            >
              <ArrowLeft size={15} />
            </button>
            <div>
              <span className="text-[9px] uppercase tracking-widest font-bold text-brand-sage-dark font-mono">CAMPUS STUDIO EDITOR</span>
              <h1 className="text-xl font-bold font-serif text-brand-brown-dark leading-tight">
                {editSlug ? "Modify Post Settings" : "Draft New Journal"}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="px-3.5 py-2 hover:bg-brand-cream text-brand-brown-dark border border-brand-beige-light hover:border-brand-beige-dark rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye size={14} />
              <span>Preview Post</span>
            </button>
            <button
              onClick={() => handleSave("draft")}
              className="px-3.5 py-2 bg-white hover:bg-brand-cream text-brand-brown-light border border-brand-beige-medium rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save size={14} />
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => handleSave("published")}
              className="px-4 py-2 bg-brand-sage-dark hover:bg-brand-brown-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check size={14} />
              <span>{status === "published" && editSlug ? "Update Post" : "Publish Post"}</span>
            </button>
          </div>
        </div>

        {/* Primary Form stage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Article fields block */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Header Configurations Card */}
            <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm space-y-4">
              <h2 className="text-xs uppercase tracking-wider font-bold text-brand-brown-light border-b border-brand-beige-light/40 pb-2 flex items-center gap-1.5">
                <Sparkles size={13} className="text-brand-sage-dark" />
                <span>Base Journal Parameters</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                  Journal Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10 Essential Organizers For Cozy Living Windowsills"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full bg-brand-cream/10 p-3 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-sm text-brand-brown-dark font-serif font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light flex items-center gap-1">
                    <span>Slug / URL Path</span>
                    <HelpCircle size={11} className="text-brand-beige-dark cursor-help" title="Web Address of article page" />
                  </label>
                  <input
                    type="text"
                    placeholder="cozy-home-decor-finds"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setUserEditedSlug(true);
                    }}
                    className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                    Category Taxonomy
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                  Short Intro / Excerpt Description
                </label>
                <textarea
                  placeholder="Draft a brief 2-sentence hook displayed in catalogs and headers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                    Author Alias
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                    Reading Duration (e.g. 5 mins read)
                  </label>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                    Publish Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark font-mono"
                  />
                </div>
              </div>

              {/* Cover Image Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light block">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMediaPickerTarget({ type: "cover" })}
                    className="bg-brand-cream px-3 py-2 text-brand-brown-dark border border-brand-beige-light hover:border-brand-beige-dark hover:bg-brand-beige-light/30 text-xs font-semibold rounded-lg flex items-center gap-1 whitespace-nowrap cursor-pointer select-none transition-colors"
                  >
                    <ImageIcon size={14} />
                    <span>Bank Pick</span>
                  </button>
                </div>
                {coverImage && (
                  <div className="relative mt-2">
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-40 rounded-lg object-cover border border-brand-beige-light"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverImage("")}
                      className="absolute right-2 top-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 2. visual Content structural editors */}
            <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-brand-beige-light pb-3">
                <div>
                  <h2 className="font-serif text-lg font-bold text-brand-brown-dark">Visual Page Content Canvas</h2>
                  <p className="text-[11px] text-brand-beige-dark">Order paragraphs, blockquotes, and multiple affiliate links.</p>
                </div>
                <div className="text-[11.5px] bg-brand-sage-light text-brand-sage-dark px-2.5 py-1 rounded-full font-mono font-semibold">
                  {blocks.length} sections
                </div>
              </div>

              {/* Blocks list mapper */}
              <div className="space-y-4">
                {blocks.map((block, index) => (
                  <div 
                    key={index} 
                    className="flex gap-3 bg-brand-cream/20 p-4 rounded-xl border border-brand-beige-light relative group/block"
                  >
                    
                    {/* Control column */}
                    <div className="flex flex-col gap-1.5 text-brand-beige-dark shrink-0">
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "up")}
                        disabled={index === 0}
                        className="hover:text-brand-brown-dark disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronUp size={15} />
                      </button>
                      <span className="text-[9px] font-bold text-center select-none font-mono">
                        #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "down")}
                        disabled={index === blocks.length - 1}
                        className="hover:text-brand-brown-dark disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown size={15} />
                      </button>
                    </div>

                    {/* Content type handler */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest font-extrabold bg-brand-beige-light/60 text-brand-brown-light px-2 py-0.5 rounded">
                          {block.type === "p" && "Paragraph field"}
                          {block.type === "heading" && `Heading H${block.level || 2}`}
                          {block.type === "quote" && "Blockquote card"}
                          {block.type === "product-card" && "Amazon Affiliate Card Slot"}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => removeBlock(index)}
                          className="text-brand-beige-dark hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove block section"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Render inputs based on type */}
                      {block.type === "p" && (
                        <textarea
                          rows={3}
                          value={block.text || ""}
                          onChange={(e) => updateBlockText(index, e.target.value)}
                          placeholder="Compose paragraph details..."
                          className="w-full bg-white p-2 text-xs text-brand-brown-dark border border-brand-beige-light rounded focus:outline-none focus:ring-1 focus:ring-brand-beige-dark leading-relaxed"
                        />
                      )}

                      {block.type === "heading" && (
                        <div className="flex gap-2">
                          <select
                            value={block.level || 2}
                            onChange={(e) => updateHeadingLevel(index, Number(e.target.value))}
                            className="bg-white p-2 border border-brand-beige-light text-xs rounded text-brand-brown-dark"
                          >
                            <option value={2}>Heading H2</option>
                            <option value={3}>Sub-Heading H3</option>
                            <option value={4}>Mini-Heading H4</option>
                          </select>
                          <input
                            type="text"
                            value={block.text || ""}
                            onChange={(e) => updateBlockText(index, e.target.value)}
                            placeholder="Heading text..."
                            className="w-full bg-white p-2 text-xs font-bold text-brand-brown-dark border border-brand-beige-light rounded focus:outline-none focus:ring-1 focus:ring-brand-beige-dark"
                          />
                        </div>
                      )}

                      {block.type === "quote" && (
                        <textarea
                          rows={2}
                          value={block.text || ""}
                          onChange={(e) => updateBlockText(index, e.target.value)}
                          placeholder="Inspirational pullout quote..."
                          className="w-full bg-white p-2 text-xs italic text-brand-brown-dark border border-brand-beige-light rounded focus:outline-none focus:ring-1 focus:ring-brand-beige-dark border-l-2 border-l-brand-sage-dark/60 bg-brand-sage-light/10"
                        />
                      )}

                      {block.type === "product-card" && (
                        <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-brand-beige-light">
                          <label className="text-[9.5px] uppercase tracking-wider font-bold text-brand-brown-light block">Select Target Catalog Product</label>
                          <div className="flex gap-2">
                            <span className="text-brand-beige-dark p-2 shrink-0 bg-brand-cream rounded border border-brand-beige-light">
                              <ShoppingCart size={14} />
                            </span>
                            <select
                              value={block.productId || ""}
                              onChange={(e) => updateBlockProductId(index, e.target.value)}
                              className="w-full bg-white p-1.5 border border-brand-beige-light text-[11.5px] rounded text-brand-brown-dark font-medium"
                            >
                              <option value="" disabled>--- Select Affiliate Product ---</option>
                              {products.map((p) => (
                                <option key={p.id} value={p.id}>
                                  [{p.category}] {p.title} ({p.price})
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {/* Minimal preview block */}
                          {block.productId && (
                            (() => {
                              const p = products.find(x => x.id === block.productId);
                              if (!p) return null;
                              return (
                                <div className="flex gap-2 pt-2 border-t border-brand-beige-light/30 items-center text-[10.5px]">
                                  <img src={p.image} referrerPolicy="no-referrer" alt="" className="w-8 h-8 rounded object-cover" />
                                  <div className="truncate">
                                    <strong className="text-brand-brown-dark block truncate max-w-[320px]">{p.title}</strong>
                                    <span className="text-brand-sage-dark font-bold font-mono">{p.price}</span>
                                  </div>
                                </div>
                              );
                            })()
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                ))}
              </div>

              {/* Add triggers bar */}
              <div className="border-t border-brand-beige-light/40 pt-4 flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => addBlock("p")}
                  className="bg-brand-cream/80 hover:bg-brand-cream px-3 py-2 text-brand-brown-dark border border-brand-beige-light hover:border-brand-beige-dark text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={13} />
                  <span>+ Paragraph</span>
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("heading")}
                  className="bg-brand-cream/80 hover:bg-brand-cream px-3 py-2 text-brand-brown-dark border border-brand-beige-light hover:border-brand-beige-dark text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={13} />
                  <span>+ Heading</span>
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("quote")}
                  className="bg-brand-cream/80 hover:bg-brand-cream px-3 py-2 text-brand-brown-dark border border-brand-beige-light hover:border-brand-beige-dark text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={13} />
                  <span>+ Blockquote</span>
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("product-card")}
                  className="bg-brand-sage-light text-brand-sage-dark border border-brand-sage-medium hover:border-brand-sage-dark px-3.5 py-2 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={13} />
                  <span>Embed Affiliate Product</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right sidebar settings panel (SEO & Tags) */}
          <div className="space-y-6">
            
            {/* 3. Taxonomy settings panel */}
            <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm space-y-4">
              <h2 className="text-xs uppercase tracking-wider font-bold text-brand-brown-light border-b border-brand-beige-light/40 pb-2 flex items-center gap-1.5">
                <Tag size={13} />
                <span>Taxonomy and Tags</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                  Tags (Separated by commas)
                </label>
                <textarea
                  placeholder="Warm Minimalist, Budget Ideas, Cozy Vibe..."
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  rows={2}
                  className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark leading-relaxed"
                />
                <p className="text-[10px] text-brand-beige-dark italic">
                  Matched against SEO keywords index automatically.
                </p>
              </div>
            </div>

            {/* 4. Complete SEO suite */}
            <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm space-y-4">
              <h2 className="text-xs uppercase tracking-wider font-bold text-brand-brown-light border-b border-brand-beige-light/40 pb-2 flex items-center gap-1.5">
                <ConfigIcon size={13} />
                <span>Google Search Engine Suite</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                  SEO Title
                </label>
                <input
                  type="text"
                  placeholder={title || "Custom Search Result Header"}
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                  SEO Meta Description
                </label>
                <textarea
                  placeholder="Aesthetic summaries displayed to Google search engines when crawling indices..."
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                  Search Keywords (Meta)
                </label>
                <input
                  type="text"
                  placeholder={tagsInput || "kitchen, cups, amazon"}
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark"
                />
              </div>
            </div>

            {/* 5. Pinterest custom specifications */}
            <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm space-y-4">
              <h2 className="text-xs uppercase tracking-wider font-bold text-[#BD081C] border-b border-brand-beige-light/40 pb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#BD081C] rounded-full inline-block" />
                <span>Pinterest Rich Pin Metadata</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                  Pinterest Pin Header
                </label>
                <input
                  type="text"
                  placeholder={title || "Save to Comfort Ideas Board"}
                  value={pinterestTitle}
                  onChange={(e) => setPinterestTitle(e.target.value)}
                  className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">
                  Pinterest Board Description
                </label>
                <textarea
                  placeholder="Pin description capturing aesthetic context, ideal for organic save counts."
                  value={pinterestDescription}
                  onChange={(e) => setPinterestDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-brand-cream/10 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs text-brand-brown-dark leading-relaxed"
                />
              </div>
            </div>

          </div>

        </div>

        {/* --- Media Photobank Select Widget Modal --- */}
        {showMediaPickerTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm select-none">
            <div className="bg-white rounded-3xl border border-brand-beige-light max-w-2xl w-full p-6 space-y-4 shadow-pinterest">
              <div className="flex items-center justify-between border-b pb-3 border-brand-beige-light">
                <h3 className="font-serif text-lg font-bold text-brand-brown-dark">
                  Select Curated Lifestyle Image
                </h3>
                <button
                  onClick={() => setShowMediaPickerTarget(null)}
                  className="text-brand-beige-dark hover:text-brand-brown-dark transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-1">
                {mediaLibrary.map((url, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleSelectMedia(url)}
                    className="group overflow-hidden rounded-xl border border-brand-beige-light cursor-pointer relative aspect-square"
                  >
                    <img 
                      src={url} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                    />
                    <div className="absolute inset-0 bg-brand-brown-dark/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] uppercase font-bold transition-opacity">
                      Use Photo
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- LIVE INTERACTIVE PREVIEW DRAWER DRAWERMODAL --- */}
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-sm">
            <div className="w-full max-w-3xl h-full bg-brand-cream overflow-y-auto p-6 shadow-2xl relative flex flex-col justify-between">
              
              {/* Floating controls bar */}
              <div className="sticky top-0 bg-brand-cream/90 backdrop-blur-md pb-4 border-b border-brand-beige-light flex items-center justify-between z-20">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-sage-dark font-mono block">LIVE COMPOSER PREVIEW</span>
                  <h3 className="font-serif text-lg font-extrabold text-brand-brown-dark">
                    {title || "Untitled Slow Review"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="bg-brand-brown-dark text-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all hover:bg-black p-1 shrink-0"
                >
                  Exit Preview
                </button>
              </div>

              {/* Preview Body */}
              <div className="flex-1 py-8 space-y-6">
                
                {/* Meta details */}
                <div className="space-y-3">
                  <span className="inline-block bg-brand-sage-light text-brand-sage-dark font-semibold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                    {category}
                  </span>
                  <p className="text-[11.5px] text-brand-beige-dark font-mono">
                    By {author} &bull; {readingTime} &bull; {date}
                  </p>
                </div>

                {/* Excerpt */}
                {description && (
                  <p className="font-serif text-lg text-brand-brown-light border-l-2 border-brand-beige-dark pl-4 italic leading-relaxed">
                    {description}
                  </p>
                )}

                {/* Cover visual representation */}
                {coverImage ? (
                  <img
                    src={coverImage}
                    referrerPolicy="no-referrer"
                    alt=""
                    className="w-full h-80 rounded-2xl object-cover border border-brand-beige-medium shadow-sm"
                  />
                ) : (
                  <div className="w-full h-40 bg-brand-beige-light rounded-2xl flex items-center justify-center text-brand-beige-dark text-xs italic">
                    [No cover image assigned yet]
                  </div>
                )}

                {/* Blocks compiler view */}
                <div className="space-y-6 text-brand-brown-dark leading-relaxed font-sans text-sm">
                  {blocks.map((b, i) => {
                    if (b.type === "p") {
                      return <p key={i} className="whitespace-pre-line leading-relaxed">{b.text || "..."}</p>;
                    }
                    if (b.type === "heading") {
                      const Tag = `h${b.level || 2}` as any;
                      return (
                        <Tag key={i} className="font-serif font-bold text-brand-brown-dark mt-6 tracking-tight text-lg sm:text-xl">
                          {b.text || "..."}
                        </Tag>
                      );
                    }
                    if (b.type === "quote") {
                      return (
                        <blockquote key={i} className="bg-brand-sage-light/20 border-l-2 border-brand-sage-dark p-4 my-4 italic text-brand-brown-light text-sm sm:text-[15px] rounded-r-xl">
                          &ldquo;{b.text}&rdquo;
                        </blockquote>
                      );
                    }
                    if (b.type === "product-card") {
                      const p = products.find(x => x.id === b.productId);
                      if (!p) {
                        return (
                          <div key={i} className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                            Affiliate space reserved: Product with ID "{b.productId}" not found.
                          </div>
                        );
                      }
                      return (
                        <div key={i} className="bg-white border border-brand-beige-light p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-5 items-center my-6 select-none">
                          <img
                            src={p.image}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-brand-beige-light bg-brand-cream"
                          />
                          <div className="flex-1 space-y-2 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-1">
                              <span className="text-[10px] uppercase font-bold text-brand-beige-dark tracking-wide">{p.category}</span>
                              <span className="text-brand-beige-dark">&bull;</span>
                              <span className="text-amber-500 font-bold font-mono text-xs font-serif italic">★ {p.rating} review</span>
                            </div>
                            <h4 className="font-serif font-bold text-brand-brown-dark text-[15px]">{p.title}</h4>
                            <p className="text-[11.5px] text-brand-brown-light leading-relaxed">{p.description}</p>
                            
                            <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                              <span className="text-base font-extrabold font-serif text-brand-sage-dark">{p.price}</span>
                              <a
                                href={p.amazonUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-brand-brown-light hover:bg-brand-brown-dark text-white px-4 py-1.5 rounded-full text-[10.5px] uppercase font-bold tracking-wider transition-colors inline-block"
                              >
                                Buy on Amazon
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* FTC Disclosure Preview box */}
                <div className="bg-brand-cream/80 border border-brand-beige-medium/60 p-4 rounded-xl text-[10px] text-brand-beige-dark leading-relaxed">
                  <strong>Partner Disclosure:</strong> This review incorporates handpicked affiliate links. Purchases made support our slow publication without added cost.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminDashboardLayout>
  );
}
