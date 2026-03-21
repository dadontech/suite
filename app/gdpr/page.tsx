
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Gdpr from "@/components/gdpr/gdpr";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function GdprPage() {
  return (
    <div className="">
      <main className="">
        <NavBar />
        <ScrollProgressIndicator />
        <Gdpr />
        <Footer />
      </main>
    </div>
  );
}
