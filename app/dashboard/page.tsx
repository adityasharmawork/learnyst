"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, BookOpen, Brain, TrendingUp, Info, CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface Subject {
  id: string
  name: string
  progress: number
  totalTopics: number
  completedTopics: number
  mindMap?: any[]
}

// Custom Hook for glow border effect
const useGlowEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll('.glow-border');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return containerRef;
}

// Custom Hook for animations
const useAnimateOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export default function Dashboard() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newSubject, setNewSubject] = useState({ name: "", syllabus: "" })
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [fallbackMessage, setFallbackMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const glowRef = useGlowEffect()
  useAnimateOnScroll()

  useEffect(() => {
    setIsVisible(true)
    // Since we can't use localStorage in artifacts, we'll simulate with sample data
    const sampleSubjects = [
      {
        id: "1",
        name: "Machine Learning",
        progress: 65,
        totalTopics: 24,
        completedTopics: 16,
        mindMap: []
      },
      {
        id: "2", 
        name: "Data Structures",
        progress: 89,
        totalTopics: 18,
        completedTopics: 16,
        mindMap: []
      }
    ]
    setSubjects(sampleSubjects)
  }, [])

  const handleCreateSubject = async () => {
    if (!newSubject.name || !newSubject.syllabus) {
      setError("Please provide both subject name and syllabus content")
      return
    }

    setIsGenerating(true)
    setError("")
    setFallbackMessage("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      const subject: Subject = {
        id: Date.now().toString(),
        name: newSubject.name,
        progress: 0,
        totalTopics: 19,
        completedTopics: 0,
        mindMap: generateLocalFallbackMindMap(newSubject.name, newSubject.syllabus),
      }

      setSubjects([...subjects, subject])
      setNewSubject({ name: "", syllabus: "" })
      setIsDialogOpen(false)
      setFallbackMessage("Subject created successfully! AI-powered learning path generated.")
    } catch (error) {
      console.error("Error creating subject:", error)
      setError("Failed to create subject. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const generateLocalFallbackMindMap = (subjectName: string, syllabus: string) => {
    return [
      {
        id: "introduction",
        name: "Introduction and Fundamentals",
        isCompleted: false,
        children: [
          { id: "introduction-1", name: "Basic Concepts and Definitions", isCompleted: false },
          { id: "introduction-2", name: "Historical Context and Development", isCompleted: false },
          { id: "introduction-3", name: "Key Terminology and Vocabulary", isCompleted: false },
          { id: "introduction-4", name: "Foundational Principles", isCompleted: false },
        ],
      },
      {
        id: "core",
        name: "Core Concepts and Theory",
        isCompleted: false,
        children: [
          { id: "core-1", name: "Theoretical Framework", isCompleted: false },
          { id: "core-2", name: "Main Principles and Laws", isCompleted: false },
          { id: "core-3", name: "Key Models and Systems", isCompleted: false },
          { id: "core-4", name: "Important Relationships", isCompleted: false },
        ],
      },
      {
        id: "intermediate",
        name: "Intermediate Topics",
        isCompleted: false,
        children: [
          { id: "intermediate-1", name: "Advanced Theoretical Concepts", isCompleted: false },
          { id: "intermediate-2", name: "Practical Applications", isCompleted: false },
          { id: "intermediate-3", name: "Problem-Solving Techniques", isCompleted: false },
          { id: "intermediate-4", name: "Case Studies and Examples", isCompleted: false },
        ],
      },
      {
        id: "advanced",
        name: "Advanced Applications",
        isCompleted: false,
        children: [
          { id: "advanced-1", name: "Complex Problem Solving", isCompleted: false },
          { id: "advanced-2", name: "Real-World Implementation", isCompleted: false },
          { id: "advanced-3", name: "Current Research and Trends", isCompleted: false },
        ],
      },
    ]
  }

  return (
    <div className="min-h-screen bg-background text-foreground tech-grid" ref={glowRef}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>
      
      {/* Aurora Background Effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/50 border-b border-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className={`flex items-center space-x-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center bg-foreground text-background rounded-full">
                  <span className="font-bold text-sm">L</span>
                </div>
                <span className="font-semibold text-lg tracking-wider">Learnyst AI</span>
              </Link>
            </div>

            <div className={`flex items-center space-x-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Welcome Section */}
        <div className="mb-16 scroll-animate fade-in-up">
          <div className="flex items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Learning Dashboard</h1>
            <Sparkles className="ml-6 h-10 w-10 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Manage your subjects, track progress, and access AI-powered study materials from your centralized learning
            <span className="text-cyan-400"> command center</span>.
          </p>
        </div>

        {/* Fallback Message */}
        {fallbackMessage && (
          <Alert className="mb-12 glass-card border-cyan-500/20 bg-cyan-500/10 scroll-animate fade-in-up [--animation-delay:200ms]">
            <Info className="h-5 w-5 text-cyan-400" />
            <AlertDescription className="text-base text-cyan-400">{fallbackMessage}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-16 scroll-animate fade-in-up [--animation-delay:400ms]">
          <Card className="glass-card glow-border transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base font-semibold text-muted-foreground">Total Subjects</CardTitle>
              <BookOpen className="h-6 w-6 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{subjects.length}</div>
              <p className="text-sm text-muted-foreground mt-2">Active learning paths</p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-border transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base font-semibold text-muted-foreground">Average Progress</CardTitle>
              <TrendingUp className="h-6 w-6 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <span className="text-cyan-400">
                  {subjects.length > 0
                    ? Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length)
                    : 0}
                  %
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Across all subjects</p>
            </CardContent>
          </Card>

          <Card className="glass-card glow-border transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base font-semibold text-muted-foreground">Topics Completed</CardTitle>
              <Brain className="h-6 w-6 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{subjects.reduce((acc, s) => acc + s.completedTopics, 0)}</div>
              <p className="text-sm text-muted-foreground mt-2">
                of {subjects.reduce((acc, s) => acc + s.totalTopics, 0)} total topics
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Subject */}
        <div className="mb-16 scroll-animate fade-in-up [--animation-delay:600ms]">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-3 text-lg font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                <span className="absolute -inset-full top-0 block -translate-y-full transform bg-white/20 opacity-40 transition-all duration-500 group-hover:translate-y-full group-hover:opacity-100"></span>
                <Plus className="mr-3 h-6 w-6" />
                Add New Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] glass-card border-0">
              <DialogHeader>
                <DialogTitle className="flex items-center text-2xl font-bold">
                  <Brain className="mr-4 h-8 w-8 text-cyan-400" />
                  Create Learning Path
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-8 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="subject-name" className="text-sm font-medium text-muted-foreground">
                    Subject Name
                  </Label>
                  <Input
                    id="subject-name"
                    placeholder="e.g., Advanced Mathematics, Computer Science, Biology"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    className="glass-card border-foreground/20 focus:border-cyan-500 focus:ring-cyan-500 text-base h-14"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="syllabus" className="text-sm font-medium text-muted-foreground">
                    Syllabus Content
                  </Label>
                  <Textarea
                    id="syllabus"
                    placeholder="Paste your complete syllabus here, or describe the topics you want to learn. The more detailed, the better the learning structure..."
                    className="glass-card border-foreground/20 focus:border-cyan-500 focus:ring-cyan-500 min-h-[180px] resize-none text-base"
                    value={newSubject.syllabus}
                    onChange={(e) => setNewSubject({ ...newSubject, syllabus: e.target.value })}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm font-medium">{error}</div>
                )}
                <Button
                  onClick={handleCreateSubject}
                  disabled={!newSubject.name || !newSubject.syllabus || isGenerating}
                  className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-3 text-lg font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 disabled:opacity-50"
                >
                  <span className="absolute -inset-full top-0 block -translate-y-full transform bg-white/20 opacity-40 transition-all duration-500 group-hover:translate-y-full group-hover:opacity-100"></span>
                  {isGenerating ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Creating learning structure...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-3 h-5 w-5" />
                      Generate Learning Path
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Subjects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 scroll-animate fade-in-up [--animation-delay:800ms]">
          {subjects.map((subject, index) => (
            <Link key={subject.id} href={`/learning-hub/${subject.id}`}>
              <Card className="glass-card glow-border h-full transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold">{subject.name}</span>
                    <BookOpen className="h-6 w-6 text-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-base mb-3">
                        <span className="text-muted-foreground font-medium">Progress</span>
                        <span className="font-bold text-cyan-400">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-foreground/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-base">
                      <span className="text-muted-foreground">
                        {subject.completedTopics} of {subject.totalTopics} topics
                      </span>
                      {subject.progress === 100 && (
                        <CheckCircle className="h-5 w-5 text-cyan-400 animate-pulse" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {subjects.length === 0 && (
          <div className="text-center py-24 scroll-animate fade-in-up [--animation-delay:800ms]">
            <Card className="glass-card max-w-2xl mx-auto p-16">
              <CardContent className="p-0 text-center">
                <div className="w-20 h-20 bg-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Brain className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl mb-6 font-bold">No subjects yet</h3>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-md mx-auto">
                  Create your first learning path to get started with structured studying and AI-powered materials
                </p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-3 text-lg font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"
                >
                  <span className="absolute -inset-full top-0 block -translate-y-full transform bg-white/20 opacity-40 transition-all duration-500 group-hover:translate-y-full group-hover:opacity-100"></span>
                  <Plus className="mr-3 h-5 w-5" />
                  Create First Subject
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}