import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from "firebase/auth";
import type { LandingPageContent } from "./defaultContent";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Firebase credentials fetched from Vite environment variables (.env file)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if credentials are set (prevents site crashes if .env is missing/not filled yet)
const isFirebaseConfigured =
  !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "your-api-key-here";

if (!isFirebaseConfigured) {
  console.warn(
    "⚠️ SATTVAYOGA 365 Warning: Firebase API keys are not configured yet.\n" +
      "Please copy '.env.example' to '.env' in your project root and paste your Firebase SDK credentials to enable Auth and Firestore database storage.",
  );
}

// Initialize Firebase App instance
const app = isFirebaseConfigured
  ? getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp()
  : null;

// Core Services Export
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();

// Google Authentication provider configuration
googleProvider.setCustomParameters({
  prompt: "select_account", // Always prompt the user to choose their Google Account
});

/**
 * Signs in the user using Google Auth Popup.
 */
export async function signInWithGoogle() {
  if (!auth) {
    throw new Error("Firebase Auth is not configured. Please check your .env file keys.");
  }
  return signInWithPopup(auth, googleProvider);
}

/**
 * Signs out the currently authenticated user.
 */
export async function logoutAdmin() {
  if (!auth) return;
  return signOut(auth);
}

/**
 * Checks if a given email is whitelisted in the VITE_ADMIN_EMAILS environment variable.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;

  // Fetch whitelisted emails from environment variables, fallback to defaults
  const whitelistString =
    import.meta.env.VITE_ADMIN_EMAILS || "gauravchhajer@gmail.com,admin@example.com";
  const whitelistedEmails = whitelistString.split(",").map((e: string) => e.trim().toLowerCase());

  return whitelistedEmails.includes(email.toLowerCase());
}

/**
 * Helper to submit a lead to Firestore 'leads' collection.
 */
export async function submitLead(leadData: { name: string; phone: string; email: string }) {
  if (!db) {
    console.warn("Firestore is not configured. Lead was not saved to database.");
    return null;
  }

  return addDoc(collection(db, "leads"), {
    ...leadData,
    timestamp: serverTimestamp(), // Record high-precision server time
    createdAt: new Date().toISOString(), // Local ISO timestamp backup
  });
}

/**
 * Fetches the dynamic landing page settings from Firestore.
 */
export async function getLandingPageContent() {
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

/**
 * Updates the dynamic landing page settings in Firestore.
 */
export async function updateLandingPageContent(data: LandingPageContent) {
  if (!db) {
    throw new Error("Firestore is not configured. Could not save dynamic changes.");
  }
  return setDoc(doc(db, "content", "landing"), data);
}
