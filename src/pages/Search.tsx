import { useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icons";
import { PageHeader, SectionShell } from "@/components/ui";
import { Link, usePageTitle } from "@/router";
import { mediaNav } from "@/data/nav";
import { images } from "@/data/site";
import { searchIndex, type SearchEntry } from "@/data/search";
import { usePublishedArticles } from "@/hooks/usePublished";

const mediaCrumb = { label: "Media", to: "/media/news" };

const typeTone: Record<SearchEntry["type"], string> = {
  News: "bg-brand-50 text-brand-700",
  Service: "bg-sun-50 text-sun-700",
  Examination: "bg-ink-100 text-ink-700",
  Rule: "bg-flag-50 text-flag-700",
  FAQ: "bg-brand-100 text-brand-800",
};

export function Search() {
  usePageTitle("Search");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const { articles: published } = usePublishedArticles();

  // read ?q= from hash
  useEffect(() => {
    const read = () => {
      const hash = window.location.hash;
      const q = hash.split("?")[1];
      if (q) {
        const params = new URLSearchParams(q);
        const v = params.get("q");
        if (v) {
          setQuery(v);
          setSubmitted(v);
        }
      }
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const results = useMemo(() => {
    if (!submitted.trim()) return [];
    // include published articles in search by temporarily adding them
    const publishedEntries = published.map((a) => ({
      type: "News" as const,
      title: a.title,
      excerpt: a.excerpt,
      to: `/media/news/${a.slug}`,
      icon: "newspaper" as const,
      keywords: (a.title + " " + a.excerpt + " " + a.body.join(" ")).toLowerCase(),
    }));
    const all = [...publishedEntries, ...searchIndex];
    const q = submitted.toLowerCase().trim();
    const terms = q.split(/\s+/).filter(Boolean);
    return all
      .map((e) => {
        let score = 0;
        for (const t of terms) {
          if (e.keywords.includes(t)) score += 1;
          if (e.title.toLowerCase().includes(t)) score += 2;
        }
        return { e, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.e);
  }, [submitted, published]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(query);
    if (query.trim()) {
      window.location.hash = `#/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const suggestions = [
    "MSCE results",
    "registration fees",
    "code of conduct",
    "lost certificate",
    "vacancies",
    "academic transcripts",
  ];

  return (
    <>
      <PageHeader
        title="Search"
        description="Search across news, services, examinations, rules and frequently asked questions."
        image={images.classroom}
        crumbs={[mediaCrumb, { label: "Search" }]}
      />
      <SectionShell title="Media" items={mediaNav}>
        <form onSubmit={onSubmit} className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-300"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, services, rules, FAQs…"
            autoFocus
            className="w-full rounded-2xl border border-ink-100 bg-ink-50 py-4 pl-14 pr-32 text-[16px] outline-none transition placeholder:text-ink-300 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-brand-700 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-brand-800"
          >
            Search
          </button>
        </form>

        {!submitted.trim() && (
          <div className="mt-8">
            <p className="text-[12.5px] font-bold uppercase tracking-wider text-ink-300">Try searching for</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    setSubmitted(s);
                    window.location.hash = `#/search?q=${encodeURIComponent(s)}`;
                  }}
                  className="rounded-full border border-ink-100 bg-white px-4 py-2 text-[13.5px] font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {submitted.trim() && (
          <div className="mt-8">
            <p className="text-[14px] text-ink-500">
              {results.length === 0
                ? `No results for "${submitted}".`
                : `${results.length} result${results.length === 1 ? "" : "s"} for "${submitted}".`}
            </p>

            {results.length > 0 && (
              <ul className="mt-6 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100">
                {results.map((r, i) => (
                  <li key={r.to + i}>
                    <Link
                      to={r.to}
                      className="group flex items-start gap-4 p-4 transition-colors hover:bg-ink-50/70 sm:p-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                        <Icon name={r.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className={cn("rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide", typeTone[r.type])}>
                            {r.type}
                          </span>
                        </span>
                        <span className="mt-1.5 block font-display text-[15.5px] font-bold leading-snug text-ink-900 group-hover:text-brand-700">
                          {r.title}
                        </span>
                        <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-500 line-clamp-2">
                          {r.excerpt}
                        </span>
                      </span>
                      <Icon name="arrowRight" className="mt-1 h-4 w-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </SectionShell>
    </>
  );
}
