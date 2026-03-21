
import ScrollProgressIndicator from "@/app/components/ScrollProgressIndicator";
import Cookies from "@/components/cookies/cookies";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";


export default function CookiesPage() {
  return (
    <div className="">
      <main className="">
        <NavBar />
        <ScrollProgressIndicator />
        <Cookies />
        <Footer />
      </main>
    </div>
  );
}
