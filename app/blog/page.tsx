
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Blog from "@/components/blog/blog";
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
