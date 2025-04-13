import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TimelineEvent {
  date: string;
  mttr: number; // Mean Time to Resolution in hours
  issue: string;
  status: "Resolved" | "In Progress";
}

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

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const timeRange = url.searchParams.get("timeRange") || "week";

    // In a real implementation, this would fetch data from the database
    // For now, we'll return mock data
    const data = mockTimelineData[timeRange] || mockTimelineData.week;

    return new Response(JSON.stringify(data), {
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
