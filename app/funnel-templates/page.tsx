
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import FunnelTemplatesPage from "@/components/funnel-templates/funnel-template";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function LinkAnalyzerPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <FunnelTemplatesPage />
        <Footer />
      </main>
    </div>
  );
}
