import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { fetchTimelineData } from "@/lib/api";
import { TimelineEvent } from "@/types/api";

export default function Timeline() {
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchTimelineData(timeRange);
        setTimelineData(data);
      } catch (error) {
        console.error("Failed to fetch timeline data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeRange]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Debugging Timeline
        </h1>
        <p className="text-muted-foreground">
          Track your debugging progress and MTTR over time
        </p>
      </div>

      <Tabs defaultValue="week" onValueChange={setTimeRange}>
        <TabsList>
          <TabsTrigger value="day">Last 24 Hours</TabsTrigger>
          <TabsTrigger value="week">Last Week</TabsTrigger>
          <TabsTrigger value="month">Last Month</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>MTTR Timeline</CardTitle>
          <CardDescription>
            Mean Time to Resolution for debugging issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="h-64 w-full">
              <div className="relative h-full w-full">
                {/* Timeline visualization */}
                <div className="absolute inset-0 flex items-end">
                  {timelineData.map((event, index) => (
                    <div
                      key={index}
                      className="relative flex-1"
                      style={{ height: `${(event.mttr / 8) * 100}%` }}
                    >
                      <div
                        className="mx-1 bg-primary/80 hover:bg-primary transition-colors"
                        style={{ height: "100%" }}
                      ></div>
                      <div className="absolute -bottom-6 left-0 right-0 text-center text-xs">
                        {new Date(event.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="absolute -top-6 left-0 right-0 text-center text-xs font-medium">
                        {event.mttr}h
                      </div>
                    </div>
                  ))}
                </div>
                {/* Horizontal axis */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-border"></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Debugging Events</CardTitle>
          <CardDescription>
            Detailed view of your debugging sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {timelineData.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{event.issue}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{event.mttr}h</p>
                    <p className="text-sm text-muted-foreground">
                      {event.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
