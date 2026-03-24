"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function GDPRPage() {
  const [activeSection, setActiveSection] = useState("data-controller");
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: "data-controller", title: "1. Data Controller" },
    { id: "legal-basis", title: "2. Legal Basis for Processing" },
    { id: "your-rights", title: "3. Your Rights" },
    { id: "data-retention", title: "4. Data Retention" },
    { id: "international-transfers", title: "5. International Transfers" },
    { id: "data-protection-officer", title: "6. Data Protection Officer" },
    { id: "complaint", title: "7. Right to Lodge a Complaint" },
    { id: "contact", title: "8. Contact Us" },
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
      let current = "data-controller";
      sectionElements.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "data-controller";
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
          GDPR Compliance
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B5E5E] mb-4">
            GDPR
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

        {/* Right Content Area – detailed GDPR information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 max-w-3xl space-y-12"
        >
          <section id="data-controller">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">1. Data Controller</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Amsuite, Inc. is the data controller responsible for your personal data collected through our services. Our registered address is 123 Market St, San Francisco, CA 94105. For any data‑protection related inquiries, you may contact our Data Protection Officer (see section 6).
            </p>
          </section>

          <section id="legal-basis">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">2. Legal Basis for Processing</h2>
            <p className="mb-4 text-[#6B5E5E]/80">We process your personal data under the following legal bases, as defined in the GDPR:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80">
              <li><strong className="text-[#6B5E5E] font-semibold">Consent:</strong> When you agree to receive marketing communications or optional data collection (you may withdraw consent at any time).</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Contract:</strong> To provide our services to you, including account management, billing, and customer support.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Legal obligation:</strong> To comply with applicable laws, such as tax and financial reporting.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Legitimate interests:</strong> To improve our platform, prevent fraud, and ensure security. We balance these interests against your rights and freedoms.</li>
            </ul>
          </section>

          <section id="your-rights">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">3. Your Rights</h2>
            <p className="mb-4 text-[#6B5E5E]/80">Under the GDPR, you have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80">
              <li><strong className="text-[#6B5E5E] font-semibold">Right to access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Right to rectification:</strong> Correct any inaccurate or incomplete data.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Right to erasure (right to be forgotten):</strong> Request deletion of your data when it is no longer necessary for the purposes collected.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Right to restriction of processing:</strong> Limit how we use your data in certain circumstances.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Right to data portability:</strong> Receive your data in a structured, commonly used format and transmit it to another controller.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Right to object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
              <li><strong className="text-[#6B5E5E] font-semibold">Rights related to automated decision‑making:</strong> Not be subject to a decision based solely on automated processing, including profiling, which produces legal effects.</li>
            </ul>
            <p className="mt-4 leading-relaxed text-[#6B5E5E]/80">
              To exercise your rights, please contact us at <span className="text-[#F35D2C]">privacy@amsuite.com</span>. We will respond within one month.
            </p>
          </section>

          <section id="data-retention">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">4. Data Retention</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              We retain your personal data for as long as your account is active or as needed to provide you services. If you cancel your account, we will delete your data within 30 days, unless we are required to retain it for legal reasons (e.g., tax records, fraud prevention). In such cases, we will only retain the necessary data and restrict its processing.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              Usage data collected via cookies and analytics may be retained for up to 26 months, after which it is anonymized or deleted.
            </p>
          </section>

          <section id="international-transfers">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">5. International Transfers</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              Your personal data may be transferred to and processed in countries outside the European Economic Area (EEA), including the United States where our servers are located. We ensure appropriate safeguards are in place, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#F35D2C] text-[#6B5E5E]/80">
              <li>Standard Contractual Clauses approved by the European Commission.</li>
              <li>Relying on adequacy decisions for countries deemed to have adequate data protection levels.</li>
              <li>Data Processing Agreements with our sub‑processors that include GDPR‑required provisions.</li>
            </ul>
          </section>

          <section id="data-protection-officer">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">6. Data Protection Officer</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              We have appointed a Data Protection Officer (DPO) to oversee our data protection strategy and ensure compliance with GDPR requirements. You may contact our DPO at:
            </p>
            <p className="mt-2 leading-relaxed text-[#6B5E5E]/80">
              <strong className="text-[#6B5E5E] font-semibold">Email:</strong> <span className="text-[#F35D2C]">dpo@amsuite.com</span><br />
              <strong className="text-[#6B5E5E] font-semibold">Address:</strong> Amsuite, Inc., Attn: DPO, 123 Market St, San Francisco, CA 94105
            </p>
          </section>

          <section id="complaint">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">7. Right to Lodge a Complaint</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              If you believe that our processing of your personal data infringes the GDPR, you have the right to lodge a complaint with your local supervisory authority. In the UK, this is the Information Commissioner&apos;s Office (ICO); in Ireland, the Data Protection Commission (DPC). We encourage you to contact us first so we can attempt to resolve any concerns.
            </p>
            <p className="leading-relaxed text-[#6B5E5E]/80">
              You may also seek a judicial remedy if you consider that your rights have been violated.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-bold text-[#F35D2C] mb-4">8. Contact Us</h2>
            <p className="leading-relaxed text-[#6B5E5E]/80 mb-4">
              If you have any questions about this GDPR notice or our data practices, please contact us:
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