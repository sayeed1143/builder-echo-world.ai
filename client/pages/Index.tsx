import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Layers3,
  ShieldCheck,
  Sparkle,
  Workflow,
} from "lucide-react";

import { CanvasBoard } from "@/components/canvas/CanvasBoard";

const heroHighlights = [
  {
    title: "Multi-modal Intelligence",
    description: "Fuse text, visuals, audio, and assessments into one living workspace.",
  },
  {
    title: "Adaptive Mastery",
    description: "Infinite mock exams calibrate instantly to your strengths and blind spots.",
  },
  {
    title: "24/7 Mentorship",
    description: "DoubtBusterAI delivers step-wise explanations, alternate methods, and practice twins on demand.",
  },
];

const modules = [
  {
    name: "StudyCanvas AI",
    icon: Layers3,
    pain: "Students lose track of sources while doing research.",
    solution: "Shunya AI weaves every PDF, link, and lecture into a cohesive, citation-ready canvas.",
    features: [
      "Upload PDFs, embed YouTube lectures, and paste links",
      "AI extracts themes, citations, and connected insights",
      "Mind map visualizations with export to Docs, Word, or PDF",
      "Assignment drafts with references and knowledge graph overlays",
    ],
    commands: [
      "Summarize this PDF in 5 key points.",
      "Connect these two papers.",
      "Make a visual map of renewable energy sources.",
      "Write a 200-word abstract based on these notes.",
    ],
  },
  {
    name: "InfiniteMockAI",
    icon: BrainCircuit,
    pain: "Limited practice tests and high cost block deeper mastery.",
    solution: "Generate endless, adaptive mock exams that mirror real test blueprints and accelerate improvement.",
    features: [
      "Choose JEE, NEET, GATE, CAT, and more with authentic patterns",
      "Auto-generated solutions with narrated steps",
      "Weak area detection powering the next personalized test",
      "Gamified dashboards for streaks, velocity, and mastery",
    ],
    commands: [
      "Create a JEE Physics test with 10 questions.",
      "Focus only on my weak topics: thermodynamics and optics.",
      "Explain Q3’s solution in detail.",
      "Schedule a weekly adaptive test sprint.",
    ],
  },
  {
    name: "DoubtBusterAI",
    icon: Workflow,
    pain: "Learners waste hours waiting for support or clarity.",
    solution: "Snap, speak, or type a problem—Shunya responds instantly with multi-format clarity and practice twins.",
    features: [
      "OCR for handwritten notes and textbook captures",
      "Multiple solving methods with step-by-step narration",
      "Voice, video, and PDF exports",
      "Practice problem recommendations with difficulty ladders",
    ],
    commands: [
      "Explain this derivation step by step.",
      "Show an alternate way to solve this.",
      "Generate 5 practice problems like this.",
      "Convert this solution into a downloadable PDF.",
    ],
  },
];

const pricing = [
  {
    plan: "Free",
    price: "₹0",
    description: "5 uploads or 10 doubts each month to begin your journey.",
    perks: ["Mindful Canvas glimpse", "DoubtBusterAI snapshots", "Weekly progress pulse"],
  },
  {
    plan: "Student Pro",
    price: "₹499/mo",
    description: "Unlimited documents, notes, and adaptive mock tests.",
    perks: [
      "InfiniteMockAI with analytics",
      "Full StudyCanvas AI exports",
      "Priority AI mentorship",
    ],
  },
  {
    plan: "Ultimate",
    price: "₹999/mo",
    description: "Unlock voice tutors, multi-device sync, and pro-grade exports.",
    perks: ["Immersive voice tutor", "Advanced visualization packs", "Real-time collaboration"],
  },
  {
    plan: "Institution",
    price: "Talk to us",
    description: "Campus-wide licenses with admin dashboards and integrations.",
    perks: ["SSO and LMS integration", "Dedicated AI lab spaces", "White-glove onboarding"],
  },
];

