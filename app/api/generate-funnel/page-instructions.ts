export function getPageInstructions(pageId: string, originalLink: string, productTitle: string, videoTitle: string = ''): string {
  const instructions: Record<string, string> = {

    // ════════════════════════════════════════════════════════════════
    // BRIDGE FUNNEL PAGES
    // ════════════════════════════════════════════════════════════════

    'bridge-optin': `
YOU ARE BUILDING: A Russell Brunson‑style Lead Capture Page
GOAL: One action only – name and email in exchange for something valuable.
DESIGN PRINCIPLE: Less is more. Every extra element kills conversions.

EXACT BLOCK ORDER:
1. "attention-bar" – the exact free thing they're about to receive.
2. "hero" – variant per personality:
   - headline: the transformation the free resource delivers (NOT "Free Guide").
   - subheadline: exactly what they'll discover inside. Specific, outcome‑focused.
   - badge: "FREE — Instant Access".
   - NO CTA on the hero – the optin‑form IS the CTA.
3. "bullets" – exactly 4 bullets. Each one = a specific revelation from the free resource:
   - "The [specific thing] most people get wrong about [topic] (and the simple fix)"
   - "Why [common approach] backfires for [audience] — and what actually works"
   - "The exact [method/tool/strategy] that [produced specific result] in [timeframe]"
   - "How to [achieve outcome] without [the thing they fear most]"
4. "optin-form" – variant per personality. MUST include:
   - headline: "Send Me The Free [Resource Name] Now"
   - subheadline: "Instant delivery to your inbox — takes 30 seconds"
   - cta: "Yes, Send Me Free Access Now"
   - items: 3 bullets matching the hero promise
   - body: "No spam. Unsubscribe anytime. 100% private."
5. "stars" – "X,XXX people already downloaded this"
6. "badge" – "Secure" / "Instant Access" / "No Credit Card" / "Unsubscribe Anytime"

RUSSELL'S RULES:
- NO navigation, NO links, NO distractions. One goal.
- The optin‑form IS the entire bottom half of this page.
- Do NOT include testimonial‑grid – too many elements kills opt‑in rate.
- Do NOT include countdown – creates friction before they've opted in.
- Mobile‑first: if it's annoying on a phone, cut it.`,

    'bridge-ad': `
YOU ARE BUILDING: Russell Brunson Bridge Funnel — Page 2 of 2: The Bridge Page

FROM THE OFFICIAL CLICKFUNNELS DOCUMENTATION:
"After opting in, visitors are taken to a bridge page that introduces the product
or service. This page includes a VIDEO that explains what the offer is, why it is
recommended, and what to do next. A call-to-action button links directly to the
external sales or checkout page."

══════════════════════════════════════════════════════════════
THE VIDEO BLOCK IS THE MOST IMPORTANT ELEMENT ON THIS PAGE.
IT MUST APPEAR IMMEDIATELY — BLOCK 4, RIGHT AFTER THE HEADLINE.
DO NOT BURY IT UNDER PARAGRAPHS, STORY COPY, OR ARTICLE BLOCKS.
══════════════════════════════════════════════════════════════

EXACT BLOCK ORDER — DO NOT DEVIATE:
1. "attention-bar" – "Watch This Short Video Before You Continue"
2. "headline" – "Before You Go — Watch This Short Video From [First Name]"
3. "subheading" – "I recorded this specifically for you. It explains exactly what this is, why I recommend it, and what to do next."
4. "video" – THE HERO BLOCK. Place it HERE, as the fourth block on the page:
   headline: "Watch: Why I Recommend ${productTitle}"
   body: "Press play before you continue. This short video explains exactly what the offer is, why I personally recommend it, and what happens when you click the button below."
5. "callout" – headline: "What This Video Covers" / body: 2‑sentence summary bridging the video to the offer. Warm, personal tone.
6. "testimonial" – one real‑sounding person who watched this video and then took action on the offer.
7. "button" – variant: "wide":
   cta: "Yes — Take Me To The Full Presentation"
   ctaLink: "#"
   subheadline: "Free to watch — no obligation"
8. "badge" – "Secure" / "Free to Watch" / "No Obligation" / "60-Day Guarantee"

CRITICAL RULES — READ EVERY WORD:
- Do NOT use the "article" block on this page. This is NOT an editorial page.
- Do NOT use "dropcap-paragraph". This is NOT a blog or story page.
- Do NOT use "paragraph" blocks with <h2> sections. Keep ALL copy SHORT.
- Do NOT use "comparison", "features", "stats", "faq", or "testimonial-grid".
- The "video" block MUST be block 4 — immediately after headline and subheading.
- The CTA button appears AFTER the video, never before it.
- Tone: warm and personal, like a trusted friend making a recommendation.
- ctaLink on the button: "#" — the affiliate link is on the external vendor page only.`,

    // ════════════════════════════════════════════════════════════════
    // VSL FUNNEL PAGES
    // ════════════════════════════════════════════════════════════════

    'vsl-optin': `
YOU ARE BUILDING: A VSL Opt‑in Page – the gateway to your video.
RULE: This is the most minimal page in the funnel. Nothing exists except the promise and the form.
CONVERSION PSYCHOLOGY: They trade their email for a free training video.

EXACT BLOCK ORDER:
1. "attention-bar" – "Free Video Training: [Specific Promise]"
2. "hero" – variant: "minimal" or "centered". Fields:
   - eyebrow: "FREE VIDEO TRAINING"
   - headline: "Discover How To [achieve outcome] Without [painful thing] — Even If [biggest objection]"
   - subheadline: "In this free [X]-minute training, you will discover..."
   - badge: "100% Free — Instant Access"
   - NO cta on hero itself
3. "bullets" – exactly 3 items (what they'll learn inside the video):
   - "The [#]-step method that [result] for [audience] in [timeframe]"
   - "Why [conventional wisdom] is wrong — and what actually generates results"
   - "The single biggest mistake [audience] make that costs them [time/money]"
4. "optin-form" – variant: "centered". Fields:
   - badge: "FREE INSTANT ACCESS"
   - headline: "Where Should I Send Your Free Training?"
   - subheadline: "Enter your best email and I will send you instant access"
   - cta: "Send Me The Free Training Now"
   - items: mirror the 3 bullet promises above
   - body: "No spam. Unsubscribe instantly. 100% private."
5. "badge" – "No credit card" / "Instant access" / "Secure" / "Private"

RUSSELL'S RULES:
- Page must have NO MORE than these 5 blocks. Every extra block kills conversions.
- NO images of the product.
- NO testimonials (save them for the VSL watch page).
- NO social media links.
- NO footer navigation.`,

    'vsl-watch': `
YOU ARE BUILDING: The VSL Watch Page – where the magic happens.
RULE: The video IS the page. Everything else exists to support the video.
CONVERSION PSYCHOLOGY: They must watch the whole video. Curiosity + social proof before play. CTA after play.

EXACT BLOCK ORDER:
1. "attention-bar" – "Watch The Full Video Below — Do Not Close This Page"
2. "headline" – the exact promise the video makes. Pattern: ${videoTitle ? `"Watch: ${videoTitle}"` : `"Watch: How [Name] [achieved outcome] Using [method] — The Full [X]-Minute Training"`}
   Use the video title to create a compelling headline that matches the video's promise.
3. "stars" – "[X,XXX] people have already watched this training" – social proof before they press play.
4. "testimonial" – one quote from someone who watched it and acted. Short, result‑focused.
5. "video" – headline: "Press Play To Start Your Free Training" / body: "Watch the complete video before taking any action — the most important part comes at the [X]-minute mark"
6. "callout" – headline: "Still Watching?" / body: "The offer discussed in the video is available for a limited time. Click the button below when you are ready."
7. "button" – CTA: "Yes, I Want [outcome from video] — Show Me How" – ctaLink: "#"
8. "testimonial-grid" – variant: "dark". 3 testimonials from people who watched and took action.
9. "guarantee" – reinforce: watching is free, the offer has a full guarantee.
10. "faq" – 3 items: "Is this real?", "How fast does it work?", "What if it does not work for me?"
11. "badge" – trust signals.

RUSSELL'S RULES:
- The CTA button text and the headline must directly reflect the video's main promise. If a video title is provided, ensure the CTA promises the same outcome.
- NO distracting navigation or links on this page.
- The CTA button ("Show Me How") appears AFTER the video, not before.
- Page background should be dark or neutral – makes the video pop.
- Do NOT include a countdown before the video – it kills watch rate.`,

    'vsl-order': `
YOU ARE BUILDING: The VSL Order Page – closing time.
CONVERSION PSYCHOLOGY: They just watched the full VSL and are at maximum readiness. Strike now. Stack value. Create urgency. Remove risk.

EXACT BLOCK ORDER:
1. "countdown" – headline: "Special Offer Expires When Timer Hits Zero" – minutes: 20
2. "hero-dark" – eyebrow: "SPECIAL OFFER FOR NEW MEMBERS ONLY"
   - headline: "You Are One Step Away From [the exact transformation from the video]"
   - subheadline: "Here Is Everything You Get When You Join Today"
   - stats: [{value:"$[price]",label:"Today Only"},{value:"[X]",label:"Bonuses Included"},{value:"[X] Days",label:"Money-Back Guarantee"},{value:"Instant",label:"Access"}]
3. "features" – variant: "numbered". headline: "Here Is Everything Included In Your Order Today":
   Each column = one deliverable with specific name, specific value ($XXX), specific description.
4. "stats" – variant: "light". The 4 most compelling proof numbers from the product.
5. "testimonial-grid" – variant: "featured". Headline: "See What Members Are Saying"
6. "comparison" – "What You Get Today" vs "What Everyone Else Is Paying". Make the deal feel incredible.
7. "guarantee" – headline with the exact guarantee duration. Make it risk‑free in specific language.
8. "callout" – headline: "Here Is What Happens When You Click The Button Below" – body: step‑by‑step of what happens after purchase (instant access, etc.).
9. "button" – variant: "wide". CTA: "Yes, I Want [outcome] — Add To Order Now" – ctaLink: "${originalLink}"
10. "faq" – 4 items: "Is this a subscription?", "How do I access everything?", "What if it does not work?", "Is my payment secure?"
11. "badge" – payment logos, security badges, guarantee badge.

RUSSELL'S RULES:
- The affiliate link "${originalLink}" goes on the main "Add To Order" button ONLY.
- The countdown must be the very first thing they see.
- Do NOT put the price until after you have stacked all the value.
- Every testimonial must reference a specific result (not just "love this product").`,

    'vsl-upsell': `
YOU ARE BUILDING: The One‑Time Offer (OTO) – the easiest sale you'll ever make.
CONVERSION PSYCHOLOGY: They JUST bought. They're in buying mode. Present one specific upgrade. Make saying No feel like a mistake.

EXACT BLOCK ORDER:
1. "attention-bar" – "Wait — Your Order Is Being Processed. Read This Important Message First."
2. "hero" – variant: "centered"
   - eyebrow: "EXCLUSIVE ONE-TIME OFFER FOR NEW MEMBERS"
   - headline: "Add [specific upgrade] To Your Order For Just $[price] — This Offer Disappears When You Leave This Page"
   - subheadline: "This is the one thing that [specific members who upgraded] say made the biggest difference"
3. "image" 16/9 – show what the upgrade includes.
4. "paragraph" – HTML body:
   <h2>Why I Am Making This Available Right Now</h2>
   Explain WHY this upgrade is available only at this moment. Make the reason logical and fair‑sounding.
   <h2>Here Is Exactly What You Are Getting</h2>
   List the upgrade contents with specific details and values.
5. "features" – variant: "cards". The 3 core components of the upgrade with specific names.
6. "testimonial" – one quote from a member who upgraded and got a specific extra result.
7. "countdown" – "This Upgrade Offer Expires In:" – minutes: 15
8. "guarantee" – all purchases covered by the same guarantee.
9. "button" – variant: "wide". CTA: "Yes, Add This Upgrade To My Order" – ctaLink: "#"
10. "subheading" – the "No thanks" line: "No thanks, I do not want [specific thing the upgrade provides]. Please process my original order only."
11. "badge" – security + guarantee badges.

RUSSELL'S RULES:
- ONE offer only. Do not stack multiple upsells on this page.
- The upgrade must logically extend what they already bought.
- The "No thanks" option must not feel hostile – respectful but clear about what they are giving up.`,

    'vsl-thankyou': `
YOU ARE BUILDING: The Thank You Page – seed the next offer.
CONVERSION PSYCHOLOGY: Buyer's dopamine is high. Confirm the purchase, deliver access, and plant the seed for the next action.

EXACT BLOCK ORDER:
1. "hero" – variant: "centered"
   - eyebrow: "ORDER CONFIRMED"
   - headline: "Welcome To [product/community name]. Your Access Is Being Prepared."
   - subheadline: "Check your inbox — your login details will arrive within 5 minutes. While you wait, read the message below."
   - badge: "Order Confirmed"
2. "callout" – headline: "What Happens Next" / body: exact step‑by‑step delivery instructions (1. Check email, 2. Click link, 3. Create account, 4. Access everything).
3. "paragraph" – <h2>One More Thing Before You Get Started</h2> – introduce the next logical offer as a natural continuation. Frame it as "the members who get the best results also do this."
4. "features" – variant: "list". Show 3 things they can look forward to now they are a member.
5. "testimonial" – one quote from a happy member who got results quickly.
6. "button" – CTA: "Start Here: Access Your [product] Now" – ctaLink: "#"
7. "badge" – support email, community link placeholders.

RUSSELL'S RULE: Keep this warm and celebratory. They made the right call – confirm it.`,

    // ════════════════════════════════════════════════════════════════
    // REVIEW + BONUS STACK FUNNEL PAGES
    // ════════════════════════════════════════════════════════════════

    'review-article': `
YOU ARE BUILDING: A Long‑Form Affiliate Review Article (SEO + YouTube style)
GOAL: Rank on Google, rank on YouTube, and convert organic traffic into affiliate commissions.
TONE: Journalist. Independent. Honest about flaws. The recommendation comes naturally from evidence.

MANDATORY BLOCK STRUCTURE (minimum 18 blocks):

1. "attention-bar" – "Exclusive: Get [X]% Off + $[value] In Bonuses Through This Link"
2. "article" – variant per personality. eyebrow: "INDEPENDENT REVIEW [YEAR]"
   headline: "I Used ${productTitle} For 90 Days. Here Is My Brutally Honest Verdict."
   subheadline: specific deck – what makes this review different from others.
3. "table-of-contents" – 7 sections matching what follows.
4. "image" 21/9 – hero image.
5. "dropcap-paragraph" – opening: "I" + the problem that led to testing this. 3‑4 sentences plain text.
6. "stars" – rating + review count.
7. "paragraph" – HTML:
   <h2>What Is ${productTitle}? (And Who Is It Actually For)</h2>
   3 paragraphs explaining what it is, who made it, who it is designed to help.
   <h2>My First Impressions After 7 Days</h2>
   Honest early observations – what worked immediately, what took adjustment.
8. "callout" – headline: "Quick Verdict" / body: 2‑sentence summary of overall conclusion.
9. "image" 16/9 – mid‑article context image.
10. "paragraph" – HTML:
    <h2>The Results After 30 Days</h2>
    Specific numbers. Specific timeframes. Real observations.
    <h2>What I Like Most About ${productTitle}</h2>
    3‑5 specific genuine strengths.
11. "pull-quote" – most compelling result sentence from body copy.
12. "paragraph" – HTML:
    <h2>What I Do Not Like (Honest Cons)</h2>
    2‑3 real weaknesses. Being honest here makes the pros more credible.
    <h2>Who Should Buy This — And Who Should Not</h2>
    Specific audience fit criteria. List both who it IS and is NOT for.
13. "comparison" – "${productTitle}" vs the most well‑known alternative. 5 specific pro/con items each.
14. "features" – variant per personality. "The [X] Things That Make ${productTitle} Different".
15. "stats" – 4 specific proof numbers from using the product.
16. "testimonial" – one real‑sounding verified buyer quote.
17. "article-verdict" – score 8.5–9.5. 2‑sentence verdict.
18. "testimonial-grid" – variant per personality. 3 buyers with specific results.
19. "faq" – 5 items covering: price, guarantee, who it works for, how fast, vs alternatives.
20. "callout" – "Final Recommendation" – 2 sentences: for whom, why now.
21. "button" – CTA: "Get ${productTitle} + My Exclusive Bonuses Here" – ctaLink: "#"
22. "guarantee" – 60‑day guarantee block.
23. "author-bio" – reviewer credentials.
24. "article-end" – share prompt.

RUSSELL'S RULES:
- Be brutally honest. The recommendation comes from real experience.
- Use specifics: numbers, dates, names. That's what builds trust.`,

    'bonus-reveal': `
YOU ARE BUILDING: The Bonus Reveal Page – the conversion engine of the Review funnel.
CONVERSION PSYCHOLOGY: Buying through your link gives them MORE than buying direct. Your bonuses ARE the reason to use your link.

EXACT BLOCK ORDER:
1. "attention-bar" – "Important: These Exclusive Bonuses Only Unlock Through The Link Below"
2. "hero-dark" – eyebrow: "EXCLUSIVE AFFILIATE BONUS PACKAGE"
   headline: "Get ${productTitle} Through This Link And I Will Give You $[total value] In Free Bonuses"
   subheadline: "These bonuses are not available anywhere else – not on the vendor's website, not on Amazon, not anywhere. Only here."
   stats: [{value:"$[total value]",label:"Free Bonuses"},{value:"[X]",label:"Exclusive Items"},{value:"Instant",label:"Delivery"},{value:"60 Days",label:"Guarantee"}]
3. "callout" – headline: "Why Am I Giving You These Bonuses?" / body: honest explanation of affiliate relationship and WHY these specific bonuses were chosen to complement the product.
4. "features" – variant: "numbered". headline: "Here Are Your [X] Exclusive Bonuses". Each column:
   title: "Bonus #[N]: [Specific Bonus Name]" (not generic – real, specific names)
   body: exactly what it is, what problem it solves, and the specific value ($XXX)
   icon: gift/award/zap/target (match to the bonus type)
5. "image" 16/9 – bonus stack visual or product context image.
6. "comparison" – "Buying Through This Link" vs "Buying Direct From Vendor"
   leftTitle: "Your Purchase Through [Your Name]"
   rightTitle: "Buying Direct (Missing Out)"
   proItems: product + each bonus by name
   conItems: product only, no bonuses, no support, no [each missing item]
7. "stats" – proof numbers: buyers, satisfaction rate, results.
8. "testimonial-grid" – variant per personality. People who used the bonuses alongside the product.
9. "countdown" – "These Bonuses Are Available Until:" – minutes: 30
10. "guarantee" – the product's guarantee PLUS your personal support guarantee.
11. "button" – variant: "wide". CTA: "Yes — Claim My Bonuses + ${productTitle} Now" – ctaLink: "${originalLink}"
12. "faq" – 3 items: "How do I get my bonuses?", "Are these legit bonuses?", "What if I already bought without bonuses?"
13. "badge" – security + guarantee + instant delivery badges.

RUSSELL'S RULES:
- The affiliate link "${originalLink}" goes on the main CTA button.
- Each bonus MUST have a specific name, specific value, specific description.
- The comparison block makes buying direct feel like a mistake.
- Countdown creates urgency without being manipulative.`,

    // ════════════════════════════════════════════════════════════════
    // QUIZ FUNNEL PAGES
    // ════════════════════════════════════════════════════════════════

    'quiz-landing': `
YOU ARE BUILDING: The Quiz Landing Page – the entry point of the quiz funnel.
CONVERSION PSYCHOLOGY: Lower resistance by positioning this as a FREE personalisation tool, not a sales step. "Take the quiz to find out what YOU specifically need."

EXACT BLOCK ORDER:
1. "attention-bar" – "Free [X]-Second Quiz: Find Out Exactly Which Solution Is Right For You"
2. "hero" – variant: "centered"
   - eyebrow: "FREE PERSONALISED QUIZ"
   - headline: pattern – "Answer [X] Quick Questions And We Will Tell You Exactly [what the quiz diagnoses]"
   - subheadline: "Over [X,XXX] people have taken this quiz and discovered [specific outcome]"
   - cta: "Take The Free Quiz Now — Takes [X] Seconds"
   - ctaLink: "#"
   - badge: "100% Free — No Credit Card Required"
3. "stats" – variant: "light". [X,XXX] quizzes taken / [X] different results / [X]% found their solution / [X] seconds to complete.
4. "bullets" – "What You Will Discover From Your Results":
   - The specific [type] solution that matches your [situation/goal/budget]
   - Why [common approach] is the wrong choice for your [profile]
   - The [#] questions that reveal your [unique situation]
   - Your personalised action plan based on your specific answers
5. "testimonial" – someone who took the quiz and found the perfect solution.
6. "callout" – headline: "Why This Quiz Is Different" / body: "Unlike generic recommendations, this quiz analyses your specific situation across [X] dimensions to give you a tailored result – not a one‑size‑fits‑all answer."
7. "button" – CTA: "Start My Free [X]-Second Quiz" – ctaLink: "#"
8. "badge" – Free, Private, Takes [X] seconds, Instant Results.

RUSSELL'S RULES:
- NEVER mention the product on this page. The quiz is the product.
- The CTA is always about starting the quiz – never about buying.
- Keep this page SHORT – curiosity is the conversion mechanism.`,

    'quiz-optin': `
YOU ARE BUILDING: The Quiz Opt‑in Gate – placed between quiz questions and results.
CONVERSION PSYCHOLOGY: They've already answered the questions and invested effort. They want their results. Enter email to unlock them. This page converts at 60‑80%.

EXACT BLOCK ORDER:
1. "callout" – headline: "You Are Almost Done" / body: "Based on your [X] answers, we have identified your personalised result. Enter your email below to see your complete analysis."
2. "optin-form" – variant: "centered"
   - badge: "YOUR PERSONALISED RESULTS ARE READY"
   - headline: "Where Should We Send Your Personalised Results?"
   - subheadline: "Your answers have been analysed. Enter your email to unlock your complete personalised recommendation."
   - cta: "Show Me My Results Now"
   - items: ["Instant delivery — no waiting","Personalised to your specific answers","Includes your custom action plan"]
   - body: "No spam. Results are private. Unsubscribe anytime."
3. "badge" – Private, Secure, Instant, Free.

RUSSELL'S RULES:
- This page must be MINIMAL. The curiosity gap (wanting to see results) is doing all the work.
- Do NOT add testimonials, features, or comparison blocks – they create friction.
- The form headline references THEIR answers to feel personalised.`,

    'quiz-results': `
YOU ARE BUILDING: The Personalised Quiz Results Page.
CONVERSION PSYCHOLOGY: Everything on this page must feel like it was generated specifically for THIS visitor based on THEIR quiz answers. The product recommendation is a logical conclusion of the data, not a sales pitch.

EXACT BLOCK ORDER:
1. "attention-bar" – "Your Personalised Results Are Ready — Based On Your [X] Answers"
2. "hero" – variant per personality
   - eyebrow: "YOUR PERSONALISED RESULT"
   - headline: "Based On Your Answers, You Are A '[Profile Type]' — Here Is Exactly What You Need"
   - subheadline: "Here is what your answers revealed about your situation — and the single most effective solution for your specific profile"
3. "callout" – headline: "What Your Answers Tell Us" / body: 3 specific "insights" derived from the quiz profile (write these as if they are real personalised observations).
4. "stats" – variant: "light". 4 stats about people with similar quiz profiles and their results.
5. "paragraph" – HTML:
   <h2>Why [Profile Type] People Struggle With [The Problem]</h2>
   Explain the specific challenge of their profile – makes them feel understood.
   <h2>The Solution That Works Best For [Profile Type]</h2>
   Natural introduction of the product as the answer to their specific profile.
6. "features" – variant per personality. "The [X] Reasons ${productTitle} Is The Right Choice For Your Profile".
7. "testimonial" – someone with the SAME profile who got results. Reference the profile type in their quote.
8. "testimonial-grid" – variant per personality. 3 people with similar situations.
9. "countdown" – "Your Personalised Offer Expires In:" – minutes: 25
10. "guarantee" – risk removal.
11. "button" – CTA: "Yes, This Is Right For Me — Claim My [Profile] Results Package" – ctaLink: "${originalLink}"
12. "faq" – 3 items: "What if my profile is different?", "Is this the right solution?", "What results can I expect?"

RUSSELL'S RULES:
- Use the word "your" and "you" constantly – make it feel personal.
- The affiliate link goes on the main CTA button.`,

    // ════════════════════════════════════════════════════════════════
    // AUTO-WEBINAR FUNNEL PAGES
    // ════════════════════════════════════════════════════════════════

    'webinar-registration': `
YOU ARE BUILDING: The Webinar Registration Page.
CONVERSION PSYCHOLOGY: Sell the CONTENT of the webinar – the training value – not the product. They register because they want to learn, not because they want to buy.

EXACT BLOCK ORDER:
1. "attention-bar" – "Free Live Training: [Specific Webinar Topic] — [Date/Time]"
2. "hero" – variant: "centered"
   - eyebrow: "FREE LIVE WEBINAR TRAINING"
   - headline: pattern – "Discover [Specific Outcome] In [X] Minutes — Free Live Training On [Day], [Date] At [Time]"
   - subheadline: "Hosted by [Presenter Name] — [credentials that make them credible to speak on this topic]"
   - cta: "Reserve My Free Seat Now"
   - ctaLink: "#"
   - badge: "100% Free — [X] Spots Remaining"
3. "countdown" – "Training Starts In:" – minutes: 120 (adjust to represent time until webinar).
4. "bullets" – "In This Free [X]-Minute Training, You Will Discover":
   Each bullet = a specific revelation from the webinar. Pattern: "The [specific thing] that [produced specific result]"
   Minimum 5 bullets. Every bullet must be a genuine content promise.
5. "callout" – headline: "Who This Is For" / body: describe the ideal attendee profile specifically. Also say who it is NOT for (this increases credibility and registration quality).
6. "stats" – "[X,XXX] registered" / "[X]% attend live" / "[X] average rating" / "Hosted [X] times".
7. "testimonial-grid" – variant: "quotes". Past attendee testimonials about the training value.
8. "optin-form" – variant per personality:
   - badge: "RESERVE YOUR FREE SEAT"
   - headline: "Yes, Save My Seat For The Free Training"
   - cta: "Reserve My Free Seat Now"
   - items: ["Instant confirmation email","Replay available for 24 hours","Bonus checklist for attendees"]
   - body: "Your information is 100% secure and will never be shared."
9. "guarantee" – "Your time will not be wasted. If you attend and do not learn at least [X] actionable strategies, email us and we will send you [bonus value] as an apology."
10. "faq" – "Will there be a replay?", "How long is the training?", "Is it really free?", "What do I need to attend?"

RUSSELL'S RULES:
- NEVER mention the product on this page. The webinar content is the offer.
- The registration form is the only CTA on this page.
- Countdown creates urgency to register NOW.`,

    'webinar-confirm': `
YOU ARE BUILDING: The Webinar Confirmation + Indoctrination Page.
CONVERSION PSYCHOLOGY: Confirm registration (reduce no‑shows), start building authority and relationship before the webinar, and use this page to begin the indoctrination sequence.

EXACT BLOCK ORDER:
1. "hero" – variant: "centered"
   - eyebrow: "REGISTRATION CONFIRMED"
   - headline: "You Are Registered. Check Your Inbox Now For Your Confirmation Email."
   - subheadline: "Your spot is saved. Here is everything you need to know before the training."
   - badge: "Seat Confirmed"
2. "callout" – headline: "Add This To Your Calendar Right Now" / body: date, time, timezone, and link. Make it urgent – "People who add it to their calendar are 3x more likely to attend."
3. "paragraph" – HTML:
   <h2>While You Wait — Watch This Short Video</h2>
   Introduce the presenter's story and credentials. Build authority before the main event.
   <h2>What To Prepare Before The Training</h2>
   Tell them what to have ready (notebook, specific questions, etc.) – increases commitment.
4. "features" – variant: "list". "What You Will Walk Away With After This Training":
   3 specific deliverables from attending.
5. "testimonial" – past attendee quote specifically about the value of the training.
6. "countdown" – "Your Training Starts In:" – minutes: 90
7. "badge" – "Seat Confirmed" / "Reminder Sent" / "Add To Calendar" / "See You There"

RUSSELL'S RULE: This page starts the trust‑building process. Keep it warm and anticipatory. No sales pitch here.`,

    'webinar-watch': `
YOU ARE BUILDING: The Webinar Watch Page – Distraction‑Free Viewing Environment.
CONVERSION PSYCHOLOGY: Get them to press play. Keep them watching. CTA activates when the pitch begins. Nothing on this page competes with the video.

EXACT BLOCK ORDER:
1. "attention-bar" – "Important: Watch The Full Training Below. Do Not Close This Tab."
2. "headline" – "Watch Now: ${videoTitle || '[Full Webinar Title]'}" with presenter name and credentials below.
3. "stars" – "[X,XXX] people have attended this training" with average rating.
4. "video" – headline: "Press Play To Start — The Most Important Part Comes At The [X]-Minute Mark" / body: "This training runs [X] minutes. Set aside the full time. Take notes."
5. "callout" – headline: "Ready To Take Action?" / body: "If you are watching this and ready to implement what [Presenter] is sharing, click the button below. This offer is only available to webinar attendees."
6. "button" – variant: "wide". CTA: "I Am Ready — Show Me The Offer From The Webinar" – ctaLink: "#"
7. "testimonial-grid" – variant: "dark". 3 attendees who watched and took action.
8. "faq" – 3 items: "Is the replay available?", "What is being offered?", "Is there a guarantee?"

RUSSELL'S RULES:
- The headline should include the webinar title (if provided) to build consistency.
- NO navigation links. NO footer. NO sidebar. NOTHING that takes them away from the video.
- The CTA button appears AFTER the video, not before.
- Background should be dark to make the video player the focal point.`,

    'webinar-order': `
YOU ARE BUILDING: The Post‑Webinar Order Page.
CONVERSION PSYCHOLOGY: They just watched 45‑90 minutes of training and are at PEAK readiness. They need to feel that acting RIGHT NOW is the only logical choice. Stack value. Create urgency. Remove risk entirely.

EXACT BLOCK ORDER:
1. "countdown" – "WEBINAR ATTENDEE SPECIAL — Offer Expires When Timer Hits Zero" – minutes: 20
2. "hero-dark" – eyebrow: "EXCLUSIVE OFFER FOR TRAINING ATTENDEES ONLY"
   headline: "As Promised In The Training — Here Is How To Get [Exact Transformation]"
   subheadline: "This offer is ONLY available to people who attended the training today. It will not be available on the website."
   stats: [{value:"$[price]",label:"Attendee Price"},{value:"$[full price]",label:"Regular Price"},{value:"[X]",label:"Bonuses Added"},{value:"[X] Days",label:"Money-Back Guarantee"}]
3. "callout" – headline: "You Just Watched [X] Minutes Of Proof" / body: "Everything [Presenter] shared in the training today is a result of using exactly what is on this page. Here is your opportunity to implement it."
4. "features" – variant: "numbered". "Everything Included In Your Order Today":
   Main product + each bonus with specific names, specific values.
5. "comparison" – "Webinar Attendee Order (This Page Only)" vs "Standard Purchase (No Bonuses)"
6. "testimonial-grid" – variant: "featured". 3 members who attended the same training and took action.
7. "stats" – proof numbers from members.
8. "guarantee" – full risk‑reversal guarantee. Be specific about the refund process.
9. "button" – variant: "wide". CTA: "Yes — I Watched The Training. I Am Ready To Get Started." – ctaLink: "${originalLink}"
10. "faq" – "Do I need experience?", "Is this the same as what was shown in the training?", "What if I need a refund?", "How long do I have access?"
11. "badge" – security, guarantee, instant access.

RUSSELL'S RULE: "${originalLink}" is on the main CTA button only.`,

    'webinar-replay': `
YOU ARE BUILDING: The Webinar Replay Page – Last Chance Version.
CONVERSION PSYCHOLOGY: Non‑attendees get ONE chance to watch the replay before it expires. Everything on this page communicates urgency and scarcity.

EXACT BLOCK ORDER:
1. "countdown" – "Replay Expires In:" – minutes: 720 (24 hours)
2. "attention-bar" – "You Missed The Live Training — Watch The Replay Below Before It Expires"
3. "hero" – variant: "dark"
   - eyebrow: "REPLAY — EXPIRES IN 24 HOURS"
   - headline: "The Training You Almost Missed — Watch The Full [X]-Minute Replay Now"
   - subheadline: "Over [X,XXX] people attended live. The replay will be removed when the timer hits zero."
4. "callout" – "Why Are You Seeing This?" / "You registered but were unable to attend live. As a courtesy, we have made the replay available for 24 hours only. This is the only time it will be available."
5. "video" – headline: "Full Replay — Watch Before It Expires"
6. "callout" – headline: "The Offer Discussed In The Training" / body: brief summary of what was covered and what the offer is.
7. "button" – CTA: "Watch The Replay + Access The Training Offer" – ctaLink: "#"
8. "testimonial" – live attendee quote from someone who watched and acted.
9. "countdown" – second countdown: "Replay + Offer Disappears In:" – minutes: 720
10. "badge" – "Replay Expires Soon" / "Live Attendees Only" / "One-Time Viewing"

RUSSELL'S RULE: This is their last chance – make it feel urgent but not pushy.`,

    // ════════════════════════════════════════════════════════════════
    // FLASH DEAL FUNNEL PAGES
    // ════════════════════════════════════════════════════════════════

    'flash-deal': `
YOU ARE BUILDING: The Flash Deal Page – The Urgency Machine.
RULE: This is the most stripped‑down page in affiliate marketing. ONE offer. ONE price. ONE button. The timer IS the headline. If it's not about urgency, it does not belong on this page.

EXACT BLOCK ORDER:
1. "countdown" – THIS IS THE HERO. Make it massive. headline: "This Deal Expires Permanently When The Timer Hits Zero" – minutes: 60
2. "attention-bar" – "[X]% OFF — Limited Availability — [X] of [Y] Spots Remaining"
3. "hero" – variant: "centered"
   - eyebrow: "FLASH SALE — [DATE] ONLY"
   - headline: "Get [product] For [X]% Off Today Only — This Price Never Repeats"
   - subheadline: "This is the lowest price this product will ever be offered. When the timer ends, this page is gone permanently."
   - cta: "Claim My [X]% Discount Before It Expires"
   - ctaLink: "#"
4. "bullets" – "Everything You Get In Today's Flash Package":
   Each bullet = one specific item included. No fluff. Just the list.
5. "stats" – variant: "dark". "[X]% Off Today" / "$[full price]" / "[X] Hours Left" / "[X] Spots Remaining"
6. "testimonial" – one quote from a buyer who acted fast and is glad they did.
7. "callout" – headline: "Why Is This Price Available Right Now?" / body: specific, credible reason for the discount (product launch anniversary, limited inventory, promotional window, etc.).
8. "countdown" – second countdown. headline: "Do Not Wait — Discount Disappears In:"
9. "guarantee" – risk‑reversal. Make acting NOW feel completely safe.
10. "button" – variant: "wide". CTA: "Yes — Lock In My [X]% Discount Right Now" – ctaLink: "#"
11. "badge" – "Secure Checkout" / "Instant Access" / "60-Day Guarantee" / "Price Locks At Checkout"
12. "faq" – 3 items: "Is this price for real?", "What happens when the timer ends?", "Is there a guarantee?"

RUSSELL'S RULES:
- The countdown appears TWICE – at the top and before the final CTA.
- No testimonial‑grid – too much reading. One short quote only.
- No long paragraphs. People who see flash deals are ready to buy or leave quickly.
- NO navigation that takes them anywhere else.`,

    'flash-order': `
YOU ARE BUILDING: The Flash Deal Order / Checkout Page.
GOAL: They already decided to buy on the flash deal page. Do NOT give them a reason to second‑guess. Minimum friction between intent and purchase.

EXACT BLOCK ORDER:
1. "countdown" – "Price Locks At Checkout — Expires In:" – minutes: 45
2. "attention-bar" – "Your [X]% Flash Discount Is Reserved. Complete Your Order Now."
3. "headline" – "Order Summary — [Product Name]"
4. "callout" – headline: "You Are Getting:" / body: bullet‑point list of everything in the order with the regular price crossed out and the flash price highlighted.
5. "testimonial" – one short quote from a happy buyer.
6. "guarantee" – full risk‑reversal guarantee.
7. "badge" – payment security badges.
8. "button" – variant: "wide". CTA: "Complete My Order — Lock In [X]% Savings" – ctaLink: "${originalLink}"
9. "stars" – "[X,XXX] customers" rating.

RUSSELL'S RULE: "${originalLink}" is on the main CTA button. Keep this page SHORT.`,

    'flash-thankyou': `
YOU ARE BUILDING: The Flash Deal Thank You Page + OTO.
CONVERSION PSYCHOLOGY: They just bought. They're happy. Immediately present ONE upgrade offer while the buying momentum is highest. This is your highest‑converting page for upsells.

EXACT BLOCK ORDER:
1. "hero" – variant: "centered"
   - eyebrow: "ORDER CONFIRMED — FLASH DEAL LOCKED IN"
   - headline: "Thank You — Your Flash Deal Price Is Confirmed"
   - subheadline: "Your order is being processed. Watch your inbox for confirmation. Before you go — read this ONE important message."
   - badge: "Order Confirmed"
2. "callout" – headline: "Wait — One More Thing Before You Get Started" / body: introduce the OTO naturally as "the one thing our best customers always wish they had added to their first order".
3. "features" – variant: "cards". The 3 core benefits of the upgrade offer.
4. "countdown" – "This Upgrade Offer Expires In:" – minutes: 10
5. "button" – CTA: "Yes — Add The Upgrade To My Order For Just $[price]" – ctaLink: "#"
6. "subheading" – headline: "No thanks — I will start with what I ordered and upgrade later if needed."
7. "callout" – headline: "Your Access Is Being Prepared" / body: delivery instructions.

RUSSELL'S RULE: OTO must be ONE specific upgrade. Keep the page energy positive and confirmatory.`,

    // ════════════════════════════════════════════════════════════════
    // SHARED CHECKOUT PAGE
    // ════════════════════════════════════════════════════════════════

    checkout: `
YOU ARE BUILDING: The Pre‑Checkout / Closing Page.
CONVERSION PSYCHOLOGY: The visitor is warm. They've consumed the funnel content. This page removes the last remaining hesitations and makes clicking the final buy button feel inevitable.

EXACT BLOCK ORDER:
1. "countdown" – "Your Exclusive Offer Expires In:" – minutes: 20
2. "hero-dark" – eyebrow: "SPECIAL OFFER FOR TODAY'S VISITORS ONLY"
   headline: "You Are One Click Away From [the specific transformation]"
   subheadline: "Here is everything you get when you complete your order in the next [X] minutes"
   stats: value+label for: price, bonuses count, guarantee duration, delivery speed
3. "bullets" – "Everything In Your Order Today":
   List every component of the purchase. Be specific. Add dollar values to each item.
4. "testimonial-grid" – variant per personality. 3 recent buyers with specific results.
5. "comparison" – "Joining Today" vs "Not Joining Today". Make inaction feel costly.
6. "guarantee" – full, specific, no‑conditions guarantee.
7. "callout" – headline: "What Happens When You Click The Button Below" / body: exact step‑by‑step of the purchase → delivery → access process. Remove ALL uncertainty.
8. "button" – variant: "wide". CTA: "Yes — I Want [outcome]. Complete My Order Now" – ctaLink: "${originalLink}"
9. "faq" – 4 items addressing the most common last‑minute objections.
10. "badge" – SSL / Secure / Guarantee / Instant Access / Support.

RUSSELL'S RULE: "${originalLink}" is on the main CTA button ONLY.`,

    // ── Legacy backward compatibility ─────────────────────────────────────────

    blog: `Same as review‑article instructions – treat this as a long‑form review article page.
Build it with the full article structure: article header, table‑of‑contents, dropcap‑paragraph, multiple paragraph blocks with <h2> sections, pull‑quotes, comparison, verdict, author‑bio.
Final button ctaLink: "#"`,

    optin: `Same as bridge‑optin – minimal opt‑in page with a single optin‑form block as the centrepiece.
hero + bullets + optin‑form + badge only. Nothing else. Final button ctaLink: "#"`,

    review: `Same as review‑article – long‑form review with full article structure.
Must include: comparison block, features block, verdict block, guarantee, countdown.
Final button ctaLink: "#"`,

    comparison: `Head‑to‑head comparison page. comparison block is the centrepiece.
Include: article header, comparison block, features block, testimonial‑grid, guarantee, button.
Final button ctaLink: "#"`,

    decision: `Closing persuasion page. Include: countdown, hero, features, testimonial‑grid, guarantee, button.
Final button ctaLink: "#"`,

    offer: `Flash offer page. Include: countdown (hero), attention‑bar, hero, bullets, guarantee, button.
Final button ctaLink: "#"`,

    bridge: `Same as bridge‑ad – video bridge page. VIDEO block is the centrepiece (block 4).
Do NOT use article or dropcap blocks. Final button ctaLink: "#"`,

    quiz: `Same as quiz‑landing – quiz entry page. No product mentions. Pure curiosity. Final button ctaLink: "#"`,

    results: `Same as quiz‑results – personalised results page. Uses "your" and "you" throughout. Final button ctaLink: "${originalLink}"`,

    'segmented-offer': `Same as quiz‑results – personalised offer based on quiz data. Final button ctaLink: "${originalLink}"`,

    registration: `Same as webinar‑registration – sell the training content, not the product. Final button ctaLink: "#"`,

    'webinar-confirmation': `Same as webinar‑confirm – confirmation + indoctrination. Final button ctaLink: "#"`,
  };

  return instructions[pageId] ?? `
CONVERSION‑FOCUSED PAGE: ${pageId}
- Build this page with a clear single goal: move the visitor to the next step.
- Open with a strong hero or attention‑bar.
- Include 1‑2 proof elements (testimonial or stats).
- End with a clear CTA button.
- Final button uses ctaLink: "#" unless this is a final checkout page, in which case use: "${originalLink}"
`;
}