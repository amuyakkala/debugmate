import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SendHorizontal, Bot, User, Loader2 } from "lucide-react";
import { askAIAssistant } from "@/lib/api";
import { ChatMessage } from "@/types/api";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI debugging assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await askAIAssistant(input, messages);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error("Error asking AI assistant:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions about your code, logs, or debugging issues
        </p>
      </div>

      <Card className="flex h-[calc(100vh-12rem)] flex-col">
        <CardHeader>
          <CardTitle>Debugging Assistant</CardTitle>
          <CardDescription>
            Ask me anything about your debugging issues
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4 pb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`}
                  >
                    <div className="mt-0.5">
                      {message.role === "assistant" ? (
                        <Bot className="h-5 w-5" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    <div className="break-words">{message.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] items-start gap-3 rounded-lg bg-muted p-3">
                    <div className="mt-0.5">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <Separator />
        <CardFooter className="pt-4">
          {messages.length === 1 && (
            <div className="mb-4 grid w-full grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  handleSampleQuestion("Why did my pipeline fail?")
                }
              >
                Why did my pipeline fail?
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  handleSampleQuestion(
                    "What's causing these database timeouts?",
                  )
                }
              >
                Database timeouts?
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  handleSampleQuestion("How can I fix this memory leak?")
                }
              >
                Fix memory leak
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  handleSampleQuestion("Explain this error message")
                }
              >
                Explain error message
              </Button>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2"
          >
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
