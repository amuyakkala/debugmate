import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  BarChart2,
  AlertTriangle,
  Activity,
  Plus,
  Check,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { connectIntegration, disconnectIntegration } from "@/lib/api";

type Integration = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  connected: boolean;
  status?: "active" | "pending" | "error";
};

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "github",
      name: "GitHub",
      description:
        "Connect to your repositories to analyze commit history and issues",
      icon: Github,
      connected: true,
      status: "active",
    },
    {
      id: "datadog",
      name: "Datadog",
      description: "Import metrics and logs from your Datadog account",
      icon: BarChart2,
      connected: false,
    },
    {
      id: "sentry",
      name: "Sentry",
      description:
        "Analyze error reports and exceptions from your applications",
      icon: AlertTriangle,
      connected: false,
    },
    {
      id: "arize",
      name: "Arize",
      description: "Monitor and troubleshoot ML models in production",
      icon: Activity,
      connected: false,
    },
  ]);

  const [loading, setLoading] = useState<string | null>(null);

  const handleConnect = async (id: string) => {
    setLoading(id);
    try {
      await connectIntegration(id);
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === id
            ? { ...integration, connected: true, status: "active" }
            : integration,
        ),
      );
    } catch (error) {
      console.error(`Failed to connect ${id}:`, error);
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async (id: string) => {
    setLoading(id);
    try {
      await disconnectIntegration(id);
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === id
            ? { ...integration, connected: false, status: undefined }
            : integration,
        ),
      );
    } catch (error) {
      console.error(`Failed to disconnect ${id}:`, error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your tools to enhance debugging capabilities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <integration.icon className="h-5 w-5" />
                  {integration.name}
                  {integration.connected && (
                    <Badge
                      variant="outline"
                      className="ml-2 bg-green-50 text-green-700"
                    >
                      Connected
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="mt-1.5">
                  {integration.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {integration.connected && integration.status && (
                <div className="mb-4 flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`h-2 w-2 rounded-full ${integration.status === "active" ? "bg-green-500" : integration.status === "pending" ? "bg-yellow-500" : "bg-red-500"}`}
                    ></div>
                    <span className="capitalize">{integration.status}</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {integration.connected ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleDisconnect(integration.id)}
                  disabled={loading === integration.id}
                >
                  {loading === integration.id ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  Disconnect
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleConnect(integration.id)}
                  disabled={loading === integration.id}
                >
                  {loading === integration.id ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Connect
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sandbox Mode</CardTitle>
          <CardDescription>
            Use DebugMate without connecting any tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Sandbox mode allows you to use DebugMate's AI capabilities without
            connecting any external tools. Simply upload your logs or ask
            questions directly.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
