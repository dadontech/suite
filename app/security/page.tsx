
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Security from "@/components/security/security";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function SecurityPage() {
  return (
    <div className="">
      <main className="">
        <NavBar />
        <ScrollProgressIndicator />
        <Security />
        <Footer />
      </main>
    </div>
  );
}
