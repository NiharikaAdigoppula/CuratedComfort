// Curated Comfort Affiliate Product Database
// Configure customized tracking tags easily across all products here

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  reviewCount: number;
  amazonUrl: string;
  category: string;
  features: string[];
}

export const AMAZON_TAG = "curatedcomfort-21"; // Standard configurable global associate ID

export const products: Product[] = [
  {
    id: "cozy-planter-3",
    title: "Handcrafted Ceramic Ribbed Planter with Drainage",
    description: "Elegantly finished with a warm beige speckled glaze, this planter introduces beautiful organic textures to your bedside table, bathroom, or living room windowsill.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400",
    price: "₹899",
    rating: 4.8,
    reviewCount: 312,
    amazonUrl: `https://www.amazon.in/dp/B07ZFD5V8G?tag=${AMAZON_TAG}`,
    category: "Home Decor",
    features: ["Speckled matte glaze", "Integrated drainage hole", "Protective felt bottom feet"]
  },
  {
    id: "linen-pillow-cover-2",
    title: "Pure French Flax Linen Throw Pillow Covers (Set of 2)",
    description: "Sourced from high-grade natural French flax, these soft, slouchy linen covers add that effortless, lived-in aesthetic cherished by Scandinavian and mid-century designers.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=400",
    price: "₹1,499",
    rating: 4.7,
    reviewCount: 428,
    amazonUrl: `https://www.amazon.in/dp/B08X1NWZ6X?tag=${AMAZON_TAG}`,
    category: "Home Decor",
    features: ["100% genuine French Linen", "Invisible Japanese YKK zippers", "Breathable, vintage-washed fibers"]
  },
  {
    id: "wooden-desk-organizer",
    title: "Eco-Friendly Premium Solid Oak Modular Desk Organizer",
    description: "Clear your mind by clearing your workspace. This customizable organizer safely stores your smartphones, tablets, fountain pens, sticky notes, and paperclips in style.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400",
    price: "₹1,850",
    rating: 4.9,
    reviewCount: 189,
    amazonUrl: `https://www.amazon.in/dp/B09D8RYX9M?tag=${AMAZON_TAG}`,
    category: "Workspace",
    features: ["Constructed from sustainable FSC European Oak", "Non-slip cork-cushioned base", "Magnetic alignment joints"]
  },
  {
    id: "minimal-desk-mat",
    title: "Premium Vegan Felt Desk Mat & Keyboard Blotter",
    description: "Bring sensory warmth to your hard desktop. This wool felt blend mousepad buffers clicking noises, dampens writing resonance, and defines your immediate physical workspace.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400",
    price: "₹749",
    rating: 4.6,
    reviewCount: 512,
    amazonUrl: `https://www.amazon.in/dp/B08M9YHGQZ?tag=${AMAZON_TAG}`,
    category: "Workspace",
    features: ["High-density 4mm thick natural wool felt", "Superb mouse tracking precision", "Reinforced custom border stitching"]
  },
  {
    id: "glass-amber-jars",
    title: "Aesthetic Amber Glass Spice & Tea Jars (Set of 12)",
    description: "Transform your cluttered pantry into an IKEA-caliber display. These custom dark-tinted UV-protective glass jars feature beautiful clean waterproof minimalist paper labels.",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400",
    price: "₹1,250",
    rating: 4.8,
    reviewCount: 220,
    amazonUrl: `https://www.amazon.in/dp/B0998T83V4?tag=${AMAZON_TAG}`,
    category: "Kitchen",
    features: ["Apothecary style thick amber glass", "Air-tight heavy silicone seal rings", "Includes 36 pre-printed minimal labels"]
  },
  {
    id: "pour-over-kettle",
    title: "Sage Green Gooseneck Pour-Over Coffee Drip Kettle",
    description: "An elegant, matte finished manual kettle designed with a precision-flow gooseneck spout. Achieve professional control over your daily morning brew process.",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400",
    price: "₹2,100",
    rating: 4.9,
    reviewCount: 142,
    amazonUrl: `https://www.amazon.in/dp/B07YDJXW4G?tag=${AMAZON_TAG}`,
    category: "Kitchen",
    features: ["Comfort-fit heat insulated wooden handle", "Built-in precision dial thermometer", "Triple-layered premium stainless core"]
  },
  {
    id: "woven-seagrass-basket",
    title: "Natural Woven Seagrass Storage Baskets (Set of 3)",
    description: "Declutter your blanket heaps or washroom towels. Formed with authentic sea grass, these handled baskets look exquisite beside accent plants or neutral sofas.",
    image: "https://images.unsplash.com/photo-1591081912165-748924b171f6?auto=format&fit=crop&q=80&w=400",
    price: "₹999",
    rating: 4.7,
    reviewCount: 689,
    amazonUrl: `https://www.amazon.in/dp/B073QBHH69?tag=${AMAZON_TAG}`,
    category: "Organization",
    features: ["Sustainably harvested seagrass weave", "Collapsible bell design with strong handles", "100% biodegradable and chemical-free"]
  },
  {
    id: "minimalist-linen-tote",
    title: "Linen Utility Shopper & Daily Crossbody Sling Bag",
    description: "An everyday wardrobe favorite. Extremely light, spacious, and styled in a premium washed flax neutral palette. Goes flawlessly with beige overcoats, tees, and canvas sandals.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400",
    price: "₹1,200",
    rating: 4.5,
    reviewCount: 304,
    amazonUrl: `https://www.amazon.in/dp/B08HV64L9Y?tag=${AMAZON_TAG}`,
    category: "Fashion",
    features: ["Heavyweight 380GSM pure structured flax", "Double reinforced interior zipper pouch", "Adjustable comfortable dual strap-lengths"]
  },
  {
    id: "acrylic-drawer-organizer",
    title: "Clear Acrylic Crystal Drawer Divider Organizers (8-Pack)",
    description: "Instantly create sense out of a messy dresser drawer. Perfect for vanity tables, cosmetics, hair accessories, stationery items, or bedside knick-knacks.",
    image: "https://images.unsplash.com/photo-1507208773393-4001ec5d343f?auto=format&fit=crop&q=80&w=400",
    price: "₹650",
    rating: 4.7,
    reviewCount: 812,
    amazonUrl: `https://www.amazon.in/dp/B08B6F9WPC?tag=${AMAZON_TAG}`,
    category: "Organization",
    features: ["Sturdy impact-resistant clear acrylic", "Non-slip rubber buffer pads included", "Fully modular configurations"]
  },
  {
    id: "gold-arch-mirror",
    title: "Minimalist Brass Arched Tabletop Standing Mirror",
    description: "Add structural curves and bounce natural light around your bedroom or vanity. The solid heavy brass geometric base pairs gorgeous utility with premium sculpture.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400",
    price: "₹1,999",
    rating: 4.8,
    reviewCount: 153,
    amazonUrl: `https://www.amazon.in/dp/B08XLLRCSN?tag=${AMAZON_TAG}`,
    category: "Home Decor",
    features: ["HD lead-free distortion-free glass", "Solid satin-finish brushed brass stand", "Felt-backed anti-scratch base"]
  },
  {
    id: "bamboo-bath-mat",
    title: "Water-Resistant Premium Teak Wood Bathroom Mat",
    description: "Bring the five-star luxury spa atmosphere home. This non-slip, eco-friendly solid wood mat provides a clean, dry, aesthetic landing platform outside your tub or shower.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=400",
    price: "₹1,150",
    rating: 4.6,
    reviewCount: 297,
    amazonUrl: `https://www.amazon.in/dp/B0798CJPZ7?tag=${AMAZON_TAG}`,
    category: "Home Decor",
    features: ["Durable sustainably-logged teak wood", "Lattice structure for high-efficiency drainage", "Heavy-duty non-slip industrial floor grips"]
  },
  {
    id: "wireless-charging-tray",
    title: "Leather Multi-Device Charging Valet & Catch-All Tray",
    description: "An elegant solution to bedside cable clutter. Merges a fast wireless charging pad with a clean, beautifully grained catchall compartment for keys, pens, and jewelry.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
    price: "₹2,499",
    rating: 4.8,
    reviewCount: 198,
    amazonUrl: `https://www.amazon.in/dp/B09D8RYX12?tag=${AMAZON_TAG}`,
    category: "Workspace",
    features: ["Supple top-grain pebbled leatherette", "Qi-certified fast dual-device charging", "Soft-touch scratch-proof micro-suede backing"]
  },
  {
    id: "minimalist-ceramic-mugs",
    title: "Wabi-Sabi Speckled Stoneware Oversized Coffee Mugs (Set of 4)",
    description: "Indulge in a slower morning. Each coffee mug is carefully crafted with subtle unique wabi-sabi details, an extra-wide ergonomic loop, and rustic speckled glaze.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
    price: "₹950",
    rating: 4.9,
    reviewCount: 345,
    amazonUrl: `https://www.amazon.in/dp/B08VJCZ84R?tag=${AMAZON_TAG}`,
    category: "Kitchen",
    features: ["Premium high-fire stoneware clay", "Dishwasher, microwave, and oven safe", "Tactile raw-clay expose bottom grip"]
  },
  {
    id: "linen-apron-sage",
    title: "Sage Green Crossback Linen Kitchen Apron",
    description: "Ditch the annoying neck straps. This highly protective cross-back apron distributes weight gracefully over the shoulders, keeping you comfortable during long bakes and prep.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400",
    price: "₹1,100",
    rating: 4.7,
    reviewCount: 167,
    amazonUrl: `https://www.amazon.in/dp/B07PGF3BZD?tag=${AMAZON_TAG}`,
    category: "Kitchen",
    features: ["80% linen and 20% organic cotton blend", "Two oversized, deep front pockets", "No buckles, ties, or hardware to worry about"]
  },
  {
    id: "gold-metal-straws",
    title: "Eco Rose Gold Reusable Metal Drinking Straws (Set of 8)",
    description: "An elegant alternative to plastic waste. Crafted in heavy medical-grade stainless steel with polished round smooth edges. Comes with dynamic canvas carry pouch.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400",
    price: "₹450",
    rating: 4.8,
    reviewCount: 654,
    amazonUrl: `https://www.amazon.in/dp/B07H368KBS?tag=${AMAZON_TAG}`,
    category: "Gift Guides",
    features: ["Food-grade 18/8 stainless steel", "Non-toxic, BPA-free, color-plated outer", "Includes 2 extra-slim flex-soft cleaning brushes"]
  }
];
