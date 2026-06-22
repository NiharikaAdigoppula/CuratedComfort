import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import SEO from "../components/SEO";

export default function TermsAndConditions() {
  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 md:px-8 font-sans" id="terms-conditions-page">
      <SEO
        title="Terms & General Conditions"
        description="General terms and platform conditions governing the digital reading catalog of Curated Comfort."
        slug="terms-and-conditions"
      />

      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-brand-beige-light p-6 md:p-10 shadow-pinterest">
        {/* Header */}
        <div className="flex items-center gap-3.5 border-b border-brand-beige-light pb-6 mb-8">
          <div className="w-10 h-10 bg-brand-sage-light text-brand-sage-dark rounded-full flex items-center justify-center border border-brand-sage-medium/30">
            <BookOpen size={18} />
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown-dark">
              Terms & Conditions
            </h1>
            <span className="text-[10px] text-brand-beige-dark uppercase tracking-widest font-bold">
              Last updated: June 22, 2026
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-sm text-brand-brown-light leading-relaxed">
          <p>
            Welcome to <strong>Curated Comfort</strong>. By continuing to register, browse, or operate this website, you verify your adherence to the terms and platform guidelines detailed below.
          </p>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            1. Intellectual Property protection
          </h2>
          <p>
            All text content, journal structures, structured databases, design guides, brand color schemes, and log formats on Curated Comfort are owned by our publishing studio. You may print parts for purely residential personal planning. Scouring, copying, or mirroring entire logs or product review lists onto secondary commercial blogs without our signed permission is strictly illegal.
          </p>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            2. Purchase Liability disclaimer
          </h2>
          <p>
            Curated Comfort is an independent editorial adviser. While we make every attempt to ensure rating percentages and price points match current entries, <strong>Amazon reserves sole right to shift stock availability and final sale pricing immediately.</strong> We are not responsible for delivery hurdles, processing delays, or product defects originating from transactions conducted on Amazon sites.
          </p>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            3. Disclaimer of Sincere Intent
          </h2>
          <p>
            Our guides are formulated to aid home organizers and creatives with design ideas. We do not provide physical construction engineering consultations. Always consult professional general contractors when drilling heavy shelving arrays or building massive bedroom dividers.
          </p>
        </div>

        {/* Back and Home actions */}
        <div className="flex border-t border-brand-beige-light mt-10 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-brand-brown-light hover:text-brand-brown-dark font-semibold group"
          >
            <ArrowLeft size={13} className="transition-transform duration-300 group-hover:translate-x-[-2px]" />
            <span>Return to Frontpage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
