import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { d as db, a as auth, i as isAdminEmail, l as logoutAdmin, g as getLandingPageContent, s as signInWithGoogle, u as updateLandingPageContent } from "./router-DmriS4An.js";
import { onAuthStateChanged } from "firebase/auth";
import { query, collection, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Loader2, Flower2, ShieldAlert, LogOut, Download, Users, Calendar, CheckCircle2, Search, AlertCircle, Phone, Mail, Clock, Trash2, Award, Sparkles, CreditCard, Link, Flame, Trophy, Instagram, TrendingUp, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { D as DEFAULT_CONTENT, R as Reveal } from "./defaultContent-DRO9wp6K.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "firebase/app";
const compressAndConvertImage = (file, maxW = 800, maxH = 800) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxW || height > maxH) {
          if (width > height) {
            height = Math.round(height * maxW / width);
            width = maxW;
          } else {
            width = Math.round(width * maxH / height);
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
          resolve(event.target?.result);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};
const getInstagramShortcode = (url) => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9-_]+)/i);
  return match ? match[1] : null;
};
function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [activeTab, setActiveTab] = useState("leads");
  const [expandedSection, setExpandedSection] = useState("hero");
  const [cmsData, setCmsData] = useState(DEFAULT_CONTENT);
  const [loadingCms, setLoadingCms] = useState(true);
  const [saving, setSaving] = useState(false);
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
            images: {
              ...DEFAULT_CONTENT.images,
              ...data.images
            },
            hero: {
              ...DEFAULT_CONTENT.hero,
              ...data.hero
            },
            mentor: {
              ...DEFAULT_CONTENT.mentor,
              ...data.mentor
            },
            pricing: {
              ...DEFAULT_CONTENT.pricing,
              ...data.pricing
            },
            contacts: {
              ...DEFAULT_CONTENT.contacts,
              ...data.contacts
            },
            whyJoin: {
              ...DEFAULT_CONTENT.whyJoin,
              ...data.whyJoin
            },
            whoFor: {
              ...DEFAULT_CONTENT.whoFor,
              ...data.whoFor
            },
            features: {
              ...DEFAULT_CONTENT.features,
              ...data.features
            },
            reasons: {
              ...DEFAULT_CONTENT.reasons,
              ...data.reasons
            },
            beforeAfter: {
              ...DEFAULT_CONTENT.beforeAfter,
              ...data.beforeAfter
            },
            bestStudents: {
              ...DEFAULT_CONTENT.bestStudents,
              ...data.bestStudents
            },
            reels: {
              ...DEFAULT_CONTENT.reels,
              ...data.reels
            },
            finalCta: {
              ...DEFAULT_CONTENT.finalCta,
              ...data.finalCta
            },
            faqSection: {
              ...DEFAULT_CONTENT.faqSection,
              ...data.faqSection
            },
            testimonials: {
              ...DEFAULT_CONTENT.testimonials,
              ...data.testimonials
            }
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
  const handleFieldChange = (section, key, value) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };
  const handleArrayFieldChange = (section, arrayKey, index, fieldKey, value) => {
    setCmsData((prev) => {
      const sectionData = prev[section];
      const updatedArray = [...sectionData[arrayKey]];
      updatedArray[index] = {
        ...updatedArray[index],
        [fieldKey]: value
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayKey]: updatedArray
        }
      };
    });
  };
  const handleBeforeAfterItemChange = (key, index, value) => {
    setCmsData((prev) => {
      const updatedArray = [...prev.beforeAfter[key]];
      updatedArray[index] = value;
      return {
        ...prev,
        beforeAfter: {
          ...prev.beforeAfter,
          [key]: updatedArray
        }
      };
    });
  };
  const handleSaveCms = async (e) => {
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
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (isAdminEmail(currentUser.email)) {
          setUser(currentUser);
          setAuthError(null);
        } else {
          setUser(null);
          setAuthError(`Access Denied: The Google account (${currentUser.email}) is not authorized to access this admin panel. Please contact the administrator.`);
          logoutAdmin();
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (!user || !db) return;
    const leadsQuery = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(leadsQuery, (snapshot) => {
      const loadedLeads = [];
      snapshot.forEach((doc2) => {
        loadedLeads.push({
          id: doc2.id,
          ...doc2.data()
        });
      });
      setLeads(loadedLeads);
    }, (error) => {
      console.error("Firestore sync error: ", error);
      toast.error("Failed to load real-time leads. Check database rules.");
    });
    return () => unsubscribe();
  }, [user]);
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
        setAuthError(`Access Denied: The Google account (${signedInUser.email}) is not whitelisted in the admin emails. Please sign in with an authorized account.`);
        toast.error("Unauthorized email address.");
      }
    } catch (error) {
      console.error("Google Auth error: ", error);
      const err = error;
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
  const handleDeleteLead = async (leadId) => {
    if (!db || typeof window === "undefined" || !window.confirm("Are you sure you want to permanently delete this lead?")) return;
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
    const rows = leads.map((l) => [l.name.replace(/"/g, '""'), l.phone.replace(/"/g, '""'), l.email.replace(/"/g, '""'), l.createdAt ? new Date(l.createdAt).toLocaleString() : "N/A"]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.map((field) => `"${field}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    if (typeof document === "undefined") return;
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sattvayoga365_leads_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads exported to CSV!");
  };
  const getStats = () => {
    const total2 = leads.length;
    const now = /* @__PURE__ */ new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1e3;
    let todayCount2 = 0;
    let weekCount2 = 0;
    leads.forEach((lead) => {
      if (lead.createdAt) {
        const leadTime = new Date(lead.createdAt).getTime();
        if (leadTime >= startOfToday) todayCount2++;
        if (leadTime >= sevenDaysAgo) weekCount2++;
      }
    });
    return {
      total: total2,
      todayCount: todayCount2,
      weekCount: weekCount2
    };
  };
  const {
    total,
    todayCount,
    weekCount
  } = getStats();
  const filteredLeads = leads.filter((lead) => {
    const query2 = searchQuery.toLowerCase();
    return lead.name.toLowerCase().includes(query2) || lead.phone.toLowerCase().includes(query2) || lead.email.toLowerCase().includes(query2);
  });
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background text-foreground", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-saffron-deep" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Verifying secure credentials..." })
    ] }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border bg-card/80 p-8 shadow-soft backdrop-blur-md sm:p-10", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-warm text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsx(Flower2, { className: "h-7 w-7 animate-pulse" }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center", children: [
          /* @__PURE__ */ jsxs("h1", { className: "font-display text-2xl font-bold tracking-tight", children: [
            "SATTVAYOGA ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "365" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-semibold uppercase tracking-wider text-saffron-deep", children: "Secure Administrator Access" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: "Sign in with an authorized administrator Google Account to access the lead metrics and contact directory." })
        ] }),
        authError && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-xs leading-relaxed text-destructive", children: [
          /* @__PURE__ */ jsx(ShieldAlert, { className: "h-5 w-5 shrink-0" }),
          /* @__PURE__ */ jsx("p", { children: authError })
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: handleLogin, className: "group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground py-4 font-semibold text-background shadow-soft transition hover:scale-[1.02] active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.072 0-5.561-2.49-5.561-5.561s2.49-5.561 5.561-5.561c1.432 0 2.723.543 3.702 1.432l3.14-3.14C18.847 3.868 15.748 2.23 12.24 2.23 6.843 2.23 2.47 6.603 2.47 12s4.373 9.77 9.77 9.77c5.626 0 9.356-3.957 9.356-9.522 0-.616-.057-1.216-.164-1.785l-9.192-.178z" }) }),
          "Sign in with Google"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-xs font-semibold text-muted-foreground transition hover:text-saffron-deep", children: "← Back to Homepage" }) })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full gradient-warm text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsx(Flower2, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("span", { className: "font-display text-lg font-bold", children: [
          "SATTVAYOGA ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Admin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-2.5 rounded-full border border-border bg-card/50 p-1.5 pr-4 md:flex", children: [
          user.photoURL ? /* @__PURE__ */ jsx("img", { src: user.photoURL, alt: user.displayName || "Admin", className: "h-8 w-8 rounded-full border border-saffron/40" }) : /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full gradient-warm font-semibold text-primary-foreground", children: "A" }),
          /* @__PURE__ */ jsxs("div", { className: "text-left leading-none", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold", children: user.displayName || "Administrator" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground", children: user.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: handleLogout, className: "flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-semibold shadow-soft transition hover:bg-muted md:text-sm", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
          "Sign Out"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex gap-2 rounded-2xl bg-muted/40 p-1.5 max-w-md border border-border/40 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setActiveTab("leads"), className: `flex-1 rounded-xl py-3 text-center text-xs font-bold transition-all duration-200 ${activeTab === "leads" ? "bg-card text-saffron-deep shadow-soft border border-border/20" : "text-muted-foreground hover:text-foreground"}`, children: "📋 Leads Directory" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setActiveTab("cms"), className: `flex-1 rounded-xl py-3 text-center text-xs font-bold transition-all duration-200 ${activeTab === "cms" ? "bg-card text-saffron-deep shadow-soft border border-border/20" : "text-muted-foreground hover:text-foreground"}`, children: "✍️ Edit Page Content" })
      ] }),
      activeTab === "leads" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight sm:text-4xl", children: "Lead directory" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Monitor real-time course registrations and customer sign-ups." })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: handleExportCSV, className: "flex items-center justify-center gap-2 rounded-2xl gradient-warm px-5 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:scale-105", children: [
            /* @__PURE__ */ jsx(Download, { className: "h-5 w-5" }),
            "Export to CSV"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsx(Reveal, { delay: 60, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Users, { className: "h-7 w-7" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold", children: "Total Leads" }),
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mt-1", children: total })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600", children: /* @__PURE__ */ jsx(Calendar, { className: "h-7 w-7" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold", children: "Leads Today" }),
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mt-1 text-amber-600", children: todayCount })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 180, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-7 w-7" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold", children: "Leads This Week" }),
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold mt-1 text-emerald-600", children: weekCount })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 border-b border-border/80 p-5 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search leads by name, email, or phone number...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none ring-saffron/30 transition focus:border-saffron focus:ring-4" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold text-muted-foreground text-right", children: [
              "Showing ",
              filteredLeads.length,
              " of ",
              leads.length,
              " leads"
            ] })
          ] }),
          filteredLeads.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center px-4 py-16 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 text-xl font-bold", children: "No leads found" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs leading-relaxed", children: searchQuery ? "We couldn't find any leads matching your current search parameters." : "Leads submitted via the registration form will appear here in real-time." })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "hidden overflow-x-auto md:block", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-left text-sm", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border bg-muted/40 font-medium text-muted-foreground uppercase text-[10px] tracking-wider", children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Name" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Phone / WhatsApp" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Email" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Submission Date" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border/60", children: filteredLeads.map((lead) => /* @__PURE__ */ jsxs("tr", { className: "transition hover:bg-muted/30", children: [
                /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 font-bold text-foreground", children: lead.name }),
                /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4", children: /* @__PURE__ */ jsxs("a", { href: `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 font-medium hover:text-saffron-deep transition", title: "Chat on WhatsApp", children: [
                  /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
                  lead.phone
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4", children: /* @__PURE__ */ jsxs("a", { href: `mailto:${lead.email}`, className: "inline-flex items-center gap-1.5 hover:text-saffron-deep transition", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
                  lead.email
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-muted-foreground", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
                  lead.createdAt ? new Date(lead.createdAt).toLocaleString(void 0, {
                    dateStyle: "medium",
                    timeStyle: "short"
                  }) : "N/A"
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-center", children: /* @__PURE__ */ jsx("button", { onClick: () => handleDeleteLead(lead.id), disabled: isDeleting === lead.id, className: "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition hover:bg-destructive hover:text-primary-foreground disabled:opacity-50", "aria-label": "Delete Lead", children: isDeleting === lead.id ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) }) })
              ] }, lead.id)) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "divide-y divide-border/60 md:hidden", children: filteredLeads.map((lead) => /* @__PURE__ */ jsxs("div", { className: "p-5 space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-bold leading-tight", children: lead.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
                    lead.createdAt ? new Date(lead.createdAt).toLocaleString(void 0, {
                      dateStyle: "short",
                      timeStyle: "short"
                    }) : "N/A"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("button", { onClick: () => handleDeleteLead(lead.id), disabled: isDeleting === lead.id, className: "flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive disabled:opacity-50", "aria-label": "Delete Lead", children: isDeleting === lead.id ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs font-semibold", children: [
                /* @__PURE__ */ jsxs("a", { href: `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5", children: [
                  /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-emerald-500" }),
                  "WhatsApp"
                ] }),
                /* @__PURE__ */ jsxs("a", { href: `mailto:${lead.email}`, className: "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-blue-500" }),
                  "Email Lead"
                ] })
              ] })
            ] }, lead.id)) })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight sm:text-4xl", children: "Edit page content" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Dynamically update the copywriting, titles, schedules, and socials of SATTVAYOGA 365." })
        ] }) }) }),
        loadingCms ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-3", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-saffron-deep" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Loading landing page configuration..." })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveCms, className: "mt-8 space-y-6 max-w-4xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft divide-y divide-border/60", children: [
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "media" ? "" : "media"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Site Media & Images" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Upload site logo, main banners, mentor profile, and features graphics" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "media" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "media" && /* @__PURE__ */ jsxs("div", { className: "grid gap-6 p-6 md:grid-cols-2 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep", children: "Site Logo" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    cmsData.images?.logoUrl ? /* @__PURE__ */ jsx("img", { src: cmsData.images.logoUrl, alt: "Logo Preview", className: "h-14 w-14 rounded-full object-cover border border-border" }) : /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full gradient-warm text-cream", children: /* @__PURE__ */ jsx(Flower2, { className: "h-7 w-7" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
                      /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: async (e) => {
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
                      }, className: "w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer" }),
                      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Or paste external image URL...", value: cmsData.images?.logoUrl || "", onChange: (e) => handleFieldChange("images", "logoUrl", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep", children: "Hero Banner Image" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("img", { src: cmsData.images?.heroUrl || "/assets/hero-yoga.jpg", alt: "Hero Preview", className: "h-14 w-14 rounded-xl object-cover border border-border bg-muted/20", onError: (e) => {
                      e.target.src = "/placeholder.svg";
                    } }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
                      /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: async (e) => {
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
                      }, className: "w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer" }),
                      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Or paste external image URL...", value: cmsData.images?.heroUrl || "", onChange: (e) => handleFieldChange("images", "heroUrl", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep", children: "Mentor Profile Image" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("img", { src: cmsData.images?.instructorUrl || "/assets/instructor.jpg", alt: "Mentor Preview", className: "h-14 w-14 rounded-xl object-cover border border-border bg-muted/20", onError: (e) => {
                      e.target.src = "/placeholder.svg";
                    } }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
                      /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: async (e) => {
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
                      }, className: "w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer" }),
                      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Or paste external image URL...", value: cmsData.images?.instructorUrl || "", onChange: (e) => handleFieldChange("images", "instructorUrl", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep", children: "Features Graphic Circle" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("img", { src: cmsData.images?.featureUrl || "/assets/feature-yoga.jpg", alt: "Features Preview", className: "h-14 w-14 rounded-xl object-cover border border-border bg-muted/20", onError: (e) => {
                      e.target.src = "/placeholder.svg";
                    } }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
                      /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: async (e) => {
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
                      }, className: "w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer" }),
                      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Or paste external image URL...", value: cmsData.images?.featureUrl || "", onChange: (e) => handleFieldChange("images", "featureUrl", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron" })
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "hero" ? "" : "hero"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Hero Header" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit main title, subtitles, and schedule badges" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "hero" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "hero" && /* @__PURE__ */ jsxs("div", { className: "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Marathi Title" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.hero.marathiTitle, onChange: (e) => handleFieldChange("hero", "marathiTitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "English Title (Start)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.hero.englishTitleStart, onChange: (e) => handleFieldChange("hero", "englishTitleStart", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "English Title (Highlight)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.hero.englishTitleHighlight, onChange: (e) => handleFieldChange("hero", "englishTitleHighlight", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "English Title (End)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.hero.englishTitleEnd, onChange: (e) => handleFieldChange("hero", "englishTitleEnd", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Description paragraph" }),
                  /* @__PURE__ */ jsx("textarea", { rows: 3, value: cmsData.hero.description, onChange: (e) => handleFieldChange("hero", "description", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Starts On Date" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.hero.startDate, onChange: (e) => handleFieldChange("hero", "startDate", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Live Sessions Schedule" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.hero.liveTimes, onChange: (e) => handleFieldChange("hero", "liveTimes", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Student Rating Count Caption" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.hero.studentRatingText, onChange: (e) => handleFieldChange("hero", "studentRatingText", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "mentor" ? "" : "mentor"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Mentor Details" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit instructor names, subtitles, experience stats, and biography" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "mentor" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "mentor" && /* @__PURE__ */ jsxs("div", { className: "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Mentor Name" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.mentor.name, onChange: (e) => handleFieldChange("mentor", "name", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Experience Years Count" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.mentor.experienceYears, onChange: (e) => handleFieldChange("mentor", "experienceYears", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Marathi Subtitle" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.mentor.marathiSubtitle, onChange: (e) => handleFieldChange("mentor", "marathiSubtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "English Subtitle" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.mentor.englishSubtitle, onChange: (e) => handleFieldChange("mentor", "englishSubtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Mentor Biography" }),
                  /* @__PURE__ */ jsx("textarea", { rows: 3, value: cmsData.mentor.description, onChange: (e) => handleFieldChange("mentor", "description", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Students Count Stat (e.g., 1K+)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.mentor.statsStudents, onChange: (e) => handleFieldChange("mentor", "statsStudents", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Plan Duration Stat (e.g., 365)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.mentor.statsPlan, onChange: (e) => handleFieldChange("mentor", "statsPlan", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Rating Stat Score (e.g., 4.9★)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.mentor.statsRating, onChange: (e) => handleFieldChange("mentor", "statsRating", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "pricing" ? "" : "pricing"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Pricing & Value" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit plan names, discount rates, pricing numbers, and day rates" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "pricing" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "pricing" && /* @__PURE__ */ jsxs("div", { className: "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Plan Name Caption" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.pricing.planName, onChange: (e) => handleFieldChange("pricing", "planName", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Discount Rate Text (e.g., 58% OFF)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.pricing.discountText, onChange: (e) => handleFieldChange("pricing", "discountText", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Sale Offer Price (e.g., ₹4,999)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.pricing.price, onChange: (e) => handleFieldChange("pricing", "price", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Original Price (e.g., ₹12,000)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.pricing.originalPrice, onChange: (e) => handleFieldChange("pricing", "originalPrice", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Rupee Daily Cost Plan (e.g., ₹13)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.pricing.rupeeCost, onChange: (e) => handleFieldChange("pricing", "rupeeCost", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Rupee Cost Subtitle Caption" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.pricing.rupeeCostSubtitle, onChange: (e) => handleFieldChange("pricing", "rupeeCostSubtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "contacts" ? "" : "contacts"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Link, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Socials & Contacts" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit call numbers, Whatsapp API phone values, and social platform links" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "contacts" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "contacts" && /* @__PURE__ */ jsxs("div", { className: "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Direct Call Phone Number (e.g., +91 95793 17724)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.contacts.phone, onChange: (e) => handleFieldChange("contacts", "phone", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "WhatsApp API Digits Only (e.g., 919579317724)" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.contacts.whatsappNumber, onChange: (e) => handleFieldChange("contacts", "whatsappNumber", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Instagram Feed Link URL" }),
                  /* @__PURE__ */ jsx("input", { type: "url", value: cmsData.contacts.instagramUrl, onChange: (e) => handleFieldChange("contacts", "instagramUrl", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Facebook Link URL" }),
                  /* @__PURE__ */ jsx("input", { type: "url", value: cmsData.contacts.facebookUrl, onChange: (e) => handleFieldChange("contacts", "facebookUrl", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Threads Link URL" }),
                  /* @__PURE__ */ jsx("input", { type: "url", value: cmsData.contacts.threadsUrl, onChange: (e) => handleFieldChange("contacts", "threadsUrl", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "whyJoin" ? "" : "whyJoin"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Why Join" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit section title, subtitle, and the four key benefit items" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "whyJoin" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "whyJoin" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                    /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.whyJoin.title, onChange: (e) => handleFieldChange("whyJoin", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Subtitle" }),
                    /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.whyJoin.subtitle, onChange: (e) => handleFieldChange("whyJoin", "subtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3", children: "Benefit Cards (4 items)" }),
                  /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: cmsData.whyJoin.items.map((it, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-muted-foreground", children: [
                      "Benefit Item #",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Icon String (e.g. Sun, Heart, Award, Users)" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: it.icon, onChange: (e) => handleArrayFieldChange("whyJoin", "items", i, "icon", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "English Title" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: it.title, onChange: (e) => handleArrayFieldChange("whyJoin", "items", i, "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Marathi Title" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: it.marathi, onChange: (e) => handleArrayFieldChange("whyJoin", "items", i, "marathi", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Description" }),
                        /* @__PURE__ */ jsx("textarea", { rows: 2, value: it.desc, onChange: (e) => handleArrayFieldChange("whyJoin", "items", i, "desc", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none" })
                      ] })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "whoFor" ? "" : "whoFor"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Who It's For" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit target audience categories, icons, and descriptions (6 cards)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "whoFor" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "whoFor" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-w-md", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.whoFor.title, onChange: (e) => handleFieldChange("whoFor", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3", children: "Audience Cards (6 items)" }),
                  /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: cmsData.whoFor.cards.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-muted-foreground", children: [
                      "Audience Card #",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Icon String (e.g. Briefcase, Home, GraduationCap, Baby, Scale, Brain)" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: c.icon, onChange: (e) => handleArrayFieldChange("whoFor", "cards", i, "icon", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Card Title" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: c.title, onChange: (e) => handleArrayFieldChange("whoFor", "cards", i, "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Description" }),
                        /* @__PURE__ */ jsx("textarea", { rows: 2, value: c.desc, onChange: (e) => handleArrayFieldChange("whoFor", "cards", i, "desc", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none" })
                      ] })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "features" ? "" : "features"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Features & Benefits" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit main title, subtitles, and floating badges (6 items)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "features" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "features" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                    /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.features.title, onChange: (e) => handleFieldChange("features", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Subtitle" }),
                    /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.features.subtitle, onChange: (e) => handleFieldChange("features", "subtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3", children: "Floating Badges (6 items)" }),
                  /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-3", children: cmsData.features.items.map((feat, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border border-border/80 bg-muted/10 space-y-3 shadow-soft", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-muted-foreground", children: [
                      "Badge #",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Icon String (e.g. Sun, Brain, Wind, Scale, Leaf, Heart)" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: feat.icon, onChange: (e) => handleArrayFieldChange("features", "items", i, "icon", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Badge Label" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: feat.label, onChange: (e) => handleArrayFieldChange("features", "items", i, "label", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "reasons" ? "" : "reasons"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Reasons to Join" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit reasons banner title and benefit bullet list (5 items)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "reasons" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "reasons" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-w-md", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.reasons.title, onChange: (e) => handleFieldChange("reasons", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3", children: "Bullet Reasons (5 items)" }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-4", children: cmsData.reasons.items.map((it, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border border-border/80 bg-muted/10 grid gap-4 md:grid-cols-2 items-center shadow-soft", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-muted-foreground", children: [
                      "Reason #",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:col-span-2", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Title" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: it.title, onChange: (e) => handleArrayFieldChange("reasons", "items", i, "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Description" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: it.desc, onChange: (e) => handleArrayFieldChange("reasons", "items", i, "desc", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "beforeAfter" ? "" : "beforeAfter"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Flame, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Before & After" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit titles, subtitles, and list comparison bullets" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "beforeAfter" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "beforeAfter" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-w-md", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.beforeAfter.title, onChange: (e) => handleFieldChange("beforeAfter", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-border bg-muted/5 space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Left Card (Before / Current State)" }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Header Label" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.beforeAfter.beforeTitle, onChange: (e) => handleFieldChange("beforeAfter", "beforeTitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Subtitle" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.beforeAfter.beforeSubtitle, onChange: (e) => handleFieldChange("beforeAfter", "beforeSubtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2 border-t border-border/40 pt-3", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Bullet Points (5 items)" }),
                      cmsData.beforeAfter.beforeItems.map((item, idx) => /* @__PURE__ */ jsx("input", { type: "text", value: item, onChange: (e) => handleBeforeAfterItemChange("beforeItems", idx, e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" }, idx))
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-saffron/20 bg-saffron/5 space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep", children: "Right Card (After / Transformation State)" }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Header Label" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.beforeAfter.afterTitle, onChange: (e) => handleFieldChange("beforeAfter", "afterTitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Subtitle" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.beforeAfter.afterSubtitle, onChange: (e) => handleFieldChange("beforeAfter", "afterSubtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2 border-t border-border/40 pt-3", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Bullet Points (5 items)" }),
                      cmsData.beforeAfter.afterItems.map((item, idx) => /* @__PURE__ */ jsx("input", { type: "text", value: item, onChange: (e) => handleBeforeAfterItemChange("afterItems", idx, e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" }, idx))
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "bestStudents" ? "" : "bestStudents"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Trophy, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Star Students" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit month's best students, stats, achievements, quotes (3 cards)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "bestStudents" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "bestStudents" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                    /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.bestStudents.title, onChange: (e) => handleFieldChange("bestStudents", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Subtitle" }),
                    /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.bestStudents.subtitle, onChange: (e) => handleFieldChange("bestStudents", "subtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3", children: "Star Student Cards (3 items)" }),
                  /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-3", children: cmsData.bestStudents.students.map((st, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-muted-foreground", children: [
                      "Student #",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Name" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: st.name, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "name", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Location & Role" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: st.location, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "location", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Avatar Text (Initials)" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: st.imageText, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "imageText", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Consistency Metric Tag (e.g. 98% Consistency)" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: st.stat, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "stat", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Focus/Tag Title" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: st.tag, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "tag", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Days Metric (e.g. 29/30 Days)" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: st.days, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "days", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Achievement Title" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: st.achievement, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "achievement", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Accent styling classes" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: st.color, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "color", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Student Quote" }),
                        /* @__PURE__ */ jsx("textarea", { rows: 3, value: st.quote, onChange: (e) => handleArrayFieldChange("bestStudents", "students", i, "quote", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron resize-none" })
                      ] })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "reels" ? "" : "reels"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Instagram Reels" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit social showcase header, reels titles, topics, metrics (4 items)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "reels" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "reels" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                    /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.reels.title, onChange: (e) => handleFieldChange("reels", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Subtitle" }),
                    /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.reels.subtitle, onChange: (e) => handleFieldChange("reels", "subtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3", children: "Reels Items (4 items)" }),
                  /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: cmsData.reels.items.map((rl, i) => {
                    const item = rl;
                    return /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft", children: [
                      /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-muted-foreground", children: [
                        "Reel #",
                        i + 1
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
                        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Instagram Reel URL" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                            /* @__PURE__ */ jsx("input", { type: "text", placeholder: "https://www.instagram.com/reel/...", value: item.reelUrl || "", onChange: (e) => handleArrayFieldChange("reels", "items", i, "reelUrl", e.target.value), className: "flex-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron focus:ring-1 focus:ring-saffron/20" }),
                            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
                              const url = item.reelUrl || "";
                              const shortcode = getInstagramShortcode(url);
                              if (shortcode) {
                                const computedCover = `https://www.instagram.com/p/${shortcode}/media/?size=l`;
                                handleArrayFieldChange("reels", "items", i, "imageUrl", computedCover);
                                toast.success("Cover banner fetched successfully!");
                              } else {
                                toast.error("Please enter a valid Instagram reel URL first.");
                              }
                            }, className: "rounded-xl bg-saffron/10 px-3 py-1.5 text-[10px] font-bold text-saffron-deep hover:bg-saffron/20", children: "⚡ Fetch Cover" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Cover Banner Image" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                            item.imageUrl ? /* @__PURE__ */ jsx("img", { src: item.imageUrl, alt: "Cover Preview", className: "h-10 w-10 rounded-lg object-cover border border-border bg-muted/20" }) : /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-lg border border-dashed border-border flex items-center justify-center text-[10px] text-muted-foreground", children: "None" }),
                            /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-1.5", children: [
                              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    const base64 = await compressAndConvertImage(file, 400, 700);
                                    handleArrayFieldChange("reels", "items", i, "imageUrl", base64);
                                    toast.success("Cover banner uploaded successfully!");
                                  } catch (err) {
                                    toast.error("Failed to process cover.");
                                  }
                                }
                              }, className: "w-full text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer" }),
                              /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Or paste external banner image URL...", value: item.imageUrl || "", onChange: (e) => handleArrayFieldChange("reels", "items", i, "imageUrl", e.target.value), className: "w-full rounded-xl border border-border bg-background px-2 py-1 text-[10px] outline-none focus:border-saffron" })
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Reel Title" }),
                          /* @__PURE__ */ jsx("input", { type: "text", value: rl.title, onChange: (e) => handleArrayFieldChange("reels", "items", i, "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Topic Description" }),
                          /* @__PURE__ */ jsx("input", { type: "text", value: rl.topic, onChange: (e) => handleArrayFieldChange("reels", "items", i, "topic", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Likes Count" }),
                            /* @__PURE__ */ jsx("input", { type: "text", value: rl.likes, onChange: (e) => handleArrayFieldChange("reels", "items", i, "likes", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Comments Count" }),
                            /* @__PURE__ */ jsx("input", { type: "text", value: rl.comments, onChange: (e) => handleArrayFieldChange("reels", "items", i, "comments", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Preview Image Text (Fallback)" }),
                          /* @__PURE__ */ jsx("input", { type: "text", value: rl.bgText, onChange: (e) => handleArrayFieldChange("reels", "items", i, "bgText", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "CSS HSL Gradients (Fallback)" }),
                          /* @__PURE__ */ jsx("input", { type: "text", value: rl.gradient, onChange: (e) => handleArrayFieldChange("reels", "items", i, "gradient", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron" })
                        ] })
                      ] })
                    ] }, i);
                  }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "finalCta" ? "" : "finalCta"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Final Call to Action" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit bottom slogan, Marathi subtitle, button and seat limit texts" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "finalCta" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "finalCta" && /* @__PURE__ */ jsxs("div", { className: "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "English Main Slogan Title" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.finalCta.title, onChange: (e) => handleFieldChange("finalCta", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Marathi Subtitle" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.finalCta.marathiSubtitle, onChange: (e) => handleFieldChange("finalCta", "marathiSubtitle", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Button Text" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.finalCta.buttonText, onChange: (e) => handleFieldChange("finalCta", "buttonText", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Seats Left Caption Text" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.finalCta.seatsLeftText, onChange: (e) => handleFieldChange("finalCta", "seatsLeftText", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "faqSection" ? "" : "faqSection"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Dynamic FAQs" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit accordion questions and complete answers (6 items)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "faqSection" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "faqSection" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-w-md", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.faqSection.title, onChange: (e) => handleFieldChange("faqSection", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3", children: "Questions & Answers (6 items)" }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-5", children: cmsData.faqSection.faqs.map((faq, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-3 shadow-soft", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-muted-foreground", children: [
                      "FAQ #",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Question" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: faq.q, onChange: (e) => handleArrayFieldChange("faqSection", "faqs", i, "q", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Answer" }),
                        /* @__PURE__ */ jsx("textarea", { rows: 3, value: faq.a, onChange: (e) => handleArrayFieldChange("faqSection", "faqs", i, "a", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none" })
                      ] })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "transition-all", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setExpandedSection(expandedSection === "testimonials" ? "" : "testimonials"), className: "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-foreground", children: "Testimonials / Reviews" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit reviews main heading and individual client success quotes (6 items)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-muted-foreground transition-transform duration-200 ${expandedSection === "testimonials" ? "rotate-180" : ""}`, children: "▼" })
              ] }),
              expandedSection === "testimonials" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border-t border-border/40", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-w-md", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Section Title" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: cmsData.testimonials.title, onChange: (e) => handleFieldChange("testimonials", "title", e.target.value), className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3", children: "Client Reviews (6 items)" }),
                  /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: cmsData.testimonials.items.map((r, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-muted-foreground", children: [
                      "Review Card #",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Client Name" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: r.name, onChange: (e) => handleArrayFieldChange("testimonials", "items", i, "name", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Location or Subtitle" }),
                        /* @__PURE__ */ jsx("input", { type: "text", value: r.role, onChange: (e) => handleArrayFieldChange("testimonials", "items", i, "role", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Quote / Review Text" }),
                        /* @__PURE__ */ jsx("textarea", { rows: 3, value: r.text, onChange: (e) => handleArrayFieldChange("testimonials", "items", i, "text", e.target.value), className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none" })
                      ] })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "flex items-center justify-center gap-2 rounded-2xl gradient-warm px-8 py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-50", children: saving ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }),
            "Saving Configurations..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5" }),
            "Save All Changes"
          ] }) }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminPage as component
};
