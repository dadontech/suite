
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Documentation from "@/components/documentation/documentation";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function DocumentationPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <Documentation />
        <Footer />
      </main>
    </div>
  );
}
