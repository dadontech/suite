
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Partner from "@/components/partners/partner";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function PartnersPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <Partner />
        <Footer />
      </main>
    </div>
  );
}
