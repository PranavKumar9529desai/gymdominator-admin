import Navbar from "./sections/Navbar/Navbar";
import Footer from "./sections/Footer";
import FeaturesSection from "./sections/features/FeaturesSection";
import Herosection from "./sections/Herosection";
import TestimonialsSection from "./sections/testimonials/TestimonialsSection";

export default async function HeroSection() {
  return (
    <main className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white min-h-screen overflow-hidden">
      <Navbar />
      <Herosection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
