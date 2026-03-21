
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import LandingPageTemplate from "@/components/page-templates/landing-page-template";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function LinkAnalyzerPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <LandingPageTemplate />
        <Footer />
      </main>
    </div>
  );
}
