import React, { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type OnConnect,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Brain,
  FileText,
  ImageIcon,
  Link2,
  Microphone,
  Paperclip,
  Send,
  Sparkles,
  Youtube,
} from "lucide-react";

import {
  useAppStore,
  type ToolbarAction,
  type StudyMode,
} from "@/store/useAppStore";

const toolbarActions: ToolbarAction[] = [
  "Visualize",
  "Quiz",
  "Canvas Mode",
  "Practice Mode",
  "Doubt Mode",
  "Save",
  "Export",
  "Print",
  "Reset Board",
];

type AiNodeData = {
  title: string;
  subtitle: string;
  tag: string;
  media?: "pdf" | "image" | "video" | "text";
  glow: string;
  align?: "left" | "right";
  delay?: number;
};

const nodeTypes = {
  ai: AiNode,
};

const initialNodes: Node<AiNodeData>[] = [
  {
    id: "student",
    type: "ai",
    position: { x: 0, y: 0 },
    data: {
      title: "Show me a concept map of Quantum Entanglement",
      subtitle: "From StudyCanvas AI",
      tag: "Student Prompt",
      glow: "from-cyan-300/80 via-sky-400/80 to-blue-500/70",
      media: "text",
      align: "left",
      delay: 0,
    },
  },
  {
    id: "canvas",
    type: "ai",
    position: { x: 280, y: 180 },
    data: {
      title: "Synced 8 research papers, 12 lecture clips",
      subtitle: "Visual neural map formed across 3 knowledge clusters",
      tag: "StudyCanvas AI",
      glow: "from-violet-400/80 via-purple-500/70 to-blue-500/60",
      media: "pdf",
      align: "right",
      delay: 0.2,
    },
  },
  {
    id: "mock",
    type: "ai",
    position: { x: -220, y: 220 },
    data: {
      title: "Generated mock: NEET Physics / Thermodynamics focus",
      subtitle: "Difficulty auto-adjusted. Weak areas tracked in dashboard.",
      tag: "InfiniteMockAI",
      glow: "from-teal-400/80 via-emerald-400/70 to-cyan-400/60",
      media: "text",
      align: "left",
      delay: 0.35,
    },
  },
  {
    id: "doubt",
    type: "ai",
    position: { x: 120, y: 380 },
    data: {
      title: "Explained Step 3 in 4 methods + generated 5 practice twins",
      subtitle: "Voice walkthrough + PDF export ready",
      tag: "DoubtBusterAI",
      glow: "from-pink-400/80 via-fuchsia-500/70 to-purple-500/60",
      media: "video",
      align: "right",
      delay: 0.5,
    },
  },
  {
    id: "insight",
    type: "ai",
    position: { x: -120, y: -160 },
    data: {
      title: "Insights linked from MIT OCW & NASA open archives",
      subtitle: "Hyperlinks attached, summarised in 200-word abstract.",
      tag: "AI Insight",
      glow: "from-indigo-400/80 via-cyan-400/70 to-teal-400/60",
      media: "image",
      align: "left",
      delay: 0.65,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "student-canvas",
    source: "student",
    target: "canvas",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "url(#gradient-canvas)",
      strokeWidth: 2.5,
      filter: "drop-shadow(0 0 6px rgba(59,252,255,0.65))",
    },
  },
  {
    id: "canvas-mock",
    source: "canvas",
    target: "mock",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "url(#gradient-mock)",
      strokeWidth: 2.2,
      filter: "drop-shadow(0 0 6px rgba(140,75,255,0.45))",
    },
  },
  {
    id: "canvas-doubt",
    source: "canvas",
    target: "doubt",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "url(#gradient-doubt)",
      strokeWidth: 2.2,
      filter: "drop-shadow(0 0 6px rgba(255,105,180,0.45))",
    },
  },
  {
    id: "insight-student",
    source: "insight",
    target: "student",
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "url(#gradient-insight)",
      strokeWidth: 2.2,
      filter: "drop-shadow(0 0 6px rgba(59,252,255,0.35))",
    },
  },
];

const mediaIcons: Record<AiNodeData["media"], React.ReactNode> = {
  pdf: <FileText className="h-4 w-4" />,
  image: <ImageIcon className="h-4 w-4" />,
  video: <Youtube className="h-4 w-4" />,
  text: <Sparkles className="h-4 w-4" />,
};

function AiNode({ data }: NodeProps<AiNodeData>) {
  const Icon = data.media ? mediaIcons[data.media] : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, delay: data.delay ?? 0 }}
      className="relative max-w-sm rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl dark:border-cyan-500/25 dark:bg-slate-900/50"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-70"
        style={{
          background: `linear-gradient(135deg, ${data.glow})`,
          mixBlendMode: "screen",
        }}
      />
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-cyan-100/80">
          <span>{data.tag}</span>
          {Icon ? (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_0_15px_rgba(59,252,255,0.3)]">
              {Icon}
            </span>
          ) : null}
        </div>
        <p className="text-lg font-semibold leading-tight text-white drop-shadow-[0_0_30px_rgba(59,252,255,0.3)]">
          {data.title}
        </p>
        <p className="text-sm text-cyan-100/80">{data.subtitle}</p>
      </div>
    </motion.div>
  );
}

