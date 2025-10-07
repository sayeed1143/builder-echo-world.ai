import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAppStore, type Role } from "@/store/useAppStore";
import { ThemeToggle } from "@/components/theme-toggle";

const roles: Role[] = ["Student", "College", "Teacher", "Explorer"];

export function Header() {
  const { role, setRole } = useAppStore();

  return (
    <header className="relative flex items-center justify-between gap-6 rounded-3xl border border-white/40 bg-white/70 px-6 py-4 text-slate-900 shadow-[0_20px_70px_rgba(25,200,245,0.25)] backdrop-blur-2xl dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-50">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center gap-3"
        >
          <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-cyan-200/40 bg-gradient-to-br from-cyan-200/60 via-white/30 to-transparent shadow-[0_0_35px_rgba(59,252,255,0.35)] dark:border-cyan-400/40 dark:from-cyan-500/40 dark:via-cyan-600/20">
            <Sparkles className="h-7 w-7 text-cyan-900 dark:text-cyan-100" />
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55)_0%,_transparent_65%)]" />
          </span>
          <div className="space-y-1.5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-500/80">
              Shunya AI
            </p>
            <h1 className="text-2xl font-bold text-slate-900 drop-shadow-[0_0_30px_rgba(59,252,255,0.35)] dark:text-cyan-50 lg:text-3xl">
              The Beginning of Infinite Intelligence
            </h1>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center gap-5">
        <RoleSelector selectedRole={role} onSelect={setRole} />
        <ThemeToggle />
      </div>
      <div className="pointer-events-none absolute inset-x-10 -bottom-5 h-16 bg-[radial-gradient(circle,_rgba(59,252,255,0.28)_0%,_transparent_70%)]" />
    </header>
  );
}

type RoleSelectorProps = {
  selectedRole: Role;
  onSelect: (role: Role) => void;
};

function RoleSelector({ selectedRole, onSelect }: RoleSelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/70 p-1 backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10">
      {roles.map((role) => {
        const isActive = role === selectedRole;
        return (
          <motion.button
            key={role}
            type="button"
            onClick={() => onSelect(role)}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{
                background:
                  "linear-gradient(120deg, rgba(59,252,255,0.85), rgba(140,75,255,0.75))",
                boxShadow: isActive
                  ? "0 0 30px rgba(59,252,255,0.45)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
            />
            <span className="relative z-10 mix-blend-lighten">
              {role}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
