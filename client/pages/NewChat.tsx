import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewChat() {
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a unique ID for the new chat session and redirect.
    const newChatId = `session_${Date.now()}`;
    navigate(`/chat/${newChatId}`, { replace: true });
  }, [navigate]);

  return null; // This component renders nothing.
}
