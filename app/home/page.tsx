import TestimonialCard from "./TestimonialsCard";
import Footer from "./Footer";
import Herosection from "./Herosection";
import FeaturesSection from "./features/FeaturesSection";

export default async function HeroSection() {
  return (
    <main className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white min-h-screen overflow-hidden">
      <Herosection />
      <FeaturesSection />

      <section className="py-24 bg-black/40 backdrop-blur-sm relative">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="GymDominator revolutionized our operations. We've seen a 30% increase in member retention."
              author="Sarah Johnson"
              role="Fitness Center Owner"
            />
            <TestimonialCard
              quote="GymDominator revolutionized our operations. We've seen a 30% increase in member retention."
              author="Sarah Johnson"
              role="Fitness Center Owner"
            />
            <TestimonialCard
              quote="GymDominator revolutionized our operations. We've seen a 30% increase in member retention."
              author="Sarah Johnson"
              role="Fitness Center Owner"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
