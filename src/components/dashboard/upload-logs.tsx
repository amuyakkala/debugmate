import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzeLogData } from "@/lib/api";
import { LogAnalysisResult } from "@/types/api";

export default function UploadLogs() {
  const [logText, setLogText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LogAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logText.trim()) {
      setError("Please enter log data to analyze");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeLogData(logText);
      setResult(analysisResult);
    } catch (err) {
      setError("Failed to analyze logs. Please try again.");
      console.error("Log analysis error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleData = () => {
    setLogText(`2023-06-15T14:32:45.123Z ERROR [app.service] Failed to connect to database: Connection refused
2023-06-15T14:32:46.234Z ERROR [app.service] Retrying database connection (1/3)
2023-06-15T14:32:47.345Z ERROR [app.service] Retrying database connection (2/3)
2023-06-15T14:32:48.456Z ERROR [app.service] Retrying database connection (3/3)
2023-06-15T14:32:49.567Z ERROR [app.service] Maximum retry attempts reached, giving up
2023-06-15T14:32:50.678Z ERROR [app.controller] Service unavailable: Database connection failed
2023-06-15T14:32:51.789Z INFO [app.middleware] Request failed: GET /api/users 503 Service Unavailable`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Logs</h1>
        <p className="text-muted-foreground">
          Analyze your logs with AI to identify issues and solutions
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Log Analysis</CardTitle>
            <CardDescription>
              Paste your logs below or upload a log file for AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Paste your logs here..."
                className="min-h-[200px] font-mono text-sm"
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSampleData}
                >
                  Use Sample Data
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                "Analyze Logs"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Issue Detected</h3>
                <p className="text-muted-foreground">{result.issue}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Root Cause</h3>
                <p className="text-muted-foreground">{result.rootCause}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Recommended Solution</h3>
                <p className="text-muted-foreground">{result.solution}</p>
              </div>
              {result.additionalInfo && (
                <div>
                  <h3 className="text-lg font-medium">
                    Additional Information
                  </h3>
                  <p className="text-muted-foreground">
                    {result.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
