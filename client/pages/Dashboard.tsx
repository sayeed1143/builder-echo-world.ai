import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Dashboard() {
  const sessions = useAppStore((s) => s.sessions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl"
    >
      <div className="mb-8 space-y-4 rounded-lg border bg-card p-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to your Visual Workspace
        </h1>
        <p className="text-muted-foreground">
          Transform your ideas into visual maps, start a new inquiry, or revisit
          a past session.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link to="/chat">
            <PlusCircle className="mr-2 h-5 w-5" />
            Start New Inquiry / Canvas
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Recent Work</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={`/chat/${session.id}`} className="block h-full">
                <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">
                      {session.title}
                    </CardTitle>
                    <CardDescription>
                      {session.mode} - {session.timestamp}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
