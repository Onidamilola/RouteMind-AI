export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour:   "2-digit",
    minute: "2-digit",
  });
}
