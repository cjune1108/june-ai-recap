import { useState, useEffect, useRef, useMemo } from 'react'
import {
  HelpCircle,
  Globe,
  Sparkles,
  PanelLeft,
  Trophy,
  Medal,
  Target,
  Clock,
  Files,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Puzzle,
  Settings,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  FileText,
  ClipboardList,
  X,
  Plus,
  Mic,
  ArrowUp,
  ThumbsUp,
  ThumbsDown,
  Video,
  CircleCheck,
  Loader2,
  ArrowRight,
  Play,
  Zap,
  Pencil,
  Award,
  TrendingUp,
  Sprout,
  TreeDeciduous,
  TreePine,
  NotebookPen,
  Expand,
  Check,
} from 'lucide-react'

type Page = 'analyzing' | 'challenge' | 'ide' | 'complete' | 'welcome'
type RightPanel = 'instructions' | 'coach'

// ─── Shared Components ───

function Header({ onSparkleClick }: { onSparkleClick?: () => void }) {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-page-bg shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-[22px] font-bold tracking-tight text-primary select-none">coursera</span>
        <div className="w-px h-6 bg-border" />
        <span className="text-[15px] font-medium tracking-tight select-none">
          <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC04]">o</span><span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-1.5 rounded-full hover:bg-black/5 transition-colors"><HelpCircle className="w-5 h-5 text-text-muted" /></button>
        <button className="p-1.5 rounded-full hover:bg-black/5 transition-colors"><Globe className="w-5 h-5 text-text-muted" /></button>
        <button onClick={onSparkleClick} className="p-1.5 rounded-full hover:bg-black/5 transition-colors">
          <svg className="w-[26px] h-[26px]" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="header-sparkle-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" /><stop offset="1" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <path d="M10 3L12.5 9.5L19 12L12.5 14.5L10 21L7.5 14.5L1 12L7.5 9.5L10 3Z" fill="url(#header-sparkle-grad)" />
            <path d="M18 1L19.125 4.125L22.25 5.25L19.125 6.375L18 9.5L16.875 6.375L13.75 5.25L16.875 4.125L18 1Z" fill="url(#header-sparkle-grad)" />
          </svg>
        </button>
        <button className="w-7 h-7 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">N</button>
      </div>
    </header>
  )
}

function CourseSidebar() {
  return (
    <div className="w-[52px] shrink-0 bg-white rounded-2xl flex flex-col items-center pt-4 h-full">
      <button className="p-1.5 rounded hover:bg-black/5 transition-colors"><PanelLeft className="w-5 h-5 text-text-muted" /></button>
      <div className="w-8 h-px bg-border mt-3" />
    </div>
  )
}

/** Proactive AI MVP — course analysis (Figma node 27-36386) */
function ProactiveSparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="proactive-sparkle-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path d="M10 3L12.5 9.5L19 12L12.5 14.5L10 21L7.5 14.5L1 12L7.5 9.5L10 3Z" fill="url(#proactive-sparkle-grad)" />
      <path d="M18 1L19.125 4.125L22.25 5.25L19.125 6.375L18 9.5L16.875 6.375L13.75 5.25L16.875 4.125L18 1Z" fill="url(#proactive-sparkle-grad)" />
    </svg>
  )
}

