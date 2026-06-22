import React, { createContext, useContext, useState, useEffect } from "react";
import { Article, ArticleBlock, articles as initialArticles } from "../data/articles";
import { Product, products as initialProducts, AMAZON_TAG as initialAmazonTag } from "../data/products";
import { db, OperationType, handleFirestoreError } from "../lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

export interface Settings {
  siteName: string;
  siteDescription: string;
  amazonTag: string;
  ftcDisclosure: string;
  instagramUrl: string;
  pinterestUrl: string;
}

export type UserRole = "Admin" | "Visitor";

export interface User {
  username: string;
  role: UserRole;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  type: "page_view" | "product_click" | "affiliate_outbound" | "newsletter";
  articleSlug?: string;
  productId?: string;
}

interface BlogContextProps {
  articles: Article[];
  products: Product[];
  categories: string[];
  settings: Settings;
  currentUser: User | null;
  analytics: AnalyticsEvent[];
  mediaLibrary: string[];
  
  // Auth actions
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updatePassword: (oldPw: string, newPw: string) => boolean;
  
  // Article Actions
  createArticle: (article: Omit<Article, "slug">) => string;
  updateArticle: (slug: string, updatedFields: Partial<Article>) => boolean;
  deleteArticle: (slug: string) => void;
  
  // Product actions
  createProduct: (product: Omit<Product, "id">) => string;
  updateProduct: (id: string, updatedFields: Partial<Product>) => boolean;
  deleteProduct: (id: string) => void;
  
  // Category actions
  createCategory: (categoryName: string) => void;
  deleteCategory: (categoryName: string) => void;

  // Media actions
  addMediaUrl: (url: string) => void;
  deleteMediaUrl: (url: string) => void;

  // Settings Actions
  updateSettings: (newSettings: Settings) => void;
  
  // Tracking
  trackEvent: (type: AnalyticsEvent["type"], articleSlug?: string, productId?: string) => void;
  clearAnalytics: () => void;
  resetDatabase: () => void;
}