export function CanvasBoard() {
  const { activeMode, setToolbarAction } = useAppStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlow | null>(
    null,
  );

  const handleConnect: OnConnect = (params) =>
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "smoothstep",
          animated: true,
          style: {
            stroke: "url(#gradient-dynamic)",
            strokeWidth: 2.2,
            filter: "drop-shadow(0 0 6px rgba(59,252,255,0.45))",
          },
        },
        eds,
      ),
    );

  const toolbarIcons: Record<ToolbarAction, React.ReactNode> = useMemo(
    () => ({
      Visualize: <Sparkles className="h-4 w-4" />,
      Quiz: <Brain className="h-4 w-4" />,
      "Canvas Mode": <Link2 className="h-4 w-4" />,
      "Practice Mode": <BookOpenCheck className="h-4 w-4" />,
      "Doubt Mode": <Bot className="h-4 w-4" />,
      Save: <FileText className="h-4 w-4" />,
      Export: <Paperclip className="h-4 w-4" />,
      Print: <ImageIcon className="h-4 w-4 rotate-90" />,
      "Reset Board": <Sparkles className="h-4 w-4" />,
    }),
    [],
  );

  return (
    <div className="relative flex h-[700px] w-full flex-col overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 shadow-[0_45px_120px_rgba(59,252,255,0.19)] backdrop-blur-3xl dark:border-cyan-500/25 dark:bg-slate-950/60">
      <Toolbar toolbarIcons={toolbarIcons} />
      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onInit={(instance) => {
            setReactFlowInstance(instance as unknown as ReactFlow);
            requestAnimationFrame(() => {
              instance.fitView({ padding: 0.3, duration: 800 });
            });
          }}
          fitView
          minZoom={0.4}
          maxZoom={1.8}
          snapToGrid
          snapGrid={[20, 20]}
          attributionPosition="bottom-left"
          nodeTypes={nodeTypes}
          proOptions={{ hideAttribution: true }}
          className="react-flow-canvas"
        >
          <Defs />
          <Background color="rgba(148,163,184,0.25)" gap={32} size={0.5} />
          <MiniMap
            pannable
            zoomable
            nodeColor={() => "#5ff3ff"}
            maskColor="rgba(15,23,42,0.6)"
            className="!bg-slate-900/60 !text-cyan-100/50"
          />
          <Controls
            position="bottom-right"
            showInteractive={false}
            className="!bg-white/10 !border-white/20 !text-white"
          />
        </ReactFlow>
        <ModeBadge activeMode={activeMode} />
      </div>
      <InputDock />
    </div>
  );
}

function Toolbar({
  toolbarIcons,
}: {
  toolbarIcons: Record<ToolbarAction, React.ReactNode>;
}) {
  const { toolbarAction, setToolbarAction } = useAppStore();
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100/80 backdrop-blur-2xl dark:border-cyan-500/25 dark:bg-slate-900/50">
      {toolbarActions.map((action) => (
        <motion.button
          key={action}
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => setToolbarAction(action)}
          className="group relative overflow-hidden rounded-full px-4 py-2 text-[10px]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full opacity-60 transition"
            style={{
              background:
                toolbarAction === action
                  ? "linear-gradient(120deg, rgba(59,252,255,0.9), rgba(140,75,255,0.85))"
                  : "linear-gradient(120deg, rgba(15,23,42,0.5), rgba(15,23,42,0.3))",
              boxShadow:
                toolbarAction === action
                  ? "0 0 20px rgba(59,252,255,0.45)"
                  : "0 0 0 rgba(0,0,0,0)",
            }}
          />
          <span className="relative z-10 flex items-center gap-2 text-white/90 mix-blend-screen">
            {toolbarIcons[action]}
            {action}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

function ModeBadge({ activeMode }: { activeMode: StudyMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pointer-events-none absolute left-6 top-6 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white backdrop-blur-2xl"
    >
      <Bot className="h-4 w-4" />
      {activeMode}
    </motion.div>
  );
}

function InputDock() {
  return (
    <div className="relative border-t border-white/10 bg-white/10 px-6 py-5 backdrop-blur-2xl dark:border-cyan-500/25 dark:bg-slate-900/40">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-3 shadow-[0_0_35px_rgba(59,252,255,0.25)] backdrop-blur-2xl">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-cyan-100/90"
        >
          <Microphone className="h-4 w-4" />
        </button>
        <input
          className="flex-1 bg-transparent text-sm font-medium text-white placeholder:text-cyan-100/60 focus:outline-none"
          placeholder="Ask anything…"
        />
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-300/90 via-sky-400/90 to-indigo-500/90 text-slate-900 shadow-[0_0_30px_rgba(59,252,255,0.45)]"
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-violet-400/90 via-purple-500/90 to-fuchsia-500/90 text-white shadow-[0_0_30px_rgba(140,75,255,0.45)]"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Defs() {
  return (
    <defs>
      <linearGradient id="gradient-canvas" gradientTransform="rotate(120)">
        <stop offset="5%" stopColor="#5ff3ff" />
        <stop offset="95%" stopColor="#8c4bff" />
      </linearGradient>
      <linearGradient id="gradient-mock" gradientTransform="rotate(120)">
        <stop offset="5%" stopColor="#8c4bff" />
        <stop offset="95%" stopColor="#5ff3ff" />
      </linearGradient>
      <linearGradient id="gradient-doubt" gradientTransform="rotate(120)">
        <stop offset="5%" stopColor="#f472b6" />
        <stop offset="95%" stopColor="#8c4bff" />
      </linearGradient>
      <linearGradient id="gradient-insight" gradientTransform="rotate(120)">
        <stop offset="5%" stopColor="#5ff3ff" />
        <stop offset="95%" stopColor="#34d399" />
      </linearGradient>
      <linearGradient id="gradient-dynamic" gradientTransform="rotate(120)">
        <stop offset="5%" stopColor="#5ff3ff" />
        <stop offset="95%" stopColor="#8c4bff" />
      </linearGradient>
    </defs>
  );
}
