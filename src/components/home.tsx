import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  ArrowRight,
  BrainCircuit,
  Clock,
  Code2,
  GitBranch,
  LineChart,
  Link,
  MessageSquare,
  Zap,
} from "lucide-react";

function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-background px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              DebugMate
            </h1>
            <p className="text-2xl font-semibold text-primary mb-6">
              Your AI-Powered Debugging Teammate
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Built from firsthand pain. Inspired by 80% of real engineering
              work at Samsung.
            </p>
            <div className="mt-10 flex gap-x-6 justify-center items-center">
              <Button size="lg" className="gap-2">
                Get Early Access <ArrowRight className="h-4 w-4" />
              </Button>
              <a href="#features" className="text-sm font-semibold leading-6">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Problem Section */}
      <section className="bg-muted py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="rounded-full bg-destructive/10 p-2">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  The Problem
                </h2>
              </div>
              <p className="mt-4 text-lg text-muted-foreground">
                Developers, especially juniors, spend most of their time
                debugging, not building.
              </p>
              <ul className="mt-8 space-y-8 text-base leading-7">
                <li className="flex gap-x-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>
                    They're juggling logs, tools, dashboards — often without
                    enough AI or automation support.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>
                    Fast-growing teams lack time, expertise, and resources to
                    build their own AI layers on top of dev tools.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="rounded-full bg-primary/10 p-2">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  The Solution
                </h2>
              </div>
              <p className="mt-4 text-lg text-muted-foreground">
                A platform that plugs into your existing tools and gives you
                AI-powered debugging superpowers.
              </p>
              <ul className="mt-8 space-y-8 text-base leading-7">
                <li className="flex gap-x-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>
                    Connects to tools like GitHub, Datadog, Arize, Sentry
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>
                    Reduces Mean Time to Resolution (MTTR) through intelligent
                    analysis
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Works even without deep data integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Initial Features"
            description="Powerful tools to supercharge your debugging workflow"
            centered
          />
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            <FeatureCard
              icon={Link}
              title="One-click integrations"
              description="OAuth-style setup for GitHub, Datadog, etc. Connect your tools in seconds."
            />
            <FeatureCard
              icon={LineChart}
              title="MTTR Visualizer"
              description="Timeline of debugging flow. See where time is spent and optimize your process."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Prompt-based Assistant"
              description="'Ask anything' with AI answers. Get immediate help with your debugging questions."
            />
            <FeatureCard
              icon={BrainCircuit}
              title="Log Pattern Analyzer"
              description="Detects repeat issues and surfaces root causes. Stop solving the same problems."
            />
            <FeatureCard
              icon={GitBranch}
              title="Pilot Dashboard"
              description="Early feedback + testimonial generation. Improve your debugging workflow."
            />
            <Card className="h-full bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                <p className="text-2xl font-bold mb-4">$390B</p>
                <p className="text-muted-foreground">
                  Addressable market across DevOps, observability, and
                  AI-powered developer tools
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Target Users Section */}
      <section className="bg-muted py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Who is DebugMate for?"
            description="Designed for developers who want to spend less time debugging and more time building"
            centered
          />
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Junior/Mid-Level Engineers
                  </h3>
                  <p className="text-muted-foreground">
                    Who need guidance and support when tackling complex
                    debugging tasks
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Teams Without Strong AI Talent
                  </h3>
                  <p className="text-muted-foreground">
                    Who want to leverage AI for debugging without hiring
                    specialized talent
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Companies Needing Faster Debugging
                  </h3>
                  <p className="text-muted-foreground">
                    Without revamping their whole stack or changing their
                    existing tools
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Strategic Advantage Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Strategic Advantage"
            description="What makes DebugMate different from other solutions"
            centered
          />
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Immediate Value</h3>
                  <p className="text-muted-foreground">
                    Adds value immediately with sample logs, sandbox mode, and
                    no vendor lock-in
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Intelligence Layer</h3>
                  <p className="text-muted-foreground">
                    Acts as a layer of intelligence, not just an integration hub
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Design Partners</h3>
                  <p className="text-muted-foreground">
                    4 companies already confirmed as design partners for early
                    pilots
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Works With Your Stack
                  </h3>
                  <p className="text-muted-foreground">
                    Works even without deep data integrations, compatible with
                    your existing tools
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="bg-muted py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="What Our Early Users Say"
            description="Hear from our design partners and early adopters"
            centered
          />
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            <TestimonialCard
              quote="DebugMate cut our debugging time in half. The AI assistant understands our codebase and provides solutions that actually work."
              author="Sarah Chen"
              role="Lead Developer"
              company="TechStart"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            />
            <TestimonialCard
              quote="As a junior developer, DebugMate is like having a senior engineer looking over my shoulder. It's transformed how I approach debugging."
              author="Alex Johnson"
              role="Junior Developer"
              company="CodeCraft"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            />
            <TestimonialCard
              quote="The Log Pattern Analyzer caught a recurring issue we'd been missing for months. DebugMate paid for itself in the first week."
              author="Michael Rodriguez"
              role="CTO"
              company="DataFlow"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
            />
          </div>
        </div>
      </section>
      {/* Vision Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center mb-6">
              <Code2 className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Our Vision
            </h2>
            <p className="text-2xl font-medium text-primary mb-6">
              "Give it a log. Get a fix. It's that simple."
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Make debugging feel as magical as using ChatGPT for code — but for
              your whole dev stack.
            </p>
            <div className="mt-10">
              <Button size="lg">Get Early Access</Button>
            </div>
          </div>
        </div>
      </section>
      <Separator />
      <Footer />
    </div>
  );
}

export default Home;
