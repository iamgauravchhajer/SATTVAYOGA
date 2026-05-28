import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Plus, X, Loader2, Phone, MessageCircle, Flower2, Menu, Sparkles, Calendar, Clock, ArrowRight, Star, Heart, Brain, Activity, CheckCircle2, Flame, Trophy, TrendingUp, Instagram, Play, Facebook, Sun, Leaf, Wind, Scale, Baby, GraduationCap, Home, Briefcase, Users, Award } from "lucide-react";
import { D as DEFAULT_CONTENT, R as Reveal } from "./defaultContent-DRO9wp6K.js";
import { b as submitLead, R as Route, d as db } from "./router-DmriS4An.js";
import { toast } from "sonner";
import { doc, onSnapshot } from "firebase/firestore";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "firebase/app";
import "firebase/auth";
function getTarget() {
  const t = /* @__PURE__ */ new Date();
  t.setDate(t.getDate() + 3);
  t.setHours(20, 0, 0, 0);
  return t.getTime();
}
function Countdown() {
  const [target] = useState(getTarget);
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(i);
  }, []);
  const ready = now !== null;
  const diff = ready ? Math.max(0, target - now) : 0;
  const d = Math.floor(diff / 864e5);
  const h = Math.floor(diff / 36e5 % 24);
  const m = Math.floor(diff / 6e4 % 60);
  const s = Math.floor(diff / 1e3 % 60);
  const Cell = ({ v, l }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center rounded-2xl bg-brown px-4 py-3 text-cream shadow-soft sm:px-6 sm:py-4", children: [
    /* @__PURE__ */ jsx("span", { className: "font-display text-3xl font-bold tabular-nums sm:text-5xl", children: ready ? String(v).padStart(2, "0") : "--" }),
    /* @__PURE__ */ jsx("span", { className: "mt-1 text-[10px] uppercase tracking-[0.2em] opacity-80 sm:text-xs", children: l })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 sm:gap-4", children: [
    /* @__PURE__ */ jsx(Cell, { v: d, l: "Days" }),
    /* @__PURE__ */ jsx(Cell, { v: h, l: "Hours" }),
    /* @__PURE__ */ jsx(Cell, { v: m, l: "Minutes" }),
    /* @__PURE__ */ jsx(Cell, { v: s, l: "Seconds" })
  ] });
}
function Faq({ faqs }) {
  const [open, setOpen] = useState(0);
  return /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl space-y-3", children: faqs.map((f, i) => {
    const isOpen = open === i;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "overflow-hidden rounded-2xl bg-brown text-cream shadow-soft transition-all",
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOpen(isOpen ? null : i),
              className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5",
              "aria-expanded": isOpen,
              children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium sm:text-lg", children: f.q }),
                /* @__PURE__ */ jsx(
                  Plus,
                  {
                    className: `h-5 w-5 shrink-0 text-saffron transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
              children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "px-5 pb-5 text-sm leading-relaxed text-cream/80 sm:px-6 sm:pb-6 sm:text-base", children: f.a }) })
            }
          )
        ]
      },
      i
    );
  }) });
}
function JoinModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name";
    if (!/^\+?\d[\d\s-]{7,}$/.test(form.phone)) errs.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await submitLead(form);
      setDone(true);
      toast.success("Lead registered successfully!");
    } catch (err) {
      console.error("Firestore submit error: ", err);
      setDone(true);
      toast.info("Registration processed locally!");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-brown/60 p-4 backdrop-blur-sm",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative w-full max-w-md rounded-3xl bg-card p-6 shadow-soft sm:p-8",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                "aria-label": "Close",
                className: "absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground",
                children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
              }
            ),
            done ? /* @__PURE__ */ jsxs("div", { className: "py-8 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full gradient-warm text-2xl text-primary-foreground", children: "✓" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl", children: "You're in!" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "We'll send your program details on WhatsApp shortly. Namaste 🙏" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl", children: "Reserve your seat" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Begin your 365-day transformation journey." }),
              /* @__PURE__ */ jsxs("form", { className: "mt-5 space-y-3", onSubmit: submit, noValidate: true, children: [
                ["name", "phone", "email"].map((f) => /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: f === "email" ? "email" : "text",
                      placeholder: f === "name" ? "Full name" : f === "phone" ? "Phone / WhatsApp" : "Email address",
                      value: form[f],
                      onChange: (e) => setForm({ ...form, [f]: e.target.value }),
                      className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-saffron/40 transition focus:border-saffron focus:ring-4"
                    }
                  ),
                  errors[f] && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-destructive", children: errors[f] })
                ] }, f)),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: loading,
                    className: "w-full rounded-xl gradient-warm py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none",
                    children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }),
                      "Submitting..."
                    ] }) : "Join Now & Transform"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Limited seats · Refund within 7 days" })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
const heroImg = "/assets/hero-yoga-CxujRay0.jpg";
const instructorImg = "/assets/instructor-DbUHCv8Z.jpg";
const featureImg = "/assets/feature-yoga-Dm6gUL9C.jpg";
const getIconComponent = (iconName) => {
  switch (iconName) {
    case "Sun":
      return Sun;
    case "Heart":
      return Heart;
    case "Award":
      return Award;
    case "Users":
      return Users;
    case "Briefcase":
      return Briefcase;
    case "Home":
      return Home;
    case "GraduationCap":
      return GraduationCap;
    case "Baby":
      return Baby;
    case "Scale":
      return Scale;
    case "Brain":
      return Brain;
    case "Wind":
      return Wind;
    case "Leaf":
      return Leaf;
    case "Sparkles":
      return Sparkles;
    case "Trophy":
      return Trophy;
    case "Flame":
      return Flame;
    case "TrendingUp":
      return TrendingUp;
    case "Instagram":
      return Instagram;
    case "Facebook":
      return Facebook;
    case "Phone":
      return Phone;
    case "Play":
      return Play;
    case "MessageCircle":
      return MessageCircle;
    default:
      return Sun;
  }
};
function Landing() {
  const {
    initialContent
  } = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activeReelUrl, setActiveReelUrl] = useState(null);
  const [content, setContent] = useState(() => {
    if (initialContent) {
      return {
        ...DEFAULT_CONTENT,
        ...initialContent,
        images: {
          ...DEFAULT_CONTENT.images,
          ...initialContent.images
        },
        hero: {
          ...DEFAULT_CONTENT.hero,
          ...initialContent.hero
        },
        mentor: {
          ...DEFAULT_CONTENT.mentor,
          ...initialContent.mentor
        },
        pricing: {
          ...DEFAULT_CONTENT.pricing,
          ...initialContent.pricing
        },
        contacts: {
          ...DEFAULT_CONTENT.contacts,
          ...initialContent.contacts
        },
        whyJoin: {
          ...DEFAULT_CONTENT.whyJoin,
          ...initialContent.whyJoin
        },
        whoFor: {
          ...DEFAULT_CONTENT.whoFor,
          ...initialContent.whoFor
        },
        features: {
          ...DEFAULT_CONTENT.features,
          ...initialContent.features
        },
        reasons: {
          ...DEFAULT_CONTENT.reasons,
          ...initialContent.reasons
        },
        beforeAfter: {
          ...DEFAULT_CONTENT.beforeAfter,
          ...initialContent.beforeAfter
        },
        bestStudents: {
          ...DEFAULT_CONTENT.bestStudents,
          ...initialContent.bestStudents
        },
        reels: {
          ...DEFAULT_CONTENT.reels,
          ...initialContent.reels
        },
        finalCta: {
          ...DEFAULT_CONTENT.finalCta,
          ...initialContent.finalCta
        },
        faqSection: {
          ...DEFAULT_CONTENT.faqSection,
          ...initialContent.faqSection
        },
        testimonials: {
          ...DEFAULT_CONTENT.testimonials,
          ...initialContent.testimonials
        }
      };
    }
    return DEFAULT_CONTENT;
  });
  useEffect(() => {
    if (!db) return;
    try {
      const docRef = doc(db, "content", "landing");
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
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
      }, (error) => {
        console.error("Firestore live update sync error:", error);
      });
      return unsubscribe;
    } catch (err) {
      console.error("Firestore onSnapshot subscription failed:", err);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(Nav, { onJoin: () => setOpen(true), menu, setMenu, contacts: content.contacts, logoUrl: content.images?.logoUrl }),
    /* @__PURE__ */ jsx(Hero, { onJoin: () => setOpen(true), hero: content.hero, imageUrl: content.images?.heroUrl }),
    /* @__PURE__ */ jsx(WhyJoin, { whyJoin: content.whyJoin }),
    /* @__PURE__ */ jsx(WhoFor, { whoFor: content.whoFor }),
    /* @__PURE__ */ jsx(Features, { features: content.features, imageUrl: content.images?.featureUrl }),
    /* @__PURE__ */ jsx(Reasons, { reasons: content.reasons }),
    /* @__PURE__ */ jsx(Instructor, { mentor: content.mentor, imageUrl: content.images?.instructorUrl }),
    /* @__PURE__ */ jsx(Testimonials, { testimonials: content.testimonials }),
    /* @__PURE__ */ jsx(BestStudents, { bestStudents: content.bestStudents }),
    /* @__PURE__ */ jsx(BeforeAfter, { beforeAfter: content.beforeAfter }),
    /* @__PURE__ */ jsx(ReelsShowcase, { reels: content.reels, setActiveReelUrl }),
    /* @__PURE__ */ jsx(PricingSection, { onJoin: () => setOpen(true), pricing: content.pricing }),
    /* @__PURE__ */ jsx(FinalCta, { onJoin: () => setOpen(true), finalCta: content.finalCta }),
    /* @__PURE__ */ jsx(FaqSection, { faqSection: content.faqSection }),
    /* @__PURE__ */ jsx(Footer, { onJoin: () => setOpen(true), contacts: content.contacts, mentor: content.mentor, logoUrl: content.images?.logoUrl }),
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden", children: [
      /* @__PURE__ */ jsx("a", { href: `tel:${content.contacts.phone}`, "aria-label": "Call Pooja Ingle", className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground", children: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("a", { href: `https://wa.me/${content.contacts.whatsappNumber}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Chat on WhatsApp", className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("button", { onClick: () => setOpen(true), className: "flex-1 rounded-xl gradient-warm py-3 font-semibold text-primary-foreground shadow-glow", children: "Join Now & Transform" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "fixed bottom-20 right-4 z-40 flex flex-col gap-3 md:bottom-6", children: [
      /* @__PURE__ */ jsx("a", { href: `tel:${content.contacts.phone}`, "aria-label": "Call Pooja Ingle", className: "flex h-14 w-14 items-center justify-center rounded-full bg-saffron text-white shadow-glow transition hover:scale-110", children: /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("a", { href: `https://wa.me/${content.contacts.whatsappNumber}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Chat on WhatsApp", className: "flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:scale-110", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" }) })
    ] }),
    /* @__PURE__ */ jsx(JoinModal, { open, onClose: () => setOpen(false) }),
    activeReelUrl && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-[400px] aspect-[9/16] max-h-[85vh] bg-brown rounded-[2.5rem] overflow-hidden border border-cream/20 shadow-glow flex flex-col justify-center", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setActiveReelUrl(null), className: "absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-cream backdrop-blur transition hover:scale-110", "aria-label": "Close video", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("iframe", { src: `https://www.instagram.com/p/${getInstagramShortcode(activeReelUrl)}/embed`, className: "w-full h-full border-0", allowFullScreen: true, scrolling: "no", title: "Instagram Reel Player" })
    ] }) })
  ] });
}
function Nav({
  onJoin,
  menu,
  setMenu,
  contacts,
  logoUrl
}) {
  const links = [{
    href: "#why",
    label: "Why Join"
  }, {
    href: "#who",
    label: "Who It's For"
  }, {
    href: "#instructor",
    label: "Mentor"
  }, {
    href: "#testimonials",
    label: "Reviews"
  }, {
    href: "#faq",
    label: "FAQ"
  }];
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6", children: [
      /* @__PURE__ */ jsxs("a", { href: "#top", className: "flex items-center gap-2", children: [
        logoUrl ? /* @__PURE__ */ jsx("img", { src: logoUrl, alt: "SATTVAYOGA Logo", className: "h-9 w-9 rounded-full object-cover shadow-soft border border-saffron/20" }) : /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full gradient-warm text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsx(Flower2, { className: "h-5 w-5 animate-pulse" }) }),
        /* @__PURE__ */ jsxs("span", { className: "font-display text-lg font-bold tracking-tight", children: [
          "SATTVAYOGA ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "365" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-7 md:flex", children: links.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, className: "text-sm font-semibold text-foreground/80 transition hover:text-saffron-deep", children: l.label }, l.href)) }),
      /* @__PURE__ */ jsx("button", { onClick: onJoin, className: "hidden rounded-full gradient-warm px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-105 md:inline-flex", children: "Join Now" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setMenu(!menu), className: "relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground md:hidden", "aria-label": "Menu", children: menu ? /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4" }) })
    ] }),
    menu && /* @__PURE__ */ jsxs("div", { className: "fixed inset-x-0 top-[61px] z-40 border-b border-border/80 bg-background/95 p-6 backdrop-blur-xl md:hidden shadow-soft flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: links.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, onClick: () => setMenu(false), className: "rounded-xl px-4 py-3 text-base font-semibold hover:bg-saffron/10 text-foreground transition-colors hover:text-saffron-deep", children: l.label }, l.href)) }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        setMenu(false);
        onJoin();
      }, className: "mt-4 w-full rounded-full gradient-warm py-3.5 text-center font-semibold text-primary-foreground shadow-glow", children: "Join Now" })
    ] })
  ] });
}
function Hero({
  onJoin,
  hero,
  imageUrl
}) {
  return /* @__PURE__ */ jsxs("section", { id: "top", className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-40" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
      background: "var(--gradient-hero)"
    } }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-2 md:gap-16 md:pt-16 md:pb-24", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-saffron-deep", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " New Batch · Limited Seats"
        ] }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 80, children: /* @__PURE__ */ jsxs("h1", { className: "mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl", children: [
          /* @__PURE__ */ jsx("span", { className: "marathi block text-2xl sm:text-3xl", children: hero.marathiTitle }),
          hero.englishTitleStart,
          /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: hero.englishTitleHighlight }),
          hero.englishTitleEnd
        ] }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 160, children: /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg", children: hero.description }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 220, children: /* @__PURE__ */ jsxs("div", { className: "mt-7 inline-flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-4 shadow-soft sm:flex-row sm:items-center sm:gap-6 sm:p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-saffron/15 text-saffron-deep", children: /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Starts" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: hero.startDate })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden h-10 w-px bg-border sm:block" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-saffron/15 text-saffron-deep", children: /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Daily Live" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: hero.liveTimes })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 280, children: /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxs("button", { onClick: onJoin, className: "group inline-flex items-center gap-2 rounded-full gradient-warm px-7 py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105 pulse-glow", children: [
            "Join Now & Transform Your Life",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5 transition group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-saffron text-saffron" }, i)) }),
            hero.studentRatingText
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Reveal, { delay: 200, className: "relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-soft", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 gradient-warm opacity-90" }),
          /* @__PURE__ */ jsx("img", { src: imageUrl || heroImg, alt: "Pooja Ingle in yoga pose", width: 1280, height: 1280, className: "relative h-full w-full object-cover mix-blend-luminosity opacity-95" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "float-y absolute -left-2 top-10 hidden rounded-2xl bg-card p-3 shadow-soft sm:flex sm:items-center sm:gap-2", children: [
          /* @__PURE__ */ jsx(Heart, { className: "h-5 w-5 text-saffron-deep" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "Daily Practice" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "float-y-slow absolute -right-2 bottom-16 hidden rounded-2xl bg-card p-3 shadow-soft sm:flex sm:items-center sm:gap-2", children: [
          /* @__PURE__ */ jsx(Brain, { className: "h-5 w-5 text-saffron-deep" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "Mental Peace" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "float-y absolute -bottom-3 left-8 hidden rounded-2xl bg-card p-3 shadow-soft md:flex md:items-center md:gap-2", children: [
          /* @__PURE__ */ jsx(Activity, { className: "h-5 w-5 text-saffron-deep" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "365 Days Plan" })
        ] })
      ] })
    ] })
  ] });
}
function SectionTitle({
  kicker,
  title,
  sub
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
    kicker && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep", children: kicker }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-bold sm:text-4xl md:text-5xl", children: title }),
    sub && /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground sm:text-lg", children: sub })
  ] });
}
function WhyJoin({
  whyJoin
}) {
  return /* @__PURE__ */ jsxs("section", { id: "why", className: "relative py-20 sm:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-[0.06]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, { kicker: "Why Join", title: /* @__PURE__ */ jsxs(Fragment, { children: [
        whyJoin.title.split("Miss")[0],
        /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Miss" }),
        whyJoin.title.split("Miss")[1] || " This Program?"
      ] }), sub: whyJoin.subtitle }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 grid gap-5 md:grid-cols-2", children: whyJoin.items.map((it, i) => {
        const Icon = getIconComponent(it.icon);
        return /* @__PURE__ */ jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxs("div", { className: "group flex gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow sm:p-7", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-warm text-primary-foreground transition group-hover:scale-110", children: /* @__PURE__ */ jsx(Icon, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: it.title }),
            /* @__PURE__ */ jsx("p", { className: "marathi mt-1 text-sm", children: it.marathi }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: it.desc })
          ] })
        ] }) }, i);
      }) })
    ] })
  ] });
}
function WhoFor({
  whoFor
}) {
  return /* @__PURE__ */ jsx("section", { id: "who", className: "relative bg-secondary/50 py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, { kicker: "Who is this for", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      whoFor.title.split("Every")[0],
      /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Every" }),
      whoFor.title.split("Every")[1] || " Lifestyle"
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: whoFor.cards.map((c, i) => {
      const Icon = getIconComponent(c.icon);
      return /* @__PURE__ */ jsx(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxs("div", { className: "group h-full overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-2 hover:border-saffron/40", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/15 text-saffron-deep transition group-hover:bg-saffron group-hover:text-primary-foreground", children: /* @__PURE__ */ jsx(Icon, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: c.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: c.desc })
      ] }) }, i);
    }) })
  ] }) });
}
function Features({
  features,
  imageUrl
}) {
  return /* @__PURE__ */ jsxs("section", { className: "relative py-20 sm:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-30" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, { kicker: "Features & Benefits", title: /* @__PURE__ */ jsxs(Fragment, { children: [
        features.title.split("In One Practice")[0],
        /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "In One Practice" }),
        features.title.split("In One Practice")[1] || ""
      ] }), sub: features.subtitle }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mt-16 aspect-square w-full max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-8 overflow-hidden rounded-full shadow-soft", children: [
          /* @__PURE__ */ jsx("img", { src: imageUrl || featureImg, alt: "Yoga practice", loading: "lazy", width: 1024, height: 1024, className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent" })
        ] }),
        features.items.map((l, i) => {
          const Icon = getIconComponent(l.icon);
          return /* @__PURE__ */ jsx("div", { className: `absolute ${l.pos} ${i % 2 ? "float-y-slow" : "float-y"}`, style: {
            animationDelay: `${i * 0.4}s`
          }, children: /* @__PURE__ */ jsxs("div", { className: "glass flex items-center gap-2 rounded-full px-4 py-2.5 shadow-soft", children: [
            /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-saffron-deep" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold whitespace-nowrap", children: l.label })
          ] }) }, i);
        })
      ] })
    ] })
  ] });
}
function Reasons({
  reasons
}) {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-brown py-20 text-cream sm:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-grid opacity-[0.05]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-5xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-saffron", children: "Reasons to Join" }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-3 text-3xl font-bold sm:text-4xl md:text-5xl", children: [
          reasons.title.split("Stay & Thrive")[0],
          /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Stay & Thrive" }),
          reasons.title.split("Stay & Thrive")[1] || ""
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 space-y-4", children: reasons.items.map((it, i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxs("div", { className: "group flex items-start gap-5 rounded-2xl border border-cream/10 bg-cream/5 p-6 transition hover:bg-cream/10", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-warm font-display text-xl font-bold text-primary-foreground", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-cream", children: it.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-cream/75", children: it.desc })
        ] }),
        /* @__PURE__ */ jsx(CheckCircle2, { className: "ml-auto hidden h-6 w-6 text-saffron sm:block" })
      ] }) }, i)) })
    ] })
  ] });
}
function Instructor({
  mentor,
  imageUrl
}) {
  return /* @__PURE__ */ jsx("section", { id: "instructor", className: "relative py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto w-full max-w-md", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 rounded-[2.5rem] gradient-warm opacity-20 blur-2xl" }),
      /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft", children: /* @__PURE__ */ jsx("img", { src: imageUrl || instructorImg, alt: mentor.name, loading: "lazy", width: 896, height: 1024, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "float-y absolute -bottom-6 -right-4 rounded-2xl bg-card p-4 shadow-soft", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-saffron-deep", children: mentor.experienceYears }),
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Years exp" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Reveal, { delay: 120, children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep", children: "Meet Your Mentor" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-4xl font-bold sm:text-5xl", children: mentor.name }),
      /* @__PURE__ */ jsx("p", { className: "marathi mt-2 text-lg", children: mentor.marathiSubtitle }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg text-muted-foreground", children: mentor.englishSubtitle }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-foreground/85 leading-relaxed", children: mentor.description }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-3 gap-4", children: [{
        v: mentor.statsStudents,
        l: "Students"
      }, {
        v: mentor.statsPlan,
        l: "Day Plan"
      }, {
        v: mentor.statsRating,
        l: "Rating"
      }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 text-center shadow-soft", children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-2xl font-bold text-saffron-deep", children: s.v }),
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: s.l })
      ] }, s.l)) })
    ] })
  ] }) });
}
function Testimonials({
  testimonials
}) {
  return /* @__PURE__ */ jsx("section", { id: "testimonials", className: "relative bg-secondary/50 py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, { kicker: "Testimonials", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      testimonials.title.split("Real Transformation.")[0],
      /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Real Transformation." }),
      testimonials.title.split("Real Transformation.")[1] || ""
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory md:columns-3 md:block md:overflow-x-visible md:pb-0 [&>*]:mb-5 [&>*]:break-inside-avoid", children: testimonials.items.map((r, i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 60, className: "min-w-[280px] flex-1 snap-start md:min-w-0 md:block", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-brown p-6 text-cream shadow-soft h-full flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 flex", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-saffron text-saffron" }, s)) }),
        /* @__PURE__ */ jsxs("p", { className: "text-cream/90 leading-relaxed", children: [
          '"',
          r.text,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-3 border-t border-cream/10 pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-warm font-bold text-primary-foreground", children: r.name[0] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: r.name }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-cream/60", children: r.role })
        ] })
      ] })
    ] }) }, i)) })
  ] }) });
}
function BeforeAfter({
  beforeAfter
}) {
  return /* @__PURE__ */ jsx("section", { className: "relative py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, { kicker: "Before · After", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      beforeAfter.title.split("Where You Are")[0],
      /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Where You Are" }),
      beforeAfter.title.split("Where You Are")[1] || " to Where You Want to Be"
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-14 grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-9", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: beforeAfter.beforeTitle }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-2xl font-bold text-foreground/80", children: beforeAfter.beforeSubtitle }),
        /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3", children: beforeAfter.beforeItems.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-foreground/70", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground", children: "×" }),
          b
        ] }, b)) })
      ] }) }),
      /* @__PURE__ */ jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxs("div", { className: "relative h-full overflow-hidden rounded-3xl bg-brown p-7 text-cream shadow-glow sm:p-9", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-10" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-saffron", children: beforeAfter.afterTitle }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 text-2xl font-bold", children: beforeAfter.afterSubtitle }),
          /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3", children: beforeAfter.afterItems.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-6 w-6 shrink-0 text-saffron" }),
            b
          ] }, b)) })
        ] })
      ] }) })
    ] })
  ] }) });
}
function FinalCta({
  onJoin,
  finalCta
}) {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden py-20 sm:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 gradient-warm opacity-95" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-20" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl px-4 text-center text-primary-foreground sm:px-6", children: [
      /* @__PURE__ */ jsxs(Reveal, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold leading-tight sm:text-5xl md:text-6xl", children: finalCta.title }),
        /* @__PURE__ */ jsx("p", { className: "marathi mt-4 text-xl text-white/90", children: finalCta.marathiSubtitle })
      ] }),
      /* @__PURE__ */ jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsx(Countdown, {}) }) }),
      /* @__PURE__ */ jsxs(Reveal, { delay: 200, children: [
        /* @__PURE__ */ jsxs("button", { onClick: onJoin, className: "mt-10 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 font-semibold text-brown shadow-soft transition hover:scale-105 pulse-glow", children: [
          finalCta.buttonText,
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-white/80", children: finalCta.seatsLeftText })
      ] })
    ] })
  ] });
}
function FaqSection({
  faqSection
}) {
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "py-20 sm:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, { kicker: "FAQ", title: /* @__PURE__ */ jsxs(Fragment, { children: [
      faqSection.title.split("Answered")[0],
      /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Answered" }),
      faqSection.title.split("Answered")[1] || ""
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(Faq, { faqs: faqSection.faqs }) })
  ] }) });
}
function Footer({
  onJoin,
  contacts,
  mentor,
  logoUrl
}) {
  return /* @__PURE__ */ jsxs("footer", { className: "relative bg-brown pb-24 pt-16 text-cream md:pb-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("a", { href: "#top", className: "flex items-center gap-2", children: [
          logoUrl ? /* @__PURE__ */ jsx("img", { src: logoUrl, alt: "SATTVAYOGA Logo", className: "h-9 w-9 rounded-full object-cover shadow-soft border border-saffron/20" }) : /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full gradient-warm", children: /* @__PURE__ */ jsx(Flower2, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-display text-lg font-bold", children: [
            "SATTVAYOGA ",
            /* @__PURE__ */ jsx("span", { className: "text-saffron", children: "365" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 max-w-xs text-cream/70", children: [
          "A 365-day transformation journey by ",
          mentor.name,
          ". Daily yoga, real results."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 text-sm text-cream/80", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-saffron", children: "Links" }),
        /* @__PURE__ */ jsx("a", { href: "#why", className: "hover:text-saffron", children: "Why Join" }),
        /* @__PURE__ */ jsx("a", { href: "#instructor", className: "hover:text-saffron", children: "Mentor" }),
        /* @__PURE__ */ jsx("a", { href: "#faq", className: "hover:text-saffron", children: "FAQ" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-saffron", children: "Terms" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-saffron", children: "Privacy Policy" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-saffron", children: "Ready to begin?" }),
        /* @__PURE__ */ jsx("button", { onClick: onJoin, className: "rounded-full gradient-warm px-6 py-3 font-semibold text-primary-foreground shadow-glow", children: "Join SATTVAYOGA 365" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: contacts.instagramUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", className: "flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron", children: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsx("a", { href: contacts.facebookUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": "Facebook", className: "flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron", children: /* @__PURE__ */ jsx(Facebook, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsx("a", { href: contacts.threadsUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": "Threads", className: "flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12.586 2.002c-5.597 0-10.141 4.544-10.141 10.141 0 2.508.91 4.8 2.41 6.575l.135.158 1.157-1.157-.107-.118a8.47 8.47 0 0 1-1.995-5.458c0-4.698 3.81-8.508 8.508-8.508s8.508 3.81 8.508 8.508c0 4.33-3.238 7.91-7.464 8.455v-2.072c1.782-.472 3.123-2.023 3.123-3.923 0-2.222-1.808-4.03-4.03-4.03s-4.03 1.808-4.03 4.03c0 .886.29 1.704.778 2.37l.092.124 1.157-1.157-.07-.086a2.38 2.38 0 0 1-.357-1.251c0-1.328 1.082-2.41 2.41-2.41s2.41 1.082 2.41 2.41c0 1.033-.655 1.916-1.574 2.257l-.146.049-1.157 1.157.085.11a4.78 4.78 0 0 0 3.322 1.341c2.656 0 4.81-2.154 4.81-4.81 0-2.457-1.848-4.48-4.24-4.774v-1.632c3.232.327 5.74 3.018 5.74 6.286 0 3.535-2.865 6.4-6.4 6.4a6.38 6.38 0 0 1-4.498-1.844l-.117-.123-1.157 1.157.098.1a7.98 7.98 0 0 0 5.674 2.31c4.418 0 8-3.582 8-8s-3.582-8-8-8z" }) }) }),
          /* @__PURE__ */ jsx("a", { href: `https://wa.me/${contacts.whatsappNumber}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "WhatsApp", className: "flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsx("a", { href: `tel:${contacts.phone}`, "aria-label": "Call Pooja Ingle", className: "flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron", children: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-12 max-w-7xl border-t border-cream/10 px-4 pt-6 text-xs text-cream/60 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsx("span", { children: "© 2026 SATTVAYOGA 365. All rights reserved." }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Made by",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/gugichu.ai", target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-saffron hover:underline transition", children: "Gugichu Technologies" }),
        " | ",
        /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/gugichu.ai", target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-saffron hover:underline transition", children: "@gugichu.ai" })
      ] })
    ] })
  ] });
}
function PricingSection({
  onJoin,
  pricing
}) {
  const features = ["365 Daily Live Guided Sessions (6 AM & 6 PM IST)", "Full Access to Daily Session Recordings Vault", "Personalized Feedback & Mentorship by Pooja Ingle", "Private Community Chat & Accountability Group", "Bonus: Free Diet & Wellness Guidebook (worth ₹1,999)", "Bonus: Standard Post-Delivery Recovery Guide"];
  return /* @__PURE__ */ jsxs("section", { className: "relative py-20 sm:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-20" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, { kicker: "Affordable Excellence", title: /* @__PURE__ */ jsxs(Fragment, { children: [
        "Select Your ",
        /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Transformation Pass" })
      ] }), sub: "Join the most complete, guided 365-day yoga system in India at an unbeatable value." }) }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-14 max-w-3xl", children: /* @__PURE__ */ jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[2.5rem] border border-saffron/30 bg-card p-6 shadow-glow sm:p-10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 rounded-bl-3xl gradient-warm px-5 py-2.5 text-xs font-bold text-primary-foreground tracking-wider uppercase", children: "Best Seller" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2 md:items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-[0.2em] text-saffron-deep", children: "Full Year Unlimited Pass" }),
              /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl font-extrabold text-foreground mt-2", children: pricing.planName })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-4xl font-black text-foreground", children: pricing.price }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-muted-foreground line-through", children: pricing.originalPrice }),
              /* @__PURE__ */ jsx("span", { className: "rounded-full bg-saffron/10 px-3 py-1 text-[10px] font-bold text-saffron-deep uppercase", children: pricing.discountText })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-saffron-deep font-bold text-lg", children: pricing.rupeeCost }),
              /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold", children: "Incredible Value Plan" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: pricing.rupeeCostSubtitle })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: onJoin, className: "w-full rounded-2xl gradient-warm py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105", children: "Get My 365 Pass Now" }),
            /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-3.5 w-3.5" }),
              "Instant activation · Limited slots left"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5 border-t border-border/80 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "What's Included:" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3.5 text-sm", children: features.map((feat, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 shrink-0 text-saffron-deep mt-0.5" }),
              /* @__PURE__ */ jsx("span", { className: "text-foreground/85 leading-tight", children: feat })
            ] }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 pt-4 flex gap-3 text-xs leading-relaxed text-muted-foreground", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "7-Day Refund Guarantee" }),
                ": Try the daily live practice for a full week. If you aren't completely delighted, email us for a 100% refund, no questions asked."
              ] })
            ] })
          ] })
        ] })
      ] }) }) })
    ] })
  ] });
}
function BestStudents({
  bestStudents
}) {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-secondary/50 py-20 sm:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-[0.15]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SectionTitle, { kicker: "Student Spotlight", title: /* @__PURE__ */ jsxs(Fragment, { children: [
        bestStudents.title.split("This Month")[0],
        /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "This Month" }),
        bestStudents.title.split("This Month")[1] || ""
      ] }), sub: bestStudents.subtitle }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0", children: bestStudents.students.map((st, i) => /* @__PURE__ */ jsx(Reveal, { delay: i * 80, className: "min-w-[295px] flex-1 snap-start md:min-w-0", children: /* @__PURE__ */ jsxs("div", { className: "group relative flex flex-col justify-between h-full overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-saffron/30 hover:shadow-glow sm:p-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 border-b border-border/60 pb-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full gradient-warm text-base font-bold text-primary-foreground shadow-glow", children: st.imageText }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-base leading-none text-foreground", children: st.name }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground mt-1.5", children: st.location })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: `rounded-full border px-3 py-1 text-[10px] font-bold ${st.color}`, children: st.stat })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-3 py-1 text-[10px] font-semibold", children: [
              /* @__PURE__ */ jsx(Flame, { className: "h-3 w-3 text-saffron-deep" }),
              st.tag
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-3 py-1 text-[10px] font-semibold", children: [
              /* @__PURE__ */ jsx(Trophy, { className: "h-3 w-3 text-amber-500" }),
              st.days
            ] })
          ] }),
          /* @__PURE__ */ jsx("h5", { className: "mt-5 font-bold text-base text-foreground group-hover:text-saffron-deep transition-colors", children: st.achievement }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm italic text-muted-foreground leading-relaxed", children: [
            '"',
            st.quote,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs font-semibold text-saffron-deep", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4" }),
            "Verified Transformation"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground group-hover:translate-x-1 transition-transform", children: "→" })
        ] })
      ] }) }, i)) })
    ] })
  ] });
}
const getInstagramShortcode = (url) => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9-_]+)/i);
  return match ? match[1] : null;
};
function ReelsShowcase({
  reels,
  setActiveReelUrl
}) {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-brown py-20 text-cream sm:py-28", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dotted opacity-[0.05]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.25em] text-saffron", children: "Social Showcase" }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-3 text-3xl font-bold sm:text-4xl md:text-5xl", children: [
          reels.title.split("Instagram")[0],
          /* @__PURE__ */ jsx("span", { className: "text-gradient-warm", children: "Instagram" }),
          reels.title.split("Instagram")[1] || ""
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-xl text-cream/70 sm:text-lg", children: reels.subtitle })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-x-visible md:pb-0", children: reels.items.map((rl, i) => {
        const shortcode = getInstagramShortcode(rl.reelUrl || "");
        const displayImage = rl.imageUrl || (shortcode ? `https://www.instagram.com/p/${shortcode}/media/?size=l` : null);
        return /* @__PURE__ */ jsx(Reveal, { delay: i * 80, className: "min-w-[260px] flex-1 snap-start md:min-w-0", children: /* @__PURE__ */ jsxs("div", { role: "button", tabIndex: 0, onClick: () => {
          if (shortcode) {
            setActiveReelUrl(rl.reelUrl || null);
          } else {
            window.open(rl.reelUrl || "https://www.instagram.com/sattvayogawithpooja", "_blank", "noopener,noreferrer");
          }
        }, onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (shortcode) {
              setActiveReelUrl(rl.reelUrl || null);
            } else {
              window.open(rl.reelUrl || "https://www.instagram.com/sattvayogawithpooja", "_blank", "noopener,noreferrer");
            }
          }
        }, className: "group relative block aspect-[9/16] w-full overflow-hidden rounded-[2.5rem] border border-cream/15 bg-cream/5 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-saffron/40 hover:shadow-glow cursor-pointer", children: [
          displayImage ? /* @__PURE__ */ jsx("img", { src: displayImage, alt: rl.title, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-t ${rl.gradient} z-10` }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-cream/10 text-cream/30 text-5xl font-display font-black tracking-tighter mix-blend-overlay uppercase select-none p-6 text-center leading-tight", children: rl.bgText })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-20 flex h-full flex-col justify-between p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-bold tracking-wider backdrop-blur-md", children: [
              /* @__PURE__ */ jsx(Instagram, { className: "h-3.5 w-3.5 text-saffron" }),
              "REELS"
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs("span", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-cream backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brown shadow-glow relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:hidden" }),
              /* @__PURE__ */ jsx(Play, { className: "h-7 w-7 fill-current ml-1" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3.5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-base text-cream leading-snug group-hover:text-saffron transition-colors", children: rl.title }),
                /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-xs text-cream/70 leading-relaxed line-clamp-2", children: rl.topic })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 border-t border-cream/15 pt-3.5 text-xs font-bold text-cream/90", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 hover:text-saffron transition", children: [
                  /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 fill-saffron/10 text-saffron" }),
                  rl.likes
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 hover:text-saffron transition", children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4 text-cream/80" }),
                  rl.comments
                ] })
              ] })
            ] })
          ] })
        ] }) }, i);
      }) }),
      /* @__PURE__ */ jsx(Reveal, { delay: 300, children: /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs("a", { href: "https://www.instagram.com/sattvayogawithpooja?igsh=MXUxemNveGF5bDAwcw==", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-full border border-saffron bg-saffron/10 px-7 py-3.5 text-sm font-semibold text-saffron transition hover:bg-saffron hover:text-primary-foreground shadow-soft", children: [
        /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5" }),
        "Follow @sattvayogawithpooja on Instagram"
      ] }) }) })
    ] })
  ] });
}
export {
  Landing as component
};
