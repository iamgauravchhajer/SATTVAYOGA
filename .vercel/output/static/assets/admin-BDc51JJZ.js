import {
  r as b,
  d as T,
  b as G,
  o as ce,
  q as xe,
  k as ue,
  c as fe,
  h as me,
  j as e,
  g as be,
  i as Q,
  l as I,
  s as ge,
  e as pe,
  f as he,
  u as je,
} from "./index-CVHl686y.js";
import {
  e as N,
  D as u,
  L as E,
  R as L,
  c as q,
  U as _,
  C as Ne,
  a as P,
  P as W,
  b as Y,
  A as Z,
  t as i,
  S as K,
  F as ye,
  d as ve,
  I as we,
  T as Ce,
} from "./defaultContent-D7vMKU1I.js";
const ke = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
  ],
  Se = N("circle-alert", ke);
const Ae = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  Te = N("circle-question-mark", Ae);
const Le = [
    ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
    ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }],
  ],
  Fe = N("credit-card", Le);
const Ue = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }],
  ],
  De = N("download", Ue);
const Ee = [
    ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
    ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }],
  ],
  Re = N("link", Ee);
const Me = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ],
  $e = N("log-out", Me);
const Pe = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }],
  ],
  X = N("mail", Pe);
const Ie = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ],
  qe = N("search", Ie);
const _e = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
    ["path", { d: "M12 8v4", key: "1got3b" }],
    ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ],
  Be = N("shield-alert", _e);
const ze = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ],
  ee = N("trash-2", ze),
  R = (f, g = 800, F = 800) =>
    new Promise((k, y) => {
      const S = new FileReader();
      (S.readAsDataURL(f),
        (S.onload = (v) => {
          const w = new window.Image();
          ((w.src = v.target?.result),
            (w.onload = () => {
              const p = document.createElement("canvas");
              let h = w.width,
                j = w.height;
              ((h > g || j > F) &&
                (h > j
                  ? ((j = Math.round((j * g) / h)), (h = g))
                  : ((h = Math.round((h * F) / j)), (j = F))),
                (p.width = h),
                (p.height = j));
              const C = p.getContext("2d");
              if (C) {
                C.drawImage(w, 0, 0, h, j);
                const U = p.toDataURL("image/jpeg", 0.7);
                k(U);
              } else k(v.target?.result);
            }),
            (w.onerror = (p) => y(p)));
        }),
        (S.onerror = (v) => y(v)));
    }),
  Je = (f) => {
    if (!f) return null;
    const g = f.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9-_]+)/i);
    return g ? g[1] : null;
  };
