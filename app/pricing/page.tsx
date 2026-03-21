
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Pricing from "@/components/pricing/PricingSection";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function PricingSection() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
}
