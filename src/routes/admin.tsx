import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  auth,
  db,
  signInWithGoogle,
  logoutAdmin,
  isAdminEmail,
  getLandingPageContent,
  updateLandingPageContent,
} from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import {
  Search,
  LogOut,
  Users,
  Calendar,
  Clock,
  Phone,
  Mail,
  Trash2,
  Download,
  AlertCircle,
  ShieldAlert,
  Flower2,
  Loader2,
  CheckCircle2,
  UserCheck,
  Sparkles,
  Award,
  CreditCard,
  Link,
  Instagram,
  HelpCircle,
  Trophy,
  Flame,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/landing/Reveal";
import { DEFAULT_CONTENT, type LandingPageContent } from "@/lib/defaultContent";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  // Admin is a private, auth-gated tool — no SEO value, uses browser-only APIs
  // (window, document, canvas, FileReader). Disabling SSR prevents server crashes.
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Portal — SATTVAYOGA 365" },
      { name: "robots", content: "noindex, nofollow" }, // Keep out of search engines
    ],
  }),
});

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt?: string;
  timestamp?: unknown;
}

const compressAndConvertImage = (file: File, maxW = 800, maxH = 800): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxW || height > maxH) {
          if (width > height) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          } else {
            width = Math.round((width * maxH) / height);
            height = maxH;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(dataUrl);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const getInstagramShortcode = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9-_]+)/i);
  return match ? match[1] : null;
};

