// ─── Chat types ───────────────────────────────────────────────────────────────

export type Role = "user" | "ai";

export interface Message {
  id:        string;
  role:      Role;
  content:   string;
  timestamp: string;   // ISO string — serialisable for Redux
  streaming?: boolean; // true while the AI is still writing this message
}

export interface ChatState {
  messages:        Message[];
  isLoading:       boolean;  // true from send → first token
  isStreaming:     boolean;  // true while tokens are arriving
  streamingId:     string | null; // id of the in-progress AI message
  error:           string | null;
  sessionId:       string;
}

// ─── API types ────────────────────────────────────────────────────────────────

/** Shape sent to POST /api/chat */
export interface ApiChatMessage {
  role:    "user" | "assistant";
  content: string;
}

export interface ApiChatRequest {
  messages: ApiChatMessage[];
}

// ─── Shipment types ───────────────────────────────────────────────────────────

export type ShipmentStatus = "in_transit" | "delivered" | "delayed";

export interface Shipment {
  tracking_id:        string;
  status:             ShipmentStatus;
  origin:             string;
  destination:        string;
  location:           string;          // current location
  estimated_delivery: string;          // ISO date string
  actual_delivery:    string | null;
  carrier:            string;
  weight:             string;
  customer:           string;
  email:              string;
}

// ─── Auth types ───────────────────────────────────────────────────────────────

export interface AuthUser {
  id:     string;
  email:  string;
  name:   string;
  role:   "admin" | "operator";
  avatar: string;
}

export interface AuthState {
  user:      AuthUser | null;
  isLoading: boolean;
  error:     string | null;
}

// ─── UI types ─────────────────────────────────────────────────────────────────

export interface SuggestedPrompt {
  label: string;
  text:  string;
}
