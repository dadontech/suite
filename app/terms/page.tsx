
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Terms from "@/components/terms/term";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function TermsPage() {
  return (
    <div className="">
      <main className="">
        <NavBar />
        <ScrollProgressIndicator />
        <Terms />
        <Footer />
      </main>
    </div>
  );
}
