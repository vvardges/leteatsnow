import { initializeApp, getApps } from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  query,
  orderByChild,
  limitToLast,
  get,
} from 'firebase/database';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';

// Use env vars for web config (avoid hardcoding secrets/ids)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function getFirebaseApp() {
  return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

const app = getFirebaseApp();
const db = getDatabase(app);

// --- Analytics (Next.js-safe) ---
// Firebase Analytics only works in the browser and only if supported.
// Also: calling getAnalytics during SSR can throw, so we lazy-init.
let analyticsPromise = null;

async function getAnalyticsSafe() {
  if (typeof window === 'undefined') return null;

  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      const supported = await isSupported();
      if (!supported) return null;
      return getAnalytics(app);
    })();
  }

  return analyticsPromise;
}

/**
 * Client-safe analytics event logger.
 * - No-op on server
 * - No-op if Analytics unsupported
 * - Never throws (won't break gameplay)
 */
export async function track(eventName, params = {}) {
  try {
    const analytics = await getAnalyticsSafe();
    if (!analytics) return;
    logEvent(analytics, eventName, params);
  } catch {
    // swallow errors
  }
}

export function submitScore(name, score) {
  const scoresRef = ref(db, 'scores');
  push(scoresRef, { name, score })
    .then(() => {
      track('score_submitted', { score });
      console.log('Score submitted successfully');
    })
    .catch((error) => {
      track('score_submit_error', { message: String(error?.message || error) });
      console.error('Error submitting score:', error);
    });
}

export async function getTopScores() {
  const scoresRef = ref(db, 'scores');
  const topScoresQuery = query(scoresRef, orderByChild('score'), limitToLast(10));

  try {
    const snapshot = await get(topScoresQuery);
    if (snapshot.exists()) {
      const scores = [];
      snapshot.forEach((childSnapshot) => {
        scores.push(childSnapshot.val());
      });

      // Sort descending because `limitToLast` gives the lowest first
      scores.sort((a, b) => b.score - a.score);

      track('leaderboard_loaded', { count: scores.length });
      return scores;
    } else {
      track('leaderboard_loaded', { count: 0 });
      console.log('No scores found');
      return [];
    }
  } catch (error) {
    track('leaderboard_load_error', { message: String(error?.message || error) });
    console.error('Error retrieving scores:', error);
    return [];
  }
}