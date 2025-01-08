import { InfiniteMovingCards } from "./InfiniteMovingCards";

const features = [
  {
    icon: "/icons/qr-code.svg",
    title: "Smart QR Attendance",
    description: "Revolutionary QR-based attendance system. Generate daily unique codes for seamless check-ins and automated tracking."
  },
  {
    icon: "/icons/dashboard.svg",
    title: "Multi-Portal Dashboard",
    description: "Unified platform with dedicated interfaces for gym owners, trainers, and members. Everything you need in one place."
  },
  {
    icon: "/icons/trainer.svg",
    title: "Trainer Assignment Hub",
    description: "Effortlessly manage trainer-member relationships. Streamline communications and track progress in real-time."
  },
  {
    icon: "/icons/workout.svg",
    title: "Personalized Fitness Journey",
    description: "Custom workout plans and diet charts tailored to each member. Track progress and adjust goals dynamically."
  },
  {
    icon: "/icons/analytics.svg",
    title: "Advanced Analytics",
    description: "Comprehensive insights into attendance patterns, member engagement, and business performance metrics."
  },
  {
    icon: "/icons/mobile.svg",
    title: "Member Portal",
    description: "Empower members with easy access to workouts, diet plans, and attendance history through a dedicated portal."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 overflow-hidden bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            Powerful Features
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Experience the future of gym management with our comprehensive suite of features
          </p>
        </div>
        
        <div className="relative">
          <InfiniteMovingCards items={features} speed="slow" />
        </div>
      </div>
    </section>
  );
}
