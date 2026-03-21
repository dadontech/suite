
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import BlogTemplatesPage from "@/components/blog-templates/blog-template";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function LinkAnalyzerPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <BlogTemplatesPage />
        <Footer />
      </main>
    </div>
  );
}
