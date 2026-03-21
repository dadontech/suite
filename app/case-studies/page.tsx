
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import CaseStudy from "@/components/case-studies/case-study";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function CommunityPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <CaseStudy />
        <Footer />
      </main>
    </div>
  );
}
