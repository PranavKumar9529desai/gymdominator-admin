import { Button } from "@/components/ui/button";
import LogoImage from "@/app/assests/gymd.webp";
import TestimonialCard from "./TestimonialsCard";
import { ArrowRight, BarChart2, Users, Calendar } from "lucide-react";
import Image from "next/image";
import FeatureCard from "./FeatureCard";
import CustomButton from "./CustomButton";
import { BackgroundBeams } from "@/components/beams";
export default function HeroSection() {
  return (
    <main className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white min-h-screen">
      <section className="pb-12 lg:pb-24">
        <div className="container mx-auto px-4 py-2 sm:px-6 sm:py-24 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2  sm:gap-12 items-center">
            <div className="space-y-8 lg:order-1 order-2">
              <h1 className="text-3xl sm:text-2xl lg:text-6xl font-extrabold leading-tight  text-center lg:text-left">
                Elevate Your
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 block">
                  Gym Management
                </span>
              </h1>
              <p className="text-lg  lg:text-xl text-gray-300 max-w-2xl hidden sm:block">
                Streamline operations, enhance member experience, and drive
                growth with our sophisticated management suite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex justify-center ">
                  <CustomButton />
                </div>
                <Button
                  variant="outline"
                  className=" hidden sm:flex bg-transparent border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900 font-bold py-3 px-6 rounded-full sm:text-lg transition-all duration-200 ease-in-out"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-center lg:order-2 order-1 z-50 ">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 ">
                <div className="absolute inset-0 bg-blue-400 opacity-90 sm:opacity-75 rounded-full blur-3xl "></div>
                <Image
                  src={LogoImage}
                  alt="GymDominator Logo"
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <BackgroundBeams className="w-full h-full z-40" />
      </section>

      {/* features section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FeatureCard
              Icon={BarChart2}
              title="Performance Tracking"
              description="Monitor gym metrics and member progress"
            />
            <FeatureCard
              Icon={Users}
              title="Member Management"
              description="Efficiently handle memberships and billing"
            />
            <FeatureCard
              Icon={Calendar}
              title="Class Scheduling"
              description="Organize and optimize your class timetables"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="GymDominator revolutionized our operations. We've seen a 30% increase in member retention since implementing it."
              author="Sarah Johnson"
              role="Fitness Center Owner"
            />
            <TestimonialCard
              quote="The analytics dashboard provides invaluable insights. It's like having a business consultant on demand."
              author="Mike Chen"
              role="Gym Chain CEO"
            />
            <TestimonialCard
              quote="Customer support is top-notch. Any issues are resolved quickly, allowing us to focus on what matters - our members."
              author="Emily Rodriguez"
              role="Boutique Studio Manager"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Webinars
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2024 GymDominator. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