function Ve() {
  const [f, g] = b.useState(null),
    [F, k] = b.useState(!0),
    [y, S] = b.useState([]),
    [v, w] = b.useState(""),
    [p, h] = b.useState(null),
    [j, C] = b.useState(null),
    [U, B] = b.useState("leads"),
    [o, m] = b.useState("hero"),
    [a, M] = b.useState(u),
    [te, z] = b.useState(!0),
    [J, O] = b.useState(!1);
  b.useEffect(() => {
    if (!f || !T) return;
    (async () => {
      try {
        z(!0);
        const s = await be();
        s &&
          M({
            ...u,
            ...s,
            images: { ...u.images, ...s.images },
            hero: { ...u.hero, ...s.hero },
            mentor: { ...u.mentor, ...s.mentor },
            pricing: { ...u.pricing, ...s.pricing },
            contacts: { ...u.contacts, ...s.contacts },
            whyJoin: { ...u.whyJoin, ...s.whyJoin },
            whoFor: { ...u.whoFor, ...s.whoFor },
            features: { ...u.features, ...s.features },
            reasons: { ...u.reasons, ...s.reasons },
            beforeAfter: { ...u.beforeAfter, ...s.beforeAfter },
            bestStudents: { ...u.bestStudents, ...s.bestStudents },
            reels: { ...u.reels, ...s.reels },
            finalCta: { ...u.finalCta, ...s.finalCta },
            faqSection: { ...u.faqSection, ...s.faqSection },
            testimonials: { ...u.testimonials, ...s.testimonials },
          });
      } catch (s) {
        (console.error("CMS load error:", s), i.error("Failed to load CMS content."));
      } finally {
        z(!1);
      }
    })();
  }, [f]);
  const n = (t, s, r) => {
      M((d) => ({ ...d, [t]: { ...d[t], [s]: r } }));
    },
    l = (t, s, r, d, c) => {
      M((x) => {
        const A = [...x[t][s]];
        return ((A[r] = { ...A[r], [d]: c }), { ...x, [t]: { ...x[t], [s]: A } });
      });
    },
    H = (t, s, r) => {
      M((d) => {
        const c = [...d.beforeAfter[t]];
        return ((c[s] = r), { ...d, beforeAfter: { ...d.beforeAfter, [t]: c } });
      });
    },
    se = async (t) => {
      if ((t.preventDefault(), !T)) {
        i.error("Firestore is not configured.");
        return;
      }
      try {
        (O(!0), await je(a), i.success("Landing page content updated successfully!"));
      } catch (s) {
        (console.error("CMS save error:", s), i.error("Failed to save landing page changes."));
      } finally {
        O(!1);
      }
    };
  (b.useEffect(() => {
    if (!G) {
      k(!1);
      return;
    }
    const t = ce(G, (s) => {
      (s
        ? Q(s.email)
          ? (g(s), C(null))
          : (g(null),
            C(
              `Access Denied: The Google account (${s.email}) is not authorized to access this admin panel. Please contact the administrator.`,
            ),
            I())
        : g(null),
        k(!1));
    });
    return () => t();
  }, []),
    b.useEffect(() => {
      if (!f || !T) return;
      const t = xe(fe(T, "leads"), ue("timestamp", "desc")),
        s = me(
          t,
          (r) => {
            const d = [];
            (r.forEach((c) => {
              d.push({ id: c.id, ...c.data() });
            }),
              S(d));
          },
          (r) => {
            (console.error("Firestore sync error: ", r),
              i.error("Failed to load real-time leads. Check database rules."));
          },
        );
      return () => s();
    }, [f]));
  const re = async () => {
      try {
        (k(!0), C(null));
        const s = (await ge()).user;
        Q(s.email)
          ? (g(s), i.success(`Welcome back, ${s.displayName || "Admin"}!`))
          : (await I(),
            g(null),
            C(
              `Access Denied: The Google account (${s.email}) is not whitelisted in the admin emails. Please sign in with an authorized account.`,
            ),
            i.error("Unauthorized email address."));
      } catch (t) {
        (console.error("Google Auth error: ", t),
          t.code !== "auth/popup-closed-by-user" &&
            (C("Failed to authenticate. Please check internet connections or keys."),
            i.error("Authentication failed.")));
      } finally {
        k(!1);
      }
    },
    ae = async () => {
      try {
        (await I(), g(null), S([]), i.success("Logged out successfully."));
      } catch {
        i.error("Logout failed.");
      }
    },
    V = async (t) => {
      if (
        !(
          !T ||
          typeof window > "u" ||
          !window.confirm("Are you sure you want to permanently delete this lead?")
        )
      ) {
        h(t);
        try {
          (await pe(he(T, "leads", t)), i.success("Lead successfully deleted."));
        } catch (s) {
          (console.error("Delete error: ", s),
            i.error("Failed to delete lead. Check database permissions."));
        } finally {
          h(null);
        }
      }
    },
    ne = () => {
      if (y.length === 0) {
        i.error("No leads available to export.");
        return;
      }
      const t = ["Name", "Phone", "Email", "Submission Date"],
        s = y.map((x) => [
          x.name.replace(/"/g, '""'),
          x.phone.replace(/"/g, '""'),
          x.email.replace(/"/g, '""'),
          x.createdAt ? new Date(x.createdAt).toLocaleString() : "N/A",
        ]),
        r =
          "data:text/csv;charset=utf-8," +
          [t.join(","), ...s.map((x) => x.map((D) => `"${D}"`).join(","))].join(`
`),
        d = encodeURI(r);
      if (typeof document > "u") return;
      const c = document.createElement("a");
      (c.setAttribute("href", d),
        c.setAttribute(
          "download",
          `sattvayoga365_leads_${new Date().toISOString().split("T")[0]}.csv`,
        ),
        document.body.appendChild(c),
        c.click(),
        document.body.removeChild(c),
        i.success("Leads exported to CSV!"));
    },
    oe = () => {
      const t = y.length,
        s = new Date(),
        r = new Date(s.getFullYear(), s.getMonth(), s.getDate()).getTime(),
        d = s.getTime() - 10080 * 60 * 1e3;
      let c = 0,
        x = 0;
      return (
        y.forEach((D) => {
          if (D.createdAt) {
            const A = new Date(D.createdAt).getTime();
            (A >= r && c++, A >= d && x++);
          }
        }),
        { total: t, todayCount: c, weekCount: x }
      );
    },
    { total: le, todayCount: de, weekCount: ie } = oe(),
    $ = y.filter((t) => {
      const s = v.toLowerCase();
      return (
        t.name.toLowerCase().includes(s) ||
        t.phone.toLowerCase().includes(s) ||
        t.email.toLowerCase().includes(s)
      );
    });
  return F
    ? e.jsx("div", {
        className: "flex min-h-screen items-center justify-center bg-background text-foreground",
        children: e.jsxs("div", {
          className: "flex flex-col items-center gap-3 text-center",
          children: [
            e.jsx(E, { className: "h-10 w-10 animate-spin text-saffron-deep" }),
            e.jsx("p", {
              className: "text-sm text-muted-foreground",
              children: "Verifying secure credentials...",
            }),
          ],
        }),
      })
    : f
      ? e.jsxs("div", {
          className: "min-h-screen bg-background text-foreground",
          children: [
            e.jsx("header", {
              className:
                "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg",
              children: e.jsxs("div", {
                className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      e.jsx("span", {
                        className:
                          "flex h-9 w-9 items-center justify-center rounded-full gradient-warm text-primary-foreground shadow-soft",
                        children: e.jsx(q, { className: "h-5 w-5" }),
                      }),
                      e.jsxs("span", {
                        className: "font-display text-lg font-bold",
                        children: [
                          "SATTVAYOGA ",
                          e.jsx("span", { className: "text-gradient-warm", children: "Admin" }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      e.jsxs("div", {
                        className:
                          "hidden items-center gap-2.5 rounded-full border border-border bg-card/50 p-1.5 pr-4 md:flex",
                        children: [
                          f.photoURL
                            ? e.jsx("img", {
                                src: f.photoURL,
                                alt: f.displayName || "Admin",
                                className: "h-8 w-8 rounded-full border border-saffron/40",
                              })
                            : e.jsx("div", {
                                className:
                                  "flex h-8 w-8 items-center justify-center rounded-full gradient-warm font-semibold text-primary-foreground",
                                children: "A",
                              }),
                          e.jsxs("div", {
                            className: "text-left leading-none",
                            children: [
                              e.jsx("p", {
                                className: "text-xs font-bold",
                                children: f.displayName || "Administrator",
                              }),
                              e.jsx("p", {
                                className: "text-[10px] text-muted-foreground",
                                children: f.email,
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("button", {
                        onClick: ae,
                        className:
                          "flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-semibold shadow-soft transition hover:bg-muted md:text-sm",
                        children: [e.jsx($e, { className: "h-4 w-4" }), "Sign Out"],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            e.jsxs("main", {
              className: "mx-auto max-w-7xl px-4 py-8 sm:px-6",
              children: [
                e.jsxs("div", {
                  className:
                    "mb-8 flex gap-2 rounded-2xl bg-muted/40 p-1.5 max-w-md border border-border/40 backdrop-blur-md",
                  children: [
                    e.jsx("button", {
                      onClick: () => B("leads"),
                      className: `flex-1 rounded-xl py-3 text-center text-xs font-bold transition-all duration-200 ${U === "leads" ? "bg-card text-saffron-deep shadow-soft border border-border/20" : "text-muted-foreground hover:text-foreground"}`,
                      children: "📋 Leads Directory",
                    }),
                    e.jsx("button", {
                      onClick: () => B("cms"),
                      className: `flex-1 rounded-xl py-3 text-center text-xs font-bold transition-all duration-200 ${U === "cms" ? "bg-card text-saffron-deep shadow-soft border border-border/20" : "text-muted-foreground hover:text-foreground"}`,
                      children: "✍️ Edit Page Content",
                    }),
                  ],
                }),
                U === "leads"
                  ? e.jsxs(e.Fragment, {
                      children: [
                        e.jsx(L, {
                          children: e.jsxs("div", {
                            className:
                              "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
                            children: [
                              e.jsxs("div", {
                                children: [
                                  e.jsx("h1", {
                                    className: "text-3xl font-bold tracking-tight sm:text-4xl",
                                    children: "Lead directory",
                                  }),
                                  e.jsx("p", {
                                    className: "text-sm text-muted-foreground mt-1",
                                    children:
                                      "Monitor real-time course registrations and customer sign-ups.",
                                  }),
                                ],
                              }),
                              e.jsxs("button", {
                                onClick: ne,
                                className:
                                  "flex items-center justify-center gap-2 rounded-2xl gradient-warm px-5 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:scale-105",
                                children: [e.jsx(De, { className: "h-5 w-5" }), "Export to CSV"],
                              }),
                            ],
                          }),
                        }),
                        e.jsxs("div", {
                          className: "mt-8 grid gap-4 sm:grid-cols-3",
                          children: [
                            e.jsx(L, {
                              delay: 60,
                              children: e.jsxs("div", {
                                className:
                                  "flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/10 text-saffron-deep",
                                    children: e.jsx(_, { className: "h-7 w-7" }),
                                  }),
                                  e.jsxs("div", {
                                    children: [
                                      e.jsx("p", {
                                        className:
                                          "text-xs uppercase tracking-wider text-muted-foreground font-semibold",
                                        children: "Total Leads",
                                      }),
                                      e.jsx("p", {
                                        className: "text-3xl font-bold mt-1",
                                        children: le,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            e.jsx(L, {
                              delay: 120,
                              children: e.jsxs("div", {
                                className:
                                  "flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600",
                                    children: e.jsx(Ne, { className: "h-7 w-7" }),
                                  }),
                                  e.jsxs("div", {
                                    children: [
                                      e.jsx("p", {
                                        className:
                                          "text-xs uppercase tracking-wider text-muted-foreground font-semibold",
                                        children: "Leads Today",
                                      }),
                                      e.jsx("p", {
                                        className: "text-3xl font-bold mt-1 text-amber-600",
                                        children: de,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            e.jsx(L, {
                              delay: 180,
                              children: e.jsxs("div", {
                                className:
                                  "flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-saffron/30",
                                children: [
                                  e.jsx("div", {
                                    className:
                                      "flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600",
                                    children: e.jsx(P, { className: "h-7 w-7" }),
                                  }),
                                  e.jsxs("div", {
                                    children: [
                                      e.jsx("p", {
                                        className:
                                          "text-xs uppercase tracking-wider text-muted-foreground font-semibold",
                                        children: "Leads This Week",
                                      }),
                                      e.jsx("p", {
                                        className: "text-3xl font-bold mt-1 text-emerald-600",
                                        children: ie,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className:
                            "mt-8 overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft",
                          children: [
                            e.jsxs("div", {
                              className:
                                "flex flex-col gap-4 border-b border-border/80 p-5 sm:flex-row sm:items-center sm:justify-between",
                              children: [
                                e.jsxs("div", {
                                  className: "relative w-full max-w-md",
                                  children: [
                                    e.jsx(qe, {
                                      className:
                                        "absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                                    }),
                                    e.jsx("input", {
                                      type: "text",
                                      placeholder:
                                        "Search leads by name, email, or phone number...",
                                      value: v,
                                      onChange: (t) => w(t.target.value),
                                      className:
                                        "w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none ring-saffron/30 transition focus:border-saffron focus:ring-4",
                                    }),
                                  ],
                                }),
                                e.jsxs("div", {
                                  className:
                                    "text-xs font-semibold text-muted-foreground text-right",
                                  children: ["Showing ", $.length, " of ", y.length, " leads"],
                                }),
                              ],
                            }),
                            $.length === 0
                              ? e.jsxs("div", {
                                  className:
                                    "flex flex-col items-center justify-center px-4 py-16 text-center",
                                  children: [
                                    e.jsx("div", {
                                      className:
                                        "flex h-14 w-14 items-center justify-center rounded-full bg-saffron/10 text-saffron-deep",
                                      children: e.jsx(Se, { className: "h-6 w-6" }),
                                    }),
                                    e.jsx("h3", {
                                      className: "mt-4 text-xl font-bold",
                                      children: "No leads found",
                                    }),
                                    e.jsx("p", {
                                      className:
                                        "text-sm text-muted-foreground mt-1 max-w-xs leading-relaxed",
                                      children: v
                                        ? "We couldn't find any leads matching your current search parameters."
                                        : "Leads submitted via the registration form will appear here in real-time.",
                                    }),
                                  ],
                                })
                              : e.jsxs(e.Fragment, {
                                  children: [
                                    e.jsx("div", {
                                      className: "hidden overflow-x-auto md:block",
                                      children: e.jsxs("table", {
                                        className: "w-full border-collapse text-left text-sm",
                                        children: [
                                          e.jsx("thead", {
                                            children: e.jsxs("tr", {
                                              className:
                                                "border-b border-border bg-muted/40 font-medium text-muted-foreground uppercase text-[10px] tracking-wider",
                                              children: [
                                                e.jsx("th", {
                                                  className: "px-6 py-4",
                                                  children: "Name",
                                                }),
                                                e.jsx("th", {
                                                  className: "px-6 py-4",
                                                  children: "Phone / WhatsApp",
                                                }),
                                                e.jsx("th", {
                                                  className: "px-6 py-4",
                                                  children: "Email",
                                                }),
                                                e.jsx("th", {
                                                  className: "px-6 py-4",
                                                  children: "Submission Date",
                                                }),
                                                e.jsx("th", {
                                                  className: "px-6 py-4 text-center",
                                                  children: "Actions",
                                                }),
                                              ],
                                            }),
                                          }),
                                          e.jsx("tbody", {
                                            className: "divide-y divide-border/60",
                                            children: $.map((t) =>
                                              e.jsxs(
                                                "tr",
                                                {
                                                  className: "transition hover:bg-muted/30",
                                                  children: [
                                                    e.jsx("td", {
                                                      className:
                                                        "whitespace-nowrap px-6 py-4 font-bold text-foreground",
                                                      children: t.name,
                                                    }),
                                                    e.jsx("td", {
                                                      className: "whitespace-nowrap px-6 py-4",
                                                      children: e.jsxs("a", {
                                                        href: `https://wa.me/${t.phone.replace(/[^0-9]/g, "")}`,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className:
                                                          "inline-flex items-center gap-1.5 font-medium hover:text-saffron-deep transition",
                                                        title: "Chat on WhatsApp",
                                                        children: [
                                                          e.jsx(W, {
                                                            className:
                                                              "h-4 w-4 text-muted-foreground",
                                                          }),
                                                          t.phone,
                                                        ],
                                                      }),
                                                    }),
                                                    e.jsx("td", {
                                                      className: "whitespace-nowrap px-6 py-4",
                                                      children: e.jsxs("a", {
                                                        href: `mailto:${t.email}`,
                                                        className:
                                                          "inline-flex items-center gap-1.5 hover:text-saffron-deep transition",
                                                        children: [
                                                          e.jsx(X, {
                                                            className:
                                                              "h-4 w-4 text-muted-foreground",
                                                          }),
                                                          t.email,
                                                        ],
                                                      }),
                                                    }),
                                                    e.jsx("td", {
                                                      className:
                                                        "whitespace-nowrap px-6 py-4 text-muted-foreground",
                                                      children: e.jsxs("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                          e.jsx(Y, {
                                                            className:
                                                              "h-4 w-4 shrink-0 text-muted-foreground",
                                                          }),
                                                          t.createdAt
                                                            ? new Date(t.createdAt).toLocaleString(
                                                                void 0,
                                                                {
                                                                  dateStyle: "medium",
                                                                  timeStyle: "short",
                                                                },
                                                              )
                                                            : "N/A",
                                                        ],
                                                      }),
                                                    }),
                                                    e.jsx("td", {
                                                      className:
                                                        "whitespace-nowrap px-6 py-4 text-center",
                                                      children: e.jsx("button", {
                                                        onClick: () => V(t.id),
                                                        disabled: p === t.id,
                                                        className:
                                                          "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition hover:bg-destructive hover:text-primary-foreground disabled:opacity-50",
                                                        "aria-label": "Delete Lead",
                                                        children:
                                                          p === t.id
                                                            ? e.jsx(E, {
                                                                className: "h-4 w-4 animate-spin",
                                                              })
                                                            : e.jsx(ee, { className: "h-4 w-4" }),
                                                      }),
                                                    }),
                                                  ],
                                                },
                                                t.id,
                                              ),
                                            ),
                                          }),
                                        ],
                                      }),
                                    }),
                                    e.jsx("div", {
                                      className: "divide-y divide-border/60 md:hidden",
                                      children: $.map((t) =>
                                        e.jsxs(
                                          "div",
                                          {
                                            className: "p-5 space-y-4",
                                            children: [
                                              e.jsxs("div", {
                                                className: "flex items-start justify-between",
                                                children: [
                                                  e.jsxs("div", {
                                                    children: [
                                                      e.jsx("h4", {
                                                        className:
                                                          "text-base font-bold leading-tight",
                                                        children: t.name,
                                                      }),
                                                      e.jsxs("p", {
                                                        className:
                                                          "text-xs text-muted-foreground mt-1 flex items-center gap-1",
                                                        children: [
                                                          e.jsx(Y, { className: "h-3.5 w-3.5" }),
                                                          t.createdAt
                                                            ? new Date(t.createdAt).toLocaleString(
                                                                void 0,
                                                                {
                                                                  dateStyle: "short",
                                                                  timeStyle: "short",
                                                                },
                                                              )
                                                            : "N/A",
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsx("button", {
                                                    onClick: () => V(t.id),
                                                    disabled: p === t.id,
                                                    className:
                                                      "flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive disabled:opacity-50",
                                                    "aria-label": "Delete Lead",
                                                    children:
                                                      p === t.id
                                                        ? e.jsx(E, {
                                                            className: "h-4 w-4 animate-spin",
                                                          })
                                                        : e.jsx(ee, { className: "h-4 w-4" }),
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "grid grid-cols-2 gap-2 text-xs font-semibold",
                                                children: [
                                                  e.jsxs("a", {
                                                    href: `https://wa.me/${t.phone.replace(/[^0-9]/g, "")}`,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className:
                                                      "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5",
                                                    children: [
                                                      e.jsx(W, {
                                                        className: "h-4 w-4 text-emerald-500",
                                                      }),
                                                      "WhatsApp",
                                                    ],
                                                  }),
                                                  e.jsxs("a", {
                                                    href: `mailto:${t.email}`,
                                                    className:
                                                      "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5",
                                                    children: [
                                                      e.jsx(X, {
                                                        className: "h-4 w-4 text-blue-500",
                                                      }),
                                                      "Email Lead",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          },
                                          t.id,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                          ],
                        }),
                      ],
                    })
                  : e.jsxs(e.Fragment, {
                      children: [
                        e.jsx(L, {
                          children: e.jsx("div", {
                            className:
                              "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
                            children: e.jsxs("div", {
                              children: [
                                e.jsx("h1", {
                                  className: "text-3xl font-bold tracking-tight sm:text-4xl",
                                  children: "Edit page content",
                                }),
                                e.jsx("p", {
                                  className: "text-sm text-muted-foreground mt-1",
                                  children:
                                    "Dynamically update the copywriting, titles, schedules, and socials of SATTVAYOGA 365.",
                                }),
                              ],
                            }),
                          }),
                        }),
                        te
                          ? e.jsxs("div", {
                              className: "flex flex-col items-center justify-center py-16 gap-3",
                              children: [
                                e.jsx(E, { className: "h-8 w-8 animate-spin text-saffron-deep" }),
                                e.jsx("p", {
                                  className: "text-sm text-muted-foreground",
                                  children: "Loading landing page configuration...",
                                }),
                              ],
                            })
                          : e.jsxs("form", {
                              onSubmit: se,
                              className: "mt-8 space-y-6 max-w-4xl",
                              children: [
                                e.jsxs("div", {
                                  className:
                                    "overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft divide-y divide-border/60",
                                  children: [
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "media" ? "" : "media"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(Z, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Site Media & Images",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Upload site logo, main banners, mentor profile, and features graphics",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "media" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "media" &&
                                          e.jsxs("div", {
                                            className:
                                              "grid gap-6 p-6 md:grid-cols-2 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className:
                                                  "space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep",
                                                    children: "Site Logo",
                                                  }),
                                                  e.jsxs("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                      a.images?.logoUrl
                                                        ? e.jsx("img", {
                                                            src: a.images.logoUrl,
                                                            alt: "Logo Preview",
                                                            className:
                                                              "h-14 w-14 rounded-full object-cover border border-border",
                                                          })
                                                        : e.jsx("div", {
                                                            className:
                                                              "flex h-14 w-14 items-center justify-center rounded-full gradient-warm text-cream",
                                                            children: e.jsx(q, {
                                                              className: "h-7 w-7",
                                                            }),
                                                          }),
                                                      e.jsxs("div", {
                                                        className: "flex-1 space-y-2",
                                                        children: [
                                                          e.jsx("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: async (t) => {
                                                              const s = t.target.files?.[0];
                                                              if (s)
                                                                try {
                                                                  const r = await R(s, 200, 200);
                                                                  (n("images", "logoUrl", r),
                                                                    i.success(
                                                                      "Logo uploaded successfully!",
                                                                    ));
                                                                } catch {
                                                                  i.error(
                                                                    "Failed to process logo.",
                                                                  );
                                                                }
                                                            },
                                                            className:
                                                              "w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer",
                                                          }),
                                                          e.jsx("input", {
                                                            type: "text",
                                                            placeholder:
                                                              "Or paste external image URL...",
                                                            value: a.images?.logoUrl || "",
                                                            onChange: (t) =>
                                                              n(
                                                                "images",
                                                                "logoUrl",
                                                                t.target.value,
                                                              ),
                                                            className:
                                                              "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron",
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep",
                                                    children: "Hero Banner Image",
                                                  }),
                                                  e.jsxs("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                      e.jsx("img", {
                                                        src:
                                                          a.images?.heroUrl ||
                                                          "/assets/hero-yoga.jpg",
                                                        alt: "Hero Preview",
                                                        className:
                                                          "h-14 w-14 rounded-xl object-cover border border-border bg-muted/20",
                                                        onError: (t) => {
                                                          t.target.src = "/placeholder.svg";
                                                        },
                                                      }),
                                                      e.jsxs("div", {
                                                        className: "flex-1 space-y-2",
                                                        children: [
                                                          e.jsx("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: async (t) => {
                                                              const s = t.target.files?.[0];
                                                              if (s)
                                                                try {
                                                                  const r = await R(s, 800, 800);
                                                                  (n("images", "heroUrl", r),
                                                                    i.success(
                                                                      "Hero image uploaded successfully!",
                                                                    ));
                                                                } catch {
                                                                  i.error(
                                                                    "Failed to process hero image.",
                                                                  );
                                                                }
                                                            },
                                                            className:
                                                              "w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer",
                                                          }),
                                                          e.jsx("input", {
                                                            type: "text",
                                                            placeholder:
                                                              "Or paste external image URL...",
                                                            value: a.images?.heroUrl || "",
                                                            onChange: (t) =>
                                                              n(
                                                                "images",
                                                                "heroUrl",
                                                                t.target.value,
                                                              ),
                                                            className:
                                                              "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron",
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep",
                                                    children: "Mentor Profile Image",
                                                  }),
                                                  e.jsxs("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                      e.jsx("img", {
                                                        src:
                                                          a.images?.instructorUrl ||
                                                          "/assets/instructor.jpg",
                                                        alt: "Mentor Preview",
                                                        className:
                                                          "h-14 w-14 rounded-xl object-cover border border-border bg-muted/20",
                                                        onError: (t) => {
                                                          t.target.src = "/placeholder.svg";
                                                        },
                                                      }),
                                                      e.jsxs("div", {
                                                        className: "flex-1 space-y-2",
                                                        children: [
                                                          e.jsx("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: async (t) => {
                                                              const s = t.target.files?.[0];
                                                              if (s)
                                                                try {
                                                                  const r = await R(s, 600, 750);
                                                                  (n("images", "instructorUrl", r),
                                                                    i.success(
                                                                      "Mentor image uploaded successfully!",
                                                                    ));
                                                                } catch {
                                                                  i.error(
                                                                    "Failed to process mentor image.",
                                                                  );
                                                                }
                                                            },
                                                            className:
                                                              "w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer",
                                                          }),
                                                          e.jsx("input", {
                                                            type: "text",
                                                            placeholder:
                                                              "Or paste external image URL...",
                                                            value: a.images?.instructorUrl || "",
                                                            onChange: (t) =>
                                                              n(
                                                                "images",
                                                                "instructorUrl",
                                                                t.target.value,
                                                              ),
                                                            className:
                                                              "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron",
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "space-y-3 p-4 rounded-2xl border border-border/60 bg-muted/10",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep",
                                                    children: "Features Graphic Circle",
                                                  }),
                                                  e.jsxs("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                      e.jsx("img", {
                                                        src:
                                                          a.images?.featureUrl ||
                                                          "/assets/feature-yoga.jpg",
                                                        alt: "Features Preview",
                                                        className:
                                                          "h-14 w-14 rounded-xl object-cover border border-border bg-muted/20",
                                                        onError: (t) => {
                                                          t.target.src = "/placeholder.svg";
                                                        },
                                                      }),
                                                      e.jsxs("div", {
                                                        className: "flex-1 space-y-2",
                                                        children: [
                                                          e.jsx("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: async (t) => {
                                                              const s = t.target.files?.[0];
                                                              if (s)
                                                                try {
                                                                  const r = await R(s, 800, 800);
                                                                  (n("images", "featureUrl", r),
                                                                    i.success(
                                                                      "Features graphic uploaded successfully!",
                                                                    ));
                                                                } catch {
                                                                  i.error(
                                                                    "Failed to process feature image.",
                                                                  );
                                                                }
                                                            },
                                                            className:
                                                              "w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer",
                                                          }),
                                                          e.jsx("input", {
                                                            type: "text",
                                                            placeholder:
                                                              "Or paste external image URL...",
                                                            value: a.images?.featureUrl || "",
                                                            onChange: (t) =>
                                                              n(
                                                                "images",
                                                                "featureUrl",
                                                                t.target.value,
                                                              ),
                                                            className:
                                                              "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-saffron",
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "hero" ? "" : "hero"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(K, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Hero Header",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit main title, subtitles, and schedule badges",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "hero" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "hero" &&
                                          e.jsxs("div", {
                                            className:
                                              "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Marathi Title",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.hero.marathiTitle,
                                                    onChange: (t) =>
                                                      n("hero", "marathiTitle", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "English Title (Start)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.hero.englishTitleStart,
                                                    onChange: (t) =>
                                                      n(
                                                        "hero",
                                                        "englishTitleStart",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "English Title (Highlight)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.hero.englishTitleHighlight,
                                                    onChange: (t) =>
                                                      n(
                                                        "hero",
                                                        "englishTitleHighlight",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "English Title (End)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.hero.englishTitleEnd,
                                                    onChange: (t) =>
                                                      n("hero", "englishTitleEnd", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2 md:col-span-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Description paragraph",
                                                  }),
                                                  e.jsx("textarea", {
                                                    rows: 3,
                                                    value: a.hero.description,
                                                    onChange: (t) =>
                                                      n("hero", "description", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Starts On Date",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.hero.startDate,
                                                    onChange: (t) =>
                                                      n("hero", "startDate", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Live Sessions Schedule",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.hero.liveTimes,
                                                    onChange: (t) =>
                                                      n("hero", "liveTimes", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Student Rating Count Caption",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.hero.studentRatingText,
                                                    onChange: (t) =>
                                                      n(
                                                        "hero",
                                                        "studentRatingText",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "mentor" ? "" : "mentor"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(Z, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Mentor Details",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit instructor names, subtitles, experience stats, and biography",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "mentor" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "mentor" &&
                                          e.jsxs("div", {
                                            className:
                                              "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Mentor Name",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.mentor.name,
                                                    onChange: (t) =>
                                                      n("mentor", "name", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Experience Years Count",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.mentor.experienceYears,
                                                    onChange: (t) =>
                                                      n(
                                                        "mentor",
                                                        "experienceYears",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Marathi Subtitle",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.mentor.marathiSubtitle,
                                                    onChange: (t) =>
                                                      n(
                                                        "mentor",
                                                        "marathiSubtitle",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "English Subtitle",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.mentor.englishSubtitle,
                                                    onChange: (t) =>
                                                      n(
                                                        "mentor",
                                                        "englishSubtitle",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2 md:col-span-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Mentor Biography",
                                                  }),
                                                  e.jsx("textarea", {
                                                    rows: 3,
                                                    value: a.mentor.description,
                                                    onChange: (t) =>
                                                      n("mentor", "description", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Students Count Stat (e.g., 1K+)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.mentor.statsStudents,
                                                    onChange: (t) =>
                                                      n("mentor", "statsStudents", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Plan Duration Stat (e.g., 365)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.mentor.statsPlan,
                                                    onChange: (t) =>
                                                      n("mentor", "statsPlan", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Rating Stat Score (e.g., 4.9★)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.mentor.statsRating,
                                                    onChange: (t) =>
                                                      n("mentor", "statsRating", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "pricing" ? "" : "pricing"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(Fe, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Pricing & Value",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit plan names, discount rates, pricing numbers, and day rates",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "pricing" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "pricing" &&
                                          e.jsxs("div", {
                                            className:
                                              "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Plan Name Caption",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.pricing.planName,
                                                    onChange: (t) =>
                                                      n("pricing", "planName", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Discount Rate Text (e.g., 58% OFF)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.pricing.discountText,
                                                    onChange: (t) =>
                                                      n("pricing", "discountText", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Sale Offer Price (e.g., ₹4,999)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.pricing.price,
                                                    onChange: (t) =>
                                                      n("pricing", "price", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Original Price (e.g., ₹12,000)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.pricing.originalPrice,
                                                    onChange: (t) =>
                                                      n("pricing", "originalPrice", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Rupee Daily Cost Plan (e.g., ₹13)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.pricing.rupeeCost,
                                                    onChange: (t) =>
                                                      n("pricing", "rupeeCost", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Rupee Cost Subtitle Caption",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.pricing.rupeeCostSubtitle,
                                                    onChange: (t) =>
                                                      n(
                                                        "pricing",
                                                        "rupeeCostSubtitle",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "contacts" ? "" : "contacts"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(Re, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Socials & Contacts",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit call numbers, Whatsapp API phone values, and social platform links",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "contacts" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "contacts" &&
                                          e.jsxs("div", {
                                            className:
                                              "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children:
                                                      "Direct Call Phone Number (e.g., +91 95793 17724)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.contacts.phone,
                                                    onChange: (t) =>
                                                      n("contacts", "phone", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children:
                                                      "WhatsApp API Digits Only (e.g., 919579317724)",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.contacts.whatsappNumber,
                                                    onChange: (t) =>
                                                      n(
                                                        "contacts",
                                                        "whatsappNumber",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Instagram Feed Link URL",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "url",
                                                    value: a.contacts.instagramUrl,
                                                    onChange: (t) =>
                                                      n("contacts", "instagramUrl", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Facebook Link URL",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "url",
                                                    value: a.contacts.facebookUrl,
                                                    onChange: (t) =>
                                                      n("contacts", "facebookUrl", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Threads Link URL",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "url",
                                                    value: a.contacts.threadsUrl,
                                                    onChange: (t) =>
                                                      n("contacts", "threadsUrl", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "whyJoin" ? "" : "whyJoin"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(P, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Why Join",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit section title, subtitle, and the four key benefit items",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "whyJoin" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "whyJoin" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "grid gap-5 md:grid-cols-2",
                                                children: [
                                                  e.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      e.jsx("label", {
                                                        className:
                                                          "text-xs font-bold text-muted-foreground",
                                                        children: "Section Title",
                                                      }),
                                                      e.jsx("input", {
                                                        type: "text",
                                                        value: a.whyJoin.title,
                                                        onChange: (t) =>
                                                          n("whyJoin", "title", t.target.value),
                                                        className:
                                                          "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      e.jsx("label", {
                                                        className:
                                                          "text-xs font-bold text-muted-foreground",
                                                        children: "Section Subtitle",
                                                      }),
                                                      e.jsx("input", {
                                                        type: "text",
                                                        value: a.whyJoin.subtitle,
                                                        onChange: (t) =>
                                                          n("whyJoin", "subtitle", t.target.value),
                                                        className:
                                                          "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3",
                                                    children: "Benefit Cards (4 items)",
                                                  }),
                                                  e.jsx("div", {
                                                    className: "grid gap-5 md:grid-cols-2",
                                                    children: a.whyJoin.items.map((t, s) =>
                                                      e.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft",
                                                          children: [
                                                            e.jsxs("p", {
                                                              className:
                                                                "text-xs font-bold text-muted-foreground",
                                                              children: ["Benefit Item #", s + 1],
                                                            }),
                                                            e.jsxs("div", {
                                                              className: "grid gap-3",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Icon String (e.g. Sun, Heart, Award, Users)",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.icon,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "whyJoin",
                                                                          "items",
                                                                          s,
                                                                          "icon",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "English Title",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.title,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "whyJoin",
                                                                          "items",
                                                                          s,
                                                                          "title",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Marathi Title",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.marathi,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "whyJoin",
                                                                          "items",
                                                                          s,
                                                                          "marathi",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Description",
                                                                    }),
                                                                    e.jsx("textarea", {
                                                                      rows: 2,
                                                                      value: t.desc,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "whyJoin",
                                                                          "items",
                                                                          s,
                                                                          "desc",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none",
                                                                    }),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        s,
                                                      ),
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "whoFor" ? "" : "whoFor"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(_, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Who It's For",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit target audience categories, icons, and descriptions (6 cards)",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "whoFor" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "whoFor" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2 max-w-md",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Section Title",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.whoFor.title,
                                                    onChange: (t) =>
                                                      n("whoFor", "title", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3",
                                                    children: "Audience Cards (6 items)",
                                                  }),
                                                  e.jsx("div", {
                                                    className: "grid gap-5 md:grid-cols-2",
                                                    children: a.whoFor.cards.map((t, s) =>
                                                      e.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft",
                                                          children: [
                                                            e.jsxs("p", {
                                                              className:
                                                                "text-xs font-bold text-muted-foreground",
                                                              children: ["Audience Card #", s + 1],
                                                            }),
                                                            e.jsxs("div", {
                                                              className: "grid gap-3",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Icon String (e.g. Briefcase, Home, GraduationCap, Baby, Scale, Brain)",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.icon,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "whoFor",
                                                                          "cards",
                                                                          s,
                                                                          "icon",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Card Title",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.title,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "whoFor",
                                                                          "cards",
                                                                          s,
                                                                          "title",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Description",
                                                                    }),
                                                                    e.jsx("textarea", {
                                                                      rows: 2,
                                                                      value: t.desc,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "whoFor",
                                                                          "cards",
                                                                          s,
                                                                          "desc",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none",
                                                                    }),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        s,
                                                      ),
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "features" ? "" : "features"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(K, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Features & Benefits",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit main title, subtitles, and floating badges (6 items)",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "features" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "features" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "grid gap-5 md:grid-cols-2",
                                                children: [
                                                  e.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      e.jsx("label", {
                                                        className:
                                                          "text-xs font-bold text-muted-foreground",
                                                        children: "Section Title",
                                                      }),
                                                      e.jsx("input", {
                                                        type: "text",
                                                        value: a.features.title,
                                                        onChange: (t) =>
                                                          n("features", "title", t.target.value),
                                                        className:
                                                          "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      e.jsx("label", {
                                                        className:
                                                          "text-xs font-bold text-muted-foreground",
                                                        children: "Section Subtitle",
                                                      }),
                                                      e.jsx("input", {
                                                        type: "text",
                                                        value: a.features.subtitle,
                                                        onChange: (t) =>
                                                          n("features", "subtitle", t.target.value),
                                                        className:
                                                          "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3",
                                                    children: "Floating Badges (6 items)",
                                                  }),
                                                  e.jsx("div", {
                                                    className: "grid gap-5 md:grid-cols-3",
                                                    children: a.features.items.map((t, s) =>
                                                      e.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "p-4 rounded-xl border border-border/80 bg-muted/10 space-y-3 shadow-soft",
                                                          children: [
                                                            e.jsxs("p", {
                                                              className:
                                                                "text-xs font-bold text-muted-foreground",
                                                              children: ["Badge #", s + 1],
                                                            }),
                                                            e.jsxs("div", {
                                                              className: "space-y-2",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Icon String (e.g. Sun, Brain, Wind, Scale, Leaf, Heart)",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.icon,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "features",
                                                                          "items",
                                                                          s,
                                                                          "icon",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Badge Label",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.label,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "features",
                                                                          "items",
                                                                          s,
                                                                          "label",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        s,
                                                      ),
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "reasons" ? "" : "reasons"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(P, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Reasons to Join",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit reasons banner title and benefit bullet list (5 items)",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "reasons" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "reasons" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2 max-w-md",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Section Title",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.reasons.title,
                                                    onChange: (t) =>
                                                      n("reasons", "title", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3",
                                                    children: "Bullet Reasons (5 items)",
                                                  }),
                                                  e.jsx("div", {
                                                    className: "space-y-4",
                                                    children: a.reasons.items.map((t, s) =>
                                                      e.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "p-4 rounded-xl border border-border/80 bg-muted/10 grid gap-4 md:grid-cols-2 items-center shadow-soft",
                                                          children: [
                                                            e.jsxs("span", {
                                                              className:
                                                                "text-xs font-bold text-muted-foreground",
                                                              children: ["Reason #", s + 1],
                                                            }),
                                                            e.jsxs("div", {
                                                              className: "grid gap-3 md:col-span-2",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Title",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.title,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "reasons",
                                                                          "items",
                                                                          s,
                                                                          "title",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Description",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.desc,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "reasons",
                                                                          "items",
                                                                          s,
                                                                          "desc",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        s,
                                                      ),
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            m(o === "beforeAfter" ? "" : "beforeAfter"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(ye, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Before & After",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit titles, subtitles, and list comparison bullets",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "beforeAfter" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "beforeAfter" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2 max-w-md",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Section Title",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.beforeAfter.title,
                                                    onChange: (t) =>
                                                      n("beforeAfter", "title", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className:
                                                  "grid gap-6 md:grid-cols-2 border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsxs("div", {
                                                    className:
                                                      "p-5 rounded-2xl border border-border bg-muted/5 space-y-4",
                                                    children: [
                                                      e.jsx("p", {
                                                        className:
                                                          "text-xs font-bold uppercase tracking-wider text-muted-foreground",
                                                        children:
                                                          "Left Card (Before / Current State)",
                                                      }),
                                                      e.jsxs("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                          e.jsxs("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                              e.jsx("label", {
                                                                className:
                                                                  "text-[10px] font-bold text-muted-foreground",
                                                                children: "Header Label",
                                                              }),
                                                              e.jsx("input", {
                                                                type: "text",
                                                                value: a.beforeAfter.beforeTitle,
                                                                onChange: (t) =>
                                                                  n(
                                                                    "beforeAfter",
                                                                    "beforeTitle",
                                                                    t.target.value,
                                                                  ),
                                                                className:
                                                                  "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                              }),
                                                            ],
                                                          }),
                                                          e.jsxs("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                              e.jsx("label", {
                                                                className:
                                                                  "text-[10px] font-bold text-muted-foreground",
                                                                children: "Subtitle",
                                                              }),
                                                              e.jsx("input", {
                                                                type: "text",
                                                                value: a.beforeAfter.beforeSubtitle,
                                                                onChange: (t) =>
                                                                  n(
                                                                    "beforeAfter",
                                                                    "beforeSubtitle",
                                                                    t.target.value,
                                                                  ),
                                                                className:
                                                                  "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                              }),
                                                            ],
                                                          }),
                                                        ],
                                                      }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "space-y-2 border-t border-border/40 pt-3",
                                                        children: [
                                                          e.jsx("label", {
                                                            className:
                                                              "text-[10px] font-bold text-muted-foreground",
                                                            children: "Bullet Points (5 items)",
                                                          }),
                                                          a.beforeAfter.beforeItems.map((t, s) =>
                                                            e.jsx(
                                                              "input",
                                                              {
                                                                type: "text",
                                                                value: t,
                                                                onChange: (r) =>
                                                                  H(
                                                                    "beforeItems",
                                                                    s,
                                                                    r.target.value,
                                                                  ),
                                                                className:
                                                                  "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                              },
                                                              s,
                                                            ),
                                                          ),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className:
                                                      "p-5 rounded-2xl border border-saffron/20 bg-saffron/5 space-y-4",
                                                    children: [
                                                      e.jsx("p", {
                                                        className:
                                                          "text-xs font-bold uppercase tracking-wider text-saffron-deep",
                                                        children:
                                                          "Right Card (After / Transformation State)",
                                                      }),
                                                      e.jsxs("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                          e.jsxs("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                              e.jsx("label", {
                                                                className:
                                                                  "text-[10px] font-bold text-muted-foreground",
                                                                children: "Header Label",
                                                              }),
                                                              e.jsx("input", {
                                                                type: "text",
                                                                value: a.beforeAfter.afterTitle,
                                                                onChange: (t) =>
                                                                  n(
                                                                    "beforeAfter",
                                                                    "afterTitle",
                                                                    t.target.value,
                                                                  ),
                                                                className:
                                                                  "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                              }),
                                                            ],
                                                          }),
                                                          e.jsxs("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                              e.jsx("label", {
                                                                className:
                                                                  "text-[10px] font-bold text-muted-foreground",
                                                                children: "Subtitle",
                                                              }),
                                                              e.jsx("input", {
                                                                type: "text",
                                                                value: a.beforeAfter.afterSubtitle,
                                                                onChange: (t) =>
                                                                  n(
                                                                    "beforeAfter",
                                                                    "afterSubtitle",
                                                                    t.target.value,
                                                                  ),
                                                                className:
                                                                  "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                              }),
                                                            ],
                                                          }),
                                                        ],
                                                      }),
                                                      e.jsxs("div", {
                                                        className:
                                                          "space-y-2 border-t border-border/40 pt-3",
                                                        children: [
                                                          e.jsx("label", {
                                                            className:
                                                              "text-[10px] font-bold text-muted-foreground",
                                                            children: "Bullet Points (5 items)",
                                                          }),
                                                          a.beforeAfter.afterItems.map((t, s) =>
                                                            e.jsx(
                                                              "input",
                                                              {
                                                                type: "text",
                                                                value: t,
                                                                onChange: (r) =>
                                                                  H(
                                                                    "afterItems",
                                                                    s,
                                                                    r.target.value,
                                                                  ),
                                                                className:
                                                                  "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                              },
                                                              s,
                                                            ),
                                                          ),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            m(o === "bestStudents" ? "" : "bestStudents"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(ve, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Star Students",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit month's best students, stats, achievements, quotes (3 cards)",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "bestStudents" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "bestStudents" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "grid gap-5 md:grid-cols-2",
                                                children: [
                                                  e.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      e.jsx("label", {
                                                        className:
                                                          "text-xs font-bold text-muted-foreground",
                                                        children: "Section Title",
                                                      }),
                                                      e.jsx("input", {
                                                        type: "text",
                                                        value: a.bestStudents.title,
                                                        onChange: (t) =>
                                                          n(
                                                            "bestStudents",
                                                            "title",
                                                            t.target.value,
                                                          ),
                                                        className:
                                                          "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      e.jsx("label", {
                                                        className:
                                                          "text-xs font-bold text-muted-foreground",
                                                        children: "Section Subtitle",
                                                      }),
                                                      e.jsx("input", {
                                                        type: "text",
                                                        value: a.bestStudents.subtitle,
                                                        onChange: (t) =>
                                                          n(
                                                            "bestStudents",
                                                            "subtitle",
                                                            t.target.value,
                                                          ),
                                                        className:
                                                          "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3",
                                                    children: "Star Student Cards (3 items)",
                                                  }),
                                                  e.jsx("div", {
                                                    className: "grid gap-6 md:grid-cols-3",
                                                    children: a.bestStudents.students.map((t, s) =>
                                                      e.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft",
                                                          children: [
                                                            e.jsxs("p", {
                                                              className:
                                                                "text-xs font-bold text-muted-foreground",
                                                              children: ["Student #", s + 1],
                                                            }),
                                                            e.jsxs("div", {
                                                              className: "grid gap-3",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Name",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.name,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "name",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Location & Role",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.location,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "location",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Avatar Text (Initials)",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.imageText,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "imageText",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Consistency Metric Tag (e.g. 98% Consistency)",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.stat,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "stat",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Focus/Tag Title",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.tag,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "tag",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Days Metric (e.g. 29/30 Days)",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.days,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "days",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Achievement Title",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.achievement,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "achievement",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Accent styling classes",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.color,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "color",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Student Quote",
                                                                    }),
                                                                    e.jsx("textarea", {
                                                                      rows: 3,
                                                                      value: t.quote,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "bestStudents",
                                                                          "students",
                                                                          s,
                                                                          "quote",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron resize-none",
                                                                    }),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        s,
                                                      ),
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "reels" ? "" : "reels"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(we, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Instagram Reels",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit social showcase header, reels titles, topics, metrics (4 items)",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "reels" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "reels" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "grid gap-5 md:grid-cols-2",
                                                children: [
                                                  e.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      e.jsx("label", {
                                                        className:
                                                          "text-xs font-bold text-muted-foreground",
                                                        children: "Section Title",
                                                      }),
                                                      e.jsx("input", {
                                                        type: "text",
                                                        value: a.reels.title,
                                                        onChange: (t) =>
                                                          n("reels", "title", t.target.value),
                                                        className:
                                                          "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                      }),
                                                    ],
                                                  }),
                                                  e.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      e.jsx("label", {
                                                        className:
                                                          "text-xs font-bold text-muted-foreground",
                                                        children: "Section Subtitle",
                                                      }),
                                                      e.jsx("input", {
                                                        type: "text",
                                                        value: a.reels.subtitle,
                                                        onChange: (t) =>
                                                          n("reels", "subtitle", t.target.value),
                                                        className:
                                                          "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3",
                                                    children: "Reels Items (4 items)",
                                                  }),
                                                  e.jsx("div", {
                                                    className: "grid gap-5 md:grid-cols-2",
                                                    children: a.reels.items.map((t, s) => {
                                                      const r = t;
                                                      return e.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft",
                                                          children: [
                                                            e.jsxs("p", {
                                                              className:
                                                                "text-xs font-bold text-muted-foreground",
                                                              children: ["Reel #", s + 1],
                                                            }),
                                                            e.jsxs("div", {
                                                              className: "grid gap-3",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Instagram Reel URL",
                                                                    }),
                                                                    e.jsxs("div", {
                                                                      className: "flex gap-2",
                                                                      children: [
                                                                        e.jsx("input", {
                                                                          type: "text",
                                                                          placeholder:
                                                                            "https://www.instagram.com/reel/...",
                                                                          value: r.reelUrl || "",
                                                                          onChange: (d) =>
                                                                            l(
                                                                              "reels",
                                                                              "items",
                                                                              s,
                                                                              "reelUrl",
                                                                              d.target.value,
                                                                            ),
                                                                          className:
                                                                            "flex-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron focus:ring-1 focus:ring-saffron/20",
                                                                        }),
                                                                        e.jsx("button", {
                                                                          type: "button",
                                                                          onClick: () => {
                                                                            const d =
                                                                                r.reelUrl || "",
                                                                              c = Je(d);
                                                                            if (c) {
                                                                              const x = `https://www.instagram.com/p/${c}/media/?size=l`;
                                                                              (l(
                                                                                "reels",
                                                                                "items",
                                                                                s,
                                                                                "imageUrl",
                                                                                x,
                                                                              ),
                                                                                i.success(
                                                                                  "Cover banner fetched successfully!",
                                                                                ));
                                                                            } else
                                                                              i.error(
                                                                                "Please enter a valid Instagram reel URL first.",
                                                                              );
                                                                          },
                                                                          className:
                                                                            "rounded-xl bg-saffron/10 px-3 py-1.5 text-[10px] font-bold text-saffron-deep hover:bg-saffron/20",
                                                                          children:
                                                                            "⚡ Fetch Cover",
                                                                        }),
                                                                      ],
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Cover Banner Image",
                                                                    }),
                                                                    e.jsxs("div", {
                                                                      className:
                                                                        "flex items-center gap-3",
                                                                      children: [
                                                                        r.imageUrl
                                                                          ? e.jsx("img", {
                                                                              src: r.imageUrl,
                                                                              alt: "Cover Preview",
                                                                              className:
                                                                                "h-10 w-10 rounded-lg object-cover border border-border bg-muted/20",
                                                                            })
                                                                          : e.jsx("div", {
                                                                              className:
                                                                                "h-10 w-10 rounded-lg border border-dashed border-border flex items-center justify-center text-[10px] text-muted-foreground",
                                                                              children: "None",
                                                                            }),
                                                                        e.jsxs("div", {
                                                                          className:
                                                                            "flex-1 space-y-1.5",
                                                                          children: [
                                                                            e.jsx("input", {
                                                                              type: "file",
                                                                              accept: "image/*",
                                                                              onChange: async (
                                                                                d,
                                                                              ) => {
                                                                                const c =
                                                                                  d.target
                                                                                    .files?.[0];
                                                                                if (c)
                                                                                  try {
                                                                                    const x =
                                                                                      await R(
                                                                                        c,
                                                                                        400,
                                                                                        700,
                                                                                      );
                                                                                    (l(
                                                                                      "reels",
                                                                                      "items",
                                                                                      s,
                                                                                      "imageUrl",
                                                                                      x,
                                                                                    ),
                                                                                      i.success(
                                                                                        "Cover banner uploaded successfully!",
                                                                                      ));
                                                                                  } catch {
                                                                                    i.error(
                                                                                      "Failed to process cover.",
                                                                                    );
                                                                                  }
                                                                              },
                                                                              className:
                                                                                "w-full text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-saffron/10 file:text-saffron-deep hover:file:bg-saffron/20 file:cursor-pointer",
                                                                            }),
                                                                            e.jsx("input", {
                                                                              type: "text",
                                                                              placeholder:
                                                                                "Or paste external banner image URL...",
                                                                              value:
                                                                                r.imageUrl || "",
                                                                              onChange: (d) =>
                                                                                l(
                                                                                  "reels",
                                                                                  "items",
                                                                                  s,
                                                                                  "imageUrl",
                                                                                  d.target.value,
                                                                                ),
                                                                              className:
                                                                                "w-full rounded-xl border border-border bg-background px-2 py-1 text-[10px] outline-none focus:border-saffron",
                                                                            }),
                                                                          ],
                                                                        }),
                                                                      ],
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Reel Title",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.title,
                                                                      onChange: (d) =>
                                                                        l(
                                                                          "reels",
                                                                          "items",
                                                                          s,
                                                                          "title",
                                                                          d.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Topic Description",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.topic,
                                                                      onChange: (d) =>
                                                                        l(
                                                                          "reels",
                                                                          "items",
                                                                          s,
                                                                          "topic",
                                                                          d.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className:
                                                                    "grid grid-cols-2 gap-2",
                                                                  children: [
                                                                    e.jsxs("div", {
                                                                      className: "space-y-1",
                                                                      children: [
                                                                        e.jsx("label", {
                                                                          className:
                                                                            "text-[10px] font-bold text-muted-foreground",
                                                                          children: "Likes Count",
                                                                        }),
                                                                        e.jsx("input", {
                                                                          type: "text",
                                                                          value: t.likes,
                                                                          onChange: (d) =>
                                                                            l(
                                                                              "reels",
                                                                              "items",
                                                                              s,
                                                                              "likes",
                                                                              d.target.value,
                                                                            ),
                                                                          className:
                                                                            "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                        }),
                                                                      ],
                                                                    }),
                                                                    e.jsxs("div", {
                                                                      className: "space-y-1",
                                                                      children: [
                                                                        e.jsx("label", {
                                                                          className:
                                                                            "text-[10px] font-bold text-muted-foreground",
                                                                          children:
                                                                            "Comments Count",
                                                                        }),
                                                                        e.jsx("input", {
                                                                          type: "text",
                                                                          value: t.comments,
                                                                          onChange: (d) =>
                                                                            l(
                                                                              "reels",
                                                                              "items",
                                                                              s,
                                                                              "comments",
                                                                              d.target.value,
                                                                            ),
                                                                          className:
                                                                            "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                        }),
                                                                      ],
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Preview Image Text (Fallback)",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.bgText,
                                                                      onChange: (d) =>
                                                                        l(
                                                                          "reels",
                                                                          "items",
                                                                          s,
                                                                          "bgText",
                                                                          d.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "CSS HSL Gradients (Fallback)",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.gradient,
                                                                      onChange: (d) =>
                                                                        l(
                                                                          "reels",
                                                                          "items",
                                                                          s,
                                                                          "gradient",
                                                                          d.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        s,
                                                      );
                                                    }),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "finalCta" ? "" : "finalCta"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(Ce, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Final Call to Action",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit bottom slogan, Marathi subtitle, button and seat limit texts",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "finalCta" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "finalCta" &&
                                          e.jsxs("div", {
                                            className:
                                              "grid gap-5 p-6 md:grid-cols-2 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2 md:col-span-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "English Main Slogan Title",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.finalCta.title,
                                                    onChange: (t) =>
                                                      n("finalCta", "title", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Marathi Subtitle",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.finalCta.marathiSubtitle,
                                                    onChange: (t) =>
                                                      n(
                                                        "finalCta",
                                                        "marathiSubtitle",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Button Text",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.finalCta.buttonText,
                                                    onChange: (t) =>
                                                      n("finalCta", "buttonText", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "space-y-2 md:col-span-2",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Seats Left Caption Text",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.finalCta.seatsLeftText,
                                                    onChange: (t) =>
                                                      n(
                                                        "finalCta",
                                                        "seatsLeftText",
                                                        t.target.value,
                                                      ),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () => m(o === "faqSection" ? "" : "faqSection"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(Te, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Dynamic FAQs",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit accordion questions and complete answers (6 items)",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "faqSection" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "faqSection" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2 max-w-md",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Section Title",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.faqSection.title,
                                                    onChange: (t) =>
                                                      n("faqSection", "title", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3",
                                                    children: "Questions & Answers (6 items)",
                                                  }),
                                                  e.jsx("div", {
                                                    className: "space-y-5",
                                                    children: a.faqSection.faqs.map((t, s) =>
                                                      e.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-3 shadow-soft",
                                                          children: [
                                                            e.jsxs("p", {
                                                              className:
                                                                "text-xs font-bold text-muted-foreground",
                                                              children: ["FAQ #", s + 1],
                                                            }),
                                                            e.jsxs("div", {
                                                              className: "space-y-2",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Question",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.q,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "faqSection",
                                                                          "faqs",
                                                                          s,
                                                                          "q",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Answer",
                                                                    }),
                                                                    e.jsx("textarea", {
                                                                      rows: 3,
                                                                      value: t.a,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "faqSection",
                                                                          "faqs",
                                                                          s,
                                                                          "a",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none",
                                                                    }),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        s,
                                                      ),
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                    e.jsxs("div", {
                                      className: "transition-all",
                                      children: [
                                        e.jsxs("button", {
                                          type: "button",
                                          onClick: () =>
                                            m(o === "testimonials" ? "" : "testimonials"),
                                          className:
                                            "flex w-full items-center justify-between bg-muted/20 px-6 py-5 text-left transition hover:bg-muted/40",
                                          children: [
                                            e.jsxs("div", {
                                              className: "flex items-center gap-4",
                                              children: [
                                                e.jsx("div", {
                                                  className:
                                                    "flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/10 text-saffron-deep",
                                                  children: e.jsx(_, { className: "h-5 w-5" }),
                                                }),
                                                e.jsxs("div", {
                                                  children: [
                                                    e.jsx("h3", {
                                                      className:
                                                        "font-bold text-base text-foreground",
                                                      children: "Testimonials / Reviews",
                                                    }),
                                                    e.jsx("p", {
                                                      className:
                                                        "text-xs text-muted-foreground mt-0.5",
                                                      children:
                                                        "Edit reviews main heading and individual client success quotes (6 items)",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            e.jsx("span", {
                                              className: `text-muted-foreground transition-transform duration-200 ${o === "testimonials" ? "rotate-180" : ""}`,
                                              children: "▼",
                                            }),
                                          ],
                                        }),
                                        o === "testimonials" &&
                                          e.jsxs("div", {
                                            className:
                                              "space-y-6 p-6 bg-card border-t border-border/40",
                                            children: [
                                              e.jsxs("div", {
                                                className: "space-y-2 max-w-md",
                                                children: [
                                                  e.jsx("label", {
                                                    className:
                                                      "text-xs font-bold text-muted-foreground",
                                                    children: "Section Title",
                                                  }),
                                                  e.jsx("input", {
                                                    type: "text",
                                                    value: a.testimonials.title,
                                                    onChange: (t) =>
                                                      n("testimonials", "title", t.target.value),
                                                    className:
                                                      "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20",
                                                  }),
                                                ],
                                              }),
                                              e.jsxs("div", {
                                                className: "border-t border-border/60 pt-4",
                                                children: [
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs font-bold uppercase tracking-wider text-saffron-deep mb-3",
                                                    children: "Client Reviews (6 items)",
                                                  }),
                                                  e.jsx("div", {
                                                    className: "grid gap-5 md:grid-cols-2",
                                                    children: a.testimonials.items.map((t, s) =>
                                                      e.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "p-5 rounded-2xl border border-border/80 bg-muted/10 space-y-4 shadow-soft",
                                                          children: [
                                                            e.jsxs("p", {
                                                              className:
                                                                "text-xs font-bold text-muted-foreground",
                                                              children: ["Review Card #", s + 1],
                                                            }),
                                                            e.jsxs("div", {
                                                              className: "grid gap-3",
                                                              children: [
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children: "Client Name",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.name,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "testimonials",
                                                                          "items",
                                                                          s,
                                                                          "name",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Location or Subtitle",
                                                                    }),
                                                                    e.jsx("input", {
                                                                      type: "text",
                                                                      value: t.role,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "testimonials",
                                                                          "items",
                                                                          s,
                                                                          "role",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron",
                                                                    }),
                                                                  ],
                                                                }),
                                                                e.jsxs("div", {
                                                                  className: "space-y-1",
                                                                  children: [
                                                                    e.jsx("label", {
                                                                      className:
                                                                        "text-[10px] font-bold text-muted-foreground",
                                                                      children:
                                                                        "Quote / Review Text",
                                                                    }),
                                                                    e.jsx("textarea", {
                                                                      rows: 3,
                                                                      value: t.text,
                                                                      onChange: (r) =>
                                                                        l(
                                                                          "testimonials",
                                                                          "items",
                                                                          s,
                                                                          "text",
                                                                          r.target.value,
                                                                        ),
                                                                      className:
                                                                        "w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none transition focus:border-saffron resize-none",
                                                                    }),
                                                                  ],
                                                                }),
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        s,
                                                      ),
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsx("div", {
                                  className: "flex justify-end pt-4",
                                  children: e.jsx("button", {
                                    type: "submit",
                                    disabled: J,
                                    className:
                                      "flex items-center justify-center gap-2 rounded-2xl gradient-warm px-8 py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-50",
                                    children: J
                                      ? e.jsxs(e.Fragment, {
                                          children: [
                                            e.jsx(E, { className: "h-5 w-5 animate-spin" }),
                                            "Saving Configurations...",
                                          ],
                                        })
                                      : e.jsxs(e.Fragment, {
                                          children: [
                                            e.jsx(P, { className: "h-5 w-5" }),
                                            "Save All Changes",
                                          ],
                                        }),
                                  }),
                                }),
                              ],
                            }),
                      ],
                    }),
              ],
            }),
          ],
        })
      : e.jsxs("div", {
          className:
            "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12",
          children: [
            e.jsx("div", { className: "absolute inset-0 bg-dotted opacity-40" }),
            e.jsx("div", {
              className: "absolute inset-0",
              style: { background: "var(--gradient-hero)" },
            }),
            e.jsx(L, {
              children: e.jsxs("div", {
                className:
                  "relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border bg-card/80 p-8 shadow-soft backdrop-blur-md sm:p-10",
                children: [
                  e.jsx("div", {
                    className:
                      "mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-warm text-primary-foreground shadow-glow",
                    children: e.jsx(q, { className: "h-7 w-7 animate-pulse" }),
                  }),
                  e.jsxs("div", {
                    className: "mt-6 text-center",
                    children: [
                      e.jsxs("h1", {
                        className: "font-display text-2xl font-bold tracking-tight",
                        children: [
                          "SATTVAYOGA ",
                          e.jsx("span", { className: "text-gradient-warm", children: "365" }),
                        ],
                      }),
                      e.jsx("p", {
                        className:
                          "mt-2 text-sm font-semibold uppercase tracking-wider text-saffron-deep",
                        children: "Secure Administrator Access",
                      }),
                      e.jsx("p", {
                        className: "mt-2 text-sm text-muted-foreground leading-relaxed",
                        children:
                          "Sign in with an authorized administrator Google Account to access the lead metrics and contact directory.",
                      }),
                    ],
                  }),
                  j &&
                    e.jsxs("div", {
                      className:
                        "mt-6 flex gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-xs leading-relaxed text-destructive",
                      children: [
                        e.jsx(Be, { className: "h-5 w-5 shrink-0" }),
                        e.jsx("p", { children: j }),
                      ],
                    }),
                  e.jsxs("button", {
                    onClick: re,
                    className:
                      "group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground py-4 font-semibold text-background shadow-soft transition hover:scale-[1.02] active:scale-[0.98]",
                    children: [
                      e.jsx("svg", {
                        className: "h-5 w-5 fill-current",
                        viewBox: "0 0 24 24",
                        children: e.jsx("path", {
                          d: "M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.072 0-5.561-2.49-5.561-5.561s2.49-5.561 5.561-5.561c1.432 0 2.723.543 3.702 1.432l3.14-3.14C18.847 3.868 15.748 2.23 12.24 2.23 6.843 2.23 2.47 6.603 2.47 12s4.373 9.77 9.77 9.77c5.626 0 9.356-3.957 9.356-9.522 0-.616-.057-1.216-.164-1.785l-9.192-.178z",
                        }),
                      }),
                      "Sign in with Google",
                    ],
                  }),
                  e.jsx("div", {
                    className: "mt-6 text-center",
                    children: e.jsx("a", {
                      href: "/",
                      className:
                        "text-xs font-semibold text-muted-foreground transition hover:text-saffron-deep",
                      children: "← Back to Homepage",
                    }),
                  }),
                ],
              }),
            }),
          ],
        });
}
export { Ve as component };
