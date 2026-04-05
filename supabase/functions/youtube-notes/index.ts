import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function fetchTranscript(videoId: string): Promise<string> {
  try {
    // Fetch the YouTube video page to extract captions
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const res = await fetch(watchUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const html = await res.text();

    // Extract captions URL from the page
    const captionMatch = html.match(/"captionTracks":\s*(\[.*?\])/);
    if (!captionMatch) {
      // Try timedtext approach
      const timedTextMatch = html.match(/\\\"baseUrl\\\":\\\"(https:\/\/www\.youtube\.com\/api\/timedtext[^\\\"]+)\\\"/);
      if (timedTextMatch) {
        const captionUrl = timedTextMatch[1].replace(/\\u0026/g, "&");
        const captionRes = await fetch(captionUrl);
        const captionXml = await captionRes.text();
        return extractTextFromXml(captionXml);
      }
      return "";
    }

    const tracks = JSON.parse(captionMatch[1].replace(/\\\"/g, '"'));
    if (!tracks.length) return "";

    // Prefer English, then any available
    const track = tracks.find((t: any) => t.languageCode === "en") || tracks[0];
    const captionUrl = track.baseUrl.replace(/\\u0026/g, "&");

    const captionRes = await fetch(captionUrl);
    const captionXml = await captionRes.text();
    return extractTextFromXml(captionXml);
  } catch (e) {
    console.error("Transcript fetch error:", e);
    return "";
  }
}

function extractTextFromXml(xml: string): string {
  // Extract text from XML caption format
  const textMatches = xml.matchAll(/<text[^>]*>(.*?)<\/text>/gs);
  const parts: string[] = [];
  for (const match of textMatches) {
    let text = match[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/<[^>]+>/g, "");
    parts.push(text);
  }
  return parts.join(" ");
}

async function fetchVideoTitle(videoId: string): Promise<string> {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (res.ok) {
      const data = await res.json();
      return data.title || "YouTube Video";
    }
  } catch {}
  return "YouTube Video";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { videoId, url } = await req.json();
    if (!videoId) {
      return new Response(JSON.stringify({ error: "videoId is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Fetch transcript and title
    const [transcript, title] = await Promise.all([
      fetchTranscript(videoId),
      fetchVideoTitle(videoId),
    ]);

    if (!transcript || transcript.trim().length < 50) {
      return new Response(JSON.stringify({
        error: "Could not extract transcript from this video. The video may not have captions available."
      }), {
        status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Truncate transcript if too long (keep ~12000 chars for context window)
    const truncatedTranscript = transcript.length > 12000
      ? transcript.substring(0, 12000) + "... [transcript truncated]"
      : transcript;

    const systemPrompt = `You are an expert academic note-maker. You generate detailed, class-style study notes from video transcripts. Your output must be strictly based on the actual transcript content — never invent or hallucinate information.

You MUST return valid JSON with this exact structure:
{
  "notes": [
    {"heading": "string", "content": "string with detailed explanation, definitions, examples"}
  ],
  "summary": "A comprehensive 3-5 paragraph summary of everything covered",
  "mindMap": {
    "title": "Main Topic",
    "children": [
      {"title": "Subtopic", "children": [{"title": "Detail", "children": []}]}
    ]
  },
  "formulas": [
    {"name": "Formula Name", "formula": "mathematical expression", "description": "what it means and when to use it"}
  ],
  "importantTopics": [
    {"topic": "Topic Name", "importance": "high|medium|low", "description": "why it matters and key details"}
  ]
}

Rules:
- Notes should be comprehensive like class notes: include ALL definitions, explanations, key concepts, examples, and formulas mentioned
- Each note heading should cover a distinct concept from the video
- Include at least 8-15 note sections if content allows
- The summary must capture the full scope of the video content
- Mind map should have 3-5 main branches with 2-4 sub-items each
- Extract ALL formulas/equations mentioned (return empty array if none)
- Important topics should be ranked by how much emphasis the video gives them
- Everything must come from the actual transcript — do not add external information`;

    const userPrompt = `Video Title: "${title}"

Transcript:
${truncatedTranscript}

Generate comprehensive class-style notes from this transcript. Include every important definition, concept, formula, and example discussed. Return valid JSON only.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "AI processing failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from the AI response (handle markdown code blocks)
    let parsed;
    try {
      const jsonStr = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI JSON:", rawContent.substring(0, 500));
      return new Response(JSON.stringify({ error: "Failed to parse AI response. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      title,
      videoId,
      ...parsed,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (e) {
    console.error("youtube-notes error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
