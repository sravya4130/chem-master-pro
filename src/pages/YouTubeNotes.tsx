import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Youtube, Loader2, FileText, Brain, GitBranch, FunctionSquare, Star, Link, Play, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useToast } from '@/hooks/use-toast';

interface VideoInfo {
  title: string;
  thumbnail: string;
  videoId: string;
}

interface ProcessedContent {
  notes: string[];
  summary: string;
  mindMap: MindMapNode;
  formulas: Formula[];
  importantTopics: ImportantTopic[];
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

// Helper to extract video ID from YouTube URL
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

const isPlaylistUrl = (url: string): boolean => {
  return url.includes('list=');
};

// Demo processing - simulates AI-generated content
const generateDemoContent = (videoId: string, isPlaylist: boolean): ProcessedContent => ({
  notes: [
    "📌 Introduction to the core concepts covered in this video",
    "📌 Fundamental definitions and terminology explained with examples",
    "📌 Step-by-step derivation of key formulas and equations",
    "📌 Real-world applications and practical problem-solving techniques",
    "📌 Common mistakes to avoid and tips for better understanding",
    "📌 Advanced concepts and their connections to foundational topics",
    "📌 Summary of numerical examples solved in the video",
    "📌 Important points highlighted for exam preparation",
    "📌 Comparison between similar concepts for clarity",
    "📌 Quick revision notes and memory aids discussed",
  ],
  summary: `This video provides a comprehensive overview of the subject matter, starting with fundamental definitions and building up to advanced applications. The instructor covers key formulas with step-by-step derivations, provides multiple solved examples, and highlights common pitfalls students encounter. The content is structured for both conceptual understanding and exam preparation, making it an excellent resource for self-study.${isPlaylist ? '\n\nAs a playlist, it covers multiple related topics in a structured sequence, ensuring progressive learning from basics to advanced concepts.' : ''}`,
  mindMap: {
    title: "Main Topic",
    children: [
      {
        title: "Fundamentals",
        children: [
          { title: "Definitions", children: [] },
          { title: "Basic Laws", children: [] },
          { title: "Units & Dimensions", children: [] },
        ]
      },
      {
        title: "Core Concepts",
        children: [
          { title: "Key Formulas", children: [] },
          { title: "Derivations", children: [] },
          { title: "Theorems", children: [] },
        ]
      },
      {
        title: "Applications",
        children: [
          { title: "Numerical Problems", children: [] },
          { title: "Real-world Examples", children: [] },
          { title: "Practice Questions", children: [] },
        ]
      },
      {
        title: "Advanced Topics",
        children: [
          { title: "Special Cases", children: [] },
          { title: "Exceptions", children: [] },
          { title: "Cross-topic Links", children: [] },
        ]
      },
    ]
  },
  formulas: [
    { name: "Newton's Second Law", formula: "F = ma", description: "Force equals mass times acceleration" },
    { name: "Kinetic Energy", formula: "KE = ½mv²", description: "Energy of a moving object" },
    { name: "Einstein's Equation", formula: "E = mc²", description: "Mass-energy equivalence" },
    { name: "Ohm's Law", formula: "V = IR", description: "Voltage equals current times resistance" },
    { name: "Ideal Gas Law", formula: "PV = nRT", description: "Relates pressure, volume, temperature of ideal gas" },
    { name: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac)) / 2a", description: "Solutions of a quadratic equation" },
  ],
  importantTopics: [
    { topic: "Fundamental Principles", importance: "high", description: "Core laws and definitions that form the foundation of the subject" },
    { topic: "Formula Derivations", importance: "high", description: "Step-by-step derivations essential for understanding and exams" },
    { topic: "Problem Solving Techniques", importance: "high", description: "Methods and strategies for solving numerical problems" },
    { topic: "Conceptual Understanding", importance: "medium", description: "Deep understanding of why formulas work the way they do" },
    { topic: "Common Mistakes", importance: "medium", description: "Frequently made errors and how to avoid them" },
    { topic: "Advanced Applications", importance: "low", description: "Higher-level applications for competitive exams" },
  ],
});

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
      {node.children.length > 0 && (
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
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [content, setContent] = useState<ProcessedContent | null>(null);
  const [activeTab, setActiveTab] = useState('notes');

  const handleProcess = async () => {
    if (!url.trim()) {
      toast({ title: "Error", description: "Please enter a YouTube URL", variant: "destructive" });
      return;
    }

    const videoId = extractVideoId(url);
    const isPlaylist = isPlaylistUrl(url);

    if (!videoId && !isPlaylist) {
      toast({ title: "Invalid URL", description: "Please enter a valid YouTube video or playlist URL", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    setVideoInfo(null);
    setContent(null);

    // Simulate processing delay
    await new Promise(r => setTimeout(r, 2500));

    const vid = videoId || 'dQw4w9WgXcQ';
    setVideoInfo({
      title: isPlaylist ? "YouTube Playlist - Multiple Videos" : "YouTube Video",
      thumbnail: `https://img.youtube.com/vi/${vid}/hqdefault.jpg`,
      videoId: vid,
    });

    setContent(generateDemoContent(vid, isPlaylist));
    setIsProcessing(false);

    toast({ title: "✅ Processing Complete", description: "Notes, summary, mind map, formulas, and important topics have been generated!" });
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
            <p className="text-sm text-muted-foreground">Paste a YouTube video or playlist link below</p>
          </div>
          <div className="flex gap-3">
            <Input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or playlist link"
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
          <div className="flex gap-2 mt-3">
            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">📹 Single Video</span>
            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">📋 Playlist</span>
          </div>
        </Card>

        {/* Processing Animation */}
        {isProcessing && (
          <Card className="p-8 mb-6 bg-card border-border text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Processing your video...</h3>
            <p className="text-sm text-muted-foreground">Extracting transcript, generating notes, formulas, and mind map</p>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>✅ Fetching video transcript...</p>
              <p>⏳ Analyzing content with AI...</p>
              <p>⏳ Extracting formulas...</p>
              <p>⏳ Generating mind map...</p>
            </div>
          </Card>
        )}

        {/* Video Info */}
        {videoInfo && !isProcessing && (
          <Card className="p-4 mb-6 bg-card border-border">
            <div className="flex gap-4 items-center">
              <img src={videoInfo.thumbnail} alt="Video thumbnail" className="w-32 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="font-semibold">{videoInfo.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Video ID: {videoInfo.videoId}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Results Tabs */}
        {content && !isProcessing && (
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
                  <FileText className="h-5 w-5 text-primary" /> Comprehensive Notes
                </h2>
                <div className="space-y-3">
                  {content.notes.map((note, i) => (
                    <div key={i} className="p-3 bg-secondary/50 rounded-xl text-sm leading-relaxed">
                      {note}
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
                <div className="grid gap-3">
                  {content.formulas.map((f, i) => (
                    <div key={i} className="p-4 bg-secondary/50 rounded-xl border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{f.name}</h3>
                      </div>
                      <div className="text-xl font-mono text-primary font-bold mb-2 bg-background/50 p-3 rounded-lg text-center">
                        {f.formula}
                      </div>
                      <p className="text-xs text-muted-foreground">{f.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Important Topics Tab */}
            <TabsContent value="topics">
              <Card className="p-5 bg-card border-border">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" /> Important Topics Covered
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
        )}

        {/* Info Banner */}
        {!content && !isProcessing && (
          <Card className="p-6 bg-card border-border text-center">
            <Youtube className="h-16 w-16 text-red-500/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Paste a YouTube link to get started</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Upload any YouTube video or playlist link. We'll generate comprehensive notes, summaries, mind maps, extract formulas, and highlight important topics.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">📝 Notes</span>
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
