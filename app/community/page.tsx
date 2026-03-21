
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Comminity from "@/components/community/community";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function CommunityPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <Comminity />
        <Footer />
      </main>
    </div>
  );
}
