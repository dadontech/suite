"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance-of-terms");
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: "acceptance-of-terms", title: "1. Acceptance of Terms" },
    { id: "description-of-service", title: "2. Description of Service" },
    { id: "user-accounts", title: "3. User Accounts" },
    { id: "payment-and-billing", title: "4. Payment and Billing" },
    { id: "intellectual-property", title: "5. Intellectual Property" },
    { id: "prohibited-uses", title: "6. Prohibited Uses" },
    { id: "termination", title: "7. Termination" },
    { id: "limitation-of-liability", title: "8. Limitation of Liability" },
    { id: "governing-law", title: "9. Governing Law" },
    { id: "dispute-resolution", title: "10. Dispute Resolution" },
    { id: "changes-to-terms", title: "11. Changes to Terms" },
    { id: "contact", title: "12. Contact" },
  ];

  // Detect footer visibility
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll("section");
      let current = "acceptance-of-terms";
      sectionElements.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "acceptance-of-terms";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen text-[#6B5E5E] selection:bg-[#F35D2C]/30 font-sans relative overflow-x-hidden">
      
      {/* Right side custom scroll indicator – hidden when footer is visible */}
      {!isFooterVisible && (
        <div className="fixed right-4 md:right-8 top-1/4 bottom-1/4 w-1 bg-[#006E74]/20 rounded-full hidden md:block z-50">
          <motion.div
            className="w-full bg-[#F35D2C] rounded-full origin-top"
            style={{ scaleY }}
          />
        </div>
      )}

      {/* Header with watermark text */}
      <header className="relative w-full pt-24 pb-16 flex justify-center items-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-[#006E74]/5 whitespace-nowrap select-none pointer-events-none z-0">
          Terms of Service
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B5E5E] mb-4">
            Terms of Service
          </h1>
          <p className="text-[#6B5E5E]/60 text-sm">Last updated: March 1, 2025</p>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Sidebar Navigation (sticky) */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-32 flex flex-col gap-6">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => scrollToSection(e, sec.id)}
                className={`text-sm font-bold transition-colors duration-200 ${
                  activeSection === sec.id
                    ? "text-[#F35D2C]"
                    : "text-[#6B5E5E]/80 hover:text-[#F35D2C]"
                }`}
              >
                {sec.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Right Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 max-w-3xl space-y-12"
        >
          <section id="acceptance-of-terms">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              By accessing or using the Amsuite website, platform, or any related services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, you may not use the Service. Your continued use of the Service constitutes your acceptance of any future updates to these Terms.
            </p>
          </section>

          <section id="description-of-service">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">2. Description of Service</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              Amsuite provides AI‑powered tools designed to help affiliate marketers generate content, build conversion funnels, optimize for search engines, and analyze performance. Our platform includes features such as AI content generation, funnel templates, landing page builder, link analyzer, SEO checker, and analytics.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time without prior notice. We are not liable to you or any third party for any modification, suspension, or discontinuation.
            </p>
          </section>

          <section id="user-accounts">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">3. User Accounts</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              You must be at least 18 years old to use the Service. By creating an account, you represent that you meet this age requirement.
            </p>
          </section>

          <section id="payment-and-billing">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">4. Payment and Billing</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              Subscription fees are billed in advance on a monthly or yearly basis, depending on your chosen plan. All fees are non‑refundable except as required by applicable law. We may change our prices with 30 days' notice; if you do not agree to the new prices, you may cancel before they take effect.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              You are responsible for all taxes associated with your subscription. If your payment method fails, we may suspend your account until payment is successfully processed.
            </p>
          </section>

          <section id="intellectual-property">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">5. Intellectual Property</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              <strong className="text-[#6B5E5E] font-semibold">Your Content:</strong> You retain ownership of any content you create using the Service, including AI‑generated text, images, and landing pages. By submitting content, you grant Amsuite a worldwide, royalty‑free license to host, store, and use that content solely to provide and improve the Service.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              <strong className="text-[#6B5E5E] font-semibold">Our Technology:</strong> The Service, including its underlying software, algorithms, templates, and design, is owned by Amsuite and protected by intellectual property laws. You may not copy, modify, reverse engineer, or create derivative works based on our technology without our express written consent.
            </p>
          </section>

          <section id="prohibited-uses">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">6. Prohibited Uses</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">You may not use the Service to:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80">
              <li>Violate any applicable laws or regulations.</li>
              <li>Infringe the intellectual property rights of others.</li>
              <li>Distribute spam, malware, or harmful code.</li>
              <li>Engage in fraudulent or deceptive activities.</li>
              <li>Interfere with or disrupt the integrity of the Service.</li>
              <li>Attempt to gain unauthorized access to other accounts or systems.</li>
            </ul>
          </section>

          <section id="termination">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">7. Termination</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              You may cancel your account at any time through your dashboard. Upon cancellation, your access to paid features will cease at the end of the current billing period.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We may terminate or suspend your account immediately, without prior notice, if we believe you have violated these Terms or engaged in conduct that could harm the Service or other users. You may appeal a suspension by contacting support.
            </p>
          </section>

          <section id="limitation-of-liability">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">8. Limitation of Liability</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              To the maximum extent permitted by law, Amsuite shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service, even if advised of the possibility of such damages.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Our total liability to you for any claims arising from these Terms shall not exceed the amount you paid to us during the twelve months preceding the claim.
            </p>
          </section>

          <section id="governing-law">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">9. Governing Law</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              These Terms shall be governed by the laws of the State of California, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the federal and state courts located in San Francisco, California, for any disputes arising out of these Terms.
            </p>
          </section>

          <section id="dispute-resolution">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">10. Dispute Resolution</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              Before filing a claim, you agree to attempt to resolve any dispute informally by contacting us at <span className="text-[#F35D2C]">legal@amsuite.com</span>. If we cannot resolve the dispute within 30 days, either party may pursue arbitration.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Any arbitration shall be conducted by the American Arbitration Association (AAA) under its Commercial Rules. The arbitration will be held in San Francisco, California, unless otherwise agreed. You agree to waive any right to participate in a class‑action lawsuit or class‑wide arbitration.
            </p>
          </section>

          <section id="changes-to-terms">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">11. Changes to Terms</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We may update these Terms from time to time. We will notify you of material changes by posting the revised Terms on this page with an updated effective date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">12. Contact Us</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/60">
              <strong className="text-[#6B5E5E] font-semibold">Email:</strong> <span className="text-[#F35D2C]">legal@amsuite.com</span><br />
              <strong className="text-[#6B5E5E] font-semibold">Address:</strong> Amsuite, Inc., 123 Market St, San Francisco, CA 94105
            </p>
          </section>

          {/* Back to top link */}
          <div className="mt-16 text-center">
            <a
              href="#"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#006E74] hover:text-[#F35D2C] transition-colors"
            >
              ↑ Back to top
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}