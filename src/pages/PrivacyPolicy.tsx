import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 md:px-8 font-sans" id="privacy-policy-page">
      <SEO
        title="Privacy Guidelines"
        description="Our simple and clear privacy declarations regarding cookies, newsletter records, and consumer rights."
        slug="privacy-policy"
      />

      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-brand-beige-light p-6 md:p-10 shadow-pinterest">
        {/* Header */}
        <div className="flex items-center gap-3.5 border-b border-brand-beige-light pb-6 mb-8">
          <div className="w-10 h-10 bg-brand-sage-light text-brand-sage-dark rounded-full flex items-center justify-center border border-brand-sage-medium/30">
            <Shield size={18} />
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown-dark">
              Privacy Policy & Cookies
            </h1>
            <span className="text-[10px] text-brand-beige-dark uppercase tracking-widest font-bold">
              Last updated: June 22, 2026
            </span>
          </div>
        </div>

        {/* content body */}
        <div className="space-y-6 text-sm text-brand-brown-light leading-relaxed">
          <p>
            At <strong>Curated Comfort</strong>, we value the trust you place in our lifestyle curations. This document outlines the straightforward practices we employ regarding visitor information.
          </p>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            1. Newsletter Declarations
          </h2>
          <p>
            When you subscribe to our Curated Comfort email packet, we ask solely for your email address. This contact info is treated with complete security and is used exclusively to send you our Sunday curations. We never sell, distribute, or rent our email records to third-party advertisers. You may opt-out at any time via the "unsubscribe" link inside every broadcast.
          </p>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            2. Amazon Associates Cookies
          </h2>
          <p>
            Curated Comfort contains outbound affiliate links pointing to Amazon.in / Amazon.com. When you click these links, Amazon places a temporary tracking cookie inside your browser (for a standard 24-hour duration) to attribute qualify sales. This cookie does not transmit any identifiable personal information.
          </p>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            3. Web Analytics
          </h2>
          <p>
            To evaluate organic traffic, we monitor high-level parameters like page views, bounce rates, and browser types utilizing non-personal tracking scripts. This metadata helps us evaluate what styling guides readers favor, helping us mold better future curations.
          </p>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            4. Consent & Right to Erasure
          </h2>
          <p>
            By navigating this website, you consent to our simple cookie policies. If you wish to have your newsletter history permanently deleted from our records, please shoot an email to <a href="mailto:privacy@curatedcomfort.com" className="underline hover:text-brand-brown-dark font-medium">privacy@curatedcomfort.com</a>.
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
