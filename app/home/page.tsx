import Footer from "./Footer";
import Herosection from "./Herosection";
import FeaturesSection from "./features/FeaturesSection";

export default async function HeroSection() {
  return (
    <main className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white min-h-screen overflow-hidden">
      <Herosection />
      <FeaturesSection />

      

      <Footer />
    </main>
  );
}
