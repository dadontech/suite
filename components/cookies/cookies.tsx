"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState("what-are-cookies");
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: "what-are-cookies", title: "1. What Are Cookies" },
    { id: "how-we-use-cookies", title: "2. How We Use Cookies" },
    { id: "types-of-cookies", title: "3. Types of Cookies We Use" },
    { id: "managing-cookies", title: "4. Managing Cookies" },
    { id: "third-party-cookies", title: "5. Third‑Party Cookies" },
    { id: "updates", title: "6. Updates to This Policy" },
    { id: "contact", title: "7. Contact" },
  ];

  // Detect footer visibility (relies on layout footer)
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
      let current = "what-are-cookies";
      sectionElements.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "what-are-cookies";
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
          Cookie Policy
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B5E5E] mb-4">
            Cookie Policy
          </h1>
          <p className="text-[#6B5E5E]/60 text-sm">Last updated: March 1, 2025</p>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Sidebar Navigation – sticky until footer is visible */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav
            className={`flex flex-col gap-6 transition-all duration-300 ${
              !isFooterVisible ? "sticky top-32" : ""
            }`}
          >
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

        {/* Right Content Area – detailed cookie policy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 max-w-3xl space-y-12"
        >
          <section id="what-are-cookies">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">1. What Are Cookies</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Cookies are small text files that websites place on your device (computer, tablet, or mobile) when you visit them. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site. Cookies enable us to recognize your device, remember your preferences, and improve your overall experience.
            </p>
          </section>

          <section id="how-we-use-cookies">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">2. How We Use Cookies</h2>
            <p className="mb-4 text-[#6B5E5E]/80">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80">
              <li><strong className="text-[#6B5E5E] font-semibold">Authentication:</strong> To keep you logged in and remember your session.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Preferences:</strong> To remember your settings (e.g., language, dashboard layout).</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Analytics:</strong> To understand how visitors interact with our site (via Google Analytics) and improve our services.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Personalization:</strong> To deliver content and advertisements relevant to your interests.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Security:</strong> To protect your account and detect fraudulent activity.</li>
            </ul>
          </section>

          <section id="types-of-cookies">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">3. Types of Cookies We Use</h2>
            <p className="mb-4 text-[#6B5E5E]/80">We categorize cookies as follows:</p>
            <h3 className="text-lg font-semibold text-[#6B5E5E] mt-6 mb-2">a. Essential Cookies</h3>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              Necessary for the website to function. They enable core features like security, network management, and account access. You cannot opt out of these cookies.
            </p>
            <h3 className="text-lg font-semibold text-[#6B5E5E] mt-6 mb-2">b. Performance Cookies</h3>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              Collect anonymous information about how visitors use our site (e.g., pages visited, error messages). We use this data to improve performance.
            </p>
            <h3 className="text-lg font-semibold text-[#6B5E5E] mt-6 mb-2">c. Functional Cookies</h3>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              Remember choices you make (such as username, language, or region) to provide a more personalized experience.
            </p>
            <h3 className="text-lg font-semibold text-[#6B5E5E] mt-6 mb-2">d. Targeting / Advertising Cookies</h3>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Used to deliver ads more relevant to you and your interests. They also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns.
            </p>
          </section>

          <section id="managing-cookies">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">4. Managing Cookies</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              Most web browsers allow you to control cookies through their settings. You can block or delete cookies, but please note that some features of our site may not function properly without them.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              To learn more about how to manage cookies, visit <span className="text-[#F35D2C]">aboutcookies.org</span> or your browser's help pages.
            </p>
          </section>

          <section id="third-party-cookies">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">5. Third‑Party Cookies</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              We use services provided by third parties that may set their own cookies on your device. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80">
              <li><strong className="text-[#6B5E5E] font-semibold">Google Analytics:</strong> Helps us analyze site traffic and usage patterns. Google's privacy policy applies.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Stripe:</strong> Used for payment processing. Stripe sets cookies to prevent fraud and remember your payment details if you choose.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Intercom:</strong> Provides customer support chat. They may set cookies to remember your conversations.</li>
            </ul>
            <p className="leading-relaxed text-[#6B5E5E]/80 mt-4">
              These third parties have their own privacy policies and cookie policies. We encourage you to review them.
            </p>
          </section>

          <section id="updates">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">6. Updates to This Policy</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our use of cookies.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">7. Contact Us</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/60">
              <strong className="text-[#6B5E5E] font-semibold">Email:</strong> <span className="text-[#F35D2C]">privacy@amsuite.com</span><br />
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