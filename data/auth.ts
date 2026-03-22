export interface AdminUser {
  id:       string;
  email:    string;
  name:     string;
  role:     "admin" | "operator";
  avatar:   string;
}

// In a real app these would be hashed + stored in a DB.
// For this demo we keep credentials in memory server-side.
export const ADMIN_USERS: (AdminUser & { password: string })[] = [
  {
    id:       "usr-001",
    email:    "admin@routemind.ai",
    password: "admin123",
    name:     "Alex Rivera",
    role:     "admin",
    avatar:   "AR",
  },
  {
    id:       "usr-002",
    email:    "ops@routemind.ai",
    password: "ops123",
    name:     "Jordan Lee",
    role:     "operator",
    avatar:   "JL",
  },
];

export const SESSION_COOKIE = "rm_session";
export const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours
