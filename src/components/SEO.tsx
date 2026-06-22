import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  slug?: string;
  articleData?: {
    publishedTime: string;
    author: string;
    category: string;
    tags: string[];
  };
}

export default function SEO({
  title,
  description,
  image = "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
  type = "website",
  slug = "",
  articleData
}: SEOProps) {
  const brandName = "Curated Comfort";
  const fullTitle = `${title} | ${brandName}`;
  const siteUrl = window.location.origin;
  const canonicalUrl = `${siteUrl}/${slug}`;

  useEffect(() => {
    // 1. Dynamic document title
    document.title = fullTitle;

    // 2. Helper function to set or create meta tags
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.head.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentVal);
    };

    // 3. standard meta tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", "index, follow");

    // 4. Open Graph Meta Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:site_name", brandName);

    // 5. Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    // 6. Canonical link tag management
    let canonicalLink = document.head.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 7. Inject JSON-LD Structured Data
    const oldSchema = document.getElementById("cc-structured-data-schema");
    if (oldSchema) {
      oldSchema.remove();
    }

    const schemas = [];

    // Organization Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": brandName,
      "url": siteUrl,
      "logo": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=200",
      "description": "A premium lifestyle magazine and handpicked Amazon affiliate recommendation center.",
      "sameAs": [
        "https://pinterest.com/curatedcomfort",
        "https://instagram.com/curatedcomfort"
      ]
    });

    // BreadcrumbList Schema
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      }
    ];

    if (slug) {
      const parts = slug.split("/").filter(Boolean);
      parts.reduce((acc, part, index) => {
        const currentPath = `${siteUrl}/${acc}${part}`;
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
          "item": currentPath
        });
        return `${acc}${part}/`;
      }, "");
    }

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    });

    // Article Specific Schema
    if (type === "article" && articleData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "headline": title,
        "description": description,
        "image": [image],
        "datePublished": articleData.publishedTime,
        "dateModified": articleData.publishedTime,
        "author": {
          "@type": "Person",
          "name": articleData.author
        },
        "publisher": {
          "@type": "Organization",
          "name": brandName,
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=200"
          }
        },
        "articleSection": articleData.category,
        "keywords": articleData.tags.join(", ")
      });
    }

    const script = document.createElement("script");
    script.id = "cc-structured-data-schema";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      // Clean up dynamic structured scripts on unmount to prevent piling up
      const currentSchema = document.getElementById("cc-structured-data-schema");
      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, [title, description, image, type, slug, articleData, fullTitle, canonicalUrl, siteUrl]);

  return null; // Side effect component
}
