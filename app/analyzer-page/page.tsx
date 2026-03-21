
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import LinkAnalyzerpage from "@/components/analyzer-page/AnalyzerPage";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function LinkAnalyzerPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <LinkAnalyzerpage />
        <Footer />
      </main>
    </div>
  );
}
