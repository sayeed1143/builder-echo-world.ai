import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpenCheck,
  BrainCircuit,
  Bot,
  Clock3,
  GraduationCap,
  LineChart,
  NotebookPen,
  Sparkle,
} from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useAppStore,
  type Role,
  type StudyMode,
  type Session,
} from "@/store/useAppStore";

const moduleCards: Array<{
  mode: StudyMode;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent: string;
}> = [
  {
    mode: "StudyCanvas AI",
    title: "Visual Research Workspace",
    description: "Connect sources, generate citations, and map knowledge effortlessly.",
    icon: NotebookPen,
    accent: "from-cyan-300/80 via-sky-400/70 to-blue-500/60",
  },
  {
    mode: "InfiniteMockAI",
    title: "Adaptive Mock Tests",
    description: "Craft personalized exams with instant analytics and smart remediation.",
    icon: LineChart,
    accent: "from-indigo-400/80 via-violet-500/70 to-purple-500/60",
  },
  {
    mode: "DoubtBusterAI",
    title: "Instant Doubt Solver",
    description: "Upload, ask, and receive multi-step explanations with alternate methods.",
    icon: BrainCircuit,
    accent: "from-purple-400/80 via-fuchsia-500/70 to-pink-500/60",
  },
  {
    mode: "AI Feature Modules",
    title: "Modular Intelligence",
    description: "Plug-in voice tutors, vision OCR, and knowledge expansions instantly.",
    icon: Bot,
    accent: "from-teal-400/80 via-emerald-400/70 to-cyan-400/60",
  },
];

const roleShortcuts: Record<
  Role,
  Array<{
    title: string;
    action: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    glow: string;
  }>
> = {
  Student: [
    {
      title: "Notes to Mind Maps",
      action: "Transform revision notes into a visual neural web.",
      icon: BrainCircuit,
      glow: "from-cyan-400/70 to-teal-400/50",
    },
    {
      title: "Mock Sprint",
      action: "Generate adaptive tests based on this week's topics.",
      icon: LineChart,
      glow: "from-indigo-400/80 to-purple-400/50",
    },
  ],
  College: [
    {
      title: "Curriculum Sync",
      action: "Align faculty resources with AI-crafted study journeys.",
      icon: GraduationCap,
      glow: "from-blue-400/70 to-cyan-400/50",
    },
    {
      title: "Analytics Uplink",
      action: "Deploy campus-wide AI dashboards instantly.",
      icon: LineChart,
      glow: "from-violet-400/80 to-purple-500/50",
    },
  ],
  Teacher: [
    {
      title: "Lesson Architect",
      action: "Build interactive slides from PDFs and references.",
      icon: NotebookPen,
      glow: "from-emerald-400/70 to-cyan-400/50",
    },
    {
      title: "Doubt Queue",
      action: "Review AI-prioritized doubts and respond in seconds.",
      icon: Clock3,
      glow: "from-fuchsia-400/80 to-pink-400/50",
    },
  ],
  Explorer: [
    {
      title: "Research Trails",
      action: "Fuse papers, podcasts, and videos into living canvases.",
      icon: BookOpenCheck,
      glow: "from-teal-400/70 to-blue-400/50",
    },
    {
      title: "Idea Reactor",
      action: "Ask bold questions and watch AI branch possibilities.",
      icon: Sparkle,
      glow: "from-purple-400/80 to-cyan-400/50",
    },
  ],
};

export function Sidebar() {
  const { activeMode, setActiveMode, role, sessions } = useAppStore();

  return (
    <aside className="relative flex h-full w-full flex-col gap-6 rounded-3xl border border-white/40 bg-white/70 p-5 text-slate-900 shadow-[0_25px_60px_rgba(59,252,255,0.18)] backdrop-blur-3xl dark:border-cyan-500/25 dark:bg-cyan-950/30 dark:text-cyan-100 lg:w-80 lg:min-w-[18rem]">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200/70">
          <span>Role Mode Shortcuts</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div className="grid gap-3">
          {roleShortcuts[role].map((shortcut) => (
            <motion.button
              key={shortcut.title}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 dark:border-cyan-500/25 dark:bg-cyan-900/30"
            >
              <div
                className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at top left, rgba(59,252,255,0.45), transparent 70%)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-[1px] rounded-2xl opacity-50"
                style={{
                  background: `linear-gradient(120deg, ${shortcut.glow})`,
                  mixBlendMode: "screen",
                }}
              />
              <shortcut.icon className="relative z-10 mt-1 h-6 w-6 text-cyan-100" />
              <div className="relative z-10 space-y-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {shortcut.title}
                </p>
                <p className="text-xs text-slate-700/80 dark:text-cyan-100/70">
                  {shortcut.action}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ModulesSection
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        sessions={sessions}
      />

      <div className="pointer-events-none absolute inset-x-8 bottom-6 h-24 bg-[radial-gradient(circle,_rgba(140,75,255,0.28)_0%,_transparent_75%)]" />
    </aside>
  );
}

type ModulesSectionProps = {
  activeMode: StudyMode;
  setActiveMode: (mode: StudyMode) => void;
  sessions: Session[];
};

function ModulesSection({ activeMode, setActiveMode, sessions }: ModulesSectionProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl dark:border-cyan-500/25 dark:bg-cyan-900/40">
      <div className="border-b border-white/10 px-5 py-4 dark:border-cyan-500/20">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/80">
            Study Modes
          </p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cyan-100/60">
            <Clock3 className="h-3.5 w-3.5" />
            Live Sync
          </div>
        </div>
        <p className="mt-2 text-xs text-cyan-50/70">
          Choose the intelligence layer to guide your learning ritual.
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-5">
          {moduleCards.map((module) => {
            const isActive = module.mode === activeMode;
            const Icon = module.icon;
            return (
              <motion.button
                key={module.mode}
                type="button"
                whileHover={{ scale: 1.01 }}
                onClick={() => setActiveMode(module.mode)}
                className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 dark:border-cyan-400/25 dark:bg-cyan-900/50"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background: isActive
                      ? `linear-gradient(120deg, ${module.accent})`
                      : "linear-gradient(120deg, rgba(15,23,42,0.2), rgba(15,23,42,0.35))",
                    mixBlendMode: "screen",
                  }}
                />
                <div className="relative z-10 flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/70 text-slate-900 shadow-[0_0_20px_rgba(59,252,255,0.35)] dark:bg-white/10 dark:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-base font-semibold text-slate-900 dark:text-white">
                        {module.mode}
                      </p>
                      {isActive ? (
                        <motion.span
                          key="active"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1 rounded-full border border-white/30 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-white"
                        >
                          Active
                        </motion.span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-relaxed text-cyan-50/75">
                      {module.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>
      <div className="border-t border-white/10 bg-white/5 px-5 py-4 dark:border-cyan-500/25 dark:bg-cyan-900/40">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
          <span>Saved Sessions</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div className="mt-3 space-y-2">
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between rounded-xl border border-white/30 bg-white/70 px-4 py-3 text-xs text-slate-800/85 dark:border-cyan-500/25 dark:bg-cyan-900/50 dark:text-cyan-100/80"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {session.title}
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/70">
                  {session.mode}
                </p>
              </div>
              <div className="text-[12px] text-cyan-100/60">{session.timestamp}</div>
            </motion.div>
          ))}
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-cyan-300/70 hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 dark:border-cyan-500/30 dark:bg-cyan-900/40 dark:text-cyan-50"
        >
          <Sparkle className="h-4 w-4" />
          Start New Session
        </motion.button>
      </div>
    </div>
  );
}
