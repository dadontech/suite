
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Faq from "@/components/faqq/faq";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function CommunityPage() {
  return (
    <div className="">
      <main className="">
        <NavBar />
        <ScrollProgressIndicator />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}
