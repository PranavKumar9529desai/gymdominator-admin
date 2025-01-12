import { FlipCard } from "./FlipCard";
import { InfiniteMovingCards } from "./InfiniteMovingCards";

const features = [
  {
    title: "Smart QR Attendance",
    description: "Revolutionary QR-based attendance system. Generate daily unique codes for seamless check-ins and automated tracking."
  },
  {
    title: "Personalized Diet",
    description: "Custom nutrition plans tailored to individual goals. Track meals and get real-time recommendations for optimal results."
  },
  {
    title: "Trainer Assignment Hub",
    description: "Effortlessly manage trainer-member relationships. Streamline communications and track progress in real-time."
  },
  {
    title: "Personalized Fitness Journey",
    description: "Custom workout plans and diet charts tailored to each member. Track progress and adjust goals dynamically."
  },
  {
    title: "Advanced Analytics",
    description: "Comprehensive insights into attendance patterns, member engagement, and business performance metrics."
  },
  {
    title: "Member Portal",
    description: "Empower members with easy access to workouts, diet plans, and attendance history through a dedicated portal."
  }
];

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop",
    quote: "GymNavigator transformed how we track attendance. Our members love the QR system, and we've seen a 40% improvement in workout consistency!",
    author: "Michael Chen",
    role: "Fitness Center Owner, FlexFit Gym"
  },
  {
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2070&auto=format&fit=crop",
    quote: "The analytics dashboard is a game-changer. We've optimized our class schedules based on attendance patterns and increased revenue by 25%.",
    author: "Sarah Martinez",
    role: "Studio Manager, Elite Training Center"
  },
  {
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=2082&auto=format&fit=crop",
    quote: "Member progress tracking has never been easier. Our trainers save hours on paperwork and can focus more on client training.",
    author: "David Wilson",
    role: "Head Trainer, PowerHouse Gym"
  },
  {
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2069&auto=format&fit=crop",
    quote: "The personalized diet plans and progress tracking have helped our members achieve their goals faster. Retention rates are up by 35%!",
    author: "Emma Thompson",
    role: "Nutrition Coach, Fit Factory"
  },
  {
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    quote: "GymNavigator's member portal has revolutionized how our clients track their fitness journey. Engagement is at an all-time high.",
    author: "James Rodriguez",
    role: "Owner, CrossTrain Hub"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6">
            Powerful Features
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Experience the future of gym management with our comprehensive suite of features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FlipCard
              key={idx}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="mt-32 container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6">
            Success Stories
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Hear from gym owners and trainers who transformed their business with GymNavigator
          </p>
        </div>
        
        <div className="relative h-[400px] w-full overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
