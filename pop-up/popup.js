/**
 * COBINAR POPUP CONFIG
 * ────────────────────
 * Edit this file to change what the popup shows.
 * Then embed the popup anywhere with:
 *   <script src="/pop-up/popup.js" type="module"></script>
 *   (or include popup.html as an iframe / web component)
 *
 * BUTTON MODES:
 *   "go"           → Arrow button → visits `link`
 *   "subscription" → "Subscribe →" → visits `link` (newsletter / membership)
 *   "follow"       → "Follow @Cobinar_app" → visits `link` (social)
 */

export const POPUP_CONFIG = {

  /** Toggle popup on/off without touching anything else */
  enabled: true,

  /** Delay before popup appears (ms) */
  delay: 2000,

  /** Only show once per session (set false to show every page load) */
  oncePerSession: true,

  /** Popup content */
  title: "Welcome to Cobinar",
  description: "The unified ecosystem for intelligence, commerce, and creation. Built by Cobernal Systems.",
  image: "/icons/cobinar-512.png",   // optional — leave "" to hide

  /** Button config */
  button: {
    /**
     * Switch between: "go" | "subscription" | "follow"
     * Each auto-sets a label — override with `label` below
     */
    mode: "go",

    /** Optional custom label. Leave "" to use the mode default. */
    label: "",

    /** Where the button points */
    link: "https://binaris.cobinar.com",

    /** Open in new tab? */
    newTab: true,
  },

  /** Optional dismiss link below button (leave "" to hide) */
  dismissLabel: "No thanks",
};

// ── Mode defaults ──────────────────────────────────────────────────────────
const MODE_LABELS = {
  go:           "Explore Cobinar →",
  subscription: "Subscribe →",
  follow:       "Follow @Cobinar_app",
};

export function getButtonLabel(config) {
  return config.button.label || MODE_LABELS[config.button.mode] || "Visit →";
}
