import { news } from "@/data/media";
import { services } from "@/data/services";
import { schoolExams, ptce, codeOfConduct } from "@/data/about";
import { faqs } from "@/data/media";
import type { IconName } from "@/components/icons";

export type SearchType = "News" | "Service" | "Examination" | "Rule" | "FAQ";

export interface SearchEntry {
  type: SearchType;
  title: string;
  excerpt: string;
  to: string;
  icon: IconName;
  keywords: string;
}

function strip(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

const entries: SearchEntry[] = [];

// News
for (const n of news) {
  entries.push({
    type: "News",
    title: n.title,
    excerpt: n.excerpt,
    to: `/media/news/${n.slug}`,
    icon: "newspaper",
    keywords: strip([n.title, n.excerpt, n.category, ...n.body].join(" ")),
  });
}

// Services
for (const s of services) {
  entries.push({
    type: "Service",
    title: s.name,
    excerpt: s.short,
    to: `/services/${s.slug}`,
    icon: s.icon,
    keywords: strip([s.name, s.short, ...s.intro, ...(s.requirements ?? []), ...(s.steps ?? [])].join(" ")),
  });
}

// Examinations
for (const e of [...schoolExams, ptce]) {
  entries.push({
    type: "Examination",
    title: e.name,
    excerpt: e.summary,
    to: e.code === "PTCE" ? "/examinations/teachers" : "/examinations/school",
    icon: "graduation",
    keywords: strip([e.code, e.name, e.level, e.summary].join(" ")),
  });
}

// Code of conduct
for (const r of codeOfConduct) {
  entries.push({
    type: "Rule",
    title: r.text.slice(0, 70) + (r.text.length > 70 ? "…" : ""),
    excerpt: r.text,
    to: "/examinations/code-of-conduct",
    icon: "shield",
    keywords: strip(r.text + " " + (r.sub?.join(" ") ?? "")),
  });
}

// FAQs
for (const f of faqs) {
  entries.push({
    type: "FAQ",
    title: f.q,
    excerpt: f.a,
    to: "/faqs",
    icon: "help",
    keywords: strip(f.q + " " + f.a),
  });
}

export const searchIndex: SearchEntry[] = entries;

export function search(query: string): SearchEntry[] {
  const q = strip(query);
  if (!q) return [];
  const terms = q.split(" ").filter(Boolean);
  const scored = entries
    .map((e) => {
      const hay = e.keywords;
      let score = 0;
      for (const t of terms) {
        if (hay.includes(t)) score += 1;
        if (e.title.toLowerCase().includes(t)) score += 2;
      }
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.map((x) => x.e);
}
