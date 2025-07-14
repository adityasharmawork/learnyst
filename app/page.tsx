"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Brain, BookOpen, Target, Zap, TrendingUp, Trophy, ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Custom Hook to manage animations on scroll
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

export default function LandingPage() {
  useAnimateOnScroll()
  const featuresRef = useGlowEffect();
  const testimonialsRef = useGlowEffect();

  return (
    <div className="min-h-screen bg-background text-foreground tech-grid">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/50 border-b border-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 scroll-animate [--animation-delay:100ms] fade-in-left">
              <div className="w-8 h-8 flex items-center justify-center bg-foreground text-background rounded-full">
                <span className="font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-lg tracking-wider">Learnyst AI</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Features</Link>
              <Link href="#process" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Process</Link>
              <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors duration-300">FAQ</Link>
            </div>

            <div className="flex items-center space-x-4 scroll-animate [--animation-delay:100ms] fade-in-right">
              <ThemeToggle />
              <Link href="/dashboard">
                <Button className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-foreground px-6 font-medium text-background transition-all duration-300 hover:bg-neutral-800">
                    <span>Get Started</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                        <div className="relative h-full w-8 bg-background/20"></div>
                    </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 lg:py-40 aurora-background">
          <div className="container mx-auto px-4 text-center">
            <div className="scroll-animate fade-in-up">
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 mb-6">
                <Sparkles className="mr-2 h-4 w-4 text-cyan-400" />
                The Future of Learning is Here
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 scroll-animate fade-in-up [--animation-delay:200ms]">
              Learn Smarter, Not Harder with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">Learnyst AI</span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 scroll-animate fade-in-up [--animation-delay:400ms]">
              Leverage advanced AI to transform any syllabus into dynamic learning paths, generate study materials, and master subjects with unparalleled precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-animate fade-in-up [--animation-delay:600ms]">
              <Link href="/dashboard">
                <Button size="lg" className="group relative w-full sm:w-auto inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-3 text-lg font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                  <span className="absolute -inset-full top-0 block -translate-y-full transform bg-white/20 opacity-40 transition-all duration-500 group-hover:translate-y-full group-hover:opacity-100"></span>
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent group">
                <Play className="mr-2 h-5 w-5 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28" ref={featuresRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 scroll-animate fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">A Complete Learning Ecosystem</h2>
              <p className="mt-4 text-lg text-muted-foreground">AI-powered tools designed for deep understanding and accelerated knowledge retention.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "Intelligent Syllabus Analysis", description: "Instantly convert any curriculum into a structured, actionable learning path with topic mapping and dependency analysis." },
                { icon: BookOpen, title: "Automated Content Generation", description: "Generate detailed notes, summaries, and flashcards tailored to your specific learning objectives and style." },
                { icon: Target, title: "Adaptive Spaced Repetition", description: "Our smart flashcard system uses proven algorithms to maximize long-term knowledge retention efficiently." },
                { icon: Zap, title: "Dynamic Assessment Engine", description: "AI-generated quizzes that adapt to your progress, pinpointing weak areas for targeted improvement." },
                { icon: TrendingUp, title: "Advanced Progress Analytics", description: "Track your learning journey with comprehensive insights, performance metrics, and visual progress reports." },
                { icon: Trophy, title: "Realistic Exam Simulation", description: "Prepare with confidence in a realistic exam environment featuring detailed performance analysis." },
              ].map((feature, index) => (
                <div key={index} className="scroll-animate fade-in-up glow-border rounded-xl" style={{ animationDelay: `${index * 150}ms` }}>
                  <Card className="h-full glass-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="process" className="py-20 md:py-28 bg-foreground/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 scroll-animate fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Your Path to Mastery in 3 Steps</h2>
              <p className="mt-4 text-lg text-muted-foreground">Go from syllabus to study-ready in minutes.</p>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {/* Dashed line connector for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
                 <svg width="100%" height="100%"><line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2" stroke="hsl(var(--foreground)/0.1)" strokeDasharray="8 8" /></svg>
              </div>

              {[
                { step: "01", title: "Upload Syllabus", description: "Securely upload your course syllabus or paste text. Our AI gets to work instantly." },
                { step: "02", title: "Generate Path", description: "Learnyst analyzes the content and generates a personalized, structured learning pathway." },
                { step: "03", title: "Learn & Excel", description: "Engage with custom materials, take adaptive quizzes, and track your mastery in real-time." },
              ].map((step, index) => (
                <div key={index} className="relative text-center scroll-animate fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold bg-background border-2 border-foreground/10 z-10 relative">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-28" ref={testimonialsRef}>
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16 scroll-animate fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Trusted by Ambitious Students</h2>
                    <p className="mt-4 text-lg text-muted-foreground">See how Learnyst AI is leveling up learning for students worldwide.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { quote: "The way Learnyst broke down my complex engineering syllabus into a manageable plan was a lifesaver. The AI-generated notes are incredibly accurate.", author: "Alex Johnson", role: "Engineering Student" },
                        { quote: "Game-changer for med school. The adaptive quizzes and spaced repetition system helped me retain vast amounts of information efficiently. I've never felt more prepared.", author: "Priya Sharma", role: "Medical Student" },
                        { quote: "As a law student, I'm drowning in reading. Learnyst's summarization feature is pure gold. It saves me hours while ensuring I grasp the core concepts.", author: "David Chen", role: "Law Student" },
                    ].map((testimonial, index) => (
                        <div key={index} className="scroll-animate fade-in-up glow-border rounded-xl" style={{ animationDelay: `${index * 150}ms` }}>
                             <Card className="h-full glass-card flex flex-col justify-between p-6">
                                <blockquote className="text-lg italic mb-6">“{testimonial.quote}”</blockquote>
                                <div>
                                    <div className="font-bold">{testimonial.author}</div>
                                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-28 bg-foreground/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 scroll-animate fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Frequently Asked Questions</h2>
                <p className="mt-4 text-lg text-muted-foreground">Have questions? We've got answers.</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4 scroll-animate fade-in-up [--animation-delay:200ms]">
                {[
                  { q: "How does the AI syllabus analysis work?", a: "Our AI uses advanced Natural Language Processing (NLP) to parse your syllabus, identify key topics, understand their relationships, and structure them into a logical, week-by-week learning plan. It forms the foundation of your entire personalized study guide." },
                  { q: "Is my data secure?", a: "Yes. We use industry-standard encryption for data in transit and at rest. Your personal information and study materials are kept private and secure. We do not share your data with third parties." },
                  { q: "What subjects is Learnyst AI suitable for?", a: "Learnyst AI is designed to be domain-agnostic. It excels in text-heavy subjects like law, humanities, and social sciences, as well as structured fields like computer science, medicine, and engineering. If you have a syllabus, Learnyst can analyze it." },
                  { q: "Is there a free trial?", a: "We offer a comprehensive free tier that allows you to experience the core features of Learnyst AI. You can analyze a syllabus, generate initial materials, and see the power of our platform firsthand before committing." },
                ].map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="glass-card rounded-lg border border-foreground/10 px-6">
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 aurora-background">
            <div className="container mx-auto px-4 text-center">
                 <div className="max-w-3xl mx-auto scroll-animate fade-in-up">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Ready to Revolutionize Your Studies?</h2>
                    <p className="mt-5 text-lg md:text-xl text-muted-foreground mb-10">
                        Join thousands of students learning more effectively. Stop cramming, start understanding.
                    </p>
                    <Link href="/dashboard">
                        <Button size="lg" className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 px-10 py-3 text-xl font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                            <span className="absolute -inset-full top-0 block -translate-y-full transform bg-white/20 opacity-40 transition-all duration-500 group-hover:translate-y-full group-hover:opacity-100"></span>
                            Start for Free Today
                            <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/10">
        <div className="container mx-auto px-4 py-12">
            <div className="grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                <div className="col-span-2 lg:col-span-2">
                     <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 flex items-center justify-center bg-foreground text-background rounded-full">
                            <span className="font-bold text-sm">C</span>
                        </div>
                        <span className="font-semibold text-lg tracking-wider">Learnyst AI</span>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-xs">AI-powered learning platform to help students master any subject.</p>
                </div>

                 <div>
                    <h3 className="font-semibold mb-4">Product</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                        <li><Link href="#process" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</Link></li>
                        <li><Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-foreground/10 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Learnyst AI. All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  )
}