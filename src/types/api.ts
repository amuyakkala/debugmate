// Chat message type
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Log analysis result type
export interface LogAnalysisResult {
  issue: string;
  rootCause: string;
  solution: string;
  additionalInfo?: string;
}

// Timeline event type
export interface TimelineEvent {
  date: string;
  mttr: number; // Mean Time to Resolution in hours
  issue: string;
  status: "Resolved" | "In Progress";
}

// Integration type
export interface Integration {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  lastSynced?: string;
  metadata?: Record<string, any>;
}
