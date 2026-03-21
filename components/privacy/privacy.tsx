"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information-we-collect", title: "2. Information We Collect" },
    { id: "how-we-use-information", title: "3. How We Use Your Information" },
    { id: "sharing-information", title: "4. Sharing Your Information" },
    { id: "cookies", title: "5. Cookies and Tracking Technologies" },
    { id: "data-retention", title: "6. Data Retention" },
    { id: "your-rights", title: "7. Your Rights" },
    { id: "security", title: "8. Security" },
    { id: "childrens-privacy", title: "9. Children's Privacy" },
    { id: "international-transfers", title: "10. International Transfers" },
    { id: "changes", title: "11. Changes to This Policy" },
    { id: "contact-us", title: "12. Contact Us" },
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
      let current = "introduction";
      sectionElements.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "introduction";
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
        {/* Giant background watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-[#006E74]/5 whitespace-nowrap select-none pointer-events-none z-0">
          Privacy Policy
        </div>
        
        {/* Actual Header */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B5E5E] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#6B5E5E]/60 text-sm">Last updated: March 1, 2025</p>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Sidebar Navigation */}
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
          {/* 1. Introduction */}
          <section id="introduction">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">1. Introduction</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Amsuite (&apos;we&apos;, &apos;our&apos;, &apos;us&apos;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us. Please read it carefully. By accessing or using our services, you consent to the practices described in this policy.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section id="information-we-collect">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">2. Information We Collect</h2>
            <p className="mb-4 text-[#6B5E5E]/80">We may collect the following types of information:</p>
            <h3 className="text-lg font-semibold text-[#6B5E5E] mt-6 mb-2">a. Personal Data</h3>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              When you register for an account, we collect information such as your name, email address, and payment details. You may also provide additional profile information.
            </p>
            <h3 className="text-lg font-semibold text-[#6B5E5E] mt-6 mb-2">b. Usage Data</h3>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              We automatically collect information about your interaction with our services, including IP address, browser type, pages visited, time spent, and referral URLs. This helps us analyze trends and improve our platform.
            </p>
            <h3 className="text-lg font-semibold text-[#6B5E5E] mt-6 mb-2">c. Cookies and Tracking Technologies</h3>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We use cookies, web beacons, and similar technologies to enhance your experience, remember preferences, and gather analytics. You can manage cookie settings through your browser.
            </p>
          </section>

          {/* 3. How We Use Your Information */}
          <section id="how-we-use-information">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">3. How We Use Your Information</h2>
            <p className="mb-4 text-[#6B5E5E]/80">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80">
              <li>To provide, operate, and maintain our services.</li>
              <li>To process transactions and send related information.</li>
              <li>To improve, personalize, and expand our offerings.</li>
              <li>To communicate with you, including customer support and promotional messages (you may opt out at any time).</li>
              <li>To monitor usage and detect, prevent, and address technical issues or fraud.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          {/* 4. Sharing Your Information */}
          <section id="sharing-information">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">4. Sharing Your Information</h2>
            <p className="mb-4 text-[#6B5E5E]/80">We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80">
              <li><strong className="text-[#6B5E5E] font-semibold">Service providers:</strong> Trusted third parties who assist us in operating our website and conducting our business, under confidentiality agreements.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Legal requirements:</strong> When required by law, such as to comply with a subpoena or similar legal process.</li>
            </ul>
          </section>

          {/* 5. Cookies and Tracking */}
          <section id="cookies">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              We use cookies for authentication, preferences, analytics, and personalized content. You can control cookies through your browser settings. Disabling cookies may affect functionality.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Third‑party services like Google Analytics may set their own cookies to help us analyze traffic. Their use is governed by their privacy policies.
            </p>
          </section>

          {/* 6. Data Retention */}
          <section id="data-retention">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">6. Data Retention</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your account, after which we will delete your data within a reasonable timeframe, unless we are required to retain it for legal reasons.
            </p>
          </section>

          {/* 7. Your Rights */}
          <section id="your-rights">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">7. Your Rights</h2>
            <p className="mb-4 text-[#6B5E5E]/80">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80 mb-6">
              <li><strong className="text-[#6B5E5E] font-semibold">Access:</strong> Request a copy of your personal data.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Rectification:</strong> Correct inaccurate or incomplete data.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Erasure:</strong> Request deletion of your data (right to be forgotten).</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Restriction:</strong> Limit processing of your data.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Data portability:</strong> Receive your data in a structured, commonly used format.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Objection:</strong> Object to processing based on legitimate interests.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Withdraw consent:</strong> Where processing is based on consent.</li>
            </ul>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              To exercise your rights, contact us at <span className="text-[#F35D2C]">privacy@amsuite.com</span>. We will respond within 30 days. If you are in the EU, you may also lodge a complaint with your local data protection authority.
            </p>
          </section>

          {/* 8. Security */}
          <section id="security">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">8. Security</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We implement technical and organizational measures to protect your data, including encryption, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>

          {/* 9. Children's Privacy */}
          <section id="childrens-privacy">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">9. Children&apos;s Privacy</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you become aware that a child has provided us with data, please contact us.
            </p>
          </section>

          {/* 10. International Transfers */}
          <section id="international-transfers">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">10. International Transfers</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Your information may be transferred to and processed in countries outside your own, including the United States, where our servers are located. We ensure appropriate safeguards are in place, such as Standard Contractual Clauses for data transfers from the EEA.
            </p>
          </section>

          {/* 11. Changes to This Policy */}
          <section id="changes">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">11. Changes to This Policy</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated effective date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section id="contact-us">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">12. Contact Us</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/60">
              <strong className="text-[#6B5E5E] font-semibold">Email:</strong> <span className="text-[#F35D2C]">privacy@amsuite.com</span><br />
              <strong className="text-[#6B5E5E] font-semibold">Address:</strong> Amsuite, Inc., 123 Market St, San Francisco, CA 94105
            </p>
          </section>

          {/* No action buttons */}
        </motion.div>
      </main>
    </div>
  );
}