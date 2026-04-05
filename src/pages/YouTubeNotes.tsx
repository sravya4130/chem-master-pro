import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Youtube, Loader2, FileText, Brain, GitBranch, FunctionSquare, Star, Link, Play, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NoteSection {
  heading: string;
  content: string;
}

interface MindMapNode {
  title: string;
  children: MindMapNode[];
}

interface Formula {
  name: string;
  formula: string;
  description: string;
}

interface ImportantTopic {
  topic: string;
  importance: 'high' | 'medium' | 'low';
  description: string;
}

interface ProcessedContent {
  title: string;
  notes: NoteSection[];
  summary: string;
  mindMap: MindMapNode;
  formulas: Formula[];
  importantTopics: ImportantTopic[];
}

const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const MindMapView = ({ node, depth = 0 }: { node: MindMapNode; depth?: number }) => {
  const colors = [
    'border-primary bg-primary/10 text-primary',
    'border-blue-500 bg-blue-500/10 text-blue-400',
    'border-green-500 bg-green-500/10 text-green-400',
    'border-amber-500 bg-amber-500/10 text-amber-400',
  ];
  const colorClass = colors[depth % colors.length];

  return (
    <div className={`${depth > 0 ? 'ml-6 mt-2' : ''}`}>
      <div className={`inline-block px-4 py-2 rounded-xl border-2 ${colorClass} font-medium text-sm`}>
        {node.title}
      </div>
      {node.children?.length > 0 && (
        <div className="border-l-2 border-border/50 ml-4 pl-2">
          {node.children.map((child, i) => (
            <MindMapView key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const YouTubeNotes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [content, setContent] = useState<ProcessedContent | null>(null);
  const [activeTab, setActiveTab] = useState('notes');
  const [processingStep, setProcessingStep] = useState('');

  const handleProcess = async () => {
    if (!url.trim()) {
      toast({ title: "Error", description: "Please enter a YouTube URL", variant: "destructive" });
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({ title: "Invalid URL", description: "Please enter a valid YouTube video URL", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    setContent(null);

    try {
      setProcessingStep("Extracting transcript from video...");
      
      const { data, error } = await supabase.functions.invoke('youtube-notes', {
        body: { videoId, url }
      });

      if (error) {
        throw new Error(error.message || "Processing failed");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setContent({
        title: data.title || "YouTube Video",
        notes: data.notes || [],
        summary: data.summary || "",
        mindMap: data.mindMap || { title: "No mind map", children: [] },
        formulas: data.formulas || [],
        importantTopics: data.importantTopics || [],
      });

      toast({ title: "✅ Processing Complete", description: "Class-style notes have been generated from the video!" });
    } catch (err: any) {
      console.error("Processing error:", err);
      toast({
        title: "Processing Failed",
        description: err.message || "Could not process this video. Please try another.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const importanceBadge = (level: 'high' | 'medium' | 'low') => {
    const styles = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[level]}`}>
        {level.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppSidebar />

      <div className="max-w-4xl mx-auto px-4 py-6 pt-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-card hover:bg-secondary transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Youtube className="h-6 w-6 text-red-500" />
            <h1 className="text-2xl font-bold">YouTube Notes Generator</h1>
          </div>
        </div>

        {/* URL Input */}
        <Card className="p-5 mb-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <Link className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Paste a YouTube video link to generate class-style notes</p>
          </div>
          <div className="flex gap-3">
            <Input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1"
              onKeyDown={e => e.key === 'Enter' && handleProcess()}
            />
            <Button onClick={handleProcess} disabled={isProcessing} className="gap-2 min-w-[130px]">
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Processing Animation */}
        {isProcessing && (
          <Card className="p-8 mb-6 bg-card border-border text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Processing your video with AI...</h3>
            <p className="text-sm text-muted-foreground">{processingStep}</p>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>📝 Extracting transcript → Analyzing with AI → Generating notes</p>
              <p className="text-muted-foreground/50">This may take 15-30 seconds</p>
            </div>
          </Card>
        )}

        {/* Video Info & Results */}
        {content && !isProcessing && (
          <>
            <Card className="p-4 mb-6 bg-card border-border">
              <div className="flex gap-4 items-center">
                <img
                  src={`https://img.youtube.com/vi/${extractVideoId(url)}/hqdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-32 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{content.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">AI-generated class notes</p>
                </div>
              </div>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-5 mb-4">
                <TabsTrigger value="notes" className="gap-1 text-xs">
                  <FileText className="h-3.5 w-3.5" /> Notes
                </TabsTrigger>
                <TabsTrigger value="summary" className="gap-1 text-xs">
                  <List className="h-3.5 w-3.5" /> Summary
                </TabsTrigger>
                <TabsTrigger value="mindmap" className="gap-1 text-xs">
                  <GitBranch className="h-3.5 w-3.5" /> Mind Map
                </TabsTrigger>
                <TabsTrigger value="formulas" className="gap-1 text-xs">
                  <FunctionSquare className="h-3.5 w-3.5" /> Formulas
                </TabsTrigger>
                <TabsTrigger value="topics" className="gap-1 text-xs">
                  <Star className="h-3.5 w-3.5" /> Topics
                </TabsTrigger>
              </TabsList>

              {/* Notes Tab */}
              <TabsContent value="notes">
                <Card className="p-5 bg-card border-border">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> Class Notes
                  </h2>
                  <div className="space-y-4">
                    {content.notes.map((note, i) => (
                      <div key={i} className="p-4 bg-secondary/50 rounded-xl">
                        <h3 className="font-semibold text-primary mb-2">{note.heading}</h3>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Summary Tab */}
              <TabsContent value="summary">
                <Card className="p-5 bg-card border-border">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <List className="h-5 w-5 text-blue-400" /> Content Summary
                  </h2>
                  <div className="p-4 bg-secondary/50 rounded-xl text-sm leading-relaxed whitespace-pre-line">
                    {content.summary}
                  </div>
                </Card>
              </TabsContent>

              {/* Mind Map Tab */}
              <TabsContent value="mindmap">
                <Card className="p-5 bg-card border-border overflow-x-auto">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-green-400" /> Mind Map
                  </h2>
                  <MindMapView node={content.mindMap} />
                </Card>
              </TabsContent>

              {/* Formulas Tab */}
              <TabsContent value="formulas">
                <Card className="p-5 bg-card border-border">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FunctionSquare className="h-5 w-5 text-amber-400" /> Extracted Formulas
                  </h2>
                  {content.formulas.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">No formulas were found in this video.</p>
                  ) : (
                    <div className="grid gap-3">
                      {content.formulas.map((f, i) => (
                        <div key={i} className="p-4 bg-secondary/50 rounded-xl border border-border/50">
                          <h3 className="font-semibold text-sm mb-2">{f.name}</h3>
                          <div className="text-xl font-mono text-primary font-bold mb-2 bg-background/50 p-3 rounded-lg text-center">
                            {f.formula}
                          </div>
                          <p className="text-xs text-muted-foreground">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* Important Topics Tab */}
              <TabsContent value="topics">
                <Card className="p-5 bg-card border-border">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" /> Important Topics
                  </h2>
                  <div className="space-y-3">
                    {content.importantTopics.map((t, i) => (
                      <div key={i} className="p-4 bg-secondary/50 rounded-xl border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{t.topic}</h3>
                          {importanceBadge(t.importance)}
                        </div>
                        <p className="text-sm text-muted-foreground">{t.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Empty State */}
        {!content && !isProcessing && (
          <Card className="p-6 bg-card border-border text-center">
            <Youtube className="h-16 w-16 text-red-500/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Paste a YouTube link to get started</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              AI will extract the transcript and generate detailed class-style notes with definitions, explanations, formulas, mind maps, and key topics.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">📝 Class Notes</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">📋 Summary</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">🧠 Mind Map</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">📐 Formulas</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">⭐ Topics</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default YouTubeNotes;
