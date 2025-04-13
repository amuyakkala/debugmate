import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { question, previousMessages } = await req.json();

    if (!question) {
      throw new Error("Question is required");
    }

    // In a real implementation, this would call OpenAI API with the conversation history
    // For now, we'll simulate responses based on keywords in the question
    let response: ChatMessage = {
      role: "assistant",
      content:
        "I need more specific information about your debugging issue to provide targeted help. Could you share some error logs, describe the symptoms you're seeing, or provide more context about what you're trying to debug?",
    };

    // Simple pattern matching for demo purposes
    if (
      question.toLowerCase().includes("pipeline") ||
      question.toLowerCase().includes("ci") ||
      question.toLowerCase().includes("build")
    ) {
      response = {
        role: "assistant",
        content:
          "Based on your CI/CD pipeline logs, it appears the build failed due to failing tests in the authentication module. The specific error is related to token validation in the JWT middleware. I recommend checking the recent changes to the auth service and verifying the JWT secret configuration.",
      };
    } else if (
      question.toLowerCase().includes("database") ||
      question.toLowerCase().includes("timeout") ||
      question.toLowerCase().includes("connection")
    ) {
      response = {
        role: "assistant",
        content:
          "The database timeouts are likely caused by long-running queries that are blocking connections. Looking at your connection pool metrics, you're reaching the maximum number of connections. Consider optimizing your queries, adding appropriate indexes, or increasing the connection pool size if necessary.",
      };
    } else if (
      question.toLowerCase().includes("memory") ||
      question.toLowerCase().includes("leak") ||
      question.toLowerCase().includes("crash")
    ) {
      response = {
        role: "assistant",
        content:
          "To fix the memory leak, you should look for resources that aren't being properly released. Common causes include: event listeners not being removed, setInterval calls without clearInterval, or large objects being referenced in closures. I recommend using Chrome DevTools Memory profiler to take heap snapshots and identify growing objects.",
      };
    } else if (
      question.toLowerCase().includes("error") ||
      question.toLowerCase().includes("exception") ||
      question.toLowerCase().includes("bug")
    ) {
      response = {
        role: "assistant",
        content:
          "This error message indicates an unhandled promise rejection in your async code. The specific error is 'TypeError: Cannot read property 'data' of undefined', which suggests you're trying to access a property on an object that doesn't exist. Check your API response handling and make sure you're properly handling cases where the response might be undefined.",
      };
    } else if (
      question.toLowerCase().includes("performance") ||
      question.toLowerCase().includes("slow") ||
      question.toLowerCase().includes("latency")
    ) {
      response = {
        role: "assistant",
        content:
          "The performance issue appears to be related to excessive rendering in your React components. I notice several components are re-rendering unnecessarily due to missing memoization or improper dependency arrays in useEffect hooks. Consider using React.memo, useMemo, and useCallback to optimize rendering performance, and ensure your useEffect dependency arrays only include values that should trigger re-renders.",
      };
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
