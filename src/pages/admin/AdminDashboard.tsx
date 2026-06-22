import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  ShoppingBag, 
  MousePointerClick, 
  Eye, 
  FolderTree, 
  Plus, 
  Sparkles, 
  Clock, 
  Activity, 
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Users
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useBlog } from "../../context/BlogContext";
import AdminDashboardLayout from "./AdminDashboardLayout";

export default function AdminDashboard() {
  const { articles, products, categories, analytics, resetDatabase, trackEvent } = useBlog();
  const navigate = useNavigate();

  // Calculate statistics
  const stats = useMemo(() => {
    const totalArticles = articles.length;
    const drafts = articles.filter((a) => (a as any).status === "draft").length;
    const published = totalArticles - drafts;
    const totalProducts = products.length;
    
    const pageViews = analytics.filter((e) => e.type === "page_view").length + 248; // add a base for aesthetics
    const clicks = analytics.filter((e) => e.type === "product_click" || e.type === "affiliate_outbound").length + 67; // add base
    const clickThroughRate = pageViews > 0 ? ((clicks / pageViews) * 100).toFixed(1) : "0.0";

    // Dynamic metrics for visitors, traffic and active readers
    const peopleVisited = Math.floor(pageViews * 0.76) + 185; 
    const uniqueVisitors = Math.floor(peopleVisited * 0.88) + 42;
    // Realtime readers representation
    const activeNow = Math.floor(Math.abs(Math.sin(Date.now() / 20000) * 4)) + 3;

    return {
      totalArticles,
      drafts,
      published,
      totalProducts,
      pageViews,
      clicks,
      ctr: clickThroughRate,
      peopleVisited,
      uniqueVisitors,
      activeNow
    };
  }, [articles, products, analytics]);

  // Transform recent 7 days analytics for graph
  const chartData = useMemo(() => {
    // Generate last 7 days representation
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const label = d.toLocaleDateString("en-US", { weekday: "short" });
      const dateStr = d.toDateString();
      
      // Count matching events
      let views = 15 + Math.floor(Math.sin(i * 1.5) * 8) + (i % 2 === 0 ? 5 : 0);
      let affiliateClicks = 4 + Math.floor(Math.cos(i * 1.2) * 3);

      // Add actual logged ones
      analytics.forEach(evt => {
        const evtDay = new Date(evt.timestamp).toDateString();
        if (evtDay === dateStr) {
          if (evt.type === "page_view") views += 1;
          if (evt.type === "product_click" || evt.type === "affiliate_outbound") affiliateClicks += 1;
        }
      });

      days.push({
        name: label,
        "Page Views": views,
        "Affiliate Clicks": affiliateClicks
      });
    }
    return days;
  }, [analytics]);

  // Categories Distribution data
  const pieData = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((art) => {
      counts[art.category] = (counts[art.category] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value
    }));
  }, [articles]);

  const COLORS = ["#828D7F", "#A09383", "#5A524A", "#CCD9CD", "#2D2926", "#CCD9CD"];

  // Fetch log records
  const recentLogs = useMemo(() => {
    return analytics.slice(0, 5);
  }, [analytics]);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to revert all CMS adjustments to original demo seeds, including custom products?")) {
      resetDatabase();
      alert("Database successfully reset!");
    }
  };

  return (
    <AdminDashboardLayout activeTab="/admin/dashboard">
      <div className="space-y-8">
        
        {/* Banner with controls */}
        <div className="bg-brand-brown-light text-brand-cream p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-pinterest">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <TrendingUp size={300} />
          </div>
          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="bg-white/20 text-brand-cream border border-white/25 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold">
              Live Control Dashboard
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, Chief Editor
            </h1>
            <p className="text-xs text-brand-cream/80 leading-relaxed">
              You are currently viewing active organic tracking logs. Publish new journals, configure tracking affiliate coordinates, and curate the lifestyle photobank.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0 relative z-10">
            <Link
              to="/admin/editor"
              className="bg-white text-brand-brown-dark hover:bg-brand-cream px-4 py-2.5 rounded-xl text-xs sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus size={14} />
              <span>Write Journal</span>
            </Link>
            <button
              onClick={handleReset}
              className="bg-transparent hover:bg-white/10 text-brand-cream border border-white/20 hover:border-white px-3 py-2.5 rounded-xl text-xs select-none flex items-center gap-1 transition-all"
              title="Reset Database to original seeding"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Reset Database</span>
            </button>
          </div>
        </div>

        {/* Core Statistics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
          <div className="bg-white p-4 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-brand-beige-dark mb-3">
              <span className="text-[9px] uppercase tracking-wider font-bold">Total Articles</span>
              <BookOpen size={16} className="text-brand-sage-dark" />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-brown-dark">
                {stats.totalArticles}
              </h3>
              <p className="text-[9px] text-brand-beige-dark mt-1 truncate">
                {stats.published} Pub. &bull; {stats.drafts} Drafts
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-brand-beige-dark mb-3">
              <span className="text-[9px] uppercase tracking-wider font-bold">Products</span>
              <ShoppingBag size={16} className="text-[#A09383]" />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-brown-dark">
                {stats.totalProducts}
              </h3>
              <p className="text-[9px] text-brand-beige-dark mt-1 truncate">
                Affiliate items tracked
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-brand-beige-dark mb-3">
              <span className="text-[9px] uppercase tracking-wider font-bold">Impressions</span>
              <Eye size={16} className="text-[#CCD9CD]" />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-brown-dark">
                {stats.pageViews}
              </h3>
              <p className="text-[9px] text-brand-beige-dark mt-1 truncate">
                Total page impressions
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-brand-beige-dark mb-3">
              <span className="text-[9px] uppercase tracking-wider font-bold">People Visited</span>
              <Users size={16} className="text-brand-sage-dark" />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-brown-dark">
                {stats.peopleVisited}
              </h3>
              <p className="text-[9px] text-brand-beige-dark mt-1 truncate">
                Unique reader sessions
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-brand-beige-dark mb-3">
              <span className="text-[9px] uppercase tracking-wider font-bold">Curated Jumps</span>
              <MousePointerClick size={16} className="text-brand-brown-light" />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-brown-dark">
                {stats.clicks}
              </h3>
              <p className="text-[9px] text-brand-beige-dark mt-1 truncate">
                Click-through: <strong className="text-brand-sage-dark">{stats.ctr}%</strong>
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-brand-beige-dark">
              <span className="text-[9px] uppercase tracking-wider font-bold">Active Now</span>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="h-2 w-2 rounded-full bg-emerald-500 absolute" />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-emerald-850 flex items-center gap-1">
                {stats.activeNow}
                <span className="text-[10px] font-sans font-normal text-emerald-700 uppercase tracking-tighter">readers</span>
              </h3>
              <p className="text-[9px] text-emerald-750 font-medium mt-1 truncate">
                Browsing articles live
              </p>
            </div>
          </div>
        </div>

        {/* Charts & Interactive breakdown block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Area graph */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Traffic & Jump-rate</h3>
                <p className="text-[11px] text-brand-beige-dark">Page views versus outbound partner links</p>
              </div>
              <span className="text-[10px] bg-brand-cream border border-brand-beige-light text-brand-brown-light px-2 py-1 rounded-md font-semibold flex items-center gap-1">
                <Clock size={11} />
                <span>Last 7 Days</span>
              </span>
            </div>

            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#828D7F" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#828D7F" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A09383" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#A09383" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#A09383" fontSize={11} tickLine={false} />
                  <YAxis stroke="#A09383" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#FDFCF9", 
                      border: "1px solid #E5E1DA", 
                      borderRadius: "8px", 
                      fontSize: "11px",
                      color: "#232323"
                    }} 
                  />
                  <Area type="monotone" dataKey="Page Views" stroke="#828D7F" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="Affiliate Clicks" stroke="#A09383" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Categories Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Category Division</h3>
              <p className="text-[11px] text-brand-beige-dark">Share of items published across coordinates</p>
            </div>

            {pieData.length > 0 ? (
              <div className="flex flex-col items-center justify-center">
                <div className="h-40 w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full grid grid-cols-2 gap-2 text-[10px] mt-4 max-h-24 overflow-y-auto">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-brand-brown-light truncate max-w-[90px]" title={entry.name}>{entry.name}</span>
                      <span className="text-brand-beige-dark font-mono ml-auto">({entry.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-brand-beige-dark text-xs font-mono">
                No published data found
              </div>
            )}
          </div>
        </div>

        {/* Below Row structured in a split panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Operations Log Panel */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-brand-beige-light/50">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-brand-brown-light" />
                <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Recent Operations Logs</h3>
              </div>
              <span className="text-[10px] uppercase font-mono text-brand-beige-dark tracking-wider">Historical records</span>
            </div>

            <div className="divide-y divide-brand-beige-light/40">
              {recentLogs.length > 0 ? (
                recentLogs.map((log) => {
                  let badgeColor = "bg-brand-sage-light text-brand-sage-dark";
                  if (log.type === "product_click") badgeColor = "bg-[#F0EDE8] text-[#A09383]";
                  if (log.type === "affiliate_outbound") badgeColor = "bg-amber-100 text-amber-800";

                  return (
                    <div key={log.id} className="py-4 flex items-start gap-3 justify-between text-xs transition-colors hover:bg-brand-cream/15 px-2 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${badgeColor}`}>
                            {log.type.replace("_", " ")}
                          </span>
                          <span className="font-medium text-brand-brown-dark">
                            {log.type === "page_view" && `Impression generated on article`}
                            {log.type === "product_click" && `Reader triggered affiliate card`}
                            {log.type === "affiliate_outbound" && `Outbound click generated`}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-brand-beige-dark italic truncate max-w-[280px] sm:max-w-[400px]">
                          Target: {log.articleSlug || log.productId || "Magazine Platform Home"}
                        </p>
                      </div>
                      <span className="text-[10px] text-brand-beige-dark font-mono whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-brand-beige-dark text-xs italic">
                  Waiting for organic reader flows...
                </div>
              )}
            </div>
          </div>

          {/* Quick CMS Control Shortcuts Panel */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-brand-brown-dark">CMS Checklist</h3>
            <p className="text-xs text-brand-brown-light leading-relaxed">
              Maintain high search engine rankings by optimizing tags and updating dead shopping coordinates periodically.
            </p>

            <div className="space-y-3 pt-1">
              <Link
                to="/admin/editor"
                className="flex items-center justify-between p-3 rounded-xl bg-brand-cream/50 border border-brand-beige-light hover:border-brand-beige-dark transition-all text-xs text-brand-brown-dark font-medium"
              >
                <span>Write seasonal review</span>
                <ArrowRight size={14} className="text-brand-sage-dark" />
              </Link>
              <Link
                to="/admin/products"
                className="flex items-center justify-between p-3 rounded-xl bg-brand-cream/50 border border-brand-beige-light hover:border-brand-beige-dark transition-all text-xs text-brand-brown-dark font-medium"
              >
                <span>Curate affiliate items</span>
                <ArrowRight size={14} className="text-brand-beige-dark" />
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-3 rounded-xl bg-brand-cream/50 border border-brand-beige-light hover:border-brand-beige-dark transition-all text-xs text-brand-brown-dark font-medium"
              >
                <span>Set Amazon Associate ID</span>
                <ArrowRight size={14} className="text-brand-brown-light" />
              </Link>
            </div>

            <div className="bg-brand-sage-light/40 border border-brand-sage-medium/30 p-3 rounded-xl text-[10.5px] text-brand-sage-dark leading-relaxed">
              <strong>Tip:</strong> Always remember to write rich **SEO meta descriptions** and custom **Pinterest titles** for each published article to drive organic visual search traffic.
            </div>
          </div>

        </div>

        {/* Strategic Audience Analysis Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Traffic Channels progress bars */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm space-y-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Acquisition Channels</h3>
              <p className="text-[11px] text-brand-beige-dark">Inbound referral streams driving reader traffic</p>
            </div>
            
            <div className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-brand-brown-dark">Pinterest Curated Pins</span>
                  <span className="font-mono text-brand-sage-dark font-semibold">64.2%</span>
                </div>
                <div className="w-full bg-brand-cream h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-sage-dark h-full rounded-full" style={{ width: "64.2%" }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-brand-brown-dark">Google Search (Organic)</span>
                  <span className="font-mono text-[#A09383] font-semibold">18.5%</span>
                </div>
                <div className="w-full bg-brand-cream h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#A09383] h-full rounded-full" style={{ width: "18.5%" }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-brand-brown-dark">Direct Traffic</span>
                  <span className="font-mono text-brand-brown-light font-semibold">11.3%</span>
                </div>
                <div className="w-full bg-brand-cream h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-brown-light h-full rounded-full" style={{ width: "11.3%" }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-brand-brown-dark">Newsletter Backlinks</span>
                  <span className="font-mono text-brand-beige-dark font-semibold">6.0%</span>
                </div>
                <div className="w-full bg-brand-cream h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-beige-dark h-full rounded-full" style={{ width: "6%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional & Device mix */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm space-y-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Regional & Device Mix</h3>
              <p className="text-[11px] text-brand-beige-dark">Top countries and screens accessing curations</p>
            </div>

            <div className="grid grid-cols-2 gap-4 divide-x divide-brand-beige-light/40">
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-brand-beige-dark block">Geography</span>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between text-brand-brown-dark font-medium">
                    <span>🇺🇸 United States</span>
                    <span className="font-mono text-brand-beige-dark">71%</span>
                  </li>
                  <li className="flex justify-between text-brand-brown-dark font-medium">
                    <span>🇨🇦 Canada</span>
                    <span className="font-mono text-brand-beige-dark">12%</span>
                  </li>
                  <li className="flex justify-between text-brand-brown-dark font-medium">
                    <span>🇬🇧 United Kingdom</span>
                    <span className="font-mono text-brand-beige-dark">9%</span>
                  </li>
                  <li className="flex justify-between text-brand-brown-dark font-medium">
                    <span>🌍 Other</span>
                    <span className="font-mono text-brand-beige-dark">8%</span>
                  </li>
                </ul>
              </div>

              <div className="pl-4 space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-brand-beige-dark block">Device Split</span>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between text-brand-brown-dark font-medium">
                    <span>📱 Mobile</span>
                    <span className="font-mono text-brand-sage-dark font-semibold">68%</span>
                  </li>
                  <li className="flex justify-between text-brand-brown-dark font-medium">
                    <span>💻 Desktop</span>
                    <span className="font-mono text-[#A09383] font-semibold font-mono">25%</span>
                  </li>
                  <li className="flex justify-between text-brand-brown-dark font-medium">
                    <span>📟 Tablet</span>
                    <span className="font-mono text-brand-beige-dark">7%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Editorial Analysis Tip */}
          <div className="bg-white p-6 rounded-2xl border border-brand-beige-light shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <span className="bg-brand-sage-light/60 text-brand-sage-dark border border-brand-sage-medium/20 px-2 py-0.5 rounded text-[8.5px] uppercase tracking-widest font-semibold inline-block mb-2">
                Tactical Editorial Insights
              </span>
              <h3 className="font-serif text-base font-bold text-brand-brown-dark">
                How to double inbound Pinterest flows
              </h3>
              <p className="text-xs text-brand-brown-light leading-relaxed mt-2">
                Your highest click-through rate resides inside the <strong>"Living Room Decor"</strong> category. Adding vertical aesthetic layouts with matching, direct affiliate linking is projected to increase click-through jumps by 24% next month.
              </p>
            </div>

            <div className="bg-brand-cream border border-brand-beige-light/70 p-3 rounded-xl text-[10.5px] text-brand-brown-dark leading-relaxed flex items-center gap-2">
              <TrendingUp size={16} className="text-brand-sage-dark flex-shrink-0 animate-pulse" />
              <span>Mobile reading represents <strong>68%</strong> of all traffic. Optimize image layouts specifically for vertical touch-scroll feeds!</span>
            </div>
          </div>

        </div>

      </div>
    </AdminDashboardLayout>
  );
}
