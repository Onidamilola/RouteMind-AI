import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { ChatState, Message, ApiChatMessage } from "@/types";
import { uid } from "@/lib/utils";

// ─── Streaming thunk ──────────────────────────────────────────────────────────
//
// Flow:
//  1. dispatch(sendMessage(text))
//  2. Thunk POSTs conversation history to /api/chat (SSE stream)
//  3. On first token  → dispatches streamStart (creates AI bubble, isLoading→false, isStreaming→true)
//  4. On each token   → dispatches streamToken (appends delta to bubble content)
//  5. On [DONE]       → dispatches streamEnd   (marks streaming done)
//  6. On error        → dispatches streamError
//
// The thunk itself returns void — all state mutations happen via dispatched actions
// so the Redux DevTools timeline stays clean.

export const sendMessage = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  "chat/sendMessage",
  async (userContent, { dispatch, getState }) => {
    // Build conversation history for the API (exclude any streaming placeholder)
    const state = (getState() as { chat: ChatState }).chat;
    const history: ApiChatMessage[] = state.messages
      .filter((m) => !m.streaming)
      .map((m) => ({
        role:    m.role === "ai" ? "assistant" : "user",
        content: m.content,
      }));

    // Append the new user turn
    history.push({ role: "user", content: userContent });

    // Create the empty AI placeholder bubble
    const aiId = uid();
    dispatch(streamStart(aiId));

    try {
      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
      }

      if (!res.body) throw new Error("Response body is empty.");

      // ── Parse SSE stream ──
      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const data = trimmed.slice(5).trim();

          if (data === "[DONE]") {
            dispatch(streamEnd());
            return;
          }

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (typeof parsed.delta === "string") {
              dispatch(streamToken({ id: aiId, delta: parsed.delta }));
            }
          } catch (parseErr) {
            console.warn("SSE parse error:", parseErr);
          }
        }
      }

      dispatch(streamEnd());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error occurred.";
      dispatch(streamError(message));
    }
  }
);

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: ChatState = {
  messages:    [],
  isLoading:   false,
  isStreaming:  false,
  streamingId:  null,
  error:        null,
  sessionId:    uid(),
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage(state, action: PayloadAction<string>) {
      const msg: Message = {
        id:        uid(),
        role:      "user",
        content:   action.payload,
        timestamp: new Date().toISOString(),
      };
      state.messages.push(msg);
      state.error = null;
    },

    streamStart(state, action: PayloadAction<string>) {
      const aiMsg: Message = {
        id:        action.payload,
        role:      "ai",
        content:   "",
        timestamp: new Date().toISOString(),
        streaming: true,
      };
      state.messages.push(aiMsg);
      state.isLoading   = false;
      state.isStreaming  = true;
      state.streamingId  = action.payload;
      state.error        = null;
    },

    streamToken(state, action: PayloadAction<{ id: string; delta: string }>) {
      const msg = state.messages.find((m) => m.id === action.payload.id);
      if (msg) msg.content += action.payload.delta;
    },

    streamEnd(state) {
      const msg = state.messages.find((m) => m.id === state.streamingId);
      if (msg) msg.streaming = false;
      state.isStreaming = false;
      state.streamingId = null;
    },

    streamError(state, action: PayloadAction<string>) {
      state.messages    = state.messages.filter((m) => m.id !== state.streamingId);
      state.isLoading   = false;
      state.isStreaming  = false;
      state.streamingId  = null;
      state.error        = action.payload;
    },

    clearError(state) {
      state.error = null;
    },

    clearChat(state) {
      state.messages    = [];
      state.isLoading   = false;
      state.isStreaming  = false;
      state.streamingId  = null;
      state.error        = null;
      state.sessionId    = uid();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.isLoading = true;
      state.error     = null;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isLoading   = false;
      state.isStreaming  = false;
      state.error        = action.payload ?? "Something went wrong.";
    });
  },
});

export const {
  addUserMessage,
  streamStart,
  streamToken,
  streamEnd,
  streamError,
  clearError,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
