
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Privacy from "@/components/privacy/privacy";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function PrivacyPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <Privacy />
        <Footer />
      </main>
    </div>
  );
}
