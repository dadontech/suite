
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import SeoCheckerPage from "@/components/seo-checker/seo-checker";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function LinkAnalyzerPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <SeoCheckerPage />
        <Footer />
      </main>
    </div>
  );
}
