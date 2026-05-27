import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import {
  Menu,
  X,
  Sparkles,
  Heart,
  Brain,
  Activity,
  Users,
  Briefcase,
  Home,
  GraduationCap,
  Baby,
  Scale,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  MessageCircle,
  Star,
  Sun,
  Leaf,
  Wind,
  Flower2,
  ArrowRight,
  Instagram,
  Facebook,
  Phone,
  Play,
  Trophy,
  Flame,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { Countdown } from "@/components/landing/Countdown";
import { Faq } from "@/components/landing/Faq";
import { JoinModal } from "@/components/landing/JoinModal";
import heroImg from "@/assets/hero-yoga.jpg";
import instructorImg from "@/assets/instructor.jpg";
import featureImg from "@/assets/feature-yoga.jpg";

const getIconComponent = (iconName: string) => {
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

import { db, getLandingPageContent } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { DEFAULT_CONTENT, type LandingPageContent } from "@/lib/defaultContent";

export const Route = createFileRoute("/")({
  component: Landing,
  loader: async () => {
    try {
      const data = await getLandingPageContent();
      return { initialContent: data };
    } catch (e) {
      console.error("Vite Route Loader error:", e);
      return { initialContent: null };
    }
  },
  head: () => ({
    meta: [
      { title: "SATTVAYOGA 365 — Transform Your Life with Daily Yoga | Pooja Ingle" },
      {
        name: "description",
        content:
          "Join SATTVAYOGA 365, a premium 365-day yoga transformation program by Pooja Ingle. Daily live practice, expert guidance, weight loss, stress relief and mental peace.",
      },
      { property: "og:title", content: "SATTVAYOGA 365 — Transform Your Life" },
      {
        property: "og:description",
        content: "365 days. One mentor. A complete yoga transformation.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "SATTVAYOGA 365",
          description: "365-day yoga transformation program",
          provider: { "@type": "Person", name: "Pooja Ingle" },
        }),
      },
    ],
  }),
});

