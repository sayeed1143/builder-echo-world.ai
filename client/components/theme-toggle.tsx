import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoonStar, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (!mounted) return;
    const next = (resolvedTheme ?? theme) === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10 backdrop-blur transition hover:border-cyan-400/70 hover:shadow-[0_0_30px_rgba(59,252,255,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 dark:border-cyan-500/30 dark:bg-cyan-500/10"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false} mode="wait">
        {mounted && (resolvedTheme ?? theme) === "dark" ? (
          <motion.span
            key="sun"
            initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="text-cyan-200"
          >
            <Sun className="h-6 w-6" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ scale: 0.6, opacity: 0, rotate: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2 }}
            className="text-cyan-300"
          >
            <MoonStar className="h-6 w-6" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,252,255,0.25)_0%,_transparent_70%)]" />
    </button>
  );
}
