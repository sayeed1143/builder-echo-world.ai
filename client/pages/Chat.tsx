import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CanvasBoard } from "@/components/canvas/CanvasBoard";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { useAppStore } from "@/store/useAppStore";

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const resetBoard = useAppStore((s) => s.resetBoard);

  useEffect(() => {
    // When entering a new chat, reset the canvas to its initial state.
    // In a real app, you'd load the session data based on the `id`.
    if (id?.startsWith("session_")) {
      console.log("Starting new session, resetting board.");
      resetBoard();
    } else {
      console.log(`Loading existing session: ${id}`);
      // Here you would fetch and load the state for the given session id.
      // For now, it will just use the existing state in the store.
    }
  }, [id, resetBoard]);

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={75}>
          <CanvasBoard />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <ChatPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