function Landing() {
  const { initialContent } = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activeReelUrl, setActiveReelUrl] = useState<string | null>(null);
  const [content, setContent] = useState<LandingPageContent>(() => {
    if (initialContent) {
      return {
        ...DEFAULT_CONTENT,
        ...initialContent,
        images: { ...DEFAULT_CONTENT.images, ...initialContent.images },
        hero: { ...DEFAULT_CONTENT.hero, ...initialContent.hero },
        mentor: { ...DEFAULT_CONTENT.mentor, ...initialContent.mentor },
        pricing: { ...DEFAULT_CONTENT.pricing, ...initialContent.pricing },
        contacts: { ...DEFAULT_CONTENT.contacts, ...initialContent.contacts },
        whyJoin: { ...DEFAULT_CONTENT.whyJoin, ...initialContent.whyJoin },
        whoFor: { ...DEFAULT_CONTENT.whoFor, ...initialContent.whoFor },
        features: { ...DEFAULT_CONTENT.features, ...initialContent.features },
        reasons: { ...DEFAULT_CONTENT.reasons, ...initialContent.reasons },
        beforeAfter: { ...DEFAULT_CONTENT.beforeAfter, ...initialContent.beforeAfter },
        bestStudents: { ...DEFAULT_CONTENT.bestStudents, ...initialContent.bestStudents },
        reels: { ...DEFAULT_CONTENT.reels, ...initialContent.reels },
        finalCta: { ...DEFAULT_CONTENT.finalCta, ...initialContent.finalCta },
        faqSection: { ...DEFAULT_CONTENT.faqSection, ...initialContent.faqSection },
        testimonials: { ...DEFAULT_CONTENT.testimonials, ...initialContent.testimonials },
      };
    }
    return DEFAULT_CONTENT;
  });

  useEffect(() => {
    if (!db) return;
    try {
      const docRef = doc(db, "content", "landing");
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setContent({
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
        },
        (error) => {
          console.error("Firestore live update sync error:", error);
        },
      );
      return unsubscribe;
    } catch (err) {
      console.error("Firestore onSnapshot subscription failed:", err);
    }
  }, []);

  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Nav
        onJoin={() => setOpen(true)}
        menu={menu}
        setMenu={setMenu}
        contacts={content.contacts}
        logoUrl={content.images?.logoUrl}
      />
      <Hero onJoin={() => setOpen(true)} hero={content.hero} imageUrl={content.images?.heroUrl} />
      <WhyJoin whyJoin={content.whyJoin} />
      <WhoFor whoFor={content.whoFor} />
      <Features features={content.features} imageUrl={content.images?.featureUrl} />
      <Reasons reasons={content.reasons} />
      <Instructor mentor={content.mentor} imageUrl={content.images?.instructorUrl} />
      <Testimonials testimonials={content.testimonials} />
      <BestStudents bestStudents={content.bestStudents} />
      <BeforeAfter beforeAfter={content.beforeAfter} />
      <ReelsShowcase reels={content.reels} setActiveReelUrl={setActiveReelUrl} />
      <PricingSection onJoin={() => setOpen(true)} pricing={content.pricing} />
      <FinalCta onJoin={() => setOpen(true)} finalCta={content.finalCta} />
      <FaqSection faqSection={content.faqSection} />
      <Footer
        onJoin={() => setOpen(true)}
        contacts={content.contacts}
        mentor={content.mentor}
        logoUrl={content.images?.logoUrl}
      />

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <a
          href={`tel:${content.contacts.phone}`}
          aria-label="Call Pooja Ingle"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={`https://wa.me/${content.contacts.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <button
          onClick={() => setOpen(true)}
          className="flex-1 rounded-xl gradient-warm py-3 font-semibold text-primary-foreground shadow-glow"
        >
          Join Now & Transform
        </button>
      </div>

      {/* Floating Contacts (Call and WhatsApp) for tablet/desktop */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 md:bottom-6">
        <a
          href={`tel:${content.contacts.phone}`}
          aria-label="Call Pooja Ingle"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron text-white shadow-glow transition hover:scale-110"
        >
          <Phone className="h-6 w-6" />
        </a>
        <a
          href={`https://wa.me/${content.contacts.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>

      <JoinModal open={open} onClose={() => setOpen(false)} />

      {/* Premium Glassmorphic Instagram Reels Playback Modal */}
      {activeReelUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-[400px] aspect-[9/16] max-h-[85vh] bg-brown rounded-[2.5rem] overflow-hidden border border-cream/20 shadow-glow flex flex-col justify-center">
            <button
              onClick={() => setActiveReelUrl(null)}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-cream backdrop-blur transition hover:scale-110"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              src={`https://www.instagram.com/p/${getInstagramShortcode(activeReelUrl)}/embed`}
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              title="Instagram Reel Player"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Nav({
  onJoin,
  menu,
  setMenu,
  contacts,
  logoUrl,
}: {
  onJoin: () => void;
  menu: boolean;
  setMenu: (b: boolean) => void;
  contacts: LandingPageContent["contacts"];
  logoUrl?: string;
}) {
  const links = [
    { href: "#why", label: "Why Join" },
    { href: "#who", label: "Who It's For" },
    { href: "#instructor", label: "Mentor" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="SATTVAYOGA Logo"
              className="h-9 w-9 rounded-full object-cover shadow-soft border border-saffron/20"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-warm text-primary-foreground shadow-glow">
              <Flower2 className="h-5 w-5 animate-pulse" />
            </span>
          )}
          <span className="font-display text-lg font-bold tracking-tight">
            SATTVAYOGA <span className="text-gradient-warm">365</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-foreground/80 transition hover:text-saffron-deep"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={onJoin}
          className="hidden rounded-full gradient-warm px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-105 md:inline-flex"
        >
          Join Now
        </button>
        <button
          onClick={() => setMenu(!menu)}
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground md:hidden"
          aria-label="Menu"
        >
          {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Premium Glassmorphic Overlay Menu for Mobile Users */}
      {menu && (
        <div className="fixed inset-x-0 top-[61px] z-40 border-b border-border/80 bg-background/95 p-6 backdrop-blur-xl md:hidden shadow-soft flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-saffron/10 text-foreground transition-colors hover:text-saffron-deep"
              >
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMenu(false);
              onJoin();
            }}
            className="mt-4 w-full rounded-full gradient-warm py-3.5 text-center font-semibold text-primary-foreground shadow-glow"
          >
            Join Now
          </button>
        </div>
      )}
    </header>
  );
}

