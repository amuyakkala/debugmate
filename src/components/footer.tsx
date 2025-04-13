import { Code2, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">DebugMate</span>
          </div>
          <p className="text-center text-xs leading-5 text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} DebugMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
