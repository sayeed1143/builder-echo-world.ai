import { create } from "zustand";
import {
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import { initialEdges, initialNodes } from "@/components/canvas/CanvasBoard";

type Role = "Student" | "College" | "Teacher" | "Explorer";
type StudyMode =
  | "StudyCanvas AI"
  | "InfiniteMockAI"
  | "DoubtBusterAI"
  | "AI Feature Modules";

type ToolbarAction =
  | "Visualize"
  | "Quiz"
  | "Save"
  | "Export CSV"
  | "Export Image"
  | "Reset Board";

type Session = {
  id: string;
  title: string;
  timestamp: string;
  mode: StudyMode;
};

type Message = {
  id: number;
  text: string;
  from: "user" | "bot";
};

type AiNodeData = {
  title: string;
  subtitle: string;
  tag: string;
  url?: string;
};

type AppState = {
  // App settings
  role: Role;
  activeMode: StudyMode;
  toolbarAction: ToolbarAction | null;
  sessions: Session[];

  // Canvas state
  nodes: Node<AiNodeData>[];
  edges: Edge[];
  messages: Message[];

  // App actions
  setRole: (role: Role) => void;
  setActiveMode: (mode: StudyMode) => void;
  setToolbarAction: (action: ToolbarAction | null) => void;
  addSession: (session: Session) => void;

  // Canvas actions
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (
    data: Partial<AiNodeData> & { title: string; subtitle?: string },
  ) => void;
  resetBoard: () => void;
  addMessage: (message: Message) => void;
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
];

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  role: "Student",
  activeMode: "StudyCanvas AI",
  toolbarAction: null,
  sessions: initialSessions,
  nodes: initialNodes,
  edges: initialEdges,
  messages: [],

  // App actions
  setRole: (role) => set({ role }),
  setActiveMode: (activeMode) => set({ activeMode }),
  setToolbarAction: (toolbarAction) => set({ toolbarAction }),
  addSession: (session) =>
    set((state) => ({ sessions: [session, ...state.sessions].slice(0, 6) })),

  // Canvas actions
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        { ...connection, type: "smoothstep", style: { strokeWidth: 1.5 } },
        get().edges,
      ),
    });
  },
  addNode: (data) => {
    const id = `${Date.now()}`;
    const newNode: Node<AiNodeData> = {
      id,
      type: "ai",
      position: {
        x: Math.random() * 400 - 200,
        y: Math.random() * 200,
      },
      data: {
        tag: data.tag ?? "New Node",
        title: data.title,
        subtitle: data.subtitle ?? "",
        url: data.url,
      },
    };
    set({ nodes: [...get().nodes, newNode] });
  },
  resetBoard: () => {
    set({ nodes: initialNodes, edges: initialEdges, messages: [] });
  },
  addMessage: (message) => {
    set({ messages: [...get().messages, message] });
  },
}));

export type { Role, StudyMode, ToolbarAction, Session, Message, AiNodeData };