function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"leads" | "cms">("leads");
  const [expandedSection, setExpandedSection] = useState<string>("hero");
  const [cmsData, setCmsData] = useState<LandingPageContent>(DEFAULT_CONTENT);
  const [loadingCms, setLoadingCms] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Listen to CMS Content
  useEffect(() => {
    if (!user || !db) return;

    const loadCms = async () => {
      try {
        setLoadingCms(true);
        const data = await getLandingPageContent();
        if (data) {
          setCmsData({
            ...DEFAULT_CONTENT,
            ...data,
            images: { ...DEFAULT_CONTENT.images, ...data.images },
            hero: { ...DEFAULT_CONTENT.hero, ...data.hero },
            mentor: { ...DEFAULT_CONTENT.mentor, ...data.mentor },
            pricing: { ...DEFAULT_CONTENT.pricing, ...data.pricing },
            contacts: { ...DEFAULT_CONTENT.contacts, ...data.contacts },
            whyJoin: { ...DEFAULT_CONTENT.whyJoin, ...data.whyJoin },
            whoFor: { ...DEFAULT_CONTENT.whoFor, ...data.whoFor },
            features: { ...DEFAULT_CONTENT.features, ...data.features },
            reasons: { ...DEFAULT_CONTENT.reasons, ...data.reasons },
            beforeAfter: { ...DEFAULT_CONTENT.beforeAfter, ...data.beforeAfter },
            bestStudents: { ...DEFAULT_CONTENT.bestStudents, ...data.bestStudents },
            reels: { ...DEFAULT_CONTENT.reels, ...data.reels },
            finalCta: { ...DEFAULT_CONTENT.finalCta, ...data.finalCta },
            faqSection: { ...DEFAULT_CONTENT.faqSection, ...data.faqSection },
            testimonials: { ...DEFAULT_CONTENT.testimonials, ...data.testimonials },
          });
        }
      } catch (err) {
        console.error("CMS load error:", err);
        toast.error("Failed to load CMS content.");
      } finally {
        setLoadingCms(false);
      }
    };

    loadCms();
  }, [user]);

  const handleFieldChange = (section: keyof LandingPageContent, key: string, value: unknown) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, unknown>),
        [key]: value,
      },
    }));
  };

  const handleArrayFieldChange = (
    section:
      | "whyJoin"
      | "whoFor"
      | "features"
      | "reasons"
      | "bestStudents"
      | "reels"
      | "faqSection"
      | "testimonials",
    arrayKey: "items" | "cards" | "students" | "faqs",
    index: number,
    fieldKey: string,
    value: string,
  ) => {
    setCmsData((prev) => {
      const sectionData = prev[section] as unknown as Record<string, Record<string, string>[]>;
      const updatedArray = [...sectionData[arrayKey]];
      updatedArray[index] = {
        ...updatedArray[index],
        [fieldKey]: value,
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayKey]: updatedArray,
        },
      };
    });
  };

  const handleBeforeAfterItemChange = (
    key: "beforeItems" | "afterItems",
    index: number,
    value: string,
  ) => {
    setCmsData((prev) => {
      const updatedArray = [...prev.beforeAfter[key]];
      updatedArray[index] = value;
      return {
        ...prev,
        beforeAfter: {
          ...prev.beforeAfter,
          [key]: updatedArray,
        },
      };
    });
  };

  const handleAddItem = (
    section:
      | "whyJoin"
      | "whoFor"
      | "features"
      | "reasons"
      | "bestStudents"
      | "reels"
      | "faqSection"
      | "testimonials",
    arrayKey: "items" | "cards" | "students" | "faqs",
    defaultObj: Record<string, unknown>,
  ) => {
    setCmsData((prev) => {
      const sectionData = prev[section] as unknown as Record<string, Record<string, unknown>[]>;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayKey]: [...sectionData[arrayKey], defaultObj],
        },
      };
    });
  };

  const handleDeleteItem = (
    section:
      | "whyJoin"
      | "whoFor"
      | "features"
      | "reasons"
      | "bestStudents"
      | "reels"
      | "faqSection"
      | "testimonials",
    arrayKey: "items" | "cards" | "students" | "faqs",
    index: number,
  ) => {
    setCmsData((prev) => {
      const sectionData = prev[section] as unknown as Record<string, Record<string, unknown>[]>;
      const updatedArray = sectionData[arrayKey].filter((_, idx: number) => idx !== index);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayKey]: updatedArray,
        },
      };
    });
  };

  const handleSaveCms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      toast.error("Firestore is not configured.");
      return;
    }
    try {
      setSaving(true);
      await updateLandingPageContent(cmsData);
      toast.success("Landing page content updated successfully!");
    } catch (err) {
      console.error("CMS save error:", err);
      toast.error("Failed to save landing page changes.");
    } finally {
      setSaving(false);
    }
  };

  // 2. Listen to Firebase Authentication State
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Verify email whitelist authorization
        if (isAdminEmail(currentUser.email)) {
          setUser(currentUser);
          setAuthError(null);
        } else {
          setUser(null);
          setAuthError(
            `Access Denied: The Google account (${currentUser.email}) is not authorized to access this admin panel. Please contact the administrator.`,
          );
          // Log out immediately from firebase to keep state clean
          logoutAdmin();
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time sync with Cloud Firestore leads collection
  useEffect(() => {
    if (!user || !db) return;

    const leadsQuery = query(collection(db, "leads"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      leadsQuery,
      (snapshot) => {
        const loadedLeads: Lead[] = [];
        snapshot.forEach((doc) => {
          loadedLeads.push({
            id: doc.id,
            ...(doc.data() as Omit<Lead, "id">),
          });
        });
        setLeads(loadedLeads);
      },
      (error) => {
        console.error("Firestore sync error: ", error);
        toast.error("Failed to load real-time leads. Check database rules.");
      },
    );

    return () => unsubscribe();
  }, [user]);

  // 3. Authenticated Admin Actions
  const handleLogin = async () => {
    try {
      setLoading(true);
      setAuthError(null);
      const result = await signInWithGoogle();
      const signedInUser = result.user;

      if (isAdminEmail(signedInUser.email)) {
        setUser(signedInUser);
        toast.success(`Welcome back, ${signedInUser.displayName || "Admin"}!`);
      } else {
        await logoutAdmin();
        setUser(null);
        setAuthError(
          `Access Denied: The Google account (${signedInUser.email}) is not whitelisted in the admin emails. Please sign in with an authorized account.`,
        );
        toast.error("Unauthorized email address.");
      }
    } catch (error) {
      console.error("Google Auth error: ", error);
      const err = error as { code?: string };
      if (err.code !== "auth/popup-closed-by-user") {
        setAuthError("Failed to authenticate. Please check internet connections or keys.");
        toast.error("Authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setUser(null);
      setLeads([]);
      toast.success("Logged out successfully.");
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (
      !db ||
      typeof window === "undefined" ||
      !window.confirm("Are you sure you want to permanently delete this lead?")
    )
      return;

    setIsDeleting(leadId);
    try {
      await deleteDoc(doc(db, "leads", leadId));
      toast.success("Lead successfully deleted.");
    } catch (err) {
      console.error("Delete error: ", err);
      toast.error("Failed to delete lead. Check database permissions.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("No leads available to export.");
      return;
    }

    const headers = ["Name", "Phone", "Email", "Submission Date"];
    const rows = leads.map((l) => [
      l.name.replace(/"/g, '""'),
      l.phone.replace(/"/g, '""'),
      l.email.replace(/"/g, '""'),
      l.createdAt ? new Date(l.createdAt).toLocaleString() : "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.map((field) => `"${field}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    if (typeof document === "undefined") return;
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `sattvayoga365_leads_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads exported to CSV!");
  };

  // 4. Lead Statistics Calculation
  const getStats = () => {
    const total = leads.length;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    let todayCount = 0;
    let weekCount = 0;

    leads.forEach((lead) => {
      if (lead.createdAt) {
        const leadTime = new Date(lead.createdAt).getTime();
        if (leadTime >= startOfToday) todayCount++;
        if (leadTime >= sevenDaysAgo) weekCount++;
      }
    });

    return { total, todayCount, weekCount };
  };

  const { total, todayCount, weekCount } = getStats();

  // 5. Filter Leads via Search Bar
  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query)
    );
  });

  // State: Loading Spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-saffron-deep" />
          <p className="text-sm text-muted-foreground">Verifying secure credentials...</p>
        </div>
      </div>
    );
  }

  // State: Unauthorized / Login Prompt Screen
  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
        <div className="absolute inset-0 bg-dotted opacity-40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

        <Reveal>
          <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border bg-card/80 p-8 shadow-soft backdrop-blur-md sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-warm text-primary-foreground shadow-glow">
              <Flower2 className="h-7 w-7 animate-pulse" />
            </div>

            <div className="mt-6 text-center">
              <h1 className="font-display text-2xl font-bold tracking-tight">
                SATTVAYOGA <span className="text-gradient-warm">365</span>
              </h1>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-saffron-deep">
                Secure Administrator Access
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Sign in with an authorized administrator Google Account to access the lead metrics
                and contact directory.
              </p>
            </div>

            {authError && (
              <div className="mt-6 flex gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-xs leading-relaxed text-destructive">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <p>{authError}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground py-4 font-semibold text-background shadow-soft transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.072 0-5.561-2.49-5.561-5.561s2.49-5.561 5.561-5.561c1.432 0 2.723.543 3.702 1.432l3.14-3.14C18.847 3.868 15.748 2.23 12.24 2.23 6.843 2.23 2.47 6.603 2.47 12s4.373 9.77 9.77 9.77c5.626 0 9.356-3.957 9.356-9.522 0-.616-.057-1.216-.164-1.785l-9.192-.178z" />
              </svg>
              Sign in with Google
            </button>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-xs font-semibold text-muted-foreground transition hover:text-saffron-deep"
              >
                ← Back to Homepage
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  // State: Whitelisted Admin Dashboard Screen
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-warm text-primary-foreground shadow-soft">
              <Flower2 className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">
              SATTVAYOGA <span className="text-gradient-warm">Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Signed-in Admin Info */}
            <div className="hidden items-center gap-2.5 rounded-full border border-border bg-card/50 p-1.5 pr-4 md:flex">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Admin"}
                  className="h-8 w-8 rounded-full border border-saffron/40"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-warm font-semibold text-primary-foreground">
                  A
                </div>
              )}
              <div className="text-left leading-none">
                <p className="text-xs font-bold">{user.displayName || "Administrator"}</p>
                <p className="text-[10px] text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-semibold shadow-soft transition hover:bg-muted md:text-sm"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Dashboard Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Tab Selectors */}
        <div className="mb-8 flex gap-2 rounded-2xl bg-muted/40 p-1.5 max-w-md border border-border/40 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex-1 rounded-xl py-3 text-center text-xs font-bold transition-all duration-200 ${
              activeTab === "leads"
                ? "bg-card text-saffron-deep shadow-soft border border-border/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            📋 Leads Directory
          </button>
          <button
            onClick={() => setActiveTab("cms")}
            className={`flex-1 rounded-xl py-3 text-center text-xs font-bold transition-all duration-200 ${
              activeTab === "cms"
                ? "bg-card text-saffron-deep shadow-soft border border-border/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ✍️ Edit Page Content
          </button>
        </div>

        {activeTab === "leads" ? (
          <>
            <Reveal>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Lead directory</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Monitor real-time course registrations and customer sign-ups.
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center justify-center gap-2 rounded-2xl gradient-warm px-5 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
                >
                  <Download className="h-5 w-5" />
                  Export to CSV
                </button>
              </div>
            </Reveal>

            {/* 3. Lead Summary Cards (Metrics Panel) */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Reveal delay={60}>
                <div className="flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/10 text-saffron-deep">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Total Leads
                    </p>
                    <p className="text-3xl font-bold mt-1">{total}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Leads Today
                    </p>
                    <p className="text-3xl font-bold mt-1 text-amber-600">{todayCount}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Leads This Week
                    </p>
                    <p className="text-3xl font-bold mt-1 text-emerald-600">{weekCount}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* 4. Leads Main Filter & Directory Table */}
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
              {/* Header Search Filtering */}
              <div className="flex flex-col gap-4 border-b border-border/80 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search leads by name, email, or phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none ring-saffron/30 transition focus:border-saffron focus:ring-4"
                  />
                </div>
                <div className="text-xs font-semibold text-muted-foreground text-right">
                  Showing {filteredLeads.length} of {leads.length} leads
                </div>
              </div>

              {/* Database Content Area */}
              {filteredLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">No leads found</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs leading-relaxed">
                    {searchQuery
                      ? "We couldn't find any leads matching your current search parameters."
                      : "Leads submitted via the registration form will appear here in real-time."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/40 font-medium text-muted-foreground uppercase text-[10px] tracking-wider">
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Phone / WhatsApp</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Submission Date</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="transition hover:bg-muted/30">
                            <td className="whitespace-nowrap px-6 py-4 font-bold text-foreground">
                              {lead.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-medium hover:text-saffron-deep transition"
                                title="Chat on WhatsApp"
                              >
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                {lead.phone}
                              </a>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <a
                                href={`mailto:${lead.email}`}
                                className="inline-flex items-center gap-1.5 hover:text-saffron-deep transition"
                              >
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                {lead.email}
                              </a>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                                {lead.createdAt
                                  ? new Date(lead.createdAt).toLocaleString(undefined, {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    })
                                  : "N/A"}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                disabled={isDeleting === lead.id}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition hover:bg-destructive hover:text-primary-foreground disabled:opacity-50"
                                aria-label="Delete Lead"
                              >
                                {isDeleting === lead.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile List Card View */}
                  <div className="divide-y divide-border/60 md:hidden">
                    {filteredLeads.map((lead) => (
                      <div key={lead.id} className="p-5 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-base font-bold leading-tight">{lead.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {lead.createdAt
                                ? new Date(lead.createdAt).toLocaleString(undefined, {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                  })
                                : "N/A"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            disabled={isDeleting === lead.id}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive disabled:opacity-50"
                            aria-label="Delete Lead"
                          >
                            {isDeleting === lead.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5"
                          >
                            <Phone className="h-4 w-4 text-emerald-500" />
                            WhatsApp
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5"
                          >
                            <Mail className="h-4 w-4 text-blue-500" />
                            Email Lead
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Reveal>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Edit page content
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dynamically update the copywriting, titles, schedules, and socials of SATTVAYOGA
                    365.
                  </p>
                </div>
              </div>
            </Reveal>

            {loadingCms ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-saffron-deep" />
                <p className="text-sm text-muted-foreground">
                  Loading landing page configuration...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveCms} className="mt-8 space-y-6 max-w-4xl">
                {/* Accordion Panels Container */}
                <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft divide-y divide-border/60">
                  {/* Accordion 0: Site Media & Uploads */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() => setExpandedSection(expandedSection === "media" ? "" : "media")}
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">
                            Site Media & Images
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Upload site logo, main banners, mentor profile, and features graphics
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "media" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "media" && (
                      <div className="grid gap-6 p-6 md:grid-cols-2 bg-card border-t border-border/40">
                        {/* 1. Site Logo Upload */}
                        <div className="space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10">
                          <label className="text-xs font-bold uppercase tracking-wider text-saffron-deep">
                            Site Logo
                          </label>
                          <div className="flex items-center gap-4">
                            {cmsData.images?.logoUrl ? (
                              <img
                                src={cmsData.images.logoUrl}
                                alt="Logo Preview"
                                className="h-14 w-14 rounded-full object-cover border border-border"
                              />
                            ) : (
                              <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-warm text-cream">
                                <Flower2 className="h-7 w-7" />
                              </div>
                            )}
                            <div className="flex-1 space-y-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const base64 = await compressAndConvertImage(file, 200, 200);
                                      handleFieldChange("images", "logoUrl", base64);
                                      toast.success("Logo uploaded successfully!");
                                    } catch (err) {
                                      toast.error("Failed to process logo.");
                                    }
                                  }
                                }}
                                className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer"
                              />
                              <input
                                type="text"
                                placeholder="Or paste external image URL..."
                                value={cmsData.images?.logoUrl || ""}
                                onChange={(e) =>
                                  handleFieldChange("images", "logoUrl", e.target.value)
                                }
                                className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 2. Hero Banner Image Upload */}
                        <div className="space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10">
                          <label className="text-xs font-bold uppercase tracking-wider text-saffron-deep">
                            Hero Banner Image
                          </label>
                          <div className="flex items-center gap-4">
                            <img
                              src={cmsData.images?.heroUrl || "/assets/hero-yoga.jpg"}
                              alt="Hero Preview"
                              className="h-14 w-14 rounded-xl object-cover border border-border bg-muted/20"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                            <div className="flex-1 space-y-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const base64 = await compressAndConvertImage(file, 800, 800);
                                      handleFieldChange("images", "heroUrl", base64);
                                      toast.success("Hero image uploaded successfully!");
                                    } catch (err) {
                                      toast.error("Failed to process hero image.");
                                    }
                                  }
                                }}
                                className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer"
                              />
                              <input
                                type="text"
                                placeholder="Or paste external image URL..."
                                value={cmsData.images?.heroUrl || ""}
                                onChange={(e) =>
                                  handleFieldChange("images", "heroUrl", e.target.value)
                                }
                                className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 3. Mentor Portrait Upload */}
                        <div className="space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10">
                          <label className="text-xs font-bold uppercase tracking-wider text-saffron-deep">
                            Mentor Profile Image
                          </label>
                          <div className="flex items-center gap-4">
                            <img
                              src={cmsData.images?.instructorUrl || "/assets/instructor.jpg"}
                              alt="Mentor Preview"
                              className="h-14 w-14 rounded-xl object-cover border border-border bg-muted/20"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                            <div className="flex-1 space-y-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const base64 = await compressAndConvertImage(file, 600, 750);
                                      handleFieldChange("images", "instructorUrl", base64);
                                      toast.success("Mentor image uploaded successfully!");
                                    } catch (err) {
                                      toast.error("Failed to process mentor image.");
                                    }
                                  }
                                }}
                                className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer"
                              />
                              <input
                                type="text"
                                placeholder="Or paste external image URL..."
                                value={cmsData.images?.instructorUrl || ""}
                                onChange={(e) =>
                                  handleFieldChange("images", "instructorUrl", e.target.value)
                                }
                                className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 4. Features Graphic Upload */}
                        <div className="space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10">
                          <label className="text-xs font-bold uppercase tracking-wider text-saffron-deep">
                            Features Graphic Circle
                          </label>
                          <div className="flex items-center gap-4">
                            <img
                              src={cmsData.images?.featureUrl || "/assets/feature-yoga.jpg"}
                              alt="Features Preview"
                              className="h-14 w-14 rounded-xl object-cover border border-border bg-muted/20"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                            <div className="flex-1 space-y-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const base64 = await compressAndConvertImage(file, 800, 800);
                                      handleFieldChange("images", "featureUrl", base64);
                                      toast.success("Features graphic uploaded successfully!");
                                    } catch (err) {
                                      toast.error("Failed to process feature image.");
                                    }
                                  }
                                }}
                                className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer"
                              />
                              <input
                                type="text"
                                placeholder="Or paste external image URL..."
                                value={cmsData.images?.featureUrl || ""}
                                onChange={(e) =>
                                  handleFieldChange("images", "featureUrl", e.target.value)
                                }
                                className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 1: Hero Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() => setExpandedSection(expandedSection === "hero" ? "" : "hero")}
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Hero Header</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit main title, subtitles, and schedule badges
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "hero" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "hero" && (
                      <div className="grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Marathi Title
                          </label>
                          <input
                            type="text"
                            value={cmsData.hero.marathiTitle}
                            onChange={(e) =>
                              handleFieldChange("hero", "marathiTitle", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            English Title (Start)
                          </label>
                          <input
                            type="text"
                            value={cmsData.hero.englishTitleStart}
                            onChange={(e) =>
                              handleFieldChange("hero", "englishTitleStart", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            English Title (Highlight)
                          </label>
                          <input
                            type="text"
                            value={cmsData.hero.englishTitleHighlight}
                            onChange={(e) =>
                              handleFieldChange("hero", "englishTitleHighlight", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            English Title (End)
                          </label>
                          <input
                            type="text"
                            value={cmsData.hero.englishTitleEnd}
                            onChange={(e) =>
                              handleFieldChange("hero", "englishTitleEnd", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Description paragraph
                          </label>
                          <textarea
                            rows={3}
                            value={cmsData.hero.description}
                            onChange={(e) =>
                              handleFieldChange("hero", "description", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Starts On Date
                          </label>
                          <input
                            type="text"
                            value={cmsData.hero.startDate}
                            onChange={(e) => handleFieldChange("hero", "startDate", e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Live Sessions Schedule
                          </label>
                          <input
                            type="text"
                            value={cmsData.hero.liveTimes}
                            onChange={(e) => handleFieldChange("hero", "liveTimes", e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Student Rating Count Caption
                          </label>
                          <input
                            type="text"
                            value={cmsData.hero.studentRatingText}
                            onChange={(e) =>
                              handleFieldChange("hero", "studentRatingText", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 2: Mentor Profile */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "mentor" ? "" : "mentor")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Mentor Details</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit instructor names, subtitles, experience stats, and biography
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "mentor" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "mentor" && (
                      <div className="grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Mentor Name
                          </label>
                          <input
                            type="text"
                            value={cmsData.mentor.name}
                            onChange={(e) => handleFieldChange("mentor", "name", e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Experience Years Count
                          </label>
                          <input
                            type="text"
                            value={cmsData.mentor.experienceYears}
                            onChange={(e) =>
                              handleFieldChange("mentor", "experienceYears", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Marathi Subtitle
                          </label>
                          <input
                            type="text"
                            value={cmsData.mentor.marathiSubtitle}
                            onChange={(e) =>
                              handleFieldChange("mentor", "marathiSubtitle", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            English Subtitle
                          </label>
                          <input
                            type="text"
                            value={cmsData.mentor.englishSubtitle}
                            onChange={(e) =>
                              handleFieldChange("mentor", "englishSubtitle", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Mentor Biography
                          </label>
                          <textarea
                            rows={3}
                            value={cmsData.mentor.description}
                            onChange={(e) =>
                              handleFieldChange("mentor", "description", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Students Count Stat (e.g., 1K+)
                          </label>
                          <input
                            type="text"
                            value={cmsData.mentor.statsStudents}
                            onChange={(e) =>
                              handleFieldChange("mentor", "statsStudents", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Plan Duration Stat (e.g., 365)
                          </label>
                          <input
                            type="text"
                            value={cmsData.mentor.statsPlan}
                            onChange={(e) =>
                              handleFieldChange("mentor", "statsPlan", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Rating Stat Score (e.g., 4.9★)
                          </label>
                          <input
                            type="text"
                            value={cmsData.mentor.statsRating}
                            onChange={(e) =>
                              handleFieldChange("mentor", "statsRating", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 3: Pricing Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "pricing" ? "" : "pricing")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Pricing & Value</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit plan names, discount rates, pricing numbers, and day rates
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "pricing" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "pricing" && (
                      <div className="grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Plan Name Caption
                          </label>
                          <input
                            type="text"
                            value={cmsData.pricing.planName}
                            onChange={(e) =>
                              handleFieldChange("pricing", "planName", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Discount Rate Text (e.g., 58% OFF)
                          </label>
                          <input
                            type="text"
                            value={cmsData.pricing.discountText}
                            onChange={(e) =>
                              handleFieldChange("pricing", "discountText", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Sale Offer Price (e.g., ₹4,999)
                          </label>
                          <input
                            type="text"
                            value={cmsData.pricing.price}
                            onChange={(e) => handleFieldChange("pricing", "price", e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Original Price (e.g., ₹12,000)
                          </label>
                          <input
                            type="text"
                            value={cmsData.pricing.originalPrice}
                            onChange={(e) =>
                              handleFieldChange("pricing", "originalPrice", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Rupee Daily Cost Plan (e.g., ₹13)
                          </label>
                          <input
                            type="text"
                            value={cmsData.pricing.rupeeCost}
                            onChange={(e) =>
                              handleFieldChange("pricing", "rupeeCost", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Rupee Cost Subtitle Caption
                          </label>
                          <input
                            type="text"
                            value={cmsData.pricing.rupeeCostSubtitle}
                            onChange={(e) =>
                              handleFieldChange("pricing", "rupeeCostSubtitle", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 4: Socials & Contacts */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "contacts" ? "" : "contacts")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Link className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">
                            Socials & Contacts
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit call numbers, Whatsapp API phone values, and social platform links
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "contacts" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "contacts" && (
                      <div className="grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Direct Call Phone Number (e.g., +91 95793 17724)
                          </label>
                          <input
                            type="text"
                            value={cmsData.contacts.phone}
                            onChange={(e) => handleFieldChange("contacts", "phone", e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            WhatsApp API Digits Only (e.g., 919579317724)
                          </label>
                          <input
                            type="text"
                            value={cmsData.contacts.whatsappNumber}
                            onChange={(e) =>
                              handleFieldChange("contacts", "whatsappNumber", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Instagram Feed Link URL
                          </label>
                          <input
                            type="url"
                            value={cmsData.contacts.instagramUrl}
                            onChange={(e) =>
                              handleFieldChange("contacts", "instagramUrl", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Facebook Link URL
                          </label>
                          <input
                            type="url"
                            value={cmsData.contacts.facebookUrl}
                            onChange={(e) =>
                              handleFieldChange("contacts", "facebookUrl", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Threads Link URL
                          </label>
                          <input
                            type="url"
                            value={cmsData.contacts.threadsUrl}
                            onChange={(e) =>
                              handleFieldChange("contacts", "threadsUrl", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 5: Why Join Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "whyJoin" ? "" : "whyJoin")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Why Join</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit section title, subtitle, and the four key benefit items
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "whyJoin" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "whyJoin" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="grid gap-5 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">
                              Section Title
                            </label>
                            <input
                              type="text"
                              value={cmsData.whyJoin.title}
                              onChange={(e) =>
                                handleFieldChange("whyJoin", "title", e.target.value)
                              }
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">
                              Section Subtitle
                            </label>
                            <input
                              type="text"
                              value={cmsData.whyJoin.subtitle}
                              onChange={(e) =>
                                handleFieldChange("whyJoin", "subtitle", e.target.value)
                              }
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                            />
                          </div>
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3">
                            Benefit Cards (4 items)
                          </p>
                          <div className="grid gap-5 md:grid-cols-2">
                            {cmsData.whyJoin.items.map((it, i) => (
                              <div
                                key={i}
                                className="p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft"
                              >
                                <p className="text-xs font-bold text-muted-foreground">
                                  Benefit Item #{i + 1}
                                </p>
                                <div className="grid gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Icon String (e.g. Sun, Heart, Award, Users)
                                    </label>
                                    <input
                                      type="text"
                                      value={it.icon}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "whyJoin",
                                          "items",
                                          i,
                                          "icon",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      English Title
                                    </label>
                                    <input
                                      type="text"
                                      value={it.title}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "whyJoin",
                                          "items",
                                          i,
                                          "title",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Marathi Title
                                    </label>
                                    <input
                                      type="text"
                                      value={it.marathi}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "whyJoin",
                                          "items",
                                          i,
                                          "marathi",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Description
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={it.desc}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "whyJoin",
                                          "items",
                                          i,
                                          "desc",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 6: Who For Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "whoFor" ? "" : "whoFor")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Who It's For</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit target audience categories, icons, and descriptions (6 cards)
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "whoFor" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "whoFor" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="space-y-2 max-w-md">
                          <label className="text-xs font-bold text-muted-foreground">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={cmsData.whoFor.title}
                            onChange={(e) => handleFieldChange("whoFor", "title", e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3">
                            Audience Cards (6 items)
                          </p>
                          <div className="grid gap-5 md:grid-cols-2">
                            {cmsData.whoFor.cards.map((c, i) => (
                              <div
                                key={i}
                                className="p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft"
                              >
                                <p className="text-xs font-bold text-muted-foreground">
                                  Audience Card #{i + 1}
                                </p>
                                <div className="grid gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Icon String (e.g. Briefcase, Home, GraduationCap, Baby, Scale,
                                      Brain)
                                    </label>
                                    <input
                                      type="text"
                                      value={c.icon}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "whoFor",
                                          "cards",
                                          i,
                                          "icon",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Card Title
                                    </label>
                                    <input
                                      type="text"
                                      value={c.title}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "whoFor",
                                          "cards",
                                          i,
                                          "title",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Description
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={c.desc}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "whoFor",
                                          "cards",
                                          i,
                                          "desc",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 7: Features Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "features" ? "" : "features")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">
                            Features & Benefits
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit main title, subtitles, and floating badges (6 items)
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "features" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "features" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="grid gap-5 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">
                              Section Title
                            </label>
                            <input
                              type="text"
                              value={cmsData.features.title}
                              onChange={(e) =>
                                handleFieldChange("features", "title", e.target.value)
                              }
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">
                              Section Subtitle
                            </label>
                            <input
                              type="text"
                              value={cmsData.features.subtitle}
                              onChange={(e) =>
                                handleFieldChange("features", "subtitle", e.target.value)
                              }
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                            />
                          </div>
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3">
                            Floating Badges (6 items)
                          </p>
                          <div className="grid gap-5 md:grid-cols-3">
                            {cmsData.features.items.map((feat, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl border border-border/80 bg-muted/10 space-y-3 shadow-soft"
                              >
                                <p className="text-xs font-bold text-muted-foreground">
                                  Badge #{i + 1}
                                </p>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Icon String (e.g. Sun, Brain, Wind, Scale, Leaf, Heart)
                                    </label>
                                    <input
                                      type="text"
                                      value={feat.icon}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "features",
                                          "items",
                                          i,
                                          "icon",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Badge Label
                                    </label>
                                    <input
                                      type="text"
                                      value={feat.label}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "features",
                                          "items",
                                          i,
                                          "label",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 8: Reasons Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "reasons" ? "" : "reasons")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Reasons to Join</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit reasons banner title and benefit bullet list (5 items)
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "reasons" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "reasons" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="space-y-2 max-w-md">
                          <label className="text-xs font-bold text-muted-foreground">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={cmsData.reasons.title}
                            onChange={(e) => handleFieldChange("reasons", "title", e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3">
                            Bullet Reasons (5 items)
                          </p>
                          <div className="space-y-4">
                            {cmsData.reasons.items.map((it, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl border border-border/80 bg-muted/10 grid gap-4 md:grid-cols-2 items-center shadow-soft"
                              >
                                <span className="text-xs font-bold text-muted-foreground">
                                  Reason #{i + 1}
                                </span>
                                <div className="grid gap-3 md:col-span-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Title
                                    </label>
                                    <input
                                      type="text"
                                      value={it.title}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "reasons",
                                          "items",
                                          i,
                                          "title",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Description
                                    </label>
                                    <input
                                      type="text"
                                      value={it.desc}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "reasons",
                                          "items",
                                          i,
                                          "desc",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 9: Before & After Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "beforeAfter" ? "" : "beforeAfter")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Flame className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Before & After</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit titles, subtitles, and list comparison bullets
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "beforeAfter" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "beforeAfter" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="space-y-2 max-w-md">
                          <label className="text-xs font-bold text-muted-foreground">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={cmsData.beforeAfter.title}
                            onChange={(e) =>
                              handleFieldChange("beforeAfter", "title", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 border-t border-border/60 pt-4">
                          {/* Before card inputs */}
                          <div className="p-5 rounded-2xl border border-border bg-muted/5 space-y-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Left Card (Before / Current State)
                            </p>
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-muted-foreground">
                                  Header Label
                                </label>
                                <input
                                  type="text"
                                  value={cmsData.beforeAfter.beforeTitle}
                                  onChange={(e) =>
                                    handleFieldChange("beforeAfter", "beforeTitle", e.target.value)
                                  }
                                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-muted-foreground">
                                  Subtitle
                                </label>
                                <input
                                  type="text"
                                  value={cmsData.beforeAfter.beforeSubtitle}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "beforeAfter",
                                      "beforeSubtitle",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                />
                              </div>
                            </div>
                            <div className="space-y-2 border-t border-border/40 pt-3">
                              <label className="text-[10px] font-bold text-muted-foreground">
                                Bullet Points (5 items)
                              </label>
                              {cmsData.beforeAfter.beforeItems.map((item, idx) => (
                                <input
                                  key={idx}
                                  type="text"
                                  value={item}
                                  onChange={(e) =>
                                    handleBeforeAfterItemChange("beforeItems", idx, e.target.value)
                                  }
                                  className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                />
                              ))}
                            </div>
                          </div>

                          {/* After card inputs */}
                          <div className="p-5 rounded-2xl border border-saffron/20 bg-saffron/5 space-y-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep">
                              Right Card (After / Transformation State)
                            </p>
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-muted-foreground">
                                  Header Label
                                </label>
                                <input
                                  type="text"
                                  value={cmsData.beforeAfter.afterTitle}
                                  onChange={(e) =>
                                    handleFieldChange("beforeAfter", "afterTitle", e.target.value)
                                  }
                                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-muted-foreground">
                                  Subtitle
                                </label>
                                <input
                                  type="text"
                                  value={cmsData.beforeAfter.afterSubtitle}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "beforeAfter",
                                      "afterSubtitle",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                />
                              </div>
                            </div>
                            <div className="space-y-2 border-t border-border/40 pt-3">
                              <label className="text-[10px] font-bold text-muted-foreground">
                                Bullet Points (5 items)
                              </label>
                              {cmsData.beforeAfter.afterItems.map((item, idx) => (
                                <input
                                  key={idx}
                                  type="text"
                                  value={item}
                                  onChange={(e) =>
                                    handleBeforeAfterItemChange("afterItems", idx, e.target.value)
                                  }
                                  className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 10: Best Students Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "bestStudents" ? "" : "bestStudents")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Star Students</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit month's best students, stats, achievements, quotes (3 cards)
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "bestStudents" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "bestStudents" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="grid gap-5 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">
                              Section Title
                            </label>
                            <input
                              type="text"
                              value={cmsData.bestStudents.title}
                              onChange={(e) =>
                                handleFieldChange("bestStudents", "title", e.target.value)
                              }
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">
                              Section Subtitle
                            </label>
                            <input
                              type="text"
                              value={cmsData.bestStudents.subtitle}
                              onChange={(e) =>
                                handleFieldChange("bestStudents", "subtitle", e.target.value)
                              }
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                            />
                          </div>
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3">
                            Star Student Cards (3 items)
                          </p>
                          <div className="grid gap-6 md:grid-cols-3">
                            {cmsData.bestStudents.students.map((st, i) => (
                              <div
                                key={i}
                                className="p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft"
                              >
                                <p className="text-xs font-bold text-muted-foreground">
                                  Student #{i + 1}
                                </p>
                                <div className="grid gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Name
                                    </label>
                                    <input
                                      type="text"
                                      value={st.name}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Location & Role
                                    </label>
                                    <input
                                      type="text"
                                      value={st.location}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "location",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Avatar Text (Initials)
                                    </label>
                                    <input
                                      type="text"
                                      value={st.imageText}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "imageText",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Consistency Metric Tag (e.g. 98% Consistency)
                                    </label>
                                    <input
                                      type="text"
                                      value={st.stat}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "stat",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Focus/Tag Title
                                    </label>
                                    <input
                                      type="text"
                                      value={st.tag}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "tag",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Days Metric (e.g. 29/30 Days)
                                    </label>
                                    <input
                                      type="text"
                                      value={st.days}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "days",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Achievement Title
                                    </label>
                                    <input
                                      type="text"
                                      value={st.achievement}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "achievement",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Accent styling classes
                                    </label>
                                    <input
                                      type="text"
                                      value={st.color}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "color",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Student Quote
                                    </label>
                                    <textarea
                                      rows={3}
                                      value={st.quote}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "bestStudents",
                                          "students",
                                          i,
                                          "quote",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron resize-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 11: Instagram Reels Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() => setExpandedSection(expandedSection === "reels" ? "" : "reels")}
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Instagram className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Instagram Reels</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit social showcase header, reels titles, topics, metrics (4 items)
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "reels" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "reels" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="grid gap-5 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">
                              Section Title
                            </label>
                            <input
                              type="text"
                              value={cmsData.reels.title}
                              onChange={(e) => handleFieldChange("reels", "title", e.target.value)}
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground">
                              Section Subtitle
                            </label>
                            <input
                              type="text"
                              value={cmsData.reels.subtitle}
                              onChange={(e) =>
                                handleFieldChange("reels", "subtitle", e.target.value)
                              }
                              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                            />
                          </div>
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3">
                            Reels Items (4 items)
                          </p>
                          <div className="grid gap-5 md:grid-cols-2">
                            {cmsData.reels.items.map((rl, i) => {
                              const item = rl as Record<string, string>;
                              return (
                                <div
                                  key={i}
                                  className="p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft"
                                >
                                  <p className="text-xs font-bold text-muted-foreground">
                                    Reel #{i + 1}
                                  </p>
                                  <div className="grid gap-3">
                                    {/* Instagram Reel URL */}
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-muted-foreground">
                                        Instagram Reel URL
                                      </label>
                                      <div className="flex gap-2">
                                        <input
                                          type="text"
                                          placeholder="https://www.instagram.com/reel/..."
                                          value={item.reelUrl || ""}
                                          onChange={(e) =>
                                            handleArrayFieldChange(
                                              "reels",
                                              "items",
                                              i,
                                              "reelUrl",
                                              e.target.value,
                                            )
                                          }
                                          className="flex-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron focus:ring-1 focus:ring-saffron/20"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const url = item.reelUrl || "";
                                            const shortcode = getInstagramShortcode(url);
                                            if (shortcode) {
                                              const computedCover = `https://www.instagram.com/p/${shortcode}/media/?size=l`;
                                              handleArrayFieldChange(
                                                "reels",
                                                "items",
                                                i,
                                                "imageUrl",
                                                computedCover,
                                              );
                                              toast.success("Cover banner fetched successfully!");
                                            } else {
                                              toast.error(
                                                "Please enter a valid Instagram reel URL first.",
                                              );
                                            }
                                          }}
                                          className="rounded-xl bg-saffron/10 px-3 py-1.5 text-[10px] font-bold text-saffron-deep hover:bg-saffron/20"
                                        >
                                          ⚡ Fetch Cover
                                        </button>
                                      </div>
                                    </div>

                                    {/* Cover Banner Image */}
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-muted-foreground">
                                        Cover Banner Image
                                      </label>
                                      <div className="flex items-center gap-3">
                                        {item.imageUrl ? (
                                          <img
                                            src={item.imageUrl}
                                            alt="Cover Preview"
                                            className="h-10 w-10 rounded-lg object-cover border border-border bg-muted/20"
                                          />
                                        ) : (
                                          <div className="h-10 w-10 rounded-lg border border-dashed border-border flex items-center justify-center text-[10px] text-muted-foreground">
                                            None
                                          </div>
                                        )}
                                        <div className="flex-1 space-y-1.5">
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                try {
                                                  const base64 = await compressAndConvertImage(
                                                    file,
                                                    400,
                                                    700,
                                                  );
                                                  handleArrayFieldChange(
                                                    "reels",
                                                    "items",
                                                    i,
                                                    "imageUrl",
                                                    base64,
                                                  );
                                                  toast.success(
                                                    "Cover banner uploaded successfully!",
                                                  );
                                                } catch (err) {
                                                  toast.error("Failed to process cover.");
                                                }
                                              }
                                            }}
                                            className="w-full text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Or paste external banner image URL..."
                                            value={item.imageUrl || ""}
                                            onChange={(e) =>
                                              handleArrayFieldChange(
                                                "reels",
                                                "items",
                                                i,
                                                "imageUrl",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full rounded-xl border border-border bg-background px-2 py-1 text-[10px] outline-none focus:border-saffron"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-muted-foreground">
                                        Reel Title
                                      </label>
                                      <input
                                        type="text"
                                        value={rl.title}
                                        onChange={(e) =>
                                          handleArrayFieldChange(
                                            "reels",
                                            "items",
                                            i,
                                            "title",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-muted-foreground">
                                        Topic Description
                                      </label>
                                      <input
                                        type="text"
                                        value={rl.topic}
                                        onChange={(e) =>
                                          handleArrayFieldChange(
                                            "reels",
                                            "items",
                                            i,
                                            "topic",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-muted-foreground">
                                          Likes Count
                                        </label>
                                        <input
                                          type="text"
                                          value={rl.likes}
                                          onChange={(e) =>
                                            handleArrayFieldChange(
                                              "reels",
                                              "items",
                                              i,
                                              "likes",
                                              e.target.value,
                                            )
                                          }
                                          className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-muted-foreground">
                                          Comments Count
                                        </label>
                                        <input
                                          type="text"
                                          value={rl.comments}
                                          onChange={(e) =>
                                            handleArrayFieldChange(
                                              "reels",
                                              "items",
                                              i,
                                              "comments",
                                              e.target.value,
                                            )
                                          }
                                          className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-muted-foreground">
                                        Preview Image Text (Fallback)
                                      </label>
                                      <input
                                        type="text"
                                        value={rl.bgText}
                                        onChange={(e) =>
                                          handleArrayFieldChange(
                                            "reels",
                                            "items",
                                            i,
                                            "bgText",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-muted-foreground">
                                        CSS HSL Gradients (Fallback)
                                      </label>
                                      <input
                                        type="text"
                                        value={rl.gradient}
                                        onChange={(e) =>
                                          handleArrayFieldChange(
                                            "reels",
                                            "items",
                                            i,
                                            "gradient",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron"
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 12: Final CTA Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "finalCta" ? "" : "finalCta")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">
                            Final Call to Action
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit bottom slogan, Marathi subtitle, button and seat limit texts
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "finalCta" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "finalCta" && (
                      <div className="grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            English Main Slogan Title
                          </label>
                          <input
                            type="text"
                            value={cmsData.finalCta.title}
                            onChange={(e) => handleFieldChange("finalCta", "title", e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Marathi Subtitle
                          </label>
                          <input
                            type="text"
                            value={cmsData.finalCta.marathiSubtitle}
                            onChange={(e) =>
                              handleFieldChange("finalCta", "marathiSubtitle", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Button Text
                          </label>
                          <input
                            type="text"
                            value={cmsData.finalCta.buttonText}
                            onChange={(e) =>
                              handleFieldChange("finalCta", "buttonText", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-bold text-muted-foreground">
                            Seats Left Caption Text
                          </label>
                          <input
                            type="text"
                            value={cmsData.finalCta.seatsLeftText}
                            onChange={(e) =>
                              handleFieldChange("finalCta", "seatsLeftText", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 13: FAQ Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "faqSection" ? "" : "faqSection")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">Dynamic FAQs</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit accordion questions and complete answers (6 items)
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "faqSection" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "faqSection" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="space-y-2 max-w-md">
                          <label className="text-xs font-bold text-muted-foreground">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={cmsData.faqSection.title}
                            onChange={(e) =>
                              handleFieldChange("faqSection", "title", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3">
                            Questions & Answers (6 items)
                          </p>
                          <div className="space-y-5">
                            {cmsData.faqSection.faqs.map((faq, i) => (
                              <div
                                key={i}
                                className="p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-3 shadow-soft"
                              >
                                <p className="text-xs font-bold text-muted-foreground">
                                  FAQ #{i + 1}
                                </p>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Question
                                    </label>
                                    <input
                                      type="text"
                                      value={faq.q}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "faqSection",
                                          "faqs",
                                          i,
                                          "q",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Answer
                                    </label>
                                    <textarea
                                      rows={3}
                                      value={faq.a}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "faqSection",
                                          "faqs",
                                          i,
                                          "a",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 14: Testimonials Section */}
                  <div className="transition-all">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(expandedSection === "testimonials" ? "" : "testimonials")
                      }
                      className="flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-foreground">
                            Testimonials / Reviews
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Edit reviews main heading and individual client success quotes (6 items)
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-muted-foreground transition-transform duration-200 ${expandedSection === "testimonials" ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>
                    {expandedSection === "testimonials" && (
                      <div className="space-y-6 p-6 bg-card border-t border-border/40">
                        <div className="space-y-2 max-w-md">
                          <label className="text-xs font-bold text-muted-foreground">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={cmsData.testimonials.title}
                            onChange={(e) =>
                              handleFieldChange("testimonials", "title", e.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                          />
                        </div>

                        <div className="border-t border-border/60 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3">
                            Client Reviews (6 items)
                          </p>
                          <div className="grid gap-5 md:grid-cols-2">
                            {cmsData.testimonials.items.map((r, i) => (
                              <div
                                key={i}
                                className="p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft"
                              >
                                <p className="text-xs font-bold text-muted-foreground">
                                  Review Card #{i + 1}
                                </p>
                                <div className="grid gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Client Name
                                    </label>
                                    <input
                                      type="text"
                                      value={r.name}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "testimonials",
                                          "items",
                                          i,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Location or Subtitle
                                    </label>
                                    <input
                                      type="text"
                                      value={r.role}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "testimonials",
                                          "items",
                                          i,
                                          "role",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">
                                      Quote / Review Text
                                    </label>
                                    <textarea
                                      rows={3}
                                      value={r.text}
                                      onChange={(e) =>
                                        handleArrayFieldChange(
                                          "testimonials",
                                          "items",
                                          i,
                                          "text",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Unified Save Changes Action button with gorgeous styling */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-2xl gradient-warm px-8 py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Saving Configurations...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Save All Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </main>
    </div>
  );
}
