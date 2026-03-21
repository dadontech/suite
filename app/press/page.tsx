
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Press from "@/components/press/press";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function PressPage() {
  return (
    <div className="">
      <main className="">
        {/* Link Analyzer content will go here */}
        <NavBar />
        <ScrollProgressIndicator />
        <Press />
        <Footer />
      </main>
    </div>
  );
}
