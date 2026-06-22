import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles, Scale, Info } from "lucide-react";
import SEO from "../components/SEO";

export default function AffiliateDisclosure() {
  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 md:px-8 font-sans" id="affiliate-disclosure-page">
      <SEO
        title="Affiliate Transparency & Ethics"
        description="Our transparent statement regarding our Amazon Associates partnership and how we maintain complete review neutrality."
        slug="affiliate-disclosure"
      />

      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-brand-beige-light p-6 md:p-10 shadow-pinterest">
        {/* Header */}
        <div className="flex items-center gap-3.5 border-b border-brand-beige-light pb-6 mb-8">
          <div className="w-10 h-10 bg-brand-sage-light text-brand-sage-dark rounded-full flex items-center justify-center border border-brand-sage-medium/30">
            <Scale size={18} />
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown-dark">
              Affiliate Disclosure
            </h1>
            <span className="text-[10px] text-brand-beige-dark uppercase tracking-widest font-bold">
              EST. 2026 • REGULATORY FTC COMPLIANCE
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-sm text-brand-brown-light leading-relaxed">
          <p>
            In the spirit of complete transparency, and in full compliance with the Federal Trade Commission (FTC) guidelines, we ask you to read this brief statement regarding our funding model.
          </p>

          <div className="bg-brand-sage-light/35 border border-brand-sage-medium/40 p-4 rounded-2xl flex items-start gap-3 my-6 text-brand-brown-dark">
            <Info size={16} className="text-brand-sage-dark shrink-0 mt-0.5" />
            <p className="text-xs">
              <strong>Official Amazon Declaration:</strong> Curated Comfort is a participant in the Amazon Services LLC Associates Program, and the Amazon India Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in, Amazon.com, or Amazon.co.uk.
            </p>
          </div>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            How This Affects You
          </h2>
          <p>
            When you click an outbound link on our pages linking to an Amazon homeware product, design accessory, or wardrobe item, and make a purchase within 24 hours, Amazon offsets a small percentage of that sale back to us as a referral commission.
          </p>
          <p>
            This transaction happens <strong>entirely at zero extra cost to you.</strong> The product pricing, checkout processes, and speed of delivery remain completely identical whether you click our links or navigate to Amazon independently.
          </p>

          <h2 className="font-serif text-lg font-bold text-brand-brown-dark mt-6">
            Our Promise of Review Neutrality
          </h2>
          <p>
            Many affiliate websites run on bulk "AI content generators" listing hundreds of generic products just to collect clicks. At Curated Comfort, we despise that approach. Our promise is simple:
          </p>

          <ul className="space-y-3 pl-4">
            <li className="flex items-start gap-2 text-xs">
              <span className="text-brand-sage-dark text-lg select-none leading-none">•</span>
              <span><strong>Sample Testing:</strong> We analyze product dimension layouts, evaluate raw material lists (no cheap synthetic laminations), and map items in cohesive desk pairings before publishing recommendations.</span>
            </li>
            <li className="flex items-start gap-2 text-xs">
              <span className="text-brand-sage-dark text-lg select-none leading-none">•</span>
              <span><strong>Negative Review Analysis:</strong> If a product is beautiful but snaps easily according to real customer feedback files, we highlight that limit or omit it entirely from our directories.</span>
            </li>
            <li className="flex items-start gap-2 text-xs">
              <span className="text-brand-sage-dark text-lg select-none leading-none">•</span>
              <span><strong>No Paid 5-Star Ratings:</strong> We do not accept sponsorship cash from Amazon brands in exchange for artificial praise. Our reviews are completely independent of external merchant influence.</span>
            </li>
          </ul>

          <p className="pt-4">
            We are deeply grateful when you read and purchase through our site. It allows our editors to continue sifting, writing, and designing without plastering our clean minimalist pages with annoying pop-up banner advertisements.
          </p>
        </div>

        {/* Home option */}
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
