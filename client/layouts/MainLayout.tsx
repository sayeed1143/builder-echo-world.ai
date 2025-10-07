import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <BackgroundAurora />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-10">
        <Header />
        <div className="flex flex-1 flex-col gap-6 pb-6 lg:flex-row">
          <Sidebar />
          <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 rounded-3xl border border-white/40 bg-white/70 p-4 shadow-[0_35px_80px_rgba(59,252,255,0.15)] backdrop-blur-3xl sm:p-6 dark:border-cyan-500/25 dark:bg-slate-950/60"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
      <StarsLayer />
    </div>
  );
}

function BackgroundAurora() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,252,255,0.18),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(112,66,248,0.16),_transparent_55%)] opacity-70 dark:opacity-80" />
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -left-1/3 top-0 h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,_rgba(59,252,255,0.35)_0%,_transparent_65%)] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -right-1/4 top-40 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,_rgba(140,75,255,0.4)_0%,_transparent_70%)] blur-[180px]"
      />
      <motion.div
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        className="absolute left-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(28,181,224,0.35)_0%,_transparent_70%)] blur-[160px]"
      />
    </div>
  );
}

function StarsLayer() {
  const starArray = Array.from({ length: 120 });
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {starArray.map((_, index) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.6 + 0.2;
        const size = Math.random() * 0.6 + 0.2;
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={size}
            fill="white"
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
}
