
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Blog from "@/components/help-center/help-center";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function LinkAnalyzerPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <Blog />
        <Footer />
      </main>
    </div>
  );
}
