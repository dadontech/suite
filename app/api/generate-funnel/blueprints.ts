// ─── Funnel Blueprints ────────────────────────────────────────────────────────
// Defines the EXACT page structure for every funnel type.
// This is the source of truth — route.ts, CreateCampaign, and FunnelBuilder
// all derive their page counts and IDs from here.

export interface BlueprintPage {
  id: string;
  label: string;
  icon: string;
}

export interface Blueprint {
  pages: BlueprintPage[];
  emailCount: number;
}

export const BLUEPRINTS: Record<string, Blueprint> = {

  // ── BRIDGE FUNNEL ─────────────────────────────────────────────────────────
  // Russell Brunson official structure: EXACTLY 2 pages.
  // Page 1 = Opt-in Page  (visitor enters email for a free bonus/lead magnet)
  // Page 2 = Bridge Page  (personal VIDEO introduces the offer + CTA to affiliate link)
  // The affiliate vendor page is external — it is NOT a page we build.
  bridge: {
    pages: [
      { id: "bridge-optin", label: "Opt-in Page",  icon: "mail"  },
      { id: "bridge-ad",    label: "Bridge Page",  icon: "video" },
    ],
    emailCount: 7,
  },

  // ── VSL FUNNEL ────────────────────────────────────────────────────────────
  // Robby Blanchard method: 5 pages
  vsl: {
    pages: [
      { id: "vsl-optin",    label: "Opt-in Page",   icon: "mail"         },
      { id: "vsl-watch",    label: "VSL Watch Page", icon: "video"        },
      { id: "vsl-order",    label: "Order Page",     icon: "shoppingCart" },
      { id: "vsl-upsell",   label: "Upsell / OTO",  icon: "zap"          },
      { id: "vsl-thankyou", label: "Thank You Page", icon: "check"        },
    ],
    emailCount: 9,
  },

  // ── REVIEW + BONUS STACK ──────────────────────────────────────────────────
  // Pat Flynn / Authority Hacker method: 3 pages
  review_bonus: {
    pages: [
      { id: "review-article", label: "Review Article",    icon: "fileText"     },
      { id: "bonus-reveal",   label: "Bonus Reveal Page", icon: "gift"         },
      { id: "checkout",       label: "Affiliate Checkout", icon: "shoppingCart" },
    ],
    emailCount: 5,
  },

  // ── QUIZ / SURVEY FUNNEL ──────────────────────────────────────────────────
  // Ryan Levesque Ask Method: 4 pages
  quiz: {
    pages: [
      { id: "quiz-landing",  label: "Quiz Landing Page",  icon: "helpCircle"   },
      { id: "quiz-optin",    label: "Quiz Opt-in Gate",   icon: "mail"         },
      { id: "quiz-results",  label: "Results Page",       icon: "barChart"     },
      { id: "checkout",      label: "Segmented Offer",    icon: "shoppingCart" },
    ],
    emailCount: 7,
  },

  // ── AUTO-WEBINAR FUNNEL ───────────────────────────────────────────────────
  // John Crestani method: 5 pages
  webinar: {
    pages: [
      { id: "webinar-registration", label: "Registration Page",   icon: "userCheck"    },
      { id: "webinar-confirm",      label: "Confirmation + Indoc", icon: "mail"        },
      { id: "webinar-watch",        label: "Webinar Watch Page",  icon: "video"        },
      { id: "webinar-order",        label: "Order Page",          icon: "shoppingCart" },
      { id: "webinar-replay",       label: "Replay Page",         icon: "rotateCcw"    },
    ],
    emailCount: 12,
  },

  // ── FLASH DEAL FUNNEL ─────────────────────────────────────────────────────
  // Spencer Mecham method: 3 pages
  flash: {
    pages: [
      { id: "flash-deal",     label: "Flash Deal Page", icon: "zap"          },
      { id: "flash-order",    label: "Order Page",      icon: "shoppingCart" },
      { id: "flash-thankyou", label: "Thank You + OTO", icon: "gift"         },
    ],
    emailCount: 3,
  },

  // ── LEGACY / FALLBACKS ────────────────────────────────────────────────────
  // Kept for backward compatibility with existing campaigns

  "Comparison Funnel": {
    pages: [
      { id: "review-article", label: "Review Article",   icon: "fileText"     },
      { id: "bonus-reveal",   label: "Comparison Page",  icon: "gitBranch"    },
      { id: "checkout",       label: "Checkout",         icon: "shoppingCart" },
    ],
    emailCount: 4,
  },

  Review: {
    pages: [
      { id: "review-article", label: "Review Article",  icon: "fileText"     },
      { id: "bridge-optin",   label: "Email Opt-in",    icon: "mail"         },
      { id: "checkout",       label: "Checkout",        icon: "shoppingCart" },
    ],
    emailCount: 5,
  },

  Discount: {
    pages: [
      { id: "flash-deal",  label: "Flash Deal Page", icon: "zap"          },
      { id: "flash-order", label: "Order Page",      icon: "shoppingCart" },
    ],
    emailCount: 3,
  },
};