import { supabase } from "./supabase";
import { ChatMessage, LogAnalysisResult, TimelineEvent } from "@/types/api";

// Mock data for timeline
const mockTimelineData: Record<string, TimelineEvent[]> = {
  day: [
    {
      date: "2023-06-15T10:00:00Z",
      mttr: 1.2,
      issue: "API Gateway Error",
      status: "Resolved",
    },
    {
      date: "2023-06-15T12:00:00Z",
      mttr: 0.8,
      issue: "Database Connection Issue",
      status: "Resolved",
    },
    {
      date: "2023-06-15T14:00:00Z",
      mttr: 1.5,
      issue: "Frontend Rendering Bug",
      status: "In Progress",
    },
    {
      date: "2023-06-15T16:00:00Z",
      mttr: 0.5,
      issue: "Authentication Error",
      status: "Resolved",
    },
    {
      date: "2023-06-15T18:00:00Z",
      mttr: 2.0,
      issue: "Memory Leak",
      status: "In Progress",
    },
  ],
  week: [
    {
      date: "2023-06-10T10:00:00Z",
      mttr: 3.2,
      issue: "API Gateway Error",
      status: "Resolved",
    },
    {
      date: "2023-06-11T12:00:00Z",
      mttr: 1.8,
      issue: "Database Connection Issue",
      status: "Resolved",
    },
    {
      date: "2023-06-12T14:00:00Z",
      mttr: 2.5,
      issue: "Frontend Rendering Bug",
      status: "Resolved",
    },
    {
      date: "2023-06-13T16:00:00Z",
      mttr: 1.5,
      issue: "Authentication Error",
      status: "Resolved",
    },
    {
      date: "2023-06-14T18:00:00Z",
      mttr: 2.0,
      issue: "Memory Leak",
      status: "Resolved",
    },
    {
      date: "2023-06-15T20:00:00Z",
      mttr: 1.2,
      issue: "API Rate Limiting",
      status: "In Progress",
    },
    {
      date: "2023-06-16T22:00:00Z",
      mttr: 0.8,
      issue: "Cache Invalidation",
      status: "In Progress",
    },
  ],
  month: [
    {
      date: "2023-05-20T10:00:00Z",
      mttr: 4.2,
      issue: "API Gateway Error",
      status: "Resolved",
    },
    {
      date: "2023-05-25T12:00:00Z",
      mttr: 3.8,
      issue: "Database Connection Issue",
      status: "Resolved",
    },
    {
      date: "2023-05-30T14:00:00Z",
      mttr: 2.5,
      issue: "Frontend Rendering Bug",
      status: "Resolved",
    },
    {
      date: "2023-06-05T16:00:00Z",
      mttr: 2.0,
      issue: "Authentication Error",
      status: "Resolved",
    },
    {
      date: "2023-06-10T18:00:00Z",
      mttr: 1.5,
      issue: "Memory Leak",
      status: "Resolved",
    },
    {
      date: "2023-06-15T20:00:00Z",
      mttr: 1.2,
      issue: "API Rate Limiting",
      status: "Resolved",
    },
    {
      date: "2023-06-20T22:00:00Z",
      mttr: 0.8,
      issue: "Cache Invalidation",
      status: "In Progress",
    },
  ],
};

// Fetch timeline data
export async function fetchTimelineData(
  timeRange: string = "week",
): Promise<TimelineEvent[]> {
  // In a real app, this would be an API call to the backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTimelineData[timeRange] || mockTimelineData.week);
    }, 1000);
  });
}

// Analyze log data
export async function analyzeLogData(
  logText: string,
): Promise<LogAnalysisResult> {
  // In a real app, this would call the Supabase Edge Function
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock response based on log content
      if (logText.includes("database")) {
        resolve({
          issue: "Database Connection Failure",
          rootCause:
            "The application failed to establish a connection to the database after multiple retry attempts.",
          solution:
            "Check database server status, credentials, and network connectivity. Ensure the database service is running and accessible from the application server.",
          additionalInfo:
            "Consider implementing a connection pooling strategy and more robust retry mechanism with exponential backoff.",
        });
      } else if (logText.includes("memory")) {
        resolve({
          issue: "Memory Leak Detected",
          rootCause:
            "The application is not properly releasing resources, leading to increased memory usage over time.",
          solution:
            "Review recent code changes that might be causing the memory leak. Check for unclosed resources, event listeners, or circular references.",
          additionalInfo:
            "Consider using memory profiling tools to identify the specific objects that are not being garbage collected.",
        });
      } else {
        resolve({
          issue: "Service Unavailability",
          rootCause:
            "The application is experiencing connectivity issues with a dependent service.",
          solution:
            "Check the status of all dependent services and ensure they are operational. Verify network connectivity and firewall rules.",
          additionalInfo:
            "Implement circuit breakers and fallback mechanisms to handle service unavailability gracefully.",
        });
      }
    }, 1500);
  });
}

// Ask AI assistant
export async function askAIAssistant(
  question: string,
  previousMessages: ChatMessage[],
): Promise<ChatMessage> {
  // In a real app, this would call the Supabase Edge Function with OpenAI integration
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock responses based on question content
      if (
        question.toLowerCase().includes("pipeline") ||
        question.toLowerCase().includes("ci")
      ) {
        resolve({
          role: "assistant",
          content:
            "Based on your CI/CD pipeline logs, it appears the build failed due to failing tests in the authentication module. The specific error is related to token validation in the JWT middleware. I recommend checking the recent changes to the auth service and verifying the JWT secret configuration.",
        });
      } else if (
        question.toLowerCase().includes("database") ||
        question.toLowerCase().includes("timeout")
      ) {
        resolve({
          role: "assistant",
          content:
            "The database timeouts are likely caused by long-running queries that are blocking connections. Looking at your connection pool metrics, you're reaching the maximum number of connections. Consider optimizing your queries, adding appropriate indexes, or increasing the connection pool size if necessary.",
        });
      } else if (
        question.toLowerCase().includes("memory") ||
        question.toLowerCase().includes("leak")
      ) {
        resolve({
          role: "assistant",
          content:
            "To fix the memory leak, you should look for resources that aren't being properly released. Common causes include: event listeners not being removed, setInterval calls without clearInterval, or large objects being referenced in closures. I recommend using Chrome DevTools Memory profiler to take heap snapshots and identify growing objects.",
        });
      } else if (question.toLowerCase().includes("error")) {
        resolve({
          role: "assistant",
          content:
            "This error message indicates an unhandled promise rejection in your async code. The specific error is 'TypeError: Cannot read property 'data' of undefined', which suggests you're trying to access a property on an object that doesn't exist. Check your API response handling and make sure you're properly handling cases where the response might be undefined.",
        });
      } else {
        resolve({
          role: "assistant",
          content:
            "I need more specific information about your debugging issue to provide targeted help. Could you share some error logs, describe the symptoms you're seeing, or provide more context about what you're trying to debug?",
        });
      }
    }, 2000);
  });
}

// Connect integration
export async function connectIntegration(integrationId: string): Promise<void> {
  // In a real app, this would initiate OAuth flow or API key setup
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

// Disconnect integration
export async function disconnectIntegration(
  integrationId: string,
): Promise<void> {
  // In a real app, this would revoke tokens and remove from database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
