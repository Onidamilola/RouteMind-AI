import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { findShipment } from "@/data/shipments";

// ─── System prompt ────────────────────────────────────────────────────────────

const BASE_SYSTEM_PROMPT = `You are a logistics AI assistant for RouteMind. Help users track packages, answer delivery questions, and provide helpful logistics support.

You can help with:
- Package tracking and delivery status updates
- Estimated delivery times and delays
- Address changes and delivery rescheduling
- Lost, damaged, or missing package claims
- General shipping and logistics questions

Guidelines:
- Be concise, friendly, and professional
- Use **bold** for order numbers, dates, locations, and key information
- If you need a tracking ID and the user hasn't provided one, politely ask for it
- For urgent issues (lost/damaged packages), express empathy first
- Keep responses focused and actionable
- If shipment data is provided in the context, use it to give a precise, data-driven answer`;

// ─── Extract tracking IDs from message text ───────────────────────────────────

function extractTrackingIds(text: string): string[] {
  // Matches RM-001 through RM-999 (case-insensitive)
  const matches = text.match(/RM-\d{3}/gi) ?? [];
  return [...new Set(matches.map((m) => m.toUpperCase()))];
}

// ─── Build shipment context block ────────────────────────────────────────────

function buildShipmentContext(trackingIds: string[]): string {
  const found = trackingIds
    .map((id) => findShipment(id))
    .filter(Boolean);

  if (found.length === 0) return "";

  const lines = found.map((s) => {
    if (!s) return "";
    const statusLabel =
      s.status === "in_transit" ? "In Transit 🚚"
      : s.status === "delivered" ? "Delivered ✅"
      : "Delayed ⚠️";

    return `
SHIPMENT DATA FOR ${s.tracking_id}:
  Customer:           ${s.customer} (${s.email})
  Status:             ${statusLabel}
  Current location:   ${s.location}
  Route:              ${s.origin} → ${s.destination}
  Carrier:            ${s.carrier}
  Weight:             ${s.weight}
  Estimated delivery: ${s.estimated_delivery}${s.actual_delivery ? `\n  Actual delivery:    ${s.actual_delivery}` : ""}
  ${s.status === "delayed" ? "⚠️  This shipment is currently delayed. Acknowledge the inconvenience and offer to escalate." : ""}
  ${s.status === "delivered" ? "✅  This shipment has been delivered. Confirm and offer to help with anything else." : ""}
    `.trim();
  });

  return `\n\n--- LIVE SHIPMENT DATA (use this to answer the user) ---\n${lines.join("\n\n")}\n--- END SHIPMENT DATA ---`;
}

// ─── OpenAI client ────────────────────────────────────────────────────────────

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set in environment variables.");
  return new OpenAI({ apiKey });
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role:    "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

// ─── POST /api/chat ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON in request body." }, { status: 400 });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages must be a non-empty array." }, { status: 400 });
  }

  let openai: OpenAI;
  try {
    openai = getOpenAIClient();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server configuration error.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  // ── Extract tracking IDs from the full conversation ──
  const allText   = messages.map((m) => m.content).join(" ");
  const ids       = extractTrackingIds(allText);
  const shipCtx   = buildShipmentContext(ids);

  // ── Build system prompt (with shipment context injected if relevant) ──
  const systemContent = BASE_SYSTEM_PROMPT + shipCtx;

  const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemContent },
    ...messages.map((m) => ({
      role:    m.role === "ai" ? ("assistant" as const) : (m.role as "user" | "assistant"),
      content: m.content,
    })),
  ];

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  // ── Stream response ──
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model,
          messages:    openaiMessages,
          stream:      true,
          temperature: 0.6,
          max_tokens:  700,
        });

        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
          }
          if (chunk.choices[0]?.finish_reason === "stop") {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          }
        }
      } catch (err: unknown) {
        const msg =
          err instanceof OpenAI.APIError
            ? `OpenAI error ${err.status}: ${err.message}`
            : "Unexpected error while streaming.";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type":                "text/event-stream",
      "Cache-Control":               "no-cache, no-transform",
      "Connection":                  "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
