import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import PlatformWorkflow from "@/components/Landing/PlatformWorkflow";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Hero />
      <PlatformWorkflow />
      <Features />
    </main>
  );
}
