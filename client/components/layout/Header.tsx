import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function Header() {
  return (
    <header className="relative flex items-center justify-between gap-6 rounded-lg border bg-card p-4">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border bg-background">
              <Logo className="h-6 w-6" />
            </span>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold text-foreground">
                Shunya AI
              </h1>
            </div>
          </Link>
        </motion.div>
      </div>
      <div className="flex items-center gap-3">
        <Button asChild>
          <Link to="/chat">
            <PlusCircle className="h-4 w-4" />
            New Project
          </Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
