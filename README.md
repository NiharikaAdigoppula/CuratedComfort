# Curated Comfort 

> A premium, slow-living digital magazine and handpicked Amazon affiliate product edit. Highly responsive, Pinterest-inspired, and designed with elegant typography, warm earthy tones, and fluid UI animations.

Curated Comfort helps users discover cozy home decor, silent study desks, organic kitchen utensils, tidy storage solutions, flax linen capsules, and budget-friendly housewarming guides.

---

## 🎨 Visual Identity & Styling Vibe

- **Aesthetic Inspiration**: Pinterest pins grid, IKEA catalogs, Studio McGee design notes.
- **Palette**: Warm cream background, clean beige divisions, sage green accents, and rich earthy charcoal browns.
- **Typography Pairing**: *Playfair Display* (Editorial headings) + *Poppins* (Modern, highly legible sans-serif for UI structure & content).
- **Transitions & Micro-interactions**: Smooth card lifts, seamless mobile sliding drawers, and animated form feedback backed by **Framer Motion**.

---

## 🛠️ Technical Specifications

- **Front-End Core**: React 19, Vite (v6), React Router DOM (v6)
- **Styling Core**: Tailwind CSS (v4)
- **Icon Set**: Lucide React
- **Animation Framework**: motion (Framer Motion v12)
- **Crawlability & SEO**:
  - Semantic HTML landmarks (`<header>`, `<main>`, `<article>`, `<footer>`)
  - Dynamic `<SEO>` component manipulating document titles, OG Graph cards, and Twitter Cards at runtime
  - High-precision XML `sitemap.xml` and crawler-direct `robots.txt`
  - Automated **JSON-LD Schema** injection including Organization schema, Breadcrumb networks, and NewsArticle metadata.

---

## 📂 Project Architecture

```bash
├── public/                       # Static resource distributions
│   ├── sitemap.xml               # Standard crawlable URL schema
│   └── robots.txt                # Search index accessibility declarations
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Aesthetic menu & drop shadow scroll bar
│   │   ├── Footer.tsx            # Rich charcoal footer holding legals & credits
│   │   ├── ArticleCard.tsx       # Pinterest visual card with scale actions
│   │   ├── ProductCard.tsx       # High conversion affiliate card with disclosures
│   │   ├── SEO.tsx               # Dynamic metadata & JSON-LD schema builder
│   │   └── Newsletter.tsx        # Dynamic form validations & success animations
│   │
│   ├── data/
│   │   ├── products.ts           # Central affiliate product database
│   │   └── articles.ts           # 20 rich, realistic lifestyle articles
│   │
│   ├── pages/
│   │   ├── Home.tsx              # Large Hero with integrated search & grids
│   │   ├── About.tsx             # Design philosophy, crew, integrity pledges
│   │   ├── Categories.tsx        # Dynamic category indexing grid
│   │   ├── CategoryView.tsx      # Specialized category filters
│   │   ├── ArticlePage.tsx       # Block-by-block article reader with related posts
│   │   ├── Search.tsx            # Live text query across tags, categories, & titles
│   │   ├── Contact.tsx           # Contact form with validation & delivery states
│   │   ├── PrivacyPolicy.tsx     # Amazon cookie declarations
│   │   ├── AffiliateDisclosure.tsx # Regulatory partner disclosure statements
│   │   ├── TermsAndConditions.tsx  # intellectual property & limit clauses
│   │   └── NotFound.tsx          # Concept wabi-sabi page broken cup graphic
│   │
│   ├── App.tsx                   # Master routing and scroll behavior
│   ├── index.css                 # Custom font bundles and design coordinates
│   └── main.tsx                  # Strict React bundle root
├── package.json                  # Integrated compilation script blocks
└── tsconfig.json                 # Type safety enforcement targets
```

---

## 🛒 Configuration of Affiliate Associate Tags

Customizing affiliate credentials across all products is completely localized inside one central file. Navigate to `src/data/products.ts` and modify the global associate tracking ID string:

```javascript
// src/data/products.ts
export const AMAZON_TAG = "your-custom-associate-tag-21";
```

All 15+ pre-loaded high-conversion product cards (e.g. apothecary amber jars, French flax linens) will dynamically bind your tracking tags across their outbound buttons!

---

## 🚀 Step-by-Step Deployment Guide for Render

Render represents an outstanding platform to deploy this curated magazine completely free of cost! Follow these precise steps:

### 1. Push Code base to GitHub
Initialize your Git repository, commit files, and host on your GitHub account:
```bash
git init
git add .
git commit -m "feat: initialise Curated Comfort client SPA"
git branch -M main
git remote add origin https://github.com/your-username/curated-comfort.git
git push -u origin main
```

### 2. Configure on Render Dashboard
1. Open the [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Static Site**.
3. Link your GitHub profile and select the `curated-comfort` repository.
4. Input the following configuration settings:
   - **Name**: `curated-comfort`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Create Static Site**.

### 3. Handle Client-Side Routing Fallbacks (Crucial for SPA)
Because React Router DOM leverages client-side routing, clicking refresh on a child page (e.g. `/categories/workspace`) can trigger a browser-level 404 on static hosts unless redirected to standard `index.html`. 

On Render, configure this easily:
1. In your static site dashboard, select **Redirects/Rewrites**.
2. Click **Add Rule**.
3. Input the redirect guidelines:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite` (Status Code: `200`)
   - **Click Save**.

Your luxury lifestyle portal is now live, blazing-fast, and indexable by Google Search console!
