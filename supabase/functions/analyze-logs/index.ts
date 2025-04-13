import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { logText } = await req.json();

    if (!logText) {
      throw new Error("Log text is required");
    }

    // In a real implementation, this would call OpenAI API
    // For now, we'll simulate an analysis based on the log content
    let analysis = {
      issue: "Unknown Issue",
      rootCause: "Could not determine root cause from the provided logs.",
      solution: "Please provide more detailed logs for better analysis.",
      additionalInfo:
        "Consider adding more context or specific error messages.",
    };

    // Simple pattern matching for demo purposes
    if (
      logText.includes("database") ||
      logText.includes("connection refused")
    ) {
      analysis = {
        issue: "Database Connection Failure",
        rootCause:
          "The application failed to establish a connection to the database after multiple retry attempts.",
        solution:
          "Check database server status, credentials, and network connectivity. Ensure the database service is running and accessible from the application server.",
        additionalInfo:
          "Consider implementing a connection pooling strategy and more robust retry mechanism with exponential backoff.",
      };
    } else if (logText.includes("memory") || logText.includes("leak")) {
      analysis = {
        issue: "Memory Leak Detected",
        rootCause:
          "The application is not properly releasing resources, leading to increased memory usage over time.",
        solution:
          "Review recent code changes that might be causing the memory leak. Check for unclosed resources, event listeners, or circular references.",
        additionalInfo:
          "Consider using memory profiling tools to identify the specific objects that are not being garbage collected.",
      };
    } else if (logText.includes("timeout") || logText.includes("timed out")) {
      analysis = {
        issue: "Request Timeout",
        rootCause:
          "Requests to an external service are taking too long to complete, resulting in timeouts.",
        solution:
          "Check the health and response times of the external service. Consider increasing the timeout threshold or implementing circuit breakers.",
        additionalInfo:
          "Monitor the performance of external dependencies and set up alerts for slow response times.",
      };
    } else if (logText.includes("error") || logText.includes("exception")) {
      analysis = {
        issue: "Application Error",
        rootCause:
          "The application encountered an error during execution, possibly due to invalid input or unexpected state.",
        solution:
          "Review the error details and stack trace to identify the specific component that failed. Check input validation and error handling.",
        additionalInfo:
          "Implement more comprehensive error logging and monitoring to catch similar issues in the future.",
      };
    }

    return new Response(JSON.stringify(analysis), {
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
