import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Download,
  ImageIcon,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";

import {
  useAppStore,
  type AiNodeData,
  type StudyMode,
  type ToolbarAction,
} from "@/store/useAppStore";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const toolbarActions: ToolbarAction[] = [
  "Visualize",
  "Quiz",
  "Save",
  "Export CSV",
  "Export Image",
  "Reset Board",
];

export const initialNodes: Node<AiNodeData>[] = [
  {
    id: "student",
    type: "ai",
    position: { x: 0, y: 0 },
    data: {
      title: "Concept Map of Quantum Entanglement",
      subtitle: "From Student",
      tag: "Student Prompt",
    },
  },
  {
    id: "canvas",
    type: "ai",
    position: { x: 350, y: 150 },
    data: {
      title: "Synced 8 research papers",
      subtitle: "Visual map formed",
      tag: "StudyCanvas AI",
    },
  },
  {
    id: "mock",
    type: "ai",
    position: { x: -350, y: 200 },
    data: {
      title: "Generated mock test",
      subtitle: "Physics / Thermodynamics",
      tag: "InfiniteMockAI",
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "student-canvas",
    source: "student",
    target: "canvas",
    type: "smoothstep",
    style: { strokeWidth: 1.5 },
  },
  {
    id: "student-mock",
    source: "student",
    target: "mock",
    type: "smoothstep",
    style: { strokeWidth: 1.5 },
  },
];

function AiNode({ data }: NodeProps<AiNodeData>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-64 rounded-lg border bg-card p-4 text-card-foreground shadow-md"
      style={{
        borderWidth: "1px",
        borderColor: "hsl(var(--border))",
        backgroundColor: "hsl(var(--card))",
      }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
          <span>{data.tag}</span>
        </div>
        <p className="font-semibold leading-tight text-foreground">
          {data.title}
        </p>
        <p className="text-sm text-muted-foreground">{data.subtitle}</p>
        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Open resource
          </a>
        )}
      </div>
    </motion.div>
  );
}

const nodeTypes = {
  ai: AiNode,
};

function convertToCSV(data: Node<AiNodeData>[]) {
  if (!data || data.length === 0) {
    return "";
  }
  const headers = ["id", "title", "subtitle", "tag", "url"];
  const csvRows = [];
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((header) => {
      let val;
      if (header === "id") {
        val = row.id;
      } else {
        val = row.data[header as keyof AiNodeData];
      }
      const escaped =
        ("" + (val === undefined || val === null ? "" : val)).replace(
          /"/g,
          '""',
        );
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
}

export function CanvasBoard() {
  const {
    activeMode,
    setToolbarAction,
    addSession,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    resetBoard,
  } = useAppStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toolbarIcons: Record<ToolbarAction, React.ReactNode> = useMemo(
    () => ({
      Visualize: <Sparkles className="h-4 w-4" />,
      Quiz: <Brain className="h-4 w-4" />,
      Save: <Save className="h-4 w-4" />,
      "Export CSV": <Download className="h-4 w-4" />,
      "Export Image": <ImageIcon className="h-4 w-4" />,
      "Reset Board": <RotateCcw className="h-4 w-4" />,
    }),
    [],
  );

  const handleToolbarAction = useCallback(
    (action: ToolbarAction) => {
      setToolbarAction(action);
      if (action === "Reset Board") {
        resetBoard();
      } else if (action === "Save") {
        const now = new Date();
        addSession({
          id: `${now.getTime()}`,
          title: `Session ${now.toLocaleString()}`,
          timestamp: now.toLocaleTimeString(),
          mode: activeMode,
        });
      } else if (action === "Export CSV") {
        const csv = convertToCSV(nodes);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `shunya-canvas-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else if (action === "Export Image") {
        // This is a placeholder. For real export, a library like html-to-image is needed.
        window.print();
      }
    },
    [activeMode, addSession, nodes, setToolbarAction, resetBoard],
  );

  const defaultEdgeOptions = {
    style: {
      stroke: "#333333",
      strokeWidth: 1.5,
    },
    animated: false,
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-card">
      <Toolbar toolbarIcons={toolbarIcons} onAction={handleToolbarAction} />
      <div className="relative flex-1">
        {isClient ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            proOptions={{ hideAttribution: true }}
            className="react-flow-canvas"
            defaultEdgeOptions={defaultEdgeOptions}
          >
            <Background color="hsl(var(--border))" gap={16} />
            <MiniMap pannable zoomable />
            <Controls />
          </ReactFlow>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Loading canvas...
          </div>
        )}
        <ModeBadge activeMode={activeMode} />
      </div>
    </div>
  );
}

function Toolbar({
  toolbarIcons,
  onAction,
}: {
  toolbarIcons: Record<ToolbarAction, React.ReactNode>;
  onAction: (action: ToolbarAction) => void;
}) {
  const { toolbarAction } = useAppStore();
  return (
    <div className="flex flex-wrap items-center gap-2 border-b bg-card px-4 py-2">
      {toolbarActions.map((action) => (
        <Tooltip key={action}>
          <TooltipTrigger asChild>
            <Button
              variant={toolbarAction === action ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onAction(action)}
              className="flex items-center gap-2"
            >
              {toolbarIcons[action]}
              <span className="hidden sm:inline">{action}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{action}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

function ModeBadge({ activeMode }: { activeMode: StudyMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-md border bg-background/80 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
    >
      <Bot className="h-4 w-4" />
      {activeMode}
    </motion.div>
  );
}