function Hero({
  onJoin,
  hero,
  imageUrl,
}: {
  onJoin: () => void;
  hero: LandingPageContent["hero"];
  imageUrl?: string;
}) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-dotted opacity-40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-2 md:gap-16 md:pt-16 md:pb-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-saffron-deep">
              <Sparkles className="h-3.5 w-3.5" /> New Batch · Limited Seats
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
              <span className="marathi block text-2xl sm:text-3xl">{hero.marathiTitle}</span>
              {hero.englishTitleStart}
              <span className="text-gradient-warm">{hero.englishTitleHighlight}</span>
              {hero.englishTitleEnd}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-7 inline-flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-4 shadow-soft sm:flex-row sm:items-center sm:gap-6 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron/15 text-saffron-deep">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Starts</p>
                  <p className="font-semibold">{hero.startDate}</p>
                </div>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron/15 text-saffron-deep">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Daily Live
                  </p>
                  <p className="font-semibold">{hero.liveTimes}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onJoin}
                className="group inline-flex items-center gap-2 rounded-full gradient-warm px-7 py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105 pulse-glow"
              >
                Join Now & Transform Your Life
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-saffron text-saffron" />
                  ))}
                </div>
                {hero.studentRatingText}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-soft">
            <div className="absolute inset-0 gradient-warm opacity-90" />
            <img
              src={imageUrl || heroImg}
              alt="Pooja Ingle in yoga pose"
              width={1280}
              height={1280}
              className="relative h-full w-full object-cover mix-blend-luminosity opacity-95"
            />
          </div>
          {/* Floating cards */}
          <div className="float-y absolute -left-2 top-10 hidden rounded-2xl bg-card p-3 shadow-soft sm:flex sm:items-center sm:gap-2">
            <Heart className="h-5 w-5 text-saffron-deep" />
            <span className="text-sm font-semibold">Daily Practice</span>
          </div>
          <div className="float-y-slow absolute -right-2 bottom-16 hidden rounded-2xl bg-card p-3 shadow-soft sm:flex sm:items-center sm:gap-2">
            <Brain className="h-5 w-5 text-saffron-deep" />
            <span className="text-sm font-semibold">Mental Peace</span>
          </div>
          <div className="float-y absolute -bottom-3 left-8 hidden rounded-2xl bg-card p-3 shadow-soft md:flex md:items-center md:gap-2">
            <Activity className="h-5 w-5 text-saffron-deep" />
            <span className="text-sm font-semibold">365 Days Plan</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, sub }: { kicker?: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
          {kicker}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

function WhyJoin({ whyJoin }: { whyJoin: LandingPageContent["whyJoin"] }) {
  return (
    <section id="why" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-dotted opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle
            kicker="Why Join"
            title={
              <>
                {whyJoin.title.split("Miss")[0]}
                <span className="text-gradient-warm">Miss</span>
                {whyJoin.title.split("Miss")[1] || " This Program?"}
              </>
            }
            sub={whyJoin.subtitle}
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {whyJoin.items.map((it, i) => {
            const Icon = getIconComponent(it.icon);
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="group flex gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow sm:p-7">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-warm text-primary-foreground transition group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{it.title}</h3>
                    <p className="marathi mt-1 text-sm">{it.marathi}</p>
                    <p className="mt-2 text-muted-foreground">{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhoFor({ whoFor }: { whoFor: LandingPageContent["whoFor"] }) {
  return (
    <section id="who" className="relative bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle
            kicker="Who is this for"
            title={
              <>
                {whoFor.title.split("Every")[0]}
                <span className="text-gradient-warm">Every</span>
                {whoFor.title.split("Every")[1] || " Lifestyle"}
              </>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whoFor.cards.map((c, i) => {
            const Icon = getIconComponent(c.icon);
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="group h-full overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-2 hover:border-saffron/40">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/15 text-saffron-deep transition group-hover:bg-saffron group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground">{c.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Features({
  features,
  imageUrl,
}: {
  features: LandingPageContent["features"];
  imageUrl?: string;
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-dotted opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle
            kicker="Features & Benefits"
            title={
              <>
                {features.title.split("In One Practice")[0]}
                <span className="text-gradient-warm">In One Practice</span>
                {features.title.split("In One Practice")[1] || ""}
              </>
            }
            sub={features.subtitle}
          />
        </Reveal>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-2xl">
          <div className="absolute inset-8 overflow-hidden rounded-full shadow-soft">
            <img
              src={imageUrl || featureImg}
              alt="Yoga practice"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent" />
          </div>

          {features.items.map((l, i) => {
            const Icon = getIconComponent(l.icon);
            return (
              <div
                key={i}
                className={`absolute ${l.pos} ${i % 2 ? "float-y-slow" : "float-y"}`}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5 shadow-soft">
                  <Icon className="h-4 w-4 text-saffron-deep" />
                  <span className="text-sm font-semibold whitespace-nowrap">{l.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Reasons({ reasons }: { reasons: LandingPageContent["reasons"] }) {
  return (
    <section className="relative bg-brown py-20 text-cream sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-saffron">
              Reasons to Join
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              {reasons.title.split("Stay & Thrive")[0]}
              <span className="text-gradient-warm">Stay & Thrive</span>
              {reasons.title.split("Stay & Thrive")[1] || ""}
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 space-y-4">
          {reasons.items.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group flex items-start gap-5 rounded-2xl border border-cream/10 bg-cream/5 p-6 transition hover:bg-cream/10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-warm font-display text-xl font-bold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cream">{it.title}</h3>
                  <p className="mt-1 text-cream/75">{it.desc}</p>
                </div>
                <CheckCircle2 className="ml-auto hidden h-6 w-6 text-saffron sm:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Instructor({
  mentor,
  imageUrl,
}: {
  mentor: LandingPageContent["mentor"];
  imageUrl?: string;
}) {
  return (
    <section id="instructor" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2.5rem] gradient-warm opacity-20 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
              <img
                src={imageUrl || instructorImg}
                alt={mentor.name}
                loading="lazy"
                width={896}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="float-y absolute -bottom-6 -right-4 rounded-2xl bg-card p-4 shadow-soft">
              <p className="text-2xl font-bold text-saffron-deep">{mentor.experienceYears}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Years exp</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-saffron-deep">
            Meet Your Mentor
          </span>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">{mentor.name}</h2>
          <p className="marathi mt-2 text-lg">{mentor.marathiSubtitle}</p>
          <p className="mt-1 text-lg text-muted-foreground">{mentor.englishSubtitle}</p>
          <p className="mt-6 text-foreground/85 leading-relaxed">{mentor.description}</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: mentor.statsStudents, l: "Students" },
              { v: mentor.statsPlan, l: "Day Plan" },
              { v: mentor.statsRating, l: "Rating" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft"
              >
                <p className="font-display text-2xl font-bold text-saffron-deep">{s.v}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials({ testimonials }: { testimonials: LandingPageContent["testimonials"] }) {
  return (
    <section id="testimonials" className="relative bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle
            kicker="Testimonials"
            title={
              <>
                {testimonials.title.split("Real Transformation.")[0]}
                <span className="text-gradient-warm">Real Transformation.</span>
                {testimonials.title.split("Real Transformation.")[1] || ""}
              </>
            }
          />
        </Reveal>
        <div className="mt-14 flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory md:columns-3 md:block md:overflow-x-visible md:pb-0 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {testimonials.items.map((r, i) => (
            <Reveal
              key={i}
              delay={i * 60}
              className="min-w-[280px] flex-1 snap-start md:min-w-0 md:block"
            >
              <div className="rounded-3xl bg-brown p-6 text-cream shadow-soft h-full flex flex-col justify-between">
                <div>
                  <div className="mb-3 flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-saffron text-saffron" />
                    ))}
                  </div>
                  <p className="text-cream/90 leading-relaxed">"{r.text}"</p>
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-cream/10 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-warm font-bold text-primary-foreground">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-[10px] text-cream/60">{r.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ beforeAfter }: { beforeAfter: LandingPageContent["beforeAfter"] }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle
            kicker="Before · After"
            title={
              <>
                {beforeAfter.title.split("Where You Are")[0]}
                <span className="text-gradient-warm">Where You Are</span>
                {beforeAfter.title.split("Where You Are")[1] || " to Where You Want to Be"}
              </>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-9">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {beforeAfter.beforeTitle}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-foreground/80">
                {beforeAfter.beforeSubtitle}
              </h3>
              <ul className="mt-6 space-y-3">
                {beforeAfter.beforeItems.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-foreground/70">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      ×
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-brown p-7 text-cream shadow-glow sm:p-9">
              <div className="absolute inset-0 bg-dotted opacity-10" />
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-wider text-saffron">
                  {beforeAfter.afterTitle}
                </span>
                <h3 className="mt-2 text-2xl font-bold">{beforeAfter.afterSubtitle}</h3>
                <ul className="mt-6 space-y-3">
                  {beforeAfter.afterItems.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-saffron" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCta({
  onJoin,
  finalCta,
}: {
  onJoin: () => void;
  finalCta: LandingPageContent["finalCta"];
}) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 gradient-warm opacity-95" />
      <div className="absolute inset-0 bg-dotted opacity-20" />
      <div className="relative mx-auto max-w-4xl px-4 text-center text-primary-foreground sm:px-6">
        <Reveal>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {finalCta.title}
          </h2>
          <p className="marathi mt-4 text-xl text-white/90">{finalCta.marathiSubtitle}</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10">
            <Countdown />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <button
            onClick={onJoin}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 font-semibold text-brown shadow-soft transition hover:scale-105 pulse-glow"
          >
            {finalCta.buttonText}
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="mt-4 text-sm text-white/80">{finalCta.seatsLeftText}</p>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection({ faqSection }: { faqSection: LandingPageContent["faqSection"] }) {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle
            kicker="FAQ"
            title={
              <>
                {faqSection.title.split("Answered")[0]}
                <span className="text-gradient-warm">Answered</span>
                {faqSection.title.split("Answered")[1] || ""}
              </>
            }
          />
        </Reveal>
        <div className="mt-12">
          <Faq faqs={faqSection.faqs} />
        </div>
      </div>
    </section>
  );
}

function Footer({
  onJoin,
  contacts,
  mentor,
  logoUrl,
}: {
  onJoin: () => void;
  contacts: LandingPageContent["contacts"];
  mentor: LandingPageContent["mentor"];
  logoUrl?: string;
}) {
  return (
    <footer className="relative bg-brown pb-24 pt-16 text-cream md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <a href="#top" className="flex items-center gap-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="SATTVAYOGA Logo"
                className="h-9 w-9 rounded-full object-cover shadow-soft border border-saffron/20"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-warm">
                <Flower2 className="h-5 w-5" />
              </span>
            )}
            <span className="font-display text-lg font-bold">
              SATTVAYOGA <span className="text-saffron">365</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-cream/70">
            A 365-day transformation journey by {mentor.name}. Daily yoga, real results.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-cream/80">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-saffron">Links</p>
          <a href="#why" className="hover:text-saffron">
            Why Join
          </a>
          <a href="#instructor" className="hover:text-saffron">
            Mentor
          </a>
          <a href="#faq" className="hover:text-saffron">
            FAQ
          </a>
          <a href="#" className="hover:text-saffron">
            Terms
          </a>
          <a href="#" className="hover:text-saffron">
            Privacy Policy
          </a>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-saffron">
            Ready to begin?
          </p>
          <button
            onClick={onJoin}
            className="rounded-full gradient-warm px-6 py-3 font-semibold text-primary-foreground shadow-glow"
          >
            Join SATTVAYOGA 365
          </button>
          <div className="mt-6 flex flex-wrap gap-3">
            {/* Instagram */}
            <a
              href={contacts.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron"
            >
              <Instagram className="h-5 w-5" />
            </a>
            {/* Facebook */}
            <a
              href={contacts.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron"
            >
              <Facebook className="h-5 w-5" />
            </a>
            {/* Threads */}
            <a
              href={contacts.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.586 2.002c-5.597 0-10.141 4.544-10.141 10.141 0 2.508.91 4.8 2.41 6.575l.135.158 1.157-1.157-.107-.118a8.47 8.47 0 0 1-1.995-5.458c0-4.698 3.81-8.508 8.508-8.508s8.508 3.81 8.508 8.508c0 4.33-3.238 7.91-7.464 8.455v-2.072c1.782-.472 3.123-2.023 3.123-3.923 0-2.222-1.808-4.03-4.03-4.03s-4.03 1.808-4.03 4.03c0 .886.29 1.704.778 2.37l.092.124 1.157-1.157-.07-.086a2.38 2.38 0 0 1-.357-1.251c0-1.328 1.082-2.41 2.41-2.41s2.41 1.082 2.41 2.41c0 1.033-.655 1.916-1.574 2.257l-.146.049-1.157 1.157.085.11a4.78 4.78 0 0 0 3.322 1.341c2.656 0 4.81-2.154 4.81-4.81 0-2.457-1.848-4.48-4.24-4.774v-1.632c3.232.327 5.74 3.018 5.74 6.286 0 3.535-2.865 6.4-6.4 6.4a6.38 6.38 0 0 1-4.498-1.844l-.117-.123-1.157 1.157.098.1a7.98 7.98 0 0 0 5.674 2.31c4.418 0 8-3.582 8-8s-3.582-8-8-8z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contacts.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            {/* Call */}
            <a
              href={`tel:${contacts.phone}`}
              aria-label="Call Pooja Ingle"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-sm font-semibold transition hover:border-saffron hover:text-saffron"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-cream/10 px-4 pt-6 text-xs text-cream/60 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span>© 2026 SATTVAYOGA 365. All rights reserved.</span>
        <span>
          Made by{" "}
          <a
            href="https://www.instagram.com/iamgauravchhajer"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-saffron hover:underline transition"
          >
            Gugichu Technologies
          </a>
        </span>
      </div>
    </footer>
  );
}

function PricingSection({
  onJoin,
  pricing,
}: {
  onJoin: () => void;
  pricing: LandingPageContent["pricing"];
}) {
  const features = [
    "365 Daily Live Guided Sessions (6 AM & 6 PM IST)",
    "Full Access to Daily Session Recordings Vault",
    "Personalized Feedback & Mentorship by Pooja Ingle",
    "Private Community Chat & Accountability Group",
    "Bonus: Free Diet & Wellness Guidebook (worth ₹1,999)",
    "Bonus: Standard Post-Delivery Recovery Guide",
  ];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-dotted opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle
            kicker="Affordable Excellence"
            title={
              <>
                Select Your <span className="text-gradient-warm">Transformation Pass</span>
              </>
            }
            sub="Join the most complete, guided 365-day yoga system in India at an unbeatable value."
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl">
          <Reveal delay={100}>
            {/* Value Pricing Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-saffron/30 bg-card p-6 shadow-glow sm:p-10">
              <div className="absolute right-0 top-0 rounded-bl-3xl gradient-warm px-5 py-2.5 text-xs font-bold text-primary-foreground tracking-wider uppercase">
                Best Seller
              </div>

              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                {/* Left Side: Pricing Details */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-saffron-deep">
                      Full Year Unlimited Pass
                    </span>
                    <h3 className="font-display text-3xl font-extrabold text-foreground mt-2">
                      {pricing.planName}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-foreground">{pricing.price}</span>
                    <span className="text-sm font-semibold text-muted-foreground line-through">
                      {pricing.originalPrice}
                    </span>
                    <span className="rounded-full bg-saffron/10 px-3 py-1 text-[10px] font-bold text-saffron-deep uppercase">
                      {pricing.discountText}
                    </span>
                  </div>

                  {/* Under Rs. 14 / day breakdown */}
                  <div className="rounded-2xl border border-border bg-background p-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-saffron-deep font-bold text-lg">
                      {pricing.rupeeCost}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold">Incredible Value Plan</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {pricing.rupeeCostSubtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onJoin}
                    className="w-full rounded-2xl gradient-warm py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
                  >
                    Get My 365 Pass Now
                  </button>

                  <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Instant activation · Limited slots left
                  </p>
                </div>

                {/* Right Side: Features Check list */}
                <div className="space-y-5 border-t border-border/80 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    What's Included:
                  </p>
                  <ul className="space-y-3.5 text-sm">
                    {features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-saffron-deep mt-0.5" />
                        <span className="text-foreground/85 leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Money back Guarantee block */}
                  <div className="border-t border-border/60 pt-4 flex gap-3 text-xs leading-relaxed text-muted-foreground">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p>
                      <strong>7-Day Refund Guarantee</strong>: Try the daily live practice for a
                      full week. If you aren't completely delighted, email us for a 100% refund, no
                      questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BestStudents({ bestStudents }: { bestStudents: LandingPageContent["bestStudents"] }) {
  return (
    <section className="relative bg-secondary/50 py-20 sm:py-28">
      <div className="absolute inset-0 bg-dotted opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTitle
            kicker="Student Spotlight"
            title={
              <>
                {bestStudents.title.split("This Month")[0]}
                <span className="text-gradient-warm">This Month</span>
                {bestStudents.title.split("This Month")[1] || ""}
              </>
            }
            sub={bestStudents.subtitle}
          />
        </Reveal>

        <div className="mt-14 flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0">
          {bestStudents.students.map((st, i) => (
            <Reveal key={i} delay={i * 80} className="min-w-[295px] flex-1 snap-start md:min-w-0">
              <div className="group relative flex flex-col justify-between h-full overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-saffron/30 hover:shadow-glow sm:p-8">
                <div>
                  {/* Top Stats Banner */}
                  <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-warm text-base font-bold text-primary-foreground shadow-glow">
                        {st.imageText}
                      </div>
                      <div>
                        <h4 className="font-bold text-base leading-none text-foreground">
                          {st.name}
                        </h4>
                        <p className="text-[10px] text-muted-foreground mt-1.5">{st.location}</p>
                      </div>
                    </div>
                    <div
                      className={`rounded-full border px-3 py-1 text-[10px] font-bold ${st.color}`}
                    >
                      {st.stat}
                    </div>
                  </div>

                  {/* Transformation Badges */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-3 py-1 text-[10px] font-semibold">
                      <Flame className="h-3 w-3 text-saffron-deep" />
                      {st.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-3 py-1 text-[10px] font-semibold">
                      <Trophy className="h-3 w-3 text-amber-500" />
                      {st.days}
                    </span>
                  </div>

                  {/* Success Title */}
                  <h5 className="mt-5 font-bold text-base text-foreground group-hover:text-saffron-deep transition-colors">
                    {st.achievement}
                  </h5>

                  {/* Quote */}
                  <p className="mt-3 text-sm italic text-muted-foreground leading-relaxed">
                    "{st.quote}"
                  </p>
                </div>

                {/* Bottom interactive card elements */}
                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs font-semibold text-saffron-deep">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Verified Transformation
                  </span>
                  <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const getInstagramShortcode = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9-_]+)/i);
  return match ? match[1] : null;
};

function ReelsShowcase({
  reels,
  setActiveReelUrl,
}: {
  reels: LandingPageContent["reels"];
  setActiveReelUrl: (url: string | null) => void;
}) {
  return (
    <section className="relative bg-brown py-20 text-cream sm:py-28">
      <div className="absolute inset-0 bg-dotted opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-saffron">
              Social Showcase
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              {reels.title.split("Instagram")[0]}
              <span className="text-gradient-warm">Instagram</span>
              {reels.title.split("Instagram")[1] || ""}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/70 sm:text-lg">{reels.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-14 flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-x-visible md:pb-0">
          {reels.items.map((rl, i) => {
            const shortcode = getInstagramShortcode(rl.reelUrl || "");
            const displayImage =
              rl.imageUrl ||
              (shortcode ? `https://www.instagram.com/p/${shortcode}/media/?size=l` : null);
            return (
              <Reveal key={i} delay={i * 80} className="min-w-[260px] flex-1 snap-start md:min-w-0">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (shortcode) {
                      setActiveReelUrl(rl.reelUrl || null);
                    } else {
                      window.open(
                        rl.reelUrl || "https://www.instagram.com/sattvayogawithpooja",
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      if (shortcode) {
                        setActiveReelUrl(rl.reelUrl || null);
                      } else {
                        window.open(
                          rl.reelUrl || "https://www.instagram.com/sattvayogawithpooja",
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }
                    }
                  }}
                  className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[2.5rem] border border-cream/15 bg-cream/5 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-saffron/40 hover:shadow-glow cursor-pointer"
                >
                  {/* 9:16 Video Background Mockup with dynamic HSL gradient overlays or direct Instagram banner cover */}
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={rl.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-t ${rl.gradient} z-10`} />
                      <div className="absolute inset-0 flex items-center justify-center bg-cream/10 text-cream/30 text-5xl font-display font-black tracking-tighter mix-blend-overlay uppercase select-none p-6 text-center leading-tight">
                        {rl.bgText}
                      </div>
                    </>
                  )}
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />

                  {/* Main UI layout inside the vertical video frame */}
                  <div className="relative z-20 flex h-full flex-col justify-between p-6">
                    {/* Top Instagram badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-bold tracking-wider backdrop-blur-md">
                        <Instagram className="h-3.5 w-3.5 text-saffron" />
                        REELS
                      </span>
                    </div>

                    {/* Centered Pulse Play Button */}
                    <div className="flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-cream backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brown shadow-glow relative">
                        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:hidden" />
                        <Play className="h-7 w-7 fill-current ml-1" />
                      </span>
                    </div>

                    {/* Bottom Video details */}
                    <div className="space-y-3.5">
                      <div>
                        <h4 className="font-bold text-base text-cream leading-snug group-hover:text-saffron transition-colors">
                          {rl.title}
                        </h4>
                        <p className="mt-1.5 text-xs text-cream/70 leading-relaxed line-clamp-2">
                          {rl.topic}
                        </p>
                      </div>

                      {/* Likes & Comments metrics */}
                      <div className="flex items-center gap-4 border-t border-cream/15 pt-3.5 text-xs font-bold text-cream/90">
                        <span className="flex items-center gap-1 hover:text-saffron transition">
                          <Heart className="h-4 w-4 fill-saffron/10 text-saffron" />
                          {rl.likes}
                        </span>
                        <span className="flex items-center gap-1 hover:text-saffron transition">
                          <MessageCircle className="h-4 w-4 text-cream/80" />
                          {rl.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Dynamic CTA button linking directly to full instagram feed */}
        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <a
              href="https://www.instagram.com/sattvayogawithpooja?igsh=MXUxemNveGF5bDAwcw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-saffron bg-saffron/10 px-7 py-3.5 text-sm font-semibold text-saffron transition hover:bg-saffron hover:text-primary-foreground shadow-soft"
            >
              <Instagram className="h-5 w-5" />
              Follow @sattvayogawithpooja on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
