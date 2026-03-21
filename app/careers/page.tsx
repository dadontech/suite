
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Career from "@/components/careers/career";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function CareerPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <Career />
        <Footer />
      </main>
    </div>
  );
}
