import React, { useState } from "react";
import { Image, Plus, Link as LinkIcon, Trash2, Clipboard, CheckCircle2, Sparkles } from "lucide-react";
import { useBlog } from "../../context/BlogContext";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminMedia() {
  const { mediaLibrary, addMediaUrl, deleteMediaUrl } = useBlog();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newImageUrl.trim();
    if (!trimmed) return;

    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      setAlertMessage("Please specify a valid web URL starting with HTTP or HTTPS!");
      return;
    }

    addMediaUrl(trimmed);
    setNewImageUrl("");
    setAlertMessage("New aesthetic illustration annexed to media photobank!");
  };

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

  const handleDelete = (url: string) => {
    setDeleteTarget(url);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteMediaUrl(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <AdminDashboardLayout activeTab="/admin/media">
      <div className="space-y-6" id="cms-media-library">
        
        {/* Title details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold font-serif text-brand-brown-dark font-sans">
              Media Asset Bank ({mediaLibrary.length})
            </h1>
            <p className="text-xs text-brand-beige-dark">
              Store, copy, and reference handpicked premium neutral lifestyle snapshots to crop, insert, or set as cover images.
            </p>
          </div>
        </div>

        {alertMessage && (
          <div className="bg-brand-sage-light/40 border border-brand-sage-medium/30 p-3.5 rounded-xl text-xs text-brand-sage-dark flex justify-between items-center max-w-xl">
            <span>{alertMessage}</span>
            <button 
              onClick={() => setAlertMessage(null)} 
              className="text-brand-brown-light hover:text-brand-brown-dark font-bold text-xs px-2 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* Form add and list grid */}
        <div className="space-y-6">
          
          {/* Add visual block */}
          <div className="bg-white p-5 rounded-2xl border border-brand-beige-light shadow-sm max-w-xl">
            <h2 className="text-[10.5px] uppercase font-bold text-brand-brown-light tracking-wider flex items-center gap-1 mb-3">
              <Plus size={13} className="text-brand-sage-dark" />
              <span>Annex External Stock Image url</span>
            </h2>

            <form onSubmit={handleAdd} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full bg-brand-cream/25 p-2 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs font-mono text-brand-brown-dark"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-brown-light hover:bg-brand-brown-dark text-brand-cream font-bold rounded-lg text-xs tracking-wide uppercase transition-colors shrink-0 cursor-pointer"
              >
                Annex Link
              </button>
            </form>
          </div>

          {/* Media photobank card list */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mediaLibrary.map((url, index) => {
              const isCopied = copiedIndex === index;
              return (
                <div key={index} className="bg-white rounded-2xl border border-brand-beige-light shadow-sm overflow-hidden flex flex-col justify-between group relative">
                  
                  {/* Photo area */}
                  <div className="aspect-square bg-brand-cream overflow-hidden border-b relative">
                    <img
                      src={url}
                      referrerPolicy="no-referrer"
                      alt=""
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />

                    {/* Copy URL trigger overlay */}
                    <div className="absolute inset-0 bg-brand-brown-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                      <button
                        onClick={() => handleCopyLink(url, index)}
                        className="bg-white/95 text-brand-brown-dark hover:bg-white text-[10.5px] uppercase tracking-wider font-bold py-2 px-3 rounded-xl flex items-center gap-1 shadow-sm transition-all scale-95 group-hover:scale-100 cursor-pointer"
                      >
                        {isCopied ? <CheckCircle2 size={13} className="text-emerald-600" /> : <Clipboard size={13} />}
                        <span>{isCopied ? "Copied" : "Copy asset URL"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Description footer detail with delete option */}
                  <div className="px-3.5 py-2.5 bg-brand-cream/40 flex items-center justify-between text-[10.5px]">
                    <span className="text-brand-beige-dark font-mono truncate max-w-[120px]" title={url}>
                      {url.split('/').pop()?.slice(0, 20) || "external-resource"}
                    </span>
                    
                    <button
                      onClick={() => handleDelete(url)}
                      className="p-1 hover:text-red-600 text-brand-beige-dark transition-colors cursor-pointer"
                      title="Delete asset link"
                    >
                      <Trash2 size={13} className="shrink-0" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-brand-brown-dark/20 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-brand-beige-light shadow-xl p-6 max-w-md w-full space-y-4">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg font-bold font-serif text-brand-brown-dark">
                Delete Media Asset?
              </h3>
              <p className="text-xs text-brand-beige-dark leading-relaxed">
                Are you sure you want to dismiss this asset from the CMS Photobank?<br />
                This action only deletes the shortcut inside the library panel, but does not delete files hosted on external servers.
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