const BlogContext = createContext<BlogContextProps | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  // Try to load state from localStorage or load initial static seeds
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("cc_articles");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse articles", e);
      }
    }
    return initialArticles;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("cc_products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse products", e);
      }
    }
    return initialProducts;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem("cc_categories");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return ["Home Decor", "Workspace", "Kitchen", "Organization", "Fashion", "Gift Guides"];
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem("cc_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      siteName: "Curated Comfort",
      siteDescription: "A premium, slow-living digital magazine and handpicked Amazon affiliate product edit.",
      amazonTag: initialAmazonTag,
      ftcDisclosure: "Curated Comfort is supported by design-loving hearts. When you explore or purchase items through our handpicked recommendations on Amazon, we may earn a small affiliate commission. This never adds a single rupee of cost to you, helping sustain our independent, slow-writing magazine.",
      instagramUrl: "https://instagram.com",
      pinterestUrl: "https://pinterest.com"
    };
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("cc_current_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>(() => {
    const saved = localStorage.getItem("cc_analytics");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Seed some mock activity logs for premium dashboard vibe
    const mockEvents: AnalyticsEvent[] = [];
    const seedTimes = [1, 2, 4, 8, 12, 16, 24, 32, 48, 60, 72];
    seedTimes.forEach((hoursAgo, index) => {
      const date = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
      mockEvents.push({
        id: `seed-pv-${index}`,
        timestamp: date.toISOString(),
        type: index % 3 === 0 ? "product_click" : "page_view",
        articleSlug: initialArticles[index % initialArticles.length]?.slug,
        productId: initialProducts[index % initialProducts.length]?.id
      });
    });
    return mockEvents;
  });

  const [mediaLibrary, setMediaLibrary] = useState<string[]>(() => {
    const saved = localStorage.getItem("cc_media_library");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800"
    ];
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem("cc_admin_pw") || (import.meta as any).env.VITE_ADMIN_PASSWORD || "Niharika*2004#";
  });

  // Sync state to localStorage on modification
  useEffect(() => {
    localStorage.setItem("cc_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("cc_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("cc_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("cc_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("cc_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("cc_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("cc_analytics", JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem("cc_media_library", JSON.stringify(mediaLibrary));
  }, [mediaLibrary]);

  // Load and seed Firestore on startup
  useEffect(() => {
    const initFirestoreFlow = async () => {
      console.info("Initializing connection to Firestore database...");
      
      // 1. Articles
      let loadedArticles: Article[] = [];
      const articlesPath = "articles";
      try {
        const articlesRef = collection(db, articlesPath);
        const artSnap = await getDocs(articlesRef);
        if (artSnap.empty) {
          console.info("Seeding initial articles to Firestore...");
          for (const art of initialArticles) {
            try {
              await setDoc(doc(db, articlesPath, art.slug), art);
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `${articlesPath}/${art.slug}`);
            }
          }
          loadedArticles = initialArticles;
        } else {
          loadedArticles = artSnap.docs.map(doc => doc.data() as Article);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, articlesPath);
      }

      // 2. Products
      let loadedProducts: Product[] = [];
      const productsPath = "products";
      try {
        const productsRef = collection(db, productsPath);
        const prodSnap = await getDocs(productsRef);
        if (prodSnap.empty) {
          console.info("Seeding initial products to Firestore...");
          for (const prod of initialProducts) {
            try {
              await setDoc(doc(db, productsPath, prod.id), prod);
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `${productsPath}/${prod.id}`);
            }
          }
          loadedProducts = initialProducts;
        } else {
          loadedProducts = prodSnap.docs.map(doc => doc.data() as Product);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, productsPath);
      }

      // 3. Categories
      let loadedCategories: string[] = [];
      const categoriesPath = "categories";
      try {
        const categoriesRef = collection(db, categoriesPath);
        const catSnap = await getDocs(categoriesRef);
        if (catSnap.empty) {
          console.info("Seeding initial categories to Firestore...");
          const defaultCats = ["Home Decor", "Workspace", "Kitchen", "Organization", "Fashion", "Gift Guides"];
          for (const cat of defaultCats) {
            try {
              await setDoc(doc(db, categoriesPath, cat), { name: cat });
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `${categoriesPath}/${cat}`);
            }
          }
          loadedCategories = defaultCats;
        } else {
          loadedCategories = catSnap.docs.map(doc => doc.id);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, categoriesPath);
      }

      // 4. Settings
      let loadedSettings = null;
      const settingsPath = "settings";
      try {
        const settingsRef = collection(db, settingsPath);
        const settingsSnap = await getDocs(settingsRef);
        if (settingsSnap.empty) {
          console.info("Seeding initial settings to Firestore...");
          const defaultSettings = {
            siteName: "Curated Comfort",
            siteDescription: "A premium, slow-living digital magazine and handpicked Amazon affiliate product edit.",
            amazonTag: initialAmazonTag,
            ftcDisclosure: "Curated Comfort is supported by design-loving hearts. When you explore or purchase items through our handpicked recommendations on Amazon, we may earn a small affiliate commission. This never adds a single rupee of cost to you, helping sustain our independent, slow-writing magazine.",
            instagramUrl: "https://instagram.com",
            pinterestUrl: "https://pinterest.com"
          };
          try {
            await setDoc(doc(db, settingsPath, "global"), defaultSettings);
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, `${settingsPath}/global`);
          }
          loadedSettings = defaultSettings;
        } else {
          const globalData = settingsSnap.docs.find(d => d.id === "global")?.data() as Settings;
          if (globalData) {
            loadedSettings = globalData;
          }
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, settingsPath);
      }

      // 5. Media Library
      let loadedMedia: string[] = [];
      const mediaPath = "media";
      try {
        const mediaRef = collection(db, mediaPath);
        const mediaSnap = await getDocs(mediaRef);
        const defaultMedia = [
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800"
        ];
        if (mediaSnap.empty) {
          console.info("Seeding initial media block...");
          for (const url of defaultMedia) {
            const mediaId = btoa(url).replace(/=/g, "").substr(0, 50);
            try {
              await setDoc(doc(db, mediaPath, mediaId), { url });
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `${mediaPath}/${mediaId}`);
            }
          }
          loadedMedia = defaultMedia;
        } else {
          loadedMedia = mediaSnap.docs.map(doc => doc.data().url as string).filter(Boolean);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, mediaPath);
      }

      // Apply to local state
      setArticles(loadedArticles);
      setProducts(loadedProducts);
      setCategories(loadedCategories);
      setMediaLibrary(loadedMedia);
      if (loadedSettings) {
        setSettings(loadedSettings);
      }
    };
    initFirestoreFlow();
  }, []);

  // Auth Operations
  const login = (username: string, password: string): boolean => {
    const isMatchedUser = username.toLowerCase() === "niharika11" || username.toLowerCase() === "admin";
    if (isMatchedUser && password === adminPassword) {
      const adminUser: User = { username: username.toLowerCase(), role: "Admin" };
      setCurrentUser(adminUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updatePassword = (oldPw: string, newPw: string): boolean => {
    if (oldPw === adminPassword) {
      setAdminPassword(newPw);
      localStorage.setItem("cc_admin_pw", newPw);
      return true;
    }
    return false;
  };

  // Helper function to build distinct slug
  const generateUniqueSlug = (title: string, currentSlug?: string): string => {
    const base = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
      
    let candidate = base;
    let suffix = 1;
    while (articles.some((a) => a.slug === candidate && a.slug !== currentSlug)) {
      candidate = `${base}-${suffix}`;
      suffix += 1;
    }
    return candidate;
  };

  // Article Operations
  const createArticle = (articleData: Omit<Article, "slug">): string => {
    const slug = generateUniqueSlug(articleData.title);
    const newArticle: Article = {
      ...articleData,
      slug
    };
    // Sync to Firestore
    setDoc(doc(db, "articles", slug), newArticle)
      .catch((err) => handleFirestoreError(err, OperationType.WRITE, `articles/${slug}`));
    setArticles((prev) => [newArticle, ...prev]);
    return slug;
  };

  const updateArticle = (slug: string, updatedFields: Partial<Article>): boolean => {
    const original = articles.find(a => a.slug === slug);
    if (!original) return false;

    let updated = { ...original, ...updatedFields };
    if (updatedFields.title && !updatedFields.slug) {
      updated.slug = generateUniqueSlug(updatedFields.title, slug);
    }

    // In Firestore, if slug changes, we delete the old document and create a new one
    if (updated.slug !== slug) {
      deleteDoc(doc(db, "articles", slug))
        .catch((err) => handleFirestoreError(err, OperationType.DELETE, `articles/${slug}`));
      setDoc(doc(db, "articles", updated.slug), updated)
        .catch((err) => handleFirestoreError(err, OperationType.WRITE, `articles/${updated.slug}`));
    } else {
      setDoc(doc(db, "articles", slug), updated)
        .catch((err) => handleFirestoreError(err, OperationType.WRITE, `articles/${slug}`));
    }

    setArticles((prev) =>
      prev.map((art) => (art.slug === slug ? updated : art))
    );
    return true;
  };

  const deleteArticle = (slug: string) => {
    deleteDoc(doc(db, "articles", slug))
      .catch((err) => handleFirestoreError(err, OperationType.DELETE, `articles/${slug}`));
    setArticles((prev) => prev.filter((art) => art.slug !== slug));
  };

  // Product Operations
  const createProduct = (productData: Omit<Product, "id">): string => {
    const id = `item-${Math.random().toString(36).substr(2, 9)}`;
    const newProduct: Product = {
      ...productData,
      id
    };
    setDoc(doc(db, "products", id), newProduct)
      .catch((err) => handleFirestoreError(err, OperationType.WRITE, `products/${id}`));
    setProducts((prev) => [...prev, newProduct]);
    return id;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>): boolean => {
    const original = products.find(p => p.id === id);
    if (!original) return false;

    const updated = { ...original, ...updatedFields };
    setDoc(doc(db, "products", id), updated)
      .catch((err) => handleFirestoreError(err, OperationType.WRITE, `products/${id}`));

    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? updated : prod))
    );
    return true;
  };

  const deleteProduct = (id: string) => {
    deleteDoc(doc(db, "products", id))
      .catch((err) => handleFirestoreError(err, OperationType.DELETE, `products/${id}`));
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  // Category Operations
  const createCategory = (categoryName: string) => {
    const trimmed = categoryName.trim();
    if (trimmed && !categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setDoc(doc(db, "categories", trimmed), { name: trimmed })
        .catch((err) => handleFirestoreError(err, OperationType.WRITE, `categories/${trimmed}`));
      setCategories((prev) => [...prev, trimmed]);
    }
  };

  const deleteCategory = (categoryName: string) => {
    deleteDoc(doc(db, "categories", categoryName))
      .catch((err) => handleFirestoreError(err, OperationType.DELETE, `categories/${categoryName}`));
    setCategories((prev) => prev.filter((c) => c !== categoryName));
  };

  // Media Library Operations
  const addMediaUrl = (url: string) => {
    if (url && !mediaLibrary.includes(url)) {
      const mediaId = btoa(url).replace(/=/g, "").substr(0, 50);
      setDoc(doc(db, "media", mediaId), { url })
        .catch((err) => handleFirestoreError(err, OperationType.WRITE, `media/${mediaId}`));
      setMediaLibrary((prev) => [url, ...prev]);
    }
  };

  const deleteMediaUrl = (url: string) => {
    const mediaId = btoa(url).replace(/=/g, "").substr(0, 50);
    deleteDoc(doc(db, "media", mediaId))
      .catch((err) => handleFirestoreError(err, OperationType.DELETE, `media/${mediaId}`));
    setMediaLibrary((prev) => prev.filter((m) => m !== url));
  };

  // Settings Action
  const updateSettings = (newSettings: Settings) => {
    setDoc(doc(db, "settings", "global"), newSettings)
      .catch((err) => handleFirestoreError(err, OperationType.WRITE, "settings/global"));
    setSettings(newSettings);
  };

  // Tracking Trigger
  const trackEvent = (type: AnalyticsEvent["type"], articleSlug?: string, productId?: string) => {
    const newEvent: AnalyticsEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      type,
      articleSlug,
      productId
    };
    setAnalytics((prev) => [newEvent, ...prev].slice(0, 1000)); // cap at 1000 entries
  };

  const clearAnalytics = () => {
    setAnalytics([]);
  };

  const resetDatabase = async () => {
    try {
      console.info("Resetting Firestore database back to default seeds...");
      
      // 1. Articles
      for (const art of initialArticles) {
        await setDoc(doc(db, "articles", art.slug), art);
      }
      
      // 2. Products
      for (const prod of initialProducts) {
        await setDoc(doc(db, "products", prod.id), prod);
      }

      // 3. Categories
      const defaultCats = ["Home Decor", "Workspace", "Kitchen", "Organization", "Fashion", "Gift Guides"];
      for (const cat of defaultCats) {
        await setDoc(doc(db, "categories", cat), { name: cat });
      }

      // 4. Settings
      const defaultSettings = {
        siteName: "Curated Comfort",
        siteDescription: "A premium, slow-living digital magazine and handpicked Amazon affiliate product edit.",
        amazonTag: initialAmazonTag,
        ftcDisclosure: "Curated Comfort is supported by design-loving hearts. When you explore or purchase items through our handpicked recommendations on Amazon, we may earn a small affiliate commission. This never adds a single rupee of cost to you, helping sustain our independent, slow-writing magazine.",
        instagramUrl: "https://instagram.com",
        pinterestUrl: "https://pinterest.com"
      };
      await setDoc(doc(db, "settings", "global"), defaultSettings);

      // 5. Media Library
      const defaultMedia = [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800"
      ];
      for (const url of defaultMedia) {
        const mediaId = btoa(url).replace(/=/g, "").substr(0, 50);
        await setDoc(doc(db, "media", mediaId), { url });
      }

    } catch (e) {
      console.error("Firestore database reset error:", e);
      handleFirestoreError(e, OperationType.WRITE, "reset");
    }

    setArticles(initialArticles);
    setProducts(initialProducts);
    setCategories(["Home Decor", "Workspace", "Kitchen", "Organization", "Fashion", "Gift Guides"]);
    setMediaLibrary([
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800"
    ]);
    setSettings({
      siteName: "Curated Comfort",
      siteDescription: "A premium, slow-living digital magazine and handpicked Amazon affiliate product edit.",
      amazonTag: initialAmazonTag,
      ftcDisclosure: "Curated Comfort is supported by design-loving hearts. When you explore or purchase items through our handpicked recommendations on Amazon, we may earn a small affiliate commission. This never adds a single rupee of cost to you, helping sustain our independent, slow-writing magazine.",
      instagramUrl: "https://instagram.com",
      pinterestUrl: "https://pinterest.com"
    });
    setAdminPassword("Niharika*2004#");
    setAnalytics([]);
    localStorage.removeItem("cc_admin_pw");
  };

  return (
    <BlogContext.Provider
      value={{
        articles,
        products,
        categories,
        settings,
        currentUser,
        analytics,
        mediaLibrary,
        login,
        logout,
        updatePassword,
        createArticle,
        updateArticle,
        deleteArticle,
        createProduct,
        updateProduct,
        deleteProduct,
        createCategory,
        deleteCategory,
        addMediaUrl,
        deleteMediaUrl,
        updateSettings,
        trackEvent,
        clearAnalytics,
        resetDatabase
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used inside a BlogProvider");
  }
  return context;
}
