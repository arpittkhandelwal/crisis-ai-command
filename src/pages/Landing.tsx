import Navbar from "@/components/Landing/Navbar";
import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import PlatformWorkflow from "@/components/Landing/PlatformWorkflow";
import CallToAction from "@/components/Landing/CallToAction";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      <Hero />
      <PlatformWorkflow />
      <Features />
      <CallToAction />
    </main>
  );
}
