import { create } from "zustand";

type Role = "Student" | "College" | "Teacher" | "Explorer";
type StudyMode = "StudyCanvas AI" | "InfiniteMockAI" | "DoubtBusterAI" | "AI Feature Modules";

type ToolbarAction =
  | "Visualize"
  | "Quiz"
  | "Canvas Mode"
  | "Practice Mode"
  | "Doubt Mode"
  | "Save"
  | "Export"
  | "Print"
  | "Reset Board";

type Session = {
  id: string;
  title: string;
  timestamp: string;
  mode: StudyMode;
};

type AppState = {
  role: Role;
  activeMode: StudyMode;
  toolbarAction: ToolbarAction | null;
  sessions: Session[];
  setRole: (role: Role) => void;
  setActiveMode: (mode: StudyMode) => void;
  setToolbarAction: (action: ToolbarAction | null) => void;
  addSession: (session: Session) => void;
};

const initialSessions: Session[] = [
  {
    id: "1",
    title: "JEE Quantum Mechanics Deep Dive",
    timestamp: "2h ago",
    mode: "StudyCanvas AI",
  },
  {
    id: "2",
    title: "Thermodynamics Resilience Mock",
    timestamp: "Yesterday",
    mode: "InfiniteMockAI",
  },
  {
    id: "3",
    title: "Optics Doubt Flashcards",
    timestamp: "Mar 2",
    mode: "DoubtBusterAI",
  },
];

export const useAppStore = create<AppState>((set) => ({
  role: "Student",
  activeMode: "StudyCanvas AI",
  toolbarAction: null,
  sessions: initialSessions,
  setRole: (role) => set({ role }),
  setActiveMode: (activeMode) => set({ activeMode }),
  setToolbarAction: (toolbarAction) => set({ toolbarAction }),
  addSession: (session) =>
    set((state) => ({ sessions: [session, ...state.sessions].slice(0, 6) })),
}));

export type { Role, StudyMode, ToolbarAction, Session };
