import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Sparkle } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex max-w-md flex-col gap-4 rounded-3xl border border-white/15 bg-white/10 p-8 text-center text-white shadow-[0_20px_60px_rgba(59,252,255,0.25)] backdrop-blur-3xl"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
          <Sparkle className="h-7 w-7 text-cyan-200" />
        </span>
        <h1 className="text-3xl font-semibold">Signal Lost</h1>
        <p className="text-sm text-cyan-100/80">
          The coordinates you entered drift beyond Shunya’s infinite canvas. Let’s
          guide you back to the learning nebula.
        </p>
        <Link
          to="/"
          className="mx-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/70 hover:text-cyan-50"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
