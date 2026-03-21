import NavBar from "../components/navbar";
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import AboutUs from "@/components/about-us/about-us";
import Footer from "../components/Footer";


export default function AboutUsPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <AboutUs />
        <Footer />
      </main>
    </div>
  );
}
