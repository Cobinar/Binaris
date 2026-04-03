// ═══════════════════════════════════════════
//  auth.js — Binaris Auth Utilities
//  Thin layer over firebase-init.js kept so any
//  existing imports from "/auth/auth.js" keep working.
// ═══════════════════════════════════════════

// Re-export everything from the single source of truth
export { auth, signInWithGoogle, signOut, onAuthStateChanged } from "./firebase-init.js";

/**
 * Returns the currently signed-in user, or null.
 * Resolves only after Firebase has finished restoring the session.
 */
export function getCurrentUser(authInstance) {
  return new Promise((resolve) => {
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}
