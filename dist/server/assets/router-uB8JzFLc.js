import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDoc, doc, getFirestore, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
const appCss = "/assets/styles-CFlukA7V.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      {
        name: "description",
        content: "SATTVAYOGA Transformation Hub is a responsive yoga landing page for a transformation program."
      },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      {
        property: "og:description",
        content: "SATTVAYOGA Transformation Hub is a responsive yoga landing page for a transformation program."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { title: "SATTVAYOGA 365 — Transform Your Life with Daily Yoga" },
      {
        name: "description",
        content: "Join SATTVAYOGA 365, a 365-day yoga transformation program by Pooja Ingle. Daily practice, expert guidance, community support — for working professionals, homemakers, students and women after delivery."
      },
      { name: "twitter:title", content: "Lovable App" },
      {
        name: "twitter:description",
        content: "SATTVAYOGA Transformation Hub is a responsive yoga landing page for a transformation program."
      },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/92260982-df07-41a1-a2fe-dfa92de8518a/id-preview-d6424c64--b1173027-47b3-48d3-a634-0e390548baf8.lovable.app-1778676772998.png"
      },
      {
        name: "twitter:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/92260982-df07-41a1-a2fe-dfa92de8518a/id-preview-d6424c64--b1173027-47b3-48d3-a634-0e390548baf8.lovable.app-1778676772998.png"
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter$1 = () => import("./admin-CRdcnO0v.js");
const Route$1 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  // Admin is a private, auth-gated tool — no SEO value, uses browser-only APIs
  // (window, document, canvas, FileReader). Disabling SSR prevents server crashes.
  ssr: false,
  head: () => ({
    meta: [
      {
        title: "Admin Portal — SATTVAYOGA 365"
      },
      {
        name: "robots",
        content: "noindex, nofollow"
      }
      // Keep out of search engines
    ]
  })
});
const firebaseConfig = {
  apiKey: "AIzaSyAXC6ysl7iYLQbayDOO2zAXROmmMuUZfA8",
  authDomain: "sattvayoga-96d62.firebaseapp.com",
  projectId: "sattvayoga-96d62",
  storageBucket: "sattvayoga-96d62.firebasestorage.app",
  messagingSenderId: "920731978524",
  appId: "1:920731978524:web:9e0f9b96a935969ed0c8d9",
  measurementId: "G-TMP1XF6J8Q"
};
const isFirebaseConfigured = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "your-api-key-here";
if (!isFirebaseConfigured) {
  console.warn(
    "⚠️ SATTVAYOGA 365 Warning: Firebase API keys are not configured yet.\nPlease copy '.env.example' to '.env' in your project root and paste your Firebase SDK credentials to enable Auth and Firestore database storage."
  );
}
const app = isFirebaseConfigured ? getApps().length === 0 ? initializeApp(firebaseConfig) : getApp() : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
  // Always prompt the user to choose their Google Account
});
async function signInWithGoogle() {
  if (!auth) {
    throw new Error("Firebase Auth is not configured. Please check your .env file keys.");
  }
  return signInWithPopup(auth, googleProvider);
}
async function logoutAdmin() {
  if (!auth) return;
  return signOut(auth);
}
function isAdminEmail(email) {
  if (!email) return false;
  const whitelistString = "yagneshc28@gmail.com,poojamore9860@gmail.com,gaurav613n@gmail.com";
  const whitelistedEmails = whitelistString.split(",").map((e) => e.trim().toLowerCase());
  return whitelistedEmails.includes(email.toLowerCase());
}
async function submitLead(leadData) {
  if (!db) {
    console.warn("Firestore is not configured. Lead was not saved to database.");
    return null;
  }
  return addDoc(collection(db, "leads"), {
    ...leadData,
    timestamp: serverTimestamp(),
    // Record high-precision server time
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
    // Local ISO timestamp backup
  });
}
async function getLandingPageContent() {
  if (!db) return null;
  try {
    const docSnap = await getDoc(doc(db, "content", "landing"));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.error("Error fetching landing page content: ", err);
  }
  return null;
}
async function updateLandingPageContent(data) {
  if (!db) {
    throw new Error("Firestore is not configured. Could not save dynamic changes.");
  }
  return setDoc(doc(db, "content", "landing"), data);
}
const $$splitComponentImporter = () => import("./index-C8mOZcFZ.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async () => {
    try {
      const data = await getLandingPageContent();
      return {
        initialContent: data
      };
    } catch (e) {
      console.error("Vite Route Loader error:", e);
      return {
        initialContent: null
      };
    }
  },
  head: () => ({
    meta: [{
      title: "SATTVAYOGA 365 — Transform Your Life with Daily Yoga | Pooja Ingle"
    }, {
      name: "description",
      content: "Join SATTVAYOGA 365, a premium 365-day yoga transformation program by Pooja Ingle. Daily live practice, expert guidance, weight loss, stress relief and mental peace."
    }, {
      property: "og:title",
      content: "SATTVAYOGA 365 — Transform Your Life"
    }, {
      property: "og:description",
      content: "365 days. One mentor. A complete yoga transformation."
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        name: "SATTVAYOGA 365",
        description: "365-day yoga transformation program",
        provider: {
          "@type": "Person",
          name: "Pooja Ingle"
        }
      })
    }]
  })
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$2
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  auth as a,
  submitLead as b,
  db as d,
  getLandingPageContent as g,
  isAdminEmail as i,
  logoutAdmin as l,
  router as r,
  signInWithGoogle as s,
  updateLandingPageContent as u
};
