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
import { Button } from "../ui/button";

const moduleCards: Array<{
  mode: StudyMode;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [
  {
    mode: "StudyCanvas AI",
    title: "Visual Research Workspace",
    description:
      "Connect sources, generate citations, and map knowledge effortlessly.",
    icon: NotebookPen,
  },
  {
    mode: "InfiniteMockAI",
    title: "Adaptive Mock Tests",
    description:
      "Craft personalized exams with instant analytics and smart remediation.",
    icon: LineChart,
  },
  {
    mode: "DoubtBusterAI",
    title: "Instant Doubt Solver",
    description:
      "Upload, ask, and receive multi-step explanations with alternate methods.",
    icon: BrainCircuit,
  },
  {
    mode: "AI Feature Modules",
    title: "Modular Intelligence",
    description:
      "Plug-in voice tutors, vision OCR, and knowledge expansions instantly.",
    icon: Bot,
  },
];

const roleShortcuts: Record<
  Role,
  Array<{
    title: string;
    action: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }>
> = {
  Student: [
    {
      title: "Notes to Mind Maps",
      action: "Transform revision notes into a visual neural web.",
      icon: BrainCircuit,
    },
    {
      title: "Mock Sprint",
      action: "Generate adaptive tests based on this week's topics.",
      icon: LineChart,
    },
  ],
  College: [
    {
      title: "Curriculum Sync",
      action: "Align faculty resources with AI-crafted study journeys.",
      icon: GraduationCap,
    },
    {
      title: "Analytics Uplink",
      action: "Deploy campus-wide AI dashboards instantly.",
      icon: LineChart,
    },
  ],
  Teacher: [
    {
      title: "Lesson Architect",
      action: "Build interactive slides from PDFs and references.",
      icon: NotebookPen,
    },
    {
      title: "Doubt Queue",
      action: "Review AI-prioritized doubts and respond in seconds.",
      icon: Clock3,
    },
  ],
  Explorer: [
    {
      title: "Research Trails",
      action: "Fuse papers, podcasts, and videos into living canvases.",
      icon: BookOpenCheck,
    },
    {
      title: "Idea Reactor",
      action: "Ask bold questions and watch AI branch possibilities.",
      icon: Sparkle,
    },
  ],
};

export function Sidebar() {
  const { activeMode, setActiveMode, role, sessions } = useAppStore();

  return (
    <aside className="relative flex h-full w-full flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground lg:w-80 lg:min-w-[18rem]">
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Role Shortcuts</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div className="grid gap-2">
          {roleShortcuts[role].map((shortcut) => (
            <motion.button
              key={shortcut.title}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-start gap-3 rounded-md border bg-background p-3 text-left transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <shortcut.icon className="relative z-10 mt-1 h-5 w-5 text-muted-foreground" />
              <div className="relative z-10 space-y-0.5">
                <p className="text-sm font-semibold text-foreground">
                  {shortcut.title}
                </p>
                <p className="text-xs text-muted-foreground">
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
    </aside>
  );
}

type ModulesSectionProps = {
  activeMode: StudyMode;
  setActiveMode: (mode: StudyMode) => void;
  sessions: Session[];
};

function ModulesSection({
  activeMode,
  setActiveMode,
  sessions,
}: ModulesSectionProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-background">
      <div className="border-b px-4 py-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Study Modes
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose the intelligence layer to guide your learning ritual.
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {moduleCards.map((module) => {
            const isActive = module.mode === activeMode;
            const Icon = module.icon;
            return (
              <motion.button
                key={module.mode}
                type="button"
                whileHover={{ scale: 1.01 }}
                onClick={() => setActiveMode(module.mode)}
                className={`relative w-full rounded-md border p-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "bg-card hover:bg-accent/50"
                }`}
              >
                <div className="relative z-10 flex items-start gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-md border ${
                      isActive ? "bg-background/50" : "bg-background"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{module.mode}</p>
                      {isActive && (
                        <motion.span
                          layoutId="active-mode-dot"
                          className="h-2 w-2 rounded-full bg-primary"
                        />
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>
      <div className="border-t bg-background/50 p-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Saved Sessions</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div className="mt-3 space-y-2">
          {sessions.slice(0, 2).map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between rounded-md border bg-card px-3 py-2 text-xs"
            >
              <div>
                <p className="font-semibold text-foreground">{session.title}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {session.mode}
                </p>
              </div>
              <div className="text-[12px] text-muted-foreground">
                {session.timestamp}
              </div>
            </motion.div>
          ))}
        </div>
        <Button variant="secondary" className="mt-4 w-full">
          <Sparkle className="mr-2 h-4 w-4" />
          Start New Session
        </Button>
      </div>
    </div>
  );
}
