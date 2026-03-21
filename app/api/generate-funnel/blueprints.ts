export const BLUEPRINTS: Record<string, {
  pages: Array<{ id: string; label: string; icon: string }>;
  emailCount: number;
}> = {
  bridge: {
    pages: [
      { id: 'bridge-ad',    label: 'Bridge Page',       icon: 'layers'       },
      { id: 'bridge-optin', label: 'Email Opt-in',      icon: 'mail'         },
      { id: 'checkout',     label: 'Affiliate Offer',   icon: 'shoppingCart' },
    ],
    emailCount: 7,
  },
  vsl: {
    pages: [
      { id: 'vsl-optin',   label: 'Opt-in Page',    icon: 'mail'         },
      { id: 'vsl-watch',   label: 'VSL Watch Page', icon: 'video'        },
      { id: 'vsl-order',   label: 'Order Page',     icon: 'shoppingCart' },
      { id: 'vsl-upsell',  label: 'Upsell (OTO)',   icon: 'zap'          },
      { id: 'vsl-thankyou',label: 'Thank You Page', icon: 'check'        },
    ],
    emailCount: 9,
  },
  review_bonus: {
    pages: [
      { id: 'review-article', label: 'Review Article',    icon: 'fileText'     },
      { id: 'bonus-reveal',   label: 'Bonus Reveal Page', icon: 'gift'         },
      { id: 'checkout',       label: 'Affiliate Checkout',icon: 'shoppingCart' },
    ],
    emailCount: 5,
  },
  quiz: {
    pages: [
      { id: 'quiz-landing',  label: 'Quiz Landing Page', icon: 'helpCircle'   },
      { id: 'quiz-optin',    label: 'Quiz Opt-in',       icon: 'mail'         },
      { id: 'quiz-results',  label: 'Results Page',      icon: 'barChart'     },
      { id: 'checkout',      label: 'Segmented Offer',   icon: 'shoppingCart' },
    ],
    emailCount: 7,
  },
  webinar: {
    pages: [
      { id: 'webinar-registration', label: 'Registration Page',   icon: 'users'        },
      { id: 'webinar-confirm',      label: 'Confirmation Page',   icon: 'mail'         },
      { id: 'webinar-watch',        label: 'Webinar Watch Page',  icon: 'video'        },
      { id: 'webinar-order',        label: 'Order Page',          icon: 'shoppingCart' },
      { id: 'webinar-replay',       label: 'Replay Page',         icon: 'play'         },
    ],
    emailCount: 12,
  },
  flash: {
    pages: [
      { id: 'flash-deal',    label: 'Flash Deal Page', icon: 'zap'          },
      { id: 'flash-order',   label: 'Order Page',      icon: 'shoppingCart' },
      { id: 'flash-thankyou',label: 'Thank You + OTO', icon: 'check'        },
    ],
    emailCount: 3,
  },
  Review: {
    pages: [
      { id: 'review-article', label: 'Review Article',  icon: 'fileText'     },
      { id: 'bridge-optin',   label: 'Email Opt-in',    icon: 'mail'         },
      { id: 'checkout',       label: 'Checkout',        icon: 'shoppingCart' },
    ],
    emailCount: 5,
  },
  'Comparison Funnel': {
    pages: [
      { id: 'review-article', label: 'Review Article',  icon: 'fileText'     },
      { id: 'bonus-reveal',   label: 'Comparison Page', icon: 'gitBranch'    },
      { id: 'checkout',       label: 'Checkout',        icon: 'shoppingCart' },
    ],
    emailCount: 4,
  },
  Discount: {
    pages: [
      { id: 'flash-deal',  label: 'Limited Offer', icon: 'zap'          },
      { id: 'flash-order', label: 'Checkout',      icon: 'shoppingCart' },
    ],
    emailCount: 5,
  },
};