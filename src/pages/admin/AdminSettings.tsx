import React, { useState } from "react";
import { Settings as ConfigIcon, Save, HelpCircle, Check, Sparkles } from "lucide-react";
import { useBlog } from "../../context/BlogContext";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminSettings() {
  const { settings, updateSettings } = useBlog();

  // Form states prefilled
  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteDescription, setSiteDescription] = useState(settings.siteDescription);
  const [amazonTag, setAmazonTag] = useState(settings.amazonTag);
  const [ftcDisclosure, setFtcDisclosure] = useState(settings.ftcDisclosure);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl || "");
  const [pinterestUrl, setPinterestUrl] = useState(settings.pinterestUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings({
      siteName,
      siteDescription,
      amazonTag,
      ftcDisclosure,
      instagramUrl,
      pinterestUrl
    });

    alert("CMS Global Configurations saved successfully!");
  };

  return (
    <AdminDashboardLayout activeTab="/admin/settings">
      <div className="space-y-6 max-w-3xl" id="cms-configuration-stage">
        
        {/* Banner header info */}
        <div>
          <h1 className="text-xl font-bold font-serif text-brand-brown-dark font-sans">
            Global Settings & Configs
          </h1>
          <p className="text-xs text-brand-beige-dark">
            Alter tracking anchors, legislative legal disclaimers, metadata descriptions, and brand typography.
          </p>
        </div>

        {/* Configurations Form */}
        <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            
            {/* BRAND */}
            <div className="space-y-4">
              <h2 className="text-[10.5px] uppercase tracking-wider font-extrabold text-brand-brown-light border-b pb-2 border-brand-beige-light/40 flex items-center gap-1">
                <Sparkles size={13} className="text-brand-sage-dark" />
                <span>Branding details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Brand Platform Name</label>
                  <input
                    type="text"
                    required
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full bg-brand-cream/25 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none focus:ring-1 focus:ring-brand-beige-dark text-xs sm:text-xs text-brand-brown-dark font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light flex items-center gap-1">
                    <span>Amazon Associate tracking tag</span>
                    <HelpCircle size={11} className="text-brand-beige-dark cursor-help" title="Configures tracking links on products dynamically" />
                  </label>
                  <input
                    type="text"
                    required
                    value={amazonTag}
                    onChange={(e) => setAmazonTag(e.target.value)}
                    className="w-full bg-brand-cream/25 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none font-mono text-brand-[13px] text-brand-brown-dark font-bold"
                  />
                  <p className="text-[10px] text-brand-beige-dark italic">
                    Stitched automatically to Amazon coordinates: <code className="bg-brand-cream px-1 rounded">?tag=your-tag</code>
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Google SEO Search Description</label>
                <textarea
                  required
                  rows={2}
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  className="w-full bg-brand-cream/25 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-xs leading-relaxed text-brand-brown-dark"
                />
              </div>
            </div>

            {/* LEGISLATION */}
            <div className="space-y-4 pt-2">
              <h2 className="text-[10.5px] uppercase tracking-wider font-extrabold text-brand-brown-light border-b pb-2 border-brand-beige-light/40 flex items-center gap-1">
                <span>FTC Partner Disclosure Warning</span>
              </h2>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">FTC Disclosure Block text Displayed to Readers</label>
                <textarea
                  required
                  rows={4}
                  value={ftcDisclosure}
                  onChange={(e) => setFtcDisclosure(e.target.value)}
                  className="w-full bg-brand-cream/25 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-xs leading-relaxed text-brand-brown-dark text-justify"
                />
                <p className="text-[10px] text-brand-beige-dark italic">
                  Legally mandated under Section 5 to notify visitors that you earn referral commissions.
                </p>
              </div>
            </div>

            {/* CHANNELS */}
            <div className="space-y-4 pt-2">
              <h2 className="text-[10.5px] uppercase tracking-wider font-extrabold text-brand-brown-light border-b pb-2 border-brand-beige-light/40 flex items-center gap-1">
                <span>Social Media Channels Coordinates</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Instagram URL Handle</label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full bg-brand-cream/25 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-brand-brown-light">Pinterest URL Board Link</label>
                  <input
                    type="url"
                    value={pinterestUrl}
                    onChange={(e) => setPinterestUrl(e.target.value)}
                    placeholder="https://pinterest.com/..."
                    className="w-full bg-brand-cream/25 p-2.5 rounded-lg border border-brand-beige-light focus:outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-brand-beige-light/40 flex justify-end">
              <button
                type="submit"
                className="bg-brand-sage-dark hover:bg-brand-brown-dark text-white px-5 py-3 rounded-lg flex items-center gap-1 font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer"
              >
                <Save size={13} />
                <span>Apply and Save Configurations</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminDashboardLayout>
  );
}
