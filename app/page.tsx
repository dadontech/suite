import ScrollProgressIndicator from "./components/ScrollProgressIndicator";
import Herosection from "@/app/landing-page/herosection"
import HowItWorks from "./landing-page/HowItWorks";
import FeaturesSection from "./landing-page/FeaturesSection";
import TestimonialsSection from "./landing-page/TestimonialsSection";
import FinalCtaSection from "./landing-page/FinalCtaSection";
import NavBar from "./components/navbar";
import Footer from "@/app/components/Footer";
import './globals.css';

export default function Home() {
  return (
    <div className="">
      <main className="">
        <NavBar />
        <ScrollProgressIndicator />
        <Herosection />
        <HowItWorks />
        <FeaturesSection />
        <TestimonialsSection />
        <FinalCtaSection />
        <Footer />
      </main>
    </div>
  );
}