function PersonalizationCard3DIcon() {
  return (
    <div
      className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-[#f9a8d4] via-[#a78bfa] to-[#38bdf8] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-black/[0.06]"
      aria-hidden
    />
  )
}

const analysisSteps = [
  { id: 'thinking', text: 'Thinking...', muted: true },
  { id: 'm1', text: 'Analyzing course module 1 content', muted: false },
  { id: 'career', text: 'Analyze career goal and skill level', muted: false },
  { id: 'removing', text: 'Removing intro course and simple tasks', muted: false },
  { id: 'm2', text: 'Analyzing course module 2 content', muted: false },
] as const

function ProactiveAnalysisPage({ onContinue }: { onContinue: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visibleStepCount, setVisibleStepCount] = useState(0)
  const [careerDone, setCareerDone] = useState(false)
  const [analysisReady, setAnalysisReady] = useState(false)
  const bottomInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const start = performance.now()
    const duration = 2600
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(Math.round(t * 35))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setAnalysisReady(true)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const stepDelays = [180, 420, 700, 1050, 1400]
    const timers = stepDelays.map((ms, i) =>
      setTimeout(() => setVisibleStepCount((c) => Math.max(c, i + 1)), ms),
    )
    const careerTimer = setTimeout(() => setCareerDone(true), 2100)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(careerTimer)
    }
  }, [])

  return (
    <div className="flex flex-1 gap-4 px-4 pb-4 min-h-0">
      <CourseSidebar />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col px-6 py-6 sm:px-10 sm:py-8">
            {/* Inner toolbar — matches assistant chrome in reference */}
            <div className="mb-6 flex items-center justify-between">
              <ProactiveSparkleIcon className="h-5 w-5 shrink-0" />
              <div className="flex items-center gap-0.5">
                <button type="button" className="rounded-lg p-2 transition-colors hover:bg-gray-100" aria-label="New">
                  <Plus className="h-5 w-5 text-text-muted" strokeWidth={1.8} />
                </button>
                <button type="button" className="rounded-lg p-2 transition-colors hover:bg-gray-100" aria-label="Settings">
                  <Settings className="h-5 w-5 text-text-muted" strokeWidth={1.8} />
                </button>
                <button type="button" className="rounded-lg p-2 transition-colors hover:bg-gray-100" aria-label="Close">
                  <X className="h-5 w-5 text-text-muted" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <h1 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-text-dark sm:text-[32px]">
              Hi June!
            </h1>
            <h2 className="mt-2 text-xl font-bold leading-snug text-text-dark sm:text-[22px]">
              Welcome to Generative AI Content Creation course!
            </h2>
            <p className="mt-4 max-w-[720px] text-base leading-7 text-text-muted">
              We&apos;ve tailored this experience using your profile, goals, and activity in Coursera. As you learn, we
              keep refining what we show you so it stays relevant to your role and pace.
            </p>
            <p className="mt-3 max-w-[720px] text-base leading-7 text-text-muted">
              Take a moment to review the highlights below while we finish analyzing the course for you.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-4 rounded-2xl bg-[#F0F8FF] p-4 transition-shadow hover:bg-[#e8f4ff] hover:shadow-md">
                <PersonalizationCard3DIcon />
                <div className="min-w-0">
                  <p className="font-bold text-text-dark">Relevant skills</p>
                  <p className="mt-1 text-[15px] font-normal leading-6 text-text-dark/90">ChatGPT, Data Sets</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-[#F0F8FF] p-4 transition-shadow hover:bg-[#e8f4ff] hover:shadow-md">
                <PersonalizationCard3DIcon />
                <div className="min-w-0">
                  <p className="font-bold text-text-dark">Your goal</p>
                  <p className="mt-1 text-[15px] font-normal leading-6 text-text-dark/90">
                    Leverage Generative AI in my product manager role and focus on Claude Code &amp; Cursor vibe coding
                    tools
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-2">
                <ProactiveSparkleIcon className="h-5 w-5 shrink-0" />
                <p className="text-base font-bold text-text-dark">
                  Analyzing course <span className="tabular-nums">{progress}</span>%
                </p>
              </div>
              <div
                className="mt-3 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-[#E8EEF7]"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={35}
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                  style={{ width: `${(progress / 35) * 100}%` }}
                />
              </div>

              <ul className="mt-5 flex flex-col gap-2.5">
                {analysisSteps.map((step, i) => {
                  const visible = i < visibleStepCount
                  const isCareer = step.id === 'career'
                  const showCheck = isCareer && careerDone
                  return (
                    <li
                      key={step.id}
                      className={`flex items-start gap-2.5 text-[15px] leading-6 transition-opacity duration-300 ${
                        visible ? 'opacity-100 animate-hint-in' : 'pointer-events-none opacity-0'
                      } ${step.muted || (isCareer && !careerDone) ? 'text-text-muted' : 'text-text-dark/85'}`}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                        {showCheck ? (
                          <Check className="h-4 w-4 text-emerald-600" strokeWidth={2.5} aria-hidden />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-text-muted/50" aria-hidden />
                        )}
                      </span>
                      <span>{step.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {analysisReady && (
              <div className="mt-8 animate-hint-in">
                <button
                  type="button"
                  onClick={onContinue}
                  className="rounded-lg bg-primary px-6 py-2.5 text-base font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Continue to lab exercise
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-border/60 bg-white px-6 pb-5 pt-4 sm:px-10">
          <div className="mx-auto max-w-[1100px]">
            <div
              role="button"
              tabIndex={0}
              onClick={() => bottomInputRef.current?.focus()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  bottomInputRef.current?.focus()
                }
              }}
              className="flex cursor-text items-center gap-3 rounded-full border border-transparent bg-[#F3F4F6] px-4 py-3 outline-none ring-primary/30 transition-shadow focus-within:border-primary/25 focus-within:ring-2"
            >
              <Mic className="h-5 w-5 shrink-0 text-text-muted" strokeWidth={1.75} aria-hidden />
              <input
                ref={bottomInputRef}
                type="text"
                placeholder="Message..."
                className="min-w-0 flex-1 bg-transparent text-base text-text-dark placeholder:text-text-muted/80 outline-none"
                aria-label="Message"
              />
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-hover"
                aria-label="Send"
              >
                <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </div>
            <p className="mt-4 text-center text-[11px] leading-5 text-text-muted/90 sm:text-xs">
              This feature is powered by AI, so check for mistakes and don&apos;t share sensitive information.{' '}
              <a
                href="#"
                className="underline decoration-text-muted/50 underline-offset-2 transition-colors hover:text-primary"
              >
                Learn More
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

type CourseItem = { title: string; type: string; duration: string; completed: boolean }

const defaultCourseItems: CourseItem[] = [
  { title: 'Welcome to SQL for data science', type: 'Video', duration: '6min', completed: false },
  { title: 'Introduction to databases', type: 'Reading', duration: '6min', completed: false },
  { title: 'Writing your first SELECT query', type: 'Practice', duration: '10min', completed: false },
  { title: 'Filtering data with WHERE', type: 'Reading', duration: '6min', completed: false },
  { title: 'Aggregation: COUNT, SUM, AVG', type: 'Video', duration: '8min', completed: false },
  { title: 'Joining tables', type: 'Practice', duration: '12min', completed: false },
]

const personalizedCourseItems: CourseItem[] = [
  { title: 'Practice: WHERE clause deep dive', type: 'Practice', duration: '8min', completed: false },
  { title: 'Practice: COUNT, SUM, AVG with real data', type: 'Practice', duration: '10min', completed: false },
  { title: 'Welcome to SQL for data science', type: 'Video', duration: '6min', completed: false },
  { title: 'Introduction to databases', type: 'Reading', duration: '6min', completed: false },
  { title: 'Writing your first SELECT query', type: 'Practice', duration: '10min', completed: false },
  { title: 'Filtering data with WHERE', type: 'Reading', duration: '6min', completed: false },
  { title: 'Aggregation: COUNT, SUM, AVG', type: 'Video', duration: '8min', completed: false },
  { title: 'Joining tables', type: 'Practice', duration: '12min', completed: false },
]

const learningBlocks = [
  { num: 4, title: 'Advanced queries, JOINs & large dataset analysis', status: 'current' as const, detail: '7 items remaining' },
  { num: 3, title: 'Filtering, aggregation & grouping data', status: 'done' as const, detail: 'All items completed' },
]

const upcomingTags = ['Role of SQL and this course in data science', 'Environment set up', 'Environment set up']

type LearningBlock = (typeof learningBlocks)[number]

const blockDetailItems: Record<number, { title: string; type: string; duration: string; state: 'done' | 'active' | 'upcoming' }[]> = {
  3: [
    { title: 'Introduction to filtering with WHERE', type: 'Video', duration: '6min', state: 'done' },
    { title: 'GROUP BY and aggregation basics', type: 'Reading', duration: '6min', state: 'done' },
    { title: 'COUNT, SUM, AVG, MIN, MAX', type: 'Practice', duration: '8min', state: 'done' },
    { title: 'Practice: Aggregating sales data', type: 'Reading', duration: '6min', state: 'done' },
    { title: 'Filtering groups with HAVING', type: 'Reading', duration: '6min', state: 'done' },
    { title: 'Combining WHERE and HAVING', type: 'Video', duration: '6min', state: 'done' },
    { title: 'Advanced aggregation patterns', type: 'Reading', duration: '6min', state: 'done' },
    { title: 'Practice: Complex aggregations', type: 'Practice', duration: '10min', state: 'done' },
  ],
  1: [
    { title: 'Setting up your SQL environment', type: 'Video', duration: '6min', state: 'done' },
    { title: 'What is a relational database?', type: 'Reading', duration: '6min', state: 'done' },
    { title: 'Tables, rows, and columns explained', type: 'Video', duration: '6min', state: 'done' },
    { title: 'Practice: Exploring a sample database', type: 'Practice', duration: '8min', state: 'done' },
    { title: 'Primary keys and data types', type: 'Reading', duration: '6min', state: 'done' },
  ],
}

function CourseProgressModal({ onClose, onSelectBlock }: { onClose: () => void; onSelectBlock: (block: LearningBlock) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative z-10 w-full max-w-[620px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-black/5 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-text-muted" strokeWidth={2} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 pt-6 pb-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 pr-8">
            <div className="flex flex-col gap-1.5">
              <p className="text-base font-semibold text-[#1f1f1f] leading-5 tracking-[-0.048px]">Course progress</p>
              <p className="text-sm text-[#1f1f1f] leading-5">This is how much of the course you have completed.</p>
            </div>
            <button type="button" className="shrink-0 mt-0.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-dark hover:bg-gray-50 transition-colors whitespace-nowrap">
              Switch to non-personalized course
            </button>
          </div>

          {/* Progress card */}
          <div className="rounded-2xl border border-[#dae1ed] bg-white px-4 py-4 flex flex-col gap-3">
            <p className="text-sm text-[#5b6780] leading-5">Course completion - 1/10 blocks completed</p>
            <div className="relative w-full h-1 rounded-full bg-[#e3eeff]">
              <div className="absolute left-0 top-0 h-1 rounded-full bg-[#0048b0]" style={{ width: '16.67%' }} />
            </div>
          </div>

          {/* Your learning blocks */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold text-[#1f1f1f] leading-5 tracking-[-0.048px]">Your learning blocks</p>
            <p className="text-sm text-[#1f1f1f] leading-5">New learning blocks will appear here as the course adapts to you as you go through the course.</p>
          </div>

          {/* Block cards */}
          <div className="flex flex-col gap-3">
            {learningBlocks.map((block) => (
              <div
                key={block.num}
                onClick={() => { if (block.status === 'done') { onSelectBlock(block); onClose(); } }}
                className={`flex gap-4 items-start p-5 rounded-2xl border transition-colors ${
                  block.status === 'current'
                    ? 'border-[#0056d2] bg-[#f0f6ff]/60'
                    : block.status === 'done'
                    ? 'border-[#dae1ed] bg-white cursor-pointer hover:bg-[#f8fafc]'
                    : 'border-[#dae1ed] bg-white'
                }`}
              >
                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-semibold text-[#5b6780] leading-5 tracking-[-0.048px]">{block.title}</p>
                    {block.status === 'current' && (
                      <span className="shrink-0 rounded-full bg-[#1f1f1f] text-white text-xs font-semibold px-3 py-1 leading-4 whitespace-nowrap">
                        Today's learning
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {block.status === 'done' ? (
                      <CircleCheck className="w-4 h-4 text-[#22c55e] shrink-0" strokeWidth={2} />
                    ) : (
                      <svg className="w-4 h-4 shrink-0 text-[#0056d2]" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 8 1.5ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8.75-3.25a.75.75 0 0 0-1.5 0V8c0 .199.079.39.22.53l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.75 7.69V4.75ZM7.25 4.75a.75.75 0 0 1 1.5 0v2.94l1.53 1.53a.75.75 0 1 1-1.06 1.06l-2.25-2.25A.75.75 0 0 1 7.25 8V4.75Z" />
                      </svg>
                    )}
                    <p className="text-xs text-[#5b6780] leading-[18px]">{block.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Content */}
          <div className="flex flex-col gap-3 pt-2">
            <p className="text-base font-semibold text-[#1f1f1f] leading-5 tracking-[-0.048px]">Upcoming Content</p>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold text-[#5b6780] leading-6 tracking-[-0.06px]">Approximately 8 blocks to go (60 min each)</p>
              <p className="text-sm text-[#1f1f1f] leading-5">This is an estimate of how much you have to go based the remaining material and your session time.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-[#5b6780] leading-[18px]">Concepts covered</p>
              <div className="flex flex-wrap gap-2">
                {upcomingTags.map((tag, i) => (
                  <span key={i} className="rounded-full border border-[#dae1ed] px-3 py-1 text-xs text-[#5b6780] leading-[18px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function LearningPathSidebarColumn({
  open,
  onOpen,
  onClose,
  selectedBlock,
  setSelectedBlock,
  courseItems,
}: {
  open: boolean
  onOpen: () => void
  onClose: () => void
  selectedBlock: LearningBlock | null
  setSelectedBlock: (block: LearningBlock | null) => void
  courseItems: CourseItem[]
}) {
  const [courseProgressOpen, setCourseProgressOpen] = useState(false)

  return (
    <>
    {courseProgressOpen && (
      <CourseProgressModal
        onClose={() => setCourseProgressOpen(false)}
        onSelectBlock={(block) => { setSelectedBlock(block); setCourseProgressOpen(false); }}
      />
    )}
    <div
      className={`shrink-0 h-full min-h-0 flex flex-col bg-white rounded-2xl overflow-hidden transition-[width] duration-300 ease-in-out ${
        open ? 'w-[360px]' : 'w-[52px]'
      }`}
    >
      {!open ? (
        <div className="flex flex-col items-center pt-4 w-[52px] h-full min-h-0">
          <button
            type="button"
            onClick={onOpen}
            className="p-1.5 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Open learning path"
          >
            <PanelLeft className="w-5 h-5 text-text-muted" />
          </button>
          <div className="w-8 h-px bg-border mt-3" />
        </div>
      ) : (
        <div className="flex flex-col h-full min-h-0 w-[360px]">
          {/* Header */}
          <div className="shrink-0 px-4 pt-6 pb-3 flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <h2 className="text-[20px] font-semibold text-text-dark leading-6 tracking-[-0.06px]">
                SQL for Data Science (and Version Control with GitHub)
              </h2>
              <button
                type="button"
                onClick={() => setCourseProgressOpen(true)}
                className="mt-1 text-sm font-semibold text-primary hover:underline text-left block"
              >
                Course progress
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-black/5 shrink-0 mt-0.5"
              aria-label="Close panel"
            >
              <PanelLeft className="w-5 h-5 text-text-muted" />
            </button>
          </div>

          <div className="w-full h-px bg-border/60 shrink-0" />

          {selectedBlock ? (
            /* ── Block detail view ── */
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 pt-4 pb-6 flex flex-col gap-3">
              {/* Go back button */}
              <button
                type="button"
                onClick={() => setSelectedBlock(null)}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold text-sm py-3 rounded-xl transition-colors"
              >
                Go back to today&apos;s learning
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </button>

              {/* Previous learning card */}
              <div className="shrink-0 rounded-xl p-4 bg-[#f2f5fa] flex items-center gap-3">
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-text-muted shrink-0" strokeWidth={1.75} />
                    <p className="text-xs font-semibold text-text-muted leading-[18px]">
                      Previous learning
                    </p>
                  </div>
                  <p className="text-sm text-text-dark leading-[18px]">{selectedBlock.title}</p>
                </div>
                <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-[#4ade80]" strokeWidth={1.25} />
                </div>
              </div>

              {/* Block course items */}
              <div className="flex flex-col">
                {(blockDetailItems[selectedBlock.num] ?? []).map((item, i) => (
                  <div
                    key={i}
                    className={`w-full py-3 flex gap-3 items-center rounded-md transition-colors hover:bg-black/[0.03] ${
                      item.state === 'active' ? 'border-l-[3px] border-primary pl-1.5' : 'px-2'
                    }`}
                  >
                    {item.state === 'done' ? (
                      <div className="w-5 h-5 rounded-[6px] bg-[#095941] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#d1d5db] shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-text-dark leading-[18px]">{item.title}</p>
                      <p className="text-sm text-[#636363] leading-5">
                        {item.type}
                        <span className="text-text-muted mx-1.5">•</span>
                        {item.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ── Default sidebar view ── */
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 pt-4 pb-6 flex flex-col gap-2">
              {/* Today's plan card */}
              <div className="shrink-0 rounded-xl p-4 relative overflow-hidden bg-[#f2f5fa] flex items-center gap-3">
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-text-muted shrink-0" strokeWidth={1.75} />
                    <p className="text-xs font-semibold text-text-muted leading-[18px] tracking-[-0.02em]">
                      Today&apos;s plan&nbsp;•&nbsp;60 min
                    </p>
                  </div>
                  <p className="text-sm text-text-dark leading-[18px]">
                    Diving deeper into databases and Jupyter Notebooks
                  </p>
                </div>
                <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-[#4ade80]" strokeWidth={1.25} />
                </div>
              </div>

              {/* Course items */}
              <div className="flex flex-col">
                {courseItems.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full text-left py-3 px-2 flex gap-3 items-center rounded-md transition-colors hover:bg-black/[0.03]"
                  >
                    {item.completed ? (
                      <div className="w-5 h-5 rounded-[6px] bg-[#095941] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#d1d5db] shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-text-dark leading-[18px]">{item.title}</p>
                      <p className="text-sm text-[#636363] leading-5">
                        {item.type}
                        <span className="text-text-muted mx-1.5">•</span>
                        {item.duration}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  )
}

// ─── Challenge Page ───

function ChallengeCard({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="w-full max-w-[818px] rounded-2xl border border-border overflow-hidden">
      <div className="bg-light-blue flex items-center justify-between px-10 py-10 min-h-[246px]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-base text-text-muted leading-6">Lab exercise</span>
            <h1 className="text-4xl font-semibold text-text-dark leading-[42px] tracking-[-0.18px]">Jamie, its time to create your stores website!</h1>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={onLaunch} className="bg-primary hover:bg-primary-hover text-white font-semibold text-base leading-6 tracking-[1px] px-6 py-2.5 rounded-lg transition-colors">Launch</button>
            <div className="flex items-center gap-1.5 px-1.5 py-1.5">
              <img src="/xp-icon.png" alt="XP" className="w-5 h-5" />
              <span className="text-base font-semibold text-xp-orange tracking-[-0.05px] leading-5">30XP</span>
            </div>
          </div>
        </div>
        <div className="w-[237px] h-[214px] shrink-0">
          <img src="/illustration.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="px-10 py-8">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <p className="text-base text-black/80 leading-6 mb-4">Based on your goal to increase your proficiency with web page creation, we have customized this activity to be an example in your industry: create your stores own website.</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2"><Trophy className="w-4 h-4 text-text-dark mt-1 shrink-0" strokeWidth={2} /><span className="text-base text-text-dark leading-6">Get extra 30 XP!</span></div>
              <div className="flex items-start gap-2"><Medal className="w-4 h-4 text-text-dark mt-1 shrink-0" strokeWidth={2} /><span className="text-base text-text-dark leading-6">Prove your skillsets get more personalized content based on your great performance!</span></div>
            </div>
          </div>
          <div className="w-[280px] shrink-0 border border-border rounded-lg p-4 bg-white">
            <h3 className="text-base font-semibold text-black tracking-[-0.05px] leading-5 mb-3">What to expect</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2"><Target className="w-5 h-5 text-text-dark shrink-0" strokeWidth={1.8} /><span className="text-base text-text-dark leading-6">3 attempts</span></div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-text-dark shrink-0" strokeWidth={1.8} /><span className="text-base text-text-dark leading-6">60 min per attempt</span></div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 16 16" fill="none">
                  <defs>
                    <linearGradient id="sparkle-grad" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366F1" /><stop offset="1" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <path d="M7 2L8.5 6.5L13 8L8.5 9.5L7 14L5.5 9.5L1 8L5.5 6.5L7 2Z" fill="url(#sparkle-grad)" />
                  <path d="M12 0.5L12.75 2.75L15 3.5L12.75 4.25L12 6.5L11.25 4.25L9 3.5L11.25 2.75L12 0.5Z" fill="url(#sparkle-grad)" />
                </svg>
                <span className="text-base text-text-dark leading-6">Reviewed by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChallengePage({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="flex flex-1 gap-4 px-4 pb-4 min-h-0">
      <CourseSidebar />
      <main className="flex-1 bg-white rounded-2xl overflow-auto flex flex-col items-center justify-center px-[5%] xl:px-[10%] 2xl:px-[15%] py-8">
        <ChallengeCard onLaunch={onLaunch} />
      </main>
    </div>
  )
}

// ─── IDE Page Components ───

const activityIcons = [
  { icon: Files, label: 'Explorer' },
  { icon: Search, label: 'Search' },
  { icon: GitBranch, label: 'Source Control' },
  { icon: Bug, label: 'Run and Debug' },
  { icon: Blocks, label: 'Extensions' },
  { icon: Puzzle, label: 'Testing' },
]

function ActivityBar() {
  return (
    <div className="w-12 bg-[#333] flex flex-col items-center pt-2 pb-2 shrink-0 rounded-bl-2xl rounded-tl-2xl justify-between">
      <div className="flex flex-col items-center gap-1">
        {activityIcons.map(({ icon: Icon, label }) => (
          <button key={label} title={label}
            className={`w-12 h-10 flex items-center justify-center hover:bg-white/10 transition-colors ${label === 'Explorer' ? 'border-l-2 border-white' : 'border-l-2 border-transparent'}`}>
            <Icon className="w-5 h-5 text-[#999]" strokeWidth={1.6} />
          </button>
        ))}
      </div>
      <button title="Settings" className="w-12 h-10 flex items-center justify-center hover:bg-white/10 transition-colors">
        <Settings className="w-5 h-5 text-[#999]" strokeWidth={1.6} />
      </button>
    </div>
  )
}

function ExplorerSidebar() {
  return (
    <div className="w-[220px] bg-[#252526] border-r border-[#3e3e42] flex flex-col shrink-0 text-[13px] font-['Inter',sans-serif]">
      <div className="h-9 flex items-center justify-between px-4 shrink-0">
        <span className="text-[11px] text-[#99a1af] uppercase tracking-wider font-medium">Explorer</span>
        <span className="text-[#99a1af] text-lg leading-none cursor-pointer">···</span>
      </div>
      <div className="flex-1 overflow-auto">
        <button className="flex items-center gap-1 h-7 pl-2 w-full text-left text-white hover:bg-[#2a2d2e]">
          <ChevronDown className="w-4 h-4 text-[#ccc]" strokeWidth={1.5} /><span className="text-sm font-medium">LEARN</span>
        </button>
        <div className="flex items-center gap-2 h-7 pl-8 w-full bg-[#37373d] text-white rounded">
          <span className="text-xs">📄</span><span className="text-sm">index.html</span>
        </div>
      </div>
      <div className="border-t border-[#3e3e42]">
        <button className="flex items-center gap-1 h-9 pl-4 w-full text-left">
          <ChevronDown className="w-3 h-3 text-[#99a1af]" strokeWidth={2} />
          <span className="text-[11px] text-[#99a1af] uppercase tracking-wider font-medium">Outline</span>
        </button>
        <div className="flex flex-col gap-0.5 px-4 pb-2">
          <div className="flex items-center gap-2 h-7 pl-2 text-[#d1d5dc] rounded hover:bg-[#2a2d2e]">
            <span className="text-xs text-[#d1d5dc] font-mono">{'{}'}</span><span className="text-sm">header</span>
          </div>
          <div className="flex items-center gap-2 h-7 pl-2 text-[#d1d5dc] rounded hover:bg-[#2a2d2e]">
            <span className="text-xs text-[#d1d5dc] font-mono">{'{}'}</span><span className="text-sm">nav</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[#3e3e42]">
        <button className="flex items-center gap-1 h-9 pl-4 w-full text-left">
          <ChevronRight className="w-3 h-3 text-[#99a1af]" strokeWidth={2} />
          <span className="text-[11px] text-[#99a1af] uppercase tracking-wider font-medium">Timeline</span>
        </button>
      </div>
    </div>
  )
}

// ─── Code Editor with Selection ───

const codeLines: { num: number; content: React.ReactNode }[] = [
  { num: 1, content: <><span className="text-[#569cd6]">{'<header>'}</span><span className="text-[#d4d4d4]">June Chang</span><span className="text-[#569cd6]">{'</header>'}</span></> },
  { num: 2, content: <span className="text-[#569cd6]">{'<nav>'}</span> },
  { num: 3, content: <><span className="text-[#d4d4d4]">{'  '}</span><span className="text-[#569cd6]">{'<a '}</span><span className="text-[#9cdcfe]">href</span><span className="text-[#d4d4d4]">=</span><span className="text-[#ce9178]">{'"#"'}</span><span className="text-[#d4d4d4]">{'>Home'}</span><span className="text-[#569cd6]">{'</a>'}</span></> },
  { num: 4, content: <><span className="text-[#d4d4d4]">{'  '}</span><span className="text-[#569cd6]">{'<a '}</span><span className="text-[#9cdcfe]">href</span><span className="text-[#d4d4d4]">=</span><span className="text-[#ce9178]">{'"#"'}</span><span className="text-[#d4d4d4]">{'>Projects'}</span><span className="text-[#569cd6]">{'</a>'}</span></> },
  { num: 5, content: <><span className="text-[#d4d4d4]">{'  '}</span><span className="text-[#569cd6]">{'<a '}</span><span className="text-[#9cdcfe]">href</span><span className="text-[#d4d4d4]">=</span><span className="text-[#ce9178]">{'"#"'}</span><span className="text-[#d4d4d4]">{'>Contact'}</span><span className="text-[#569cd6]">{'</a>'}</span></> },
  { num: 6, content: <span className="text-[#569cd6]">{'</nav>'}</span> },
  { num: 7, content: null },
  { num: 8, content: <span className="text-[#569cd6]">{'<main>'}</span> },
  { num: 9, content: <><span className="text-[#d4d4d4]">{'  '}</span><span className="text-[#569cd6]">{'<section>'}</span></> },
  { num: 10, content: <><span className="text-[#d4d4d4]">{'    '}</span><span className="text-[#569cd6]">{'<h2>'}</span><span className="text-[#d4d4d4]">About Me</span><span className="text-[#569cd6]">{'</h2>'}</span></> },
  { num: 11, content: <><span className="text-[#d4d4d4]">{'    '}</span><span className="text-[#569cd6]">{'<p>'}</span><span className="text-[#d4d4d4]">This is my portfolio page.</span><span className="text-[#569cd6]">{'</p>'}</span></> },
  { num: 12, content: <><span className="text-[#d4d4d4]">{'  '}</span><span className="text-[#569cd6]">{'</section>'}</span></> },
  { num: 13, content: null },
  { num: 14, content: <><span className="text-[#d4d4d4]">{'  '}</span><span className="text-[#569cd6]">{'<aside>'}</span></> },
  { num: 15, content: <><span className="text-[#d4d4d4]">{'    '}</span><span className="text-[#569cd6]">{'<h3>'}</span><span className="text-[#d4d4d4]">Skills</span><span className="text-[#569cd6]">{'</h3>'}</span></> },
  { num: 16, content: <><span className="text-[#d4d4d4]">{'    '}</span><span className="text-[#569cd6]">{'<p>'}</span><span className="text-[#d4d4d4]">HTML, CSS, JavaScript</span><span className="text-[#569cd6]">{'</p>'}</span></> },
  { num: 17, content: <><span className="text-[#d4d4d4]">{'  '}</span><span className="text-[#569cd6]">{'</aside>'}</span></> },
  { num: 18, content: <span className="text-[#569cd6]">{'</main>'}</span> },
  { num: 19, content: null },
  { num: 20, content: <><span className="text-[#569cd6]">{'<footer>'}</span><span className="text-[#d4d4d4]">© June</span><span className="text-[#569cd6]">{'</footer>'}</span></> },
]

function CodeEditor({ selectedLine, onSelectLine, onAskAI }: {
  selectedLine: number | null
  onSelectLine: (line: number | null) => void
  onAskAI: () => void
}) {
  return (
    <div className="flex-1 flex flex-col min-w-0 font-['Inter',sans-serif]">
      <div className="h-9 bg-[#3c3c3c] border-b border-[#3e3e42] flex items-center px-2 shrink-0">
        {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map((m) => (
          <button key={m} className="px-2.5 h-8 text-[#d1d5dc] text-sm hover:bg-[#505050] rounded transition-colors">{m}</button>
        ))}
      </div>
      <div className="h-9 bg-[#252526] border-b border-[#3e3e42] flex items-center shrink-0">
        <div className="h-full bg-[#1e1e1e] border-r border-[#3e3e42] flex items-center gap-2 px-3 text-white text-[13px]">
          <span className="text-xs">📄</span><span>index.html</span>
          <button className="ml-1 text-[#99a1af] hover:text-white text-xs"><X className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <div className="flex-1 bg-[#1e1e1e] overflow-auto font-['Menlo','Monaco','Courier_New',monospace] text-sm leading-6 relative">
        <div className="flex pt-2">
          <div className="w-10 text-right pr-3 select-none shrink-0">
            {codeLines.map((l) => (
              <div key={l.num} className="text-[#4a5565] text-xs leading-6">{l.num}</div>
            ))}
          </div>
          <div className="flex-1 pl-2 relative">
            {codeLines.map((l) => (
              <div
                key={l.num}
                onClick={() => onSelectLine(selectedLine === l.num ? null : l.num)}
                className={`leading-6 whitespace-pre text-sm cursor-pointer relative ${selectedLine === l.num ? 'bg-[#264f78]/50' : 'hover:bg-white/5'}`}
              >
                {l.content ?? '\u00A0'}
              </div>
            ))}
          </div>
        </div>

        {/* Ask AI floating button */}
        {selectedLine && (
          <div
            className="absolute z-10 animate-hint-in"
            style={{ top: `${8 + (selectedLine - 1) * 24 - 36}px`, left: '140px' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onAskAI() }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a2e] text-white text-xs font-medium rounded-full shadow-lg hover:bg-[#2a2a4e] transition-colors border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              Ask AI
            </button>
          </div>
        )}
      </div>
      <div className="h-6 bg-[#007acc] flex items-center justify-between px-3 text-white text-[11px] font-['Inter',sans-serif] shrink-0">
        <div className="flex items-center gap-3">
          <span>🔌</span><span>⚠️ 0</span><span>⛔ 0</span><span>🔨</span><span>Open Development Server</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ln 2, Col 6</span><span>Spaces: 4</span><span>UTF-8</span><span>LF</span><span>HTML</span><span>🔔 Go Live</span><span>Layout: U.S.</span><span>Prettier</span>
        </div>
      </div>
    </div>
  )
}

// ─── Instructions Panel ───

function HintCard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="animate-hint-in bg-[#f0f6ff] rounded-lg px-4 py-3 my-2">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-base font-semibold text-text-dark tracking-[-0.05px] leading-5">Hint</h4>
        <button onClick={onDismiss} className="p-0.5 -mt-0.5 -mr-1 rounded hover:bg-black/5 transition-colors">
          <X className="w-4 h-4 text-text-muted" />
        </button>
      </div>
      <p className="text-sm text-text-dark leading-5">
        Right now your links are stacked vertically. How can you make them appear in a row?
        <br />Consider using <code className="bg-white/60 px-1 py-0.5 rounded text-[13px] font-mono">display: flex</code> on{' '}
        <code className="bg-white/60 px-1 py-0.5 rounded text-[13px] font-mono">{'<nav>'}</code> and adding spacing between items.
      </p>
      <button className="flex items-center gap-1.5 mt-3 text-primary font-semibold text-base leading-6 tracking-[1px] hover:underline">
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <defs>
            <linearGradient id="hint-sparkle" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" /><stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <path d="M7 2L8.5 6.5L13 8L8.5 9.5L7 14L5.5 9.5L1 8L5.5 6.5L7 2Z" fill="url(#hint-sparkle)" />
          <path d="M12 0.5L12.75 2.75L15 3.5L12.75 4.25L12 6.5L11.25 4.25L9 3.5L11.25 2.75L12 0.5Z" fill="url(#hint-sparkle)" />
        </svg>
        Tell me more
      </button>
    </div>
  )
}

function InstructionsPanel({ onCheck }: { onCheck: () => void }) {
  const [showHint, setShowHint] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000)
    return () => clearTimeout(timer)
  }, [])
  const tasks = [
    { title: '1. Header Styling', items: ['Set a background color for the <header>', 'Make the text bold and centered', 'Add padding (at least 16px'] },
    { title: '2. Navigation Bar', items: ['Style the <nav> with a horizontal layout', 'Add spacing between links', 'Change link color and remove underline'] },
    { title: '3. Main Content', items: ['Add margin around the <main> section', 'Style the paragraph text (font size, line height)', 'Add a background color for the section'] },
    { title: '4. Aside (Skills Section)', items: ['Add a border or card-style background', 'Add padding and spacing', 'Make it visually distinct from the main section'] },
  ]

  const handleCheck = () => {
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      onCheck()
    }, 1200)
  }

  return (
    <div className="w-[400px] bg-white border-l border-[#dae1ed] flex flex-col shrink-0">
      <div className="px-4 pt-4 pb-3 shrink-0">
        <h2 className="text-base font-semibold text-text-dark tracking-[0.16px] leading-6">Instructions</h2>
        <p className="text-sm text-text-muted leading-5">3 of 5 completed</p>
      </div>
      <div className="px-4 pb-2 shrink-0">
        <h3 className="text-xl font-semibold text-text-dark tracking-[-0.06px] leading-6">Task 2: Style Your Page with CSS</h3>
      </div>
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="flex flex-col gap-4">
          {tasks.map((task, idx) => (
            <div key={task.title}>
              <p className="text-base text-text-dark leading-6 mb-1">{task.title}</p>
              <ul className="list-disc pl-7 text-base text-text-dark leading-6 space-y-0.5">
                {task.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              {idx === 1 && showHint && <HintCard onDismiss={() => setShowHint(false)} />}
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-3 flex items-center justify-end shrink-0 border-t border-[#eee]">
        <button
          onClick={handleCheck}
          disabled={isChecking}
          className="px-8 py-2.5 border-2 border-primary text-primary font-semibold text-base rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {isChecking && <Loader2 className="w-4 h-4 animate-spin" />}
          {isChecking ? 'Checking...' : 'Check'}
        </button>
      </div>
    </div>
  )
}

// ─── AI Coach Panel ───

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-2">
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

function VideoCard() {
  return (
    <div className="border border-border rounded-lg overflow-hidden flex">
      <div className="w-[74px] bg-purple-50 flex items-center justify-center shrink-0">
        <Video className="w-6 h-6 text-purple-400" />
      </div>
      <div className="flex-1 py-2 px-3">
        <p className="text-base font-semibold text-text-dark tracking-[-0.05px] leading-5">Create link</p>
        <p className="text-sm text-[#636363] leading-5">Video • 01:23-4:12</p>
      </div>
    </div>
  )
}

function HTMLCodeBlock() {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-2">
        <p className="text-base font-semibold text-text-dark leading-5 mb-1">HTML</p>
        <div className="text-sm leading-5 font-mono">
          <p>
            <span className="text-[#0048b0]">{'<a '}</span>
            <span className="text-[#af8001]">href</span>=
            <span className="text-[#276a1a]">"#section1"</span>
            <span className="text-text-dark">{'>Go to Section 1'}</span>
            <span className="text-[#0048b0]">{'</a>'}</span>
          </p>
          <p>
            <span className="text-[#0048b0]">{'<h2 '}</span>
            <span className="text-[#af8001]">href</span>
            <span className="text-[#7d166a]">=</span>
            <span className="text-[#276a1a]">"section1"</span>
            <span className="text-text-dark">{'>Section 1'}</span>
            <span className="text-[#0048b0]">{'</h2>'}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function AICoachPanel({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState(0)
  const [followUpSent, setFollowUpSent] = useState(false)
  const [followUpPhase, setFollowUpPhase] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setPhase(1), 800))
    timers.push(setTimeout(() => setPhase(2), 1600))
    timers.push(setTimeout(() => setPhase(3), 2400))
    timers.push(setTimeout(() => setPhase(4), 3200))
    timers.push(setTimeout(() => setPhase(5), 3800))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!followUpSent) return
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setFollowUpPhase(1), 600))
    timers.push(setTimeout(() => setFollowUpPhase(2), 1400))
    timers.push(setTimeout(() => setFollowUpPhase(3), 2200))
    timers.push(setTimeout(() => setFollowUpPhase(4), 2800))
    return () => timers.forEach(clearTimeout)
  }, [followUpSent])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [phase, followUpPhase, followUpSent])

  const handleSend = () => {
    if (!followUpSent && inputValue.trim()) {
      setFollowUpSent(true)
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-[488px] bg-white border-l border-[#dae1ed] flex flex-col shrink-0 relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 shrink-0 border-b border-[#f0f0f0]">
        <div className="flex items-center shrink-0" aria-hidden>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="ai-coach-sparkle-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" /><stop offset="1" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <path d="M10 3L12.5 9.5L19 12L12.5 14.5L10 21L7.5 14.5L1 12L7.5 9.5L10 3Z" fill="url(#ai-coach-sparkle-grad)" />
            <path d="M18 1L19.125 4.125L22.25 5.25L19.125 6.375L18 9.5L16.875 6.375L13.75 5.25L16.875 4.125L18 1Z" fill="url(#ai-coach-sparkle-grad)" />
          </svg>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors"><Plus className="w-5 h-5 text-text-muted" strokeWidth={1.8} /></button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors"><Settings className="w-5 h-5 text-text-muted" strokeWidth={1.8} /></button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors"><X className="w-5 h-5 text-text-muted" strokeWidth={1.8} /></button>
        </div>
      </div>

      {/* Chat messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto px-4 pt-6 pb-4">
        <div className="flex flex-col gap-4">

          {/* Phase 0: Typing */}
          {phase === 0 && <TypingIndicator />}

          {/* Phase 1+: First message */}
          {phase >= 1 && (
            <p className="text-base text-[#1e2229] leading-6 animate-hint-in">
              It looks like you might be stuck on how links work in HTML.
              <br />Let's break it down quickly 👇
            </p>
          )}

          {/* Phase 2+: Video card */}
          {phase >= 2 && (
            <div className="animate-hint-in"><VideoCard /></div>
          )}

          {/* Phase 3+: Code explanation */}
          {phase >= 3 && (
            <div className="animate-hint-in text-base text-[#1e2229] leading-6">
              <p>
                In <span className="text-[#0048b0]">{'<a'}</span>{' '}
                <span className="text-[#ff6308]">href</span>
                <span className="text-[#f05bd5]">=</span>
                <span className="text-[#79a60d]">"#"</span>
                <span className="text-[#0048b0]">{'>'}</span>, the href tells the browser where the link should go.
              </p>
              <ul className="list-disc pl-6 mt-1">
                <li># means "stay on this page"</li>
                <li>It's often used as a placeholder</li>
              </ul>
            </div>
          )}

          {/* Phase 4+: Context message */}
          {phase >= 4 && (
            <p className="text-base text-[#1e2229] leading-6 animate-hint-in">
              For this task, you don't need real links yet — you just need to structure the navigation. So using # is totally fine 👍
            </p>
          )}

          {/* Phase 5+: Next step */}
          {phase >= 5 && (
            <p className="text-base text-[#1e2229] leading-6 animate-hint-in">
              Next step: Try styling your {'<nav>'} so the links appear in a row.
            </p>
          )}

          {/* Follow-up conversation */}
          {followUpSent && (
            <>
              {/* User message */}
              <div className="flex justify-end animate-hint-in">
                <div className="bg-purple-100/60 px-3 py-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg max-w-[80%]">
                  <p className="text-base text-text-dark leading-6">What is hashtag?</p>
                </div>
              </div>

              {/* AI typing then response */}
              {followUpPhase === 0 && <TypingIndicator />}

              {followUpPhase >= 1 && (
                <div className="text-base text-[#1e2229] leading-6 animate-hint-in">
                  <p>The # (hashtag) is used to link to a specific part of the same page.</p>
                  <p>But for now, you can keep using # as a placeholder while building your layout.</p>
                </div>
              )}

              {followUpPhase >= 2 && (
                <div className="animate-hint-in"><HTMLCodeBlock /></div>
              )}

              {followUpPhase >= 3 && (
                <div className="text-base text-[#1e2229] leading-6 animate-hint-in">
                  <p>The # (hashtag) is used to link to a specific part of the same page.</p>
                  <p>But for now, you can keep using # as a placeholder while building your layout.</p>
                </div>
              )}

              {followUpPhase >= 4 && (
                <div className="flex justify-end gap-1 animate-hint-in">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ThumbsUp className="w-4 h-4 text-text-muted" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ThumbsDown className="w-4 h-4 text-text-muted" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Input box */}
      <div className="px-4 pt-2 pb-3 shrink-0">
        <div className="bg-page-bg rounded-lg p-2 flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-black/5 transition-colors shrink-0">
            <Plus className="w-5 h-5 text-text-muted" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything"
            disabled={followUpSent}
            className="flex-1 bg-transparent text-base text-text-dark placeholder:text-text-muted outline-none disabled:opacity-50"
          />
          <button className="p-1.5 rounded hover:bg-black/5 transition-colors shrink-0">
            <Mic className="w-5 h-5 text-text-muted" />
          </button>
          <button
            onClick={handleSend}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
          >
            <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-xs text-[#404b61] leading-5 mt-1.5">
          Powered by AI - check for mistakes and don't share sensitive info. Data is used in accordance with{' '}
          <span className="underline">Coursera's Privacy Notice</span>.
        </p>
      </div>
    </div>
  )
}

// ─── Right Panel Tabs ───

function RightNavTabs({ activePanel, onSwitch }: { activePanel: RightPanel; onSwitch: (p: RightPanel) => void }) {
  const isGuideActive = activePanel === 'instructions'
  return (
    <div className="w-[88px] bg-white border-l border-[#dae1ed] flex flex-col items-center pt-2 shrink-0 rounded-tr-2xl rounded-br-2xl">
      <button
        onClick={() => onSwitch('instructions')}
        className={`w-[72px] h-16 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${isGuideActive ? 'bg-light-blue' : 'hover:bg-gray-50'}`}
      >
        <ClipboardList className={`w-5 h-5 ${isGuideActive ? 'text-text-dark' : 'text-text-muted'}`} strokeWidth={1.8} />
        <span className={`text-xs font-semibold ${isGuideActive ? 'text-text-dark' : 'text-text-muted'}`}>Guide</span>
      </button>
      <button
        onClick={() => onSwitch('coach')}
        className={`w-[72px] h-16 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors mt-2 ${activePanel === 'coach' ? 'bg-light-blue' : 'hover:bg-gray-50'}`}
      >
        <FileText className={`w-5 h-5 ${activePanel === 'coach' ? 'text-text-dark' : 'text-text-muted'}`} strokeWidth={1.8} />
        <span className={`text-xs font-semibold ${activePanel === 'coach' ? 'text-text-dark' : 'text-text-muted'}`}>Files</span>
      </button>
    </div>
  )
}

// ─── IDE Page ───

function IDEPage({ onFinish: finishPractice, rightPanel, setRightPanel }: {
  onFinish: () => void
  rightPanel: RightPanel
  setRightPanel: (p: RightPanel) => void
}) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null)

  const handleAskAI = () => {
    setSelectedLine(null)
    setRightPanel('coach')
  }

  const handleCheck = () => {
    finishPractice()
  }

  return (
    <div className="flex flex-1 min-h-0 bg-page-bg px-4 pb-4 gap-4">
      <CourseSidebar />
      <div className="flex flex-1 min-h-0 overflow-hidden rounded-2xl">
        <ActivityBar />
        <ExplorerSidebar />
        <CodeEditor
          selectedLine={selectedLine}
          onSelectLine={setSelectedLine}
          onAskAI={handleAskAI}
        />
        {rightPanel === 'coach' ? (
          <AICoachPanel onClose={() => setRightPanel('instructions')} />
        ) : (
          <>
            <InstructionsPanel onCheck={handleCheck} />
            <RightNavTabs activePanel={rightPanel} onSwitch={setRightPanel} />
          </>
        )}
      </div>
    </div>
  )
}

// ─── Practice Complete Page ───

function PracticeCompletePage({ onFinishSession }: { onFinishSession: () => void }) {
  const wellDone = [
    'Describe upstream & downstream roles in data pipeline',
    'Distinguish correlation & causation',
  ]
  const focusOn = [
    "Audit teammate's dataset & hand off with README & SLA",
    'Distinguish correlation & causation',
  ]

  return (
    <div className="flex flex-1 gap-4 px-4 pb-4 min-h-0 relative">
      {/* Left sidebar */}
      <div className="w-[52px] shrink-0 bg-white rounded-2xl flex flex-col items-center pt-4 h-full">
        <button className="p-1.5 rounded hover:bg-black/5 transition-colors"><PanelLeft className="w-5 h-5 text-text-muted" /></button>
      </div>

      {/* Main content card */}
      <main className="flex-1 bg-white rounded-2xl overflow-hidden min-h-0 min-w-0">
        <div className="h-full overflow-auto">
          {/* Hero — #f0f6ff bg, rounded-lg */}
          <div className="bg-[#f0f6ff] rounded-lg relative overflow-clip mx-5 mt-5">
            <div className="max-w-[770px] mx-auto flex items-center justify-between px-4 py-10 md:py-12">
              <div className="flex flex-col gap-1 relative z-10 max-w-[499px] min-w-0">
                <h1 className="text-[36px] font-semibold text-text-dark leading-[42px] tracking-[-0.5px]">
                  Practice complete!
                </h1>
                <div className="flex items-center my-2">
                  <img src="/xp-icon.png" alt="" className="w-6 h-6 shrink-0" />
                  <span className="text-xl font-semibold text-xp-orange tracking-[-0.06px] leading-6">+ 30XP</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={onFinishSession}
                    className="bg-[#0056D2] hover:bg-primary-hover text-white font-semibold text-base leading-6 tracking-[1px] px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    Finish session
                    <ArrowRight className="w-5 h-5" strokeWidth={2} />
                  </button>
                  <button className="text-primary font-semibold text-base leading-6 hover:underline transition-colors">
                    Extend today's session
                  </button>
                </div>
              </div>
              <div className="hidden md:block w-[289px] h-[195px] shrink-0 ml-6">
                <img src="/practice-done.png" alt="" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="max-w-[770px] mx-auto px-4 py-8">
            <div className="flex flex-col gap-8">
            {/* What you did well */}
            <section className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-black tracking-[-0.06px] leading-6">What you did well</h3>
              <ul className="flex flex-col gap-2">
                {wellDone.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CircleCheck className="w-4 h-4 text-text-dark shrink-0" strokeWidth={2} />
                    <span className="text-base text-text-dark leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Skill gap section */}
            <section className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-black tracking-[-0.06px] leading-6">Opportunity to dive into your skill gap</h3>

              {/* Skill gap card */}
              <div className="rounded-2xl border border-[#dae1ed] p-4">
                <div className="flex flex-col gap-4">
                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-semibold text-text-dark tracking-[-0.048px] leading-5">Product development lifecycle</p>
                    <div className="text-sm text-text-dark leading-5">
                      <p>Based on your recent work, it seems that you are less comfortable working with large data sets.</p>
                      <p>It might help you to spend a bit of time learning this core skill before continuing in your path.</p>
                    </div>
                  </div>

                  {/* Recommended course */}
                  <div className="bg-[#f0f6ff] rounded-lg p-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-[88px] h-[56px] rounded-xl overflow-hidden shrink-0 ring-1 ring-black/[0.06]">
                          <img src="/accessing-databases-python-thumb.png" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-base text-text-dark tracking-[-0.048px] leading-5">Accessing Databases with Python</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-text-muted leading-5">Video</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-text-muted" strokeWidth={1.8} />
                              <span className="text-sm text-text-muted leading-5">4m</span>
                            </div>
                            <div className="flex h-6 items-center gap-1">
                              <div className="box-border flex size-6 shrink-0 items-center justify-center overflow-hidden rounded border border-[#e8eef7] bg-white p-[2px]">
                                <img
                                  src="/ibm-partner-mark.png"
                                  alt=""
                                  className="max-h-full max-w-full rounded-[2px] object-cover"
                                />
                              </div>
                              <span className="text-sm font-semibold leading-5 text-text-muted">IBM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-[#FFFFFF] border-2 border-primary text-primary font-semibold text-sm leading-5 tracking-[1px] rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0">
                        Add to my learning plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        </div>
      </main>

    </div>
  )
}

// ─── Welcome Back Page (Prepare; MC BG from Figma node 398:32918) ───

/** Figma Proactive-AI-Learning-Vision — assistant top bar on welcome main canvas (node 358:14741) */
function WelcomeAssistantNavBar() {
  return (
    <header
      className="z-10 flex h-14 shrink-0 items-center justify-between rounded-t-2xl border-b border-white/50 bg-white/80 px-4 backdrop-blur-md"
      role="banner"
    >
      <div className="flex shrink-0 items-center" aria-hidden>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient
              id="welcome-assistant-nav-sparkle"
              x1="2"
              y1="2"
              x2="22"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <path
            d="M10 3L12.5 9.5L19 12L12.5 14.5L10 21L7.5 14.5L1 12L7.5 9.5L10 3Z"
            fill="url(#welcome-assistant-nav-sparkle)"
          />
          <path
            d="M18 1L19.125 4.125L22.25 5.25L19.125 6.375L18 9.5L16.875 6.375L13.75 5.25L16.875 4.125L18 1Z"
            fill="url(#welcome-assistant-nav-sparkle)"
          />
        </svg>
      </div>
      <div className="flex items-center gap-0.5">
        <button type="button" className="rounded-lg p-2 transition-colors hover:bg-gray-100" aria-label="New chat">
          <Plus className="h-5 w-5 text-text-muted" strokeWidth={1.8} />
        </button>
        <button type="button" className="rounded-lg p-2 transition-colors hover:bg-gray-100" aria-label="Settings">
          <Settings className="h-5 w-5 text-text-muted" strokeWidth={1.8} />
        </button>
        <button type="button" className="rounded-lg p-2 transition-colors hover:bg-gray-100" aria-label="Expand">
          <Expand className="h-5 w-5 text-text-muted" strokeWidth={1.8} />
        </button>
        <button type="button" className="rounded-lg p-2 transition-colors hover:bg-gray-100" aria-label="Close">
          <X className="h-5 w-5 text-text-muted" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  )
}

function WelcomeChipSparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="welcome-chip-sparkle" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path d="M10 3L12.5 9.5L19 12L12.5 14.5L10 21L7.5 14.5L1 12L7.5 9.5L10 3Z" fill="url(#welcome-chip-sparkle)" />
      <path d="M18 1L19.125 4.125L22.25 5.25L19.125 6.375L18 9.5L16.875 6.375L13.75 5.25L16.875 4.125L18 1Z" fill="url(#welcome-chip-sparkle)" />
    </svg>
  )
}

const SKILL_SHARE_PROMPT = 'Take a self assessment for better personalization'

const RECAP_USER_PROMPT = 'Recap what I learned from last session'

const recapCards: { front: string; back: string }[] = [
  {
    front: "I can clean and reformat messy datasets to prepare them for analysis.",
    back: "Use pandas: df['date'] = pd.to_datetime(df['date']) and df['category'].str.strip().str.lower() to normalize values before analysis.",
  },
  {
    front: "I know how to write a SQL SELECT query to retrieve specific columns from a table.",
    back: "SELECT column1, column2 FROM table_name; -- specify only the columns you need rather than using SELECT *.",
  },
  {
    front: "I understand how to use WHERE to filter rows based on a condition.",
    back: "SELECT * FROM orders WHERE status = 'shipped' AND amount > 100; -- WHERE evaluates each row against the condition.",
  },
  {
    front: "I can use GROUP BY with aggregate functions like COUNT and AVG.",
    back: "SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_sal FROM employees GROUP BY department;",
  },
  {
    front: "I understand the difference between INNER JOIN and LEFT JOIN.",
    back: "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table, with NULLs where there is no match on the right.",
  },
  {
    front: "I can identify and handle NULL values in SQL queries.",
    back: "Use IS NULL / IS NOT NULL in WHERE, and COALESCE(column, default_value) to substitute a fallback when a value is missing.",
  },
  {
    front: "I know when to use HAVING instead of WHERE.",
    back: "WHERE filters rows before grouping; HAVING filters groups after GROUP BY. e.g. HAVING COUNT(*) > 5 keeps only groups with more than 5 rows.",
  },
  {
    front: "I can explain what a primary key and a foreign key are.",
    back: "A primary key uniquely identifies each row in a table. A foreign key in one table references the primary key of another, creating a relationship between them.",
  },
  {
    front: "I can sort query results and limit the number of rows returned.",
    back: "SELECT * FROM products ORDER BY price DESC LIMIT 10; -- ORDER BY sorts ascending by default (DESC for reverse), LIMIT caps the number of rows returned.",
  },
]

function QuickRecapFlashcards() {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [idx])

  const card = recapCards[idx]
  const total = recapCards.length

  return (
    <div className="w-full max-w-full animate-hint-in rounded-2xl border border-[#e4e9f0] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-lg font-bold tracking-[-0.02em] text-text-dark sm:text-xl">Quick Recap</h3>
          <p className="mt-1 text-sm leading-5 text-text-muted">
            Take a moment to review what you&apos;ve learned to help it stick
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 self-start rounded-lg border border-border bg-[#fafbfc] px-1 py-0.5 text-sm text-text-muted">
          <button
            type="button"
            className="rounded p-1.5 transition-colors hover:bg-black/[0.06] disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous card"
            disabled={idx <= 0}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <span className="min-w-[3rem] select-none text-center text-xs font-medium tabular-nums text-text-dark sm:text-sm">
            {idx + 1}/{total}
          </span>
          <button
            type="button"
            className="rounded p-1.5 transition-colors hover:bg-black/[0.06] disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next card"
            disabled={idx >= total - 1}
            onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label={flipped ? 'Show question' : 'Show answer'}
      >
        <div className="relative min-h-[220px] sm:min-h-[240px]" style={{ perspective: '1000px' }}>
          <div
            className="relative h-full min-h-[220px] w-full transition-transform duration-500 ease-out sm:min-h-[240px]"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-[#f8fafc] px-5 py-8 sm:px-8"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <p className="text-center text-lg font-bold leading-7 tracking-[-0.02em] text-text-dark sm:text-xl sm:leading-8">
                {card.front}
              </p>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl bg-[#f0f6ff] px-5 py-8 sm:px-8"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <p className="text-center text-base font-medium leading-7 text-text-dark sm:text-lg sm:leading-8">
                {card.back}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-primary transition-colors hover:text-primary-hover">
          Click to Flip
        </p>
      </button>
    </div>
  )
}

const assessmentOptionsQ1 = [
  { label: 'New to this.', desc: "I'm still figuring out the basic syntax." },
  { label: "I've seen this.", desc: "I can handle SELECT and WHERE, but a quick refresh wouldn't hurt." },
  { label: 'I know this well.', desc: "I'm a pro at basics. Skip the intro and let's get to work." },
]

const assessmentOptionsQ2 = [
  { label: 'Not yet.', desc: "I haven't tried grouping data on my own." },
  { label: 'Getting there.', desc: "I understand GROUP BY but still mix up HAVING and WHERE." },
  { label: 'Solid on this.', desc: "I can group data and filter aggregates confidently." },
]

function SkillAssessmentCard({
  options,
  onAnswer,
  onSkip,
}: {
  options: { label: string; desc: string }[]
  onAnswer: (text: string) => void
  onSkip: () => void
}) {
  return (
    <div className="w-full animate-hint-in rounded-2xl border border-[#dae1ed] bg-white shadow-[0px_4px_7px_1px_rgba(0,0,0,0.10)] overflow-hidden">
      <div className="px-4 pt-5 pb-2">
        <button type="button" onClick={onSkip} className="text-sm font-semibold text-primary hover:underline">
          Skip For Now
        </button>
      </div>
      <div className="flex flex-col px-2 pb-4">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onAnswer(`${opt.label} ${opt.desc}`)}
            className="flex items-center gap-3 px-2 py-3 border-b border-[#dae1ed] last:border-b-0 text-left hover:bg-[#f2f5fa] transition-colors rounded-sm"
          >
            <div className="w-[25px] h-[25px] shrink-0 rounded-[4px] bg-[#f2f5fa] flex items-center justify-center">
              <span className="text-xs font-semibold text-text-dark">{i + 1}</span>
            </div>
            <p className="text-base text-text-dark leading-6">
              <span className="font-bold">{opt.label}</span>{' '}
              <span className="font-normal">{opt.desc}</span>
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

function PersonalizedPlanCard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm animate-hint-in">
      <div className="flex flex-col gap-1 bg-[#f2f5fa] px-6 py-6 sm:px-8">
        <span className="self-start rounded-full bg-white/80 border border-border px-3 py-1 text-sm font-medium text-text-dark leading-5">Updated plan</span>
        <h2 className="mt-2 text-xl font-semibold text-black leading-7 tracking-[-0.15px]">
          Your personalized learning plan
        </h2>
      </div>
      <div className="flex flex-col gap-6 border-t border-border bg-white px-6 py-6 sm:px-8">
        <div className="flex gap-2 items-start">
          <Target className="w-5 h-5 text-text-muted shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-xs text-text-muted leading-4">Skill gap you will close</p>
            <p className="text-sm text-text-dark leading-5">
              Based on your self-assessment, I added two targeted practice items at the start of today&apos;s block to strengthen your filtering and aggregation fundamentals before the JOIN content.
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <Award className="w-5 h-5 text-text-muted shrink-0 mt-0.5" strokeWidth={1.75} />
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-xs text-text-muted leading-4">Skills you will learn and work on</p>
            <p className="text-[16px] font-semibold leading-6 text-text-dark">SQL filtering & aggregation fundamentals</p>
            <p className="text-sm font-normal text-text-dark leading-5">
              We&apos;ll reinforce WHERE clauses and aggregate functions (COUNT, SUM, AVG) with hands-on practice, then move into advanced JOINs and large dataset analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

type WelcomeStreamEntry =
  | { id: string; type: 'user_bubble'; text: string }
  | { id: string; type: 'assessment_user_bubble'; text: string }
  | { id: string; type: 'typing' }
  | { id: string; type: 'ai_bubble'; text: string }
  | { id: string; type: 'skill_assessment' }
  | { id: string; type: 'personalized_plan' }
  | { id: string; type: 'flashcards' }

function streamEntryId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/** Insert right after the entry with `parentId` so delayed replies stay grouped with their user turn. */
function insertWelcomeEntryAfterParent(
  items: WelcomeStreamEntry[],
  parentId: string,
  entry: WelcomeStreamEntry,
): WelcomeStreamEntry[] {
  const i = items.findIndex((e) => e.id === parentId)
  if (i === -1) return [...items, entry]
  return [...items.slice(0, i + 1), entry, ...items.slice(i + 1)]
}

/** Last index of `type` in `items`, or -1. */
function lastIndexOfType(items: WelcomeStreamEntry[], type: WelcomeStreamEntry['type']): number {
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].type === type) return i
  }
  return -1
}

/**
 * Share turn must appear below any Quick Recap flashcards (recap reply).
 * If flashcards already exist, insert the share user bubble after the last flashcard block.
 * Otherwise append (recap flow will insert flash after recap user → [recap, flash, share]).
 */
function insertShareUserBubble(items: WelcomeStreamEntry[], shareBubble: WelcomeStreamEntry): WelcomeStreamEntry[] {
  const flashIdx = lastIndexOfType(items, 'flashcards')
  if (flashIdx >= 0) {
    return [...items.slice(0, flashIdx + 1), shareBubble, ...items.slice(flashIdx + 1)]
  }
  return [...items, shareBubble]
}

function WelcomeBackPage({
  onContinue,
  learningPathOpen,
  onLearningPathOpen,
  onLearningPathClose,
}: {
  onContinue: () => void
  learningPathOpen: boolean
  onLearningPathOpen: () => void
  onLearningPathClose: () => void
}) {
  const [selectedBlock, setSelectedBlock] = useState<LearningBlock | null>(null)
  const [courseItems, setCourseItems] = useState<CourseItem[]>(defaultCourseItems)

  /** Chronological chat stream (oldest → newest). New entries push previous content up — Cursor-style. */
  const [welcomeStream, setWelcomeStream] = useState<WelcomeStreamEntry[]>([])
  const welcomeStreamScrollRef = useRef<HTMLDivElement>(null)
  const pendingTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const skillShareStartedRef = useRef(false)
  const recapStartedRef = useRef(false)
  const [assessmentPhase, setAssessmentPhase] = useState<'q1' | 'q2' | 'done'>('q1')

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    pendingTimeoutsRef.current.push(id)
  }

  useEffect(() => {
    return () => {
      pendingTimeoutsRef.current.forEach(clearTimeout)
      pendingTimeoutsRef.current = []
    }
  }, [])

  const startSkillShareFlow = () => {
    if (skillShareStartedRef.current) return
    skillShareStartedRef.current = true
    const userId = streamEntryId()
    const typingId = streamEntryId()
    const aiBubbleId = streamEntryId()
    const assessmentId = streamEntryId()
    setWelcomeStream((s) =>
      insertShareUserBubble(s, { id: userId, type: 'user_bubble', text: SKILL_SHARE_PROMPT }),
    )
    schedule(() => {
      setWelcomeStream((s) =>
        insertWelcomeEntryAfterParent(s, userId, { id: typingId, type: 'typing' }),
      )
    }, 400)
    schedule(() => {
      setWelcomeStream((s) => {
        const withoutTyping = s.filter((e) => e.id !== typingId)
        return insertWelcomeEntryAfterParent(withoutTyping, userId, {
          id: aiBubbleId,
          type: 'ai_bubble',
          text: "We want to understand your comfort level with SQL basics.\n\nQuerying & Filtering Foundations: **Can you write a SELECT statement and filter results with WHERE?**",
        })
      })
    }, 1300)
    schedule(() => {
      setWelcomeStream((s) =>
        insertWelcomeEntryAfterParent(s, aiBubbleId, { id: assessmentId, type: 'skill_assessment' }),
      )
    }, 1600)
  }

  const startRecapFlow = () => {
    if (recapStartedRef.current) return
    recapStartedRef.current = true
    const userId = streamEntryId()
    const flashId = streamEntryId()
    setWelcomeStream((s) => [...s, { id: userId, type: 'user_bubble', text: RECAP_USER_PROMPT }])
    schedule(() => {
      setWelcomeStream((s) =>
        insertWelcomeEntryAfterParent(s, userId, { id: flashId, type: 'flashcards' }),
      )
    }, 500)
  }

  const handleQ1Answer = (text: string) => {
    setAssessmentPhase('q2')
    const answerId = streamEntryId()
    const typingId = streamEntryId()
    const aiBubbleId = streamEntryId()
    setWelcomeStream((s) => [...s, { id: answerId, type: 'assessment_user_bubble', text }])
    schedule(() => {
      setWelcomeStream((s) => [...s, { id: typingId, type: 'typing' }])
    }, 400)
    schedule(() => {
      setWelcomeStream((s) => {
        const withoutTyping = s.filter((e) => e.id !== typingId)
        return [...withoutTyping, {
          id: aiBubbleId,
          type: 'ai_bubble',
          text: "Got it! One more area to check.\n\nData Grouping & Aggregation: **Can you write a GROUP BY query and use aggregate functions like COUNT or SUM to summarize results?**",
        }]
      })
    }, 1300)
  }

  const handleQ2Answer = (text: string) => {
    setAssessmentPhase('done')
    const answerId = streamEntryId()
    const typingId = streamEntryId()
    const planId = streamEntryId()
    setWelcomeStream((s) => [...s, { id: answerId, type: 'assessment_user_bubble', text }])
    schedule(() => {
      setWelcomeStream((s) => [...s, { id: typingId, type: 'typing' }])
    }, 400)
    schedule(() => {
      setCourseItems(personalizedCourseItems)
      setWelcomeStream((s) => {
        const withoutTyping = s.filter((e) => e.id !== typingId)
        return [...withoutTyping, { id: planId, type: 'personalized_plan' }]
      })
    }, 2400)
  }

  const handleAssessmentSkip = () => {
    setAssessmentPhase('done')
  }

  useEffect(() => {
    if (welcomeStream.length === 0) return
    const el = welcomeStreamScrollRef.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(id)
  }, [welcomeStream])

  const hasSkillShareUser = welcomeStream.some((e) => e.type === 'user_bubble' && e.text === SKILL_SHARE_PROMPT)
  const hasRecapUser = welcomeStream.some((e) => e.type === 'user_bubble' && e.text === RECAP_USER_PROMPT)
  const hasSkillAssessment = welcomeStream.some((e) => e.type === 'skill_assessment')

  /** Always render Recap (bubble + flashcards) above Share (bubble + typing + trees), regardless of click order. */
  const recapSectionEntries = useMemo(
    () =>
      welcomeStream.filter(
        (e) =>
          (e.type === 'user_bubble' && e.text === RECAP_USER_PROMPT) || e.type === 'flashcards',
      ),
    [welcomeStream],
  )
  const shareSectionEntries = useMemo(
    () =>
      welcomeStream.filter(
        (e) =>
          (e.type === 'user_bubble' && e.text === SKILL_SHARE_PROMPT) ||
          e.type === 'assessment_user_bubble' ||
          e.type === 'typing' ||
          e.type === 'ai_bubble' ||
          e.type === 'skill_assessment' ||
          e.type === 'personalized_plan',
      ),
    [welcomeStream],
  )

  const renderWelcomeStreamEntry = (entry: WelcomeStreamEntry) => {
    if (entry.type === 'user_bubble' || entry.type === 'assessment_user_bubble') {
      return (
        <div key={entry.id} className="flex justify-end animate-hint-in">
          <div className="max-w-[min(100%,420px)] rounded-2xl border border-[#ddd6fe]/60 bg-[#ede9fe] px-4 py-2.5 shadow-sm">
            <p className="text-left text-sm font-medium leading-6 text-[#1a1f2a] sm:text-[15px]">{entry.text}</p>
          </div>
        </div>
      )
    }
    if (entry.type === 'typing') {
      return (
        <div key={entry.id} className="animate-hint-in">
          <TypingIndicator />
        </div>
      )
    }
    if (entry.type === 'ai_bubble') {
      return (
        <div key={entry.id} className="animate-hint-in">
          {entry.text.split('\n\n').map((para, i) => {
            const parts = para.split(/\*\*(.+?)\*\*/)
            return (
              <p key={i} className={`text-base text-text-dark leading-6 ${i > 0 ? 'mt-2' : ''}`}>
                {parts.map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </p>
            )
          })}
        </div>
      )
    }
    if (entry.type === 'skill_assessment') {
      return null
    }
    if (entry.type === 'personalized_plan') {
      return (
        <div key={entry.id} className="w-full animate-hint-in">
          <PersonalizedPlanCard />
        </div>
      )
    }
    if (entry.type === 'flashcards') {
      return (
        <div key={entry.id} className="w-full animate-hint-in">
          <QuickRecapFlashcards />
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex min-h-0 flex-1 gap-4 px-4 pb-5">
      <LearningPathSidebarColumn
        open={learningPathOpen}
        onOpen={onLearningPathOpen}
        onClose={onLearningPathClose}
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
        courseItems={courseItems}
      />
      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-bl from-[#dfe9ff] via-[#f1f4fa] to-[#fff6e8] shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-cover bg-center bg-no-repeat opacity-[0.35]"
          style={{ backgroundImage: "url('/mc-bg-04.png')" }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-bl from-[#e8f0ff]/90 via-transparent to-[#fff8ed]/80"
          aria-hidden
        />
        <div className="relative z-0 flex min-h-0 min-w-0 flex-1 flex-col">
          <WelcomeAssistantNavBar />
          <div
            ref={welcomeStreamScrollRef}
            className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto"
          >
            <div className="mx-auto flex w-full max-w-[750px] flex-col items-center px-4 pb-6 pt-6 md:pt-8">
          <div className="w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            {/* Hero — entire card scrolls as one unit; do not use translate-y (clips against overflow). */}
            <div className="flex flex-col gap-6 bg-[#f2f5fa] px-6 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1 max-w-[398px] min-w-0">
                <span className="self-start rounded-full bg-white/80 border border-border px-3 py-1 text-sm font-medium text-text-dark leading-5">{selectedBlock ? 'Completed' : '60 min'}</span>
                <h1 className="mt-1 text-[30px] font-semibold text-black leading-9 tracking-[-0.15px]">
                  {selectedBlock ? selectedBlock.title : "Welcome June, here's what you'll learn today"}
                </h1>
                {!selectedBlock && (
                  <button
                    type="button"
                    onClick={onContinue}
                    className="mt-3 self-start bg-primary hover:bg-primary-hover text-white font-semibold text-base tracking-[1px] px-6 py-2.5 rounded-lg transition-colors"
                  >
                    Start
                  </button>
                )}
              </div>
              <div className="hidden md:flex w-[280px] h-[168px] shrink-0 items-center justify-center">
                <img src="/welcome-hero.png" alt="" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-8 border-t border-border bg-white px-6 py-8 sm:px-10">
              <div className="flex-1 min-w-0 flex flex-col gap-6">
                <div className="flex flex-col gap-3 min-w-0 opacity-90">
                  <div className="flex items-center gap-2">
                    {selectedBlock ? <TrendingUp className="w-5 h-5 text-text-muted shrink-0" strokeWidth={1.75} aria-hidden /> : <Award className="w-5 h-5 text-text-muted shrink-0" strokeWidth={1.75} aria-hidden />}
                    <p className="text-xs text-text-muted leading-4">{selectedBlock ? 'Skills you practiced' : 'Topics you will learn'}</p>
                  </div>
                  {selectedBlock ? (
                    <>
                      <p className="text-[16px] font-semibold leading-6 text-text-dark">SQL filtering &amp; aggregation</p>
                      <p className="text-sm font-normal text-text-dark leading-5">
                        You completed 8 items covering WHERE, GROUP BY, HAVING, and common aggregate functions. These skills are the foundation for the advanced JOIN queries in your current block.
                      </p>
                    </>
                  ) : (
                    <ul className="flex flex-col gap-2 pl-7">
                      <li className="text-sm text-text-dark leading-5"><span className="font-semibold">Query with confidence</span> — write SELECT statements with filters, conditions, and sorting to retrieve exactly the data you need.</li>
                      <li className="text-sm text-text-dark leading-5"><span className="font-semibold">Master SQL joins</span> — combine data across multiple tables using INNER, LEFT, RIGHT, and FULL joins.</li>
                      <li className="text-sm text-text-dark leading-5"><span className="font-semibold">Write efficient, quality SQL</span> — optimize performance, manage transactions, validate data, and apply best practices.</li>
                    </ul>
                  )}
                </div>
              </div>

            </div>
          </div>

          {!selectedBlock && (
            <div className="mt-6 w-full">
              <QuickRecapFlashcards />
            </div>
          )}

          {welcomeStream.length > 0 && !selectedBlock && (
            <div className="mt-6 flex w-full flex-col gap-4">
              {recapSectionEntries.map(renderWelcomeStreamEntry)}
              {shareSectionEntries.map(renderWelcomeStreamEntry)}
            </div>
          )}
            </div>
          </div>

          {/* Bottom bar */}
          {!selectedBlock && <div className="flex w-full shrink-0 justify-center bg-transparent px-4 pb-6 pt-2">
            <div className="mx-auto flex w-full max-w-[750px] flex-col gap-5">
              {/* Assessment card — floats above input when active */}
              {hasSkillAssessment && assessmentPhase === 'q1' && (
                <SkillAssessmentCard options={assessmentOptionsQ1} onAnswer={handleQ1Answer} onSkip={handleAssessmentSkip} />
              )}
              {hasSkillAssessment && assessmentPhase === 'q2' && (
                <SkillAssessmentCard options={assessmentOptionsQ2} onAnswer={handleQ2Answer} onSkip={handleAssessmentSkip} />
              )}
              {/* Suggestion chips — hide once flows have started */}
              {!hasSkillAssessment && (!hasSkillShareUser || !hasRecapUser) && (
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="inline-flex h-9 items-center rounded-lg border border-border bg-white px-3 text-sm text-text-dark hover:bg-gray-50 transition-colors">
                    Adjust learning time
                  </button>
                  {!hasSkillShareUser && (
                    <button type="button" onClick={startSkillShareFlow} className="inline-flex h-9 items-center rounded-lg border border-border bg-white px-3 text-sm text-text-dark hover:bg-gray-50 transition-colors">
                      Share what I know
                    </button>
                  )}
                </div>
              )}
              {/* Chat input */}
              <div className="bg-[#f2f5fa] rounded-lg p-2 flex items-center gap-2">
                <button type="button" className="p-1.5 rounded hover:bg-black/5 shrink-0" aria-label="Add">
                  <Plus className="w-5 h-5 text-text-muted" />
                </button>
                <input
                  type="text"
                  placeholder={hasSkillAssessment && assessmentPhase !== 'done' ? 'Answer in my own words' : 'Ask me anything'}
                  className="flex-1 min-w-0 bg-transparent text-base text-text-dark placeholder:text-[#5b6780] outline-none"
                />
                <button type="button" className="p-1.5 rounded hover:bg-black/5 shrink-0" aria-label="Voice input">
                  <Mic className="w-5 h-5 text-text-muted" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(123deg, rgb(105, 35, 222) 22%, rgb(50, 134, 255) 93%)' }}
                  aria-label="Send"
                >
                  <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>}
        </div>
      </main>
    </div>
  )
}

// ─── App Root ───

export default function App() {
  const [page, setPage] = useState<Page>('welcome')
  const [rightPanel, setRightPanel] = useState<RightPanel>('instructions')
  const [learningPathOpen, setLearningPathOpen] = useState(false)

  const toggleCoach = () => {
    setRightPanel(rightPanel === 'coach' ? 'instructions' : 'coach')
  }

  useEffect(() => {
    if (page !== 'welcome') setLearningPathOpen(false)
  }, [page])

  return (
    <div className="flex h-screen min-h-0 w-full flex-col overflow-x-hidden overflow-y-hidden bg-page-bg font-sans">
      <Header onSparkleClick={page === 'ide' ? toggleCoach : undefined} />
      {page === 'analyzing' && (
        <ProactiveAnalysisPage onContinue={() => setPage('challenge')} />
      )}
      {page === 'challenge' && (
        <ChallengePage onLaunch={() => setPage('ide')} />
      )}
      {page === 'ide' && (
        <IDEPage onFinish={() => setPage('complete')} rightPanel={rightPanel} setRightPanel={setRightPanel} />
      )}
      {page === 'complete' && (
        <PracticeCompletePage onFinishSession={() => setPage('welcome')} />
      )}
      {page === 'welcome' && (
        <WelcomeBackPage
          onContinue={() => setPage('analyzing')}
          learningPathOpen={learningPathOpen}
          onLearningPathOpen={() => setLearningPathOpen(true)}
          onLearningPathClose={() => setLearningPathOpen(false)}
        />
      )}
    </div>
  )
}