export default function Index() {
  return (
    <div className="flex h-full flex-col gap-12">
      <Hero />
      <CanvasBoard />
      <FeatureMatrix />
      <PricingSection />
    </div>
  );
}

function Hero() {
  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100/80 backdrop-blur-2xl"
      >
        <Sparkle className="h-4 w-4" />
        From Curiosity to Clarity — Shunya AI
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end"
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-white drop-shadow-[0_0_40px_rgba(59,252,255,0.4)] sm:text-5xl lg:text-6xl">
            Shunya AI: The Infinite Learning Intelligence
          </h2>
          <p className="text-lg leading-relaxed text-cyan-100/80 sm:text-xl">
            A futuristic, mindful learning space that merges visual research, adaptive testing, and instant doubt solving into one infinite intelligence. Built for students, teachers, explorers, and the campuses of tomorrow.
          </p>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.35em] text-cyan-100/80">
            <span className="rounded-full border border-cyan-300/60 bg-cyan-500/20 px-4 py-2">
              StudyCanvas AI
            </span>
            <span className="rounded-full border border-violet-300/60 bg-violet-500/20 px-4 py-2">
              InfiniteMockAI
            </span>
            <span className="rounded-full border border-fuchsia-300/60 bg-fuchsia-500/20 px-4 py-2">
              DoubtBusterAI
            </span>
          </div>
        </div>
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl">
          {heroHighlights.map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-cyan-100/80"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100/70">
                {highlight.title}
              </p>
              <p className="mt-2 text-base text-white/90">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FeatureMatrix() {
  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4"
      >
        <h3 className="text-3xl font-semibold text-white lg:text-4xl">
          Mindful Modules, Infinite Outcomes
        </h3>
        <p className="max-w-3xl text-lg text-cyan-100/80">
          Shunya AI synchronizes research canvases, adaptive mock exams, and always-on mentorship. Each module interlinks through the multi-panel canvas, keeping curiosity, practice, and clarity in flow.
        </p>
      </motion.div>
      <div className="grid gap-6 xl:grid-cols-3">
        {modules.map((module) => (
          <motion.div
            key={module.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex h-full flex-col gap-5 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_25px_60px_rgba(140,75,255,0.18)] backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
                  <module.icon className="h-6 w-6" />
                </span>
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    {module.name}
                  </h4>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
                    {module.pain}
                  </p>
                </div>
              </div>
              <ShieldCheck className="h-5 w-5 text-cyan-200/70" />
            </div>
            <p className="text-base text-white/90">{module.solution}</p>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/60">
                Key Abilities
              </p>
              <ul className="space-y-2 text-sm text-cyan-50/80">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-cyan-300 via-violet-400 to-fuchsia-400 shadow-[0_0_12px_rgba(140,75,255,0.7)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/60">
                Try Asking
              </p>
              <ul className="space-y-2 text-sm text-cyan-50/80">
                {module.commands.map((command) => (
                  <li key={command} className="flex items-start gap-3">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>{command}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4"
      >
        <h3 className="text-3xl font-semibold text-white lg:text-4xl">
          Choose Your Journey
        </h3>
        <p className="max-w-3xl text-lg text-cyan-100/80">
          Begin for free, grow with Student Pro or Ultimate, or activate institution-wide mastery. Every plan is Vercel-ready, AI-native, and expansion-friendly with Supabase and Firebase integrations.
        </p>
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {pricing.map((tier) => (
          <motion.div
            key={tier.plan}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-3xl"
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/60">
                  {tier.plan}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {tier.price}
                </p>
              </div>
              <p className="text-sm text-cyan-50/80">{tier.description}</p>
              <ul className="space-y-2 text-sm text-cyan-50/80">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-cyan-300" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/70 hover:text-cyan-50">
              {tier.plan === "Institution" ? "Talk to Shunya Team" : "Activate"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
