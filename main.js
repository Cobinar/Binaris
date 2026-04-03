// ═══════════════════════════════════════════
//  main.js — Binaris Auth State Manager
//  Import this as a module in index.html.
//  Handles: auth guard redirect, user UI state,
//           sign-out binding.
// ═══════════════════════════════════════════
import { auth, onAuthStateChanged, signOut } from "./firebase-init.js";

// ── Auth guard ────────────────────────────────────────────────────────────────
// If the user is not signed in, send them to the login page immediately.
// We wait for Firebase to resolve the persisted session before deciding.

let authResolved = false;

const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (authResolved) return; // Only act on the first resolution
  authResolved = true;
  unsubscribe();            // Stop listening — guard only needed once on load

  if (!user) {
    // Not signed in → redirect to login
    window.location.replace("/login.html");
    return;
  }

  // ── Signed-in state ──────────────────────────────────────────────────────
  console.log("[Binaris] Authenticated:", user.email);

  // Update any UI elements that display user info
  const userInfoEl  = document.getElementById("user-info");
  const loginBtnEl  = document.getElementById("login-btn");
  const logoutBtnEl = document.getElementById("logout-btn");
  const userAvatarEl = document.getElementById("user-avatar");

  if (userInfoEl)  userInfoEl.textContent  = user.displayName || user.email;
  if (loginBtnEl)  loginBtnEl.style.display  = "none";
  if (logoutBtnEl) logoutBtnEl.style.display = "block";

  // If there is a user avatar element, show their photo
  if (userAvatarEl && user.photoURL) {
    userAvatarEl.src = user.photoURL;
    userAvatarEl.style.display = "block";
  }
});

// ── Sign-out ──────────────────────────────────────────────────────────────────
window.logout = async function () {
  try {
    await signOut();
    window.location.replace("/login.html");
  } catch (err) {
    console.error("[Binaris] Sign-out failed:", err);
  }
};
