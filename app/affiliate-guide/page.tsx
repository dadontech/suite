import NavBar from "../components/navbar";
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import AffiliateGuide from "@/components/affiliate-guide/affiliate-guide";
import Footer from "../components/Footer";


export default function LinkAnalyzerPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <AffiliateGuide />
        <Footer />
      </main>
    </div>
  );
}
