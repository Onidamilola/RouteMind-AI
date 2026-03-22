export interface ChatLog {
  id:         string;
  session_id: string;
  user:       string;
  message:    string;
  resolved:   boolean;
  topic:      "tracking" | "delay" | "address" | "missing" | "general";
  timestamp:  string;
  response_time_ms: number;
}

export const CHAT_LOGS: ChatLog[] = [
  { id:"cl-001", session_id:"sess-8a3f", user:"James Thornton",   message:"Where is my package RM-001?",                        resolved:true,  topic:"tracking", timestamp:"2025-01-10T09:12:00Z", response_time_ms:820  },
  { id:"cl-002", session_id:"sess-2b7c", user:"Sarah Mitchell",   message:"My delivery RM-002 hasn't arrived yet",              resolved:true,  topic:"tracking", timestamp:"2025-01-18T14:33:00Z", response_time_ms:940  },
  { id:"cl-003", session_id:"sess-9d1e", user:"Liu Wei",          message:"RM-003 is delayed. When will it arrive?",            resolved:true,  topic:"delay",    timestamp:"2025-01-15T10:05:00Z", response_time_ms:710  },
  { id:"cl-004", session_id:"sess-4e5f", user:"Priya Kapoor",     message:"Can I reschedule RM-004 delivery?",                  resolved:true,  topic:"address",  timestamp:"2025-01-20T16:20:00Z", response_time_ms:1100 },
  { id:"cl-005", session_id:"sess-6a8b", user:"Marcus Osei",      message:"Package RM-005 tracking update needed",              resolved:true,  topic:"tracking", timestamp:"2025-01-11T08:45:00Z", response_time_ms:650  },
  { id:"cl-006", session_id:"sess-3c2d", user:"Elena Vasquez",    message:"RM-006 delayed — I need it by Friday",               resolved:false, topic:"delay",    timestamp:"2025-01-14T11:30:00Z", response_time_ms:890  },
  { id:"cl-007", session_id:"sess-7f9a", user:"Tom Andersen",     message:"Update address for RM-007",                          resolved:true,  topic:"address",  timestamp:"2025-01-22T13:15:00Z", response_time_ms:760  },
  { id:"cl-008", session_id:"sess-1b4c", user:"Aisha Nwosu",      message:"RM-008 delivered but wrong item",                    resolved:false, topic:"missing",  timestamp:"2025-01-09T15:00:00Z", response_time_ms:1320 },
  { id:"cl-009", session_id:"sess-5e6f", user:"Carlos Mendoza",   message:"Why is RM-009 delayed again?",                       resolved:true,  topic:"delay",    timestamp:"2025-01-16T09:55:00Z", response_time_ms:830  },
  { id:"cl-010", session_id:"sess-8g2h", user:"Hannah Schmidt",   message:"Track my shipment RM-010",                           resolved:true,  topic:"tracking", timestamp:"2025-01-23T12:40:00Z", response_time_ms:590  },
  { id:"cl-011", session_id:"sess-2i3j", user:"David Park",       message:"RM-011 says delivered but not received",             resolved:true,  topic:"missing",  timestamp:"2025-01-11T17:10:00Z", response_time_ms:1450 },
  { id:"cl-012", session_id:"sess-4k5l", user:"Sofia Bellini",    message:"What carrier handles RM-012?",                       resolved:true,  topic:"general",  timestamp:"2025-01-24T10:25:00Z", response_time_ms:480  },
  { id:"cl-013", session_id:"sess-6m7n", user:"Raj Patel",        message:"RM-013 shows delayed — customer complaint",          resolved:false, topic:"delay",    timestamp:"2025-01-17T14:00:00Z", response_time_ms:970  },
  { id:"cl-014", session_id:"sess-8o9p", user:"Mia Johnson",      message:"RM-014 delivered. Thank you!",                       resolved:true,  topic:"general",  timestamp:"2025-01-08T11:20:00Z", response_time_ms:320  },
  { id:"cl-015", session_id:"sess-1q2r", user:"Felix Müller",     message:"ETA for package RM-015?",                            resolved:true,  topic:"tracking", timestamp:"2025-01-25T09:00:00Z", response_time_ms:700  },
  { id:"cl-016", session_id:"sess-3s4t", user:"Yuki Tanaka",      message:"RM-016 delayed — need urgent update",                resolved:true,  topic:"delay",    timestamp:"2025-01-13T16:45:00Z", response_time_ms:1050 },
  { id:"cl-017", session_id:"sess-5u6v", user:"Nina Kowalski",    message:"When will RM-017 be delivered?",                     resolved:true,  topic:"tracking", timestamp:"2025-01-14T08:30:00Z", response_time_ms:610  },
  { id:"cl-018", session_id:"sess-7w8x", user:"Omar Hassan",      message:"Can I change delivery time for RM-018?",             resolved:true,  topic:"address",  timestamp:"2025-01-26T13:50:00Z", response_time_ms:890  },
  { id:"cl-019", session_id:"sess-9y0z", user:"Lena Bergström",   message:"RM-019 arrived — contents damaged",                  resolved:false, topic:"missing",  timestamp:"2025-01-13T15:30:00Z", response_time_ms:1600 },
  { id:"cl-020", session_id:"sess-a1b2", user:"Ben Carter",       message:"RM-020 still showing in transit after 5 days",       resolved:true,  topic:"delay",    timestamp:"2025-01-15T10:45:00Z", response_time_ms:780  },
  { id:"cl-021", session_id:"sess-c3d4", user:"Amara Diallo",     message:"Track RM-021 please",                                resolved:true,  topic:"tracking", timestamp:"2025-01-27T11:00:00Z", response_time_ms:540  },
  { id:"cl-022", session_id:"sess-e5f6", user:"Ivan Petrov",      message:"RM-022 delivery confirmation needed",                resolved:true,  topic:"general",  timestamp:"2025-01-15T14:20:00Z", response_time_ms:420  },
  { id:"cl-023", session_id:"sess-g7h8", user:"Grace O'Brien",    message:"How do I track RM-023?",                             resolved:true,  topic:"tracking", timestamp:"2025-01-28T09:10:00Z", response_time_ms:490  },
  { id:"cl-024", session_id:"sess-i9j0", user:"Kenji Watanabe",   message:"RM-024 delayed — what happened?",                   resolved:true,  topic:"delay",    timestamp:"2025-01-16T16:00:00Z", response_time_ms:920  },
  { id:"cl-025", session_id:"sess-k1l2", user:"Fatima Al-Rashid", message:"RM-025 delivered on time. Great service!",           resolved:true,  topic:"general",  timestamp:"2025-01-16T12:30:00Z", response_time_ms:290  },
  { id:"cl-026", session_id:"sess-m3n4", user:"Luke Patterson",   message:"RM-026 current location?",                          resolved:true,  topic:"tracking", timestamp:"2025-01-29T10:15:00Z", response_time_ms:610  },
  { id:"cl-027", session_id:"sess-o5p6", user:"Ana Lima",         message:"RM-027 status update please",                        resolved:true,  topic:"tracking", timestamp:"2025-01-17T13:40:00Z", response_time_ms:570  },
  { id:"cl-028", session_id:"sess-q7r8", user:"Noah Williams",    message:"Can RM-028 be redirected to a new address?",         resolved:true,  topic:"address",  timestamp:"2025-01-30T11:25:00Z", response_time_ms:1020 },
  { id:"cl-029", session_id:"sess-s9t0", user:"Zara Ahmed",       message:"RM-029 delayed — this is the second time",          resolved:false, topic:"delay",    timestamp:"2025-01-18T15:10:00Z", response_time_ms:1380 },
  { id:"cl-030", session_id:"sess-u1v2", user:"Ethan Brooks",     message:"RM-030 tracking shows delivered — confirmed!",       resolved:true,  topic:"general",  timestamp:"2025-01-18T09:50:00Z", response_time_ms:340  },
  { id:"cl-031", session_id:"sess-w3x4", user:"Maya Rodriguez",   message:"ETA for RM-031?",                                   resolved:true,  topic:"tracking", timestamp:"2025-01-31T12:00:00Z", response_time_ms:660  },
  { id:"cl-032", session_id:"sess-y5z6", user:"Sam Okafor",       message:"RM-032 arrived safely",                              resolved:true,  topic:"general",  timestamp:"2025-01-19T10:05:00Z", response_time_ms:310  },
  { id:"cl-033", session_id:"sess-a7b8", user:"Chloe Dupont",     message:"RM-033 delayed — urgent escalation needed",          resolved:false, topic:"delay",    timestamp:"2025-01-19T14:30:00Z", response_time_ms:1250 },
  { id:"cl-034", session_id:"sess-c9d0", user:"Ali Hassan",       message:"Where is RM-034 right now?",                        resolved:true,  topic:"tracking", timestamp:"2025-02-01T08:20:00Z", response_time_ms:580  },
  { id:"cl-035", session_id:"sess-e1f2", user:"Isla Morrison",    message:"RM-035 confirmed delivered",                         resolved:true,  topic:"general",  timestamp:"2025-01-20T11:45:00Z", response_time_ms:360  },
  { id:"cl-036", session_id:"sess-g3h4", user:"Leo Nakamura",     message:"RM-036 update needed",                              resolved:true,  topic:"tracking", timestamp:"2025-02-02T13:00:00Z", response_time_ms:620  },
  { id:"cl-037", session_id:"sess-i5j6", user:"Sara Lindqvist",   message:"RM-037 is delayed — want refund",                   resolved:false, topic:"delay",    timestamp:"2025-01-20T16:50:00Z", response_time_ms:1470 },
  { id:"cl-038", session_id:"sess-k7l8", user:"Ahmed Siddiqui",   message:"RM-038 delivered successfully",                      resolved:true,  topic:"general",  timestamp:"2025-01-21T09:15:00Z", response_time_ms:280  },
  { id:"cl-039", session_id:"sess-m9n0", user:"Ruby Clarke",      message:"Where is RM-039 in transit?",                       resolved:true,  topic:"tracking", timestamp:"2025-02-03T10:30:00Z", response_time_ms:640  },
  { id:"cl-040", session_id:"sess-o1p2", user:"Paulo Ferreira",   message:"RM-040 arrived — thank you",                        resolved:true,  topic:"general",  timestamp:"2025-01-22T12:00:00Z", response_time_ms:300  },
  { id:"cl-041", session_id:"sess-q3r4", user:"Nora Fitzgerald",  message:"RM-041 ETA?",                                       resolved:true,  topic:"tracking", timestamp:"2025-02-04T11:10:00Z", response_time_ms:520  },
  { id:"cl-042", session_id:"sess-s5t6", user:"Jae-Won Kim",      message:"RM-042 delay notification received — update?",      resolved:true,  topic:"delay",    timestamp:"2025-01-21T14:45:00Z", response_time_ms:880  },
  { id:"cl-043", session_id:"sess-u7v8", user:"Valentina Cruz",   message:"RM-043 confirmed — perfect timing",                 resolved:true,  topic:"general",  timestamp:"2025-01-23T10:20:00Z", response_time_ms:270  },
  { id:"cl-044", session_id:"sess-w9x0", user:"Oliver Stone",     message:"Track RM-044",                                      resolved:true,  topic:"tracking", timestamp:"2025-02-05T09:35:00Z", response_time_ms:590  },
  { id:"cl-045", session_id:"sess-y1z2", user:"Ingrid Holm",      message:"RM-045 delay — critical shipment",                  resolved:false, topic:"delay",    timestamp:"2025-01-22T15:20:00Z", response_time_ms:1340 },
  { id:"cl-046", session_id:"sess-a3b4", user:"Tyler Green",      message:"RM-046 delivered on schedule",                      resolved:true,  topic:"general",  timestamp:"2025-01-24T11:00:00Z", response_time_ms:320  },
  { id:"cl-047", session_id:"sess-c5d6", user:"Mei Chen",         message:"When will RM-047 arrive?",                          resolved:true,  topic:"tracking", timestamp:"2025-02-06T12:15:00Z", response_time_ms:670  },
  { id:"cl-048", session_id:"sess-e7f8", user:"Jake Murphy",      message:"RM-048 arrived early — impressed!",                 resolved:true,  topic:"general",  timestamp:"2025-01-24T08:50:00Z", response_time_ms:240  },
  { id:"cl-049", session_id:"sess-g9h0", user:"Layla Al-Amin",    message:"RM-049 live tracking please",                       resolved:true,  topic:"tracking", timestamp:"2025-02-07T10:00:00Z", response_time_ms:550  },
  { id:"cl-050", session_id:"sess-i1j2", user:"Connor Walsh",     message:"RM-050 delayed again — escalating",                 resolved:false, topic:"delay",    timestamp:"2025-01-23T16:30:00Z", response_time_ms:1560 },
];
