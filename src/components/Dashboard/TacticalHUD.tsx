import { motion } from "framer-motion";

export default function TacticalHUD() {
  return (
    <>
      <div className="vignette" />
      
      {/* Inline Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[70] overflow-hidden">
        <div className="scanline" />
      </div>
      
      {/* HUD Corner Elements */}
      <div className="fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blue-500/20 m-6 pointer-events-none z-50 rounded-tl-3xl" />
      <div className="fixed top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-blue-500/20 m-6 pointer-events-none z-50 rounded-tr-3xl" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-blue-500/20 m-6 pointer-events-none z-50 rounded-bl-3xl" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-500/20 m-6 pointer-events-none z-50 rounded-br-3xl" />
    </>
  );
}
