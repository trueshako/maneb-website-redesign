import { useCallback, useEffect, useState } from "react";
import type { NewsItem } from "@/data/media";

const STORAGE_KEY = "maneb.publishedArticles";

function read(): NewsItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as NewsItem[]) : [];
  } catch {
    return [];
  }
}

export function usePublishedArticles() {
  const [articles, setArticles] = useState<NewsItem[]>(() => read());

  useEffect(() => {
    const sync = () => setArticles(read());
    window.addEventListener("storage", sync);
    window.addEventListener("maneb:published", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("maneb:published", sync);
    };
  }, []);

  const publish = useCallback((article: NewsItem) => {
    const next = [article, ...read().filter((a) => a.slug !== article.slug)];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setArticles(next);
    window.dispatchEvent(new Event("maneb:published"));
  }, []);

  const remove = useCallback((slug: string) => {
    const next = read().filter((a) => a.slug !== slug);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setArticles(next);
    window.dispatchEvent(new Event("maneb:published"));
  }, []);

  return { articles, publish, remove };
}

export function publishedSlugs(): string[] {
  return read().map((a) => a.slug);
}
