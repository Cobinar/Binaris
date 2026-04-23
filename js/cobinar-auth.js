/**
 * cobinar-auth.js — Shared auth persistence & donate utilities
 * Used by index.html, profile.html, products/index.html
 *
 * Auth is stored in localStorage so it survives page navigation,
 * new tabs, and browser restarts. sessionStorage is kept as a
 * same-tab fast-path for backward compatibility.
 */

export const AUTH_KEY   = 'cobinar-user';
export const THEME_KEY  = 'cobinar-theme';
export const LANG_KEY   = 'cobinar-lang';
export const DONATE_URL = 'https://payments.cobinar.com/?label=Support+Cobinar&desc=Help+us+keep+building+amazing+tools&donate=1';

/**
 * Write authenticated user data to both localStorage and sessionStorage.
 * Call this from any page that has Firebase Auth (login.html, profile.html).
 */
export function writeUserAuth(user) {
  if (!user?.email) return;
  const d = {
    email:  user.email,
    name:   user.displayName || '',
    photo:  user.photoURL    || '',
    uid:    user.uid         || '',
    ts:     Date.now(),
  };
  try { localStorage.setItem(AUTH_KEY, JSON.stringify(d)); } catch(_) {}
  sessionStorage.setItem('cobinar-user-email', d.email);
  sessionStorage.setItem('cobinar-user-name',  d.name);
  sessionStorage.setItem('cobinar-user-photo', d.photo);
  sessionStorage.setItem('cobinar-user-uid',   d.uid);
}

/**
 * Clear auth from both stores (sign-out).
 */
export function clearUserAuth() {
  try { localStorage.removeItem(AUTH_KEY); } catch(_) {}
  ['cobinar-user-email','cobinar-user-name','cobinar-user-photo','cobinar-user-uid',
   'cobinar-admin-token','cobinar-admin-email'].forEach(k => sessionStorage.removeItem(k));
}

/**
 * Read the current user from sessionStorage (fast path) → localStorage (cross-page).
 * Returns null if not signed in.
 */
export function getCobinarUser() {
  const email = sessionStorage.getItem('cobinar-user-email');
  if (email) {
    return {
      email,
      name:  sessionStorage.getItem('cobinar-user-name')  || '',
      photo: sessionStorage.getItem('cobinar-user-photo') || '',
      uid:   sessionStorage.getItem('cobinar-user-uid')   || '',
    };
  }
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.email) {
        // Back-sync to sessionStorage so subsequent reads are fast
        sessionStorage.setItem('cobinar-user-email', u.email);
        sessionStorage.setItem('cobinar-user-name',  u.name  || '');
        sessionStorage.setItem('cobinar-user-photo', u.photo || '');
        sessionStorage.setItem('cobinar-user-uid',   u.uid   || '');
        return u;
      }
    }
  } catch(_) {}
  return null;
}

/**
 * Apply the loaded user to a page's nav bar (standardised across pages).
 * Expects element IDs used across the codebase.
 */
export function applyUserToNav(user, opts = {}) {
  const $ = id => document.getElementById(id);
  if (!user?.email) return;

  // Hide login button
  ['navLoginBtn','navLogin'].forEach(id => { const el=$(id); if(el) el.style.display='none'; });

  // Mobile drawer sign-in link → "My Account"
  ['drawerSignIn','ndLogin'].forEach(id => {
    const el=$(id);
    if (el) { el.textContent='My Account'; el.href='/login'; }
  });

  // Show nav user pill
  ['navUser'].forEach(id => {
    const el=$(id);
    if (!el) return;
    el.style.display='flex';
    const img = el.querySelector('img') || $('navUserImg');
    if (img && user.photo) img.src = user.photo;
    const nameEl = el.querySelector('.nav-user-name') || el.querySelector('.nav-user-nm');
    if (nameEl) nameEl.textContent = (user.name || user.email).split(' ')[0].split('@')[0];
    if (!el._navClick) {
      el._navClick = true;
      el.addEventListener('click', () => { location.href = '/login'; });
    }
  });
}
