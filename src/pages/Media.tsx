import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icons";
import { Callout, Card, CardTitle, CheckList, H2, PageHeader, Prose, SectionShell } from "@/components/ui";
import { Link, usePageTitle } from "@/router";
import { mediaNav } from "@/data/nav";
import { images } from "@/data/site";
import { usePublishedArticles } from "@/hooks/usePublished";
import {
  getNews,
  news,
  tenders,
  vacancies,
  type NewsCategory,
  type NewsItem,
  type Vacancy,
} from "@/data/media";

const mediaCrumb = { label: "Media", to: "/media/news" };

function renderInline(text: string): ReactNode {
  // Simple inline formatting: **bold**, *italic*, [text](url)
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const m = match[0];
    if (m.startsWith("**")) {
      parts.push(<strong key={key++}>{m.slice(2, -2)}</strong>);
    } else if (m.startsWith("*")) {
      parts.push(<em key={key++}>{m.slice(1, -1)}</em>);
    } else {
      const lm = m.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (lm) {
        parts.push(
          <a key={key++} href={lm[2]} target="_blank" rel="noreferrer" className="font-semibold text-brand-700 underline hover:text-brand-900">
            {lm[1]}
          </a>,
        );
      } else {
        parts.push(m);
      }
    }
    last = match.index + m.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
}

/* ------------------------------ News card ------------------------------ */

export function NewsCard({ item, featured }: { item: NewsItem; featured?: boolean }) {
  return (
    <Link
      to={`/media/news/${item.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lift",
        featured && "md:flex-row",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-ink-100",
          featured ? "aspect-[16/10] md:aspect-auto md:min-h-[320px] md:w-1/2" : "aspect-[16/10]",
        )}
      >
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-800">
          {item.category}
        </span>
      </div>
      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "md:justify-center md:p-8")}>
        <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-300">
          <Icon name="calendar" className="h-3.5 w-3.5" />
          {item.date}
        </p>
        <h3
          className={cn(
            "mt-2 font-display font-bold leading-snug text-ink-900",
            featured ? "text-[1.35rem] sm:text-[1.6rem]" : "text-[16.5px]",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-2.5 text-[14px] leading-relaxed text-ink-500",
            featured ? "line-clamp-4" : "line-clamp-2",
          )}
        >
          {item.excerpt}
        </p>
        {item.author && item.author !== "MANEB" && (
          <p className="mt-2 text-[12px] text-ink-300">By {item.author}</p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-brand-700">
          Read story
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------ News list ------------------------------ */

const categories: ("All" | NewsCategory)[] = ["All", "Announcements", "Results", "Awards", "Press"];

export function NewsList() {
  usePageTitle("News & Events");
  const [filter, setFilter] = useState<"All" | NewsCategory>("All");
  const { articles: published } = usePublishedArticles();
  const merged = [...published, ...news.filter((n) => !published.some((p) => p.slug === n.slug))];
  const list = filter === "All" ? merged : merged.filter((n) => n.category === filter);
  const [first, ...rest] = list;

  return (
    <>
      <PageHeader
        title="News & Events"
        description="Announcements, results releases and stories from the Malawi National Examinations Board."
        image={images.classroom}
        crumbs={[mediaCrumb, { label: "News & Events" }]}
      />
      <SectionShell title="Media" items={mediaNav}>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter news">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
                filter === c
                  ? "bg-brand-700 text-white"
                  : "bg-ink-50 text-ink-500 hover:bg-ink-100 hover:text-ink-900",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {first && (
          <div className="mt-8">
            <NewsCard item={first} featured />
          </div>
        )}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {rest.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        )}
      </SectionShell>
    </>
  );
}

/* ---------------------------- News article ----------------------------- */

export function NewsArticle({ slug }: { slug: string }) {
  const { articles: published } = usePublishedArticles();
  const item = published.find((a) => a.slug === slug) ?? getNews(slug);
  usePageTitle(item?.title ?? "News");

  if (!item) {
    return (
      <>
        <PageHeader title="Story not found" image={images.classroom} crumbs={[mediaCrumb, { label: "News" }]} />
        <SectionShell title="Media" items={mediaNav}>
          <Callout icon="info" title="This story is no longer available">
            <Link to="/media/news" className="font-semibold text-brand-700 hover:underline">
              Browse all news & events
            </Link>
          </Callout>
        </SectionShell>
      </>
    );
  }

  const official = !item.image.startsWith("https://");
  const more = news.filter((n) => n.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHeader
        title={item.title}
        eyebrow={`${item.category} · ${item.date}`}
        image={item.image}
        crumbs={[mediaCrumb, { label: "News & Events", to: "/media/news" }, { label: "Story" }]}
      />
      <SectionShell title="Media" items={mediaNav}>
        <article className="max-w-3xl">
          <figure className={cn(official && "max-w-xl")}>
            <img src={item.image} alt={item.title} className="aspect-[16/9] w-full rounded-2xl object-cover" />
            {official && (
              <figcaption className="mt-2.5 text-[12.5px] text-ink-300">Photo: Malawi National Examinations Board</figcaption>
            )}
          </figure>

          <div className="mt-8 space-y-5">
            {item.blocks && item.blocks.length > 0 ? (
              item.blocks.map((b, i) =>
                b.type === "text" ? (
                  <p key={i} className="text-[16px] leading-[1.8] text-ink-700">
                    {renderInline(b.content || "")}
                  </p>
                ) : (
                  <figure key={i} className="my-2">
                    <img src={b.src} alt={b.alt || ""} className="w-full rounded-2xl" />
                    {b.caption && <figcaption className="mt-2 text-[13px] text-ink-500">{b.caption}</figcaption>}
                  </figure>
                ),
              )
            ) : (
              item.body.map((p, i) => (
                <p key={i} className="text-[16px] leading-[1.8] text-ink-700">{p}</p>
              ))
            )}
          </div>

          {item.author && (
            <p className="mt-8 text-[13.5px] text-ink-500">
              By <span className="font-semibold text-ink-700">{item.author}</span>
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink-100 pt-6">
            <Link
              to="/media/news"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-700 hover:text-brand-900"
            >
              <Icon name="arrowLeft" className="h-4 w-4" />
              All news
            </Link>
            <a
              href="https://www.maneb.edu.mw/medium/news-events.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-500 hover:text-ink-900"
            >
              View on maneb.edu.mw
              <Icon name="external" className="h-3.5 w-3.5" />
            </a>
          </div>
        </article>

        <div className="mt-14">
          <H2>More from MANEB</H2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {more.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  );
}

/* ------------------------------ Vacancies ------------------------------ */

function VacancyCard({ vacancy, defaultOpen = false }: { vacancy: Vacancy; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const isOpen = vacancy.status === "Open";

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1",
                isOpen ? "bg-brand-50 text-brand-700 ring-brand-200" : "bg-ink-50 text-ink-500 ring-ink-100",
              )}
            >
              {vacancy.status}
            </span>
            <span className="text-[12.5px] text-ink-500">
              {vacancy.type} · {vacancy.posted}
            </span>
          </div>
          <h3 className="mt-2.5 font-display text-[17px] font-bold leading-snug text-ink-900">{vacancy.title}</h3>
        </div>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            open ? "rotate-45 bg-brand-700 text-white" : "bg-ink-50 text-ink-500",
          )}
        >
          <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </button>

      <div className={cn("grid transition-[grid-template-rows] duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="space-y-6 border-t border-ink-100 p-5 sm:p-6">
            <p className="text-[14.5px] leading-relaxed text-ink-700">{vacancy.summary}</p>
            {vacancy.duties && (
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-ink-300">Key duties</p>
                <CheckList items={vacancy.duties} className="mt-3" />
              </div>
            )}
            {vacancy.qualifications && (
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-ink-300">Qualifications & experience</p>
                <CheckList items={vacancy.qualifications} className="mt-3" />
              </div>
            )}
            <Callout icon="send" title={isOpen ? "How to apply" : "Applications"}>
              {vacancy.apply}
            </Callout>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Vacancies() {
  usePageTitle("Vacancies");
  const open = vacancies.filter((v) => v.status === "Open");
  const closed = vacancies.filter((v) => v.status === "Closed");

  return (
    <>
      <PageHeader
        title="Vacancies"
        description="Careers at the Board and opportunities for qualified teachers to mark national examinations."
        image={images.ictLab}
        crumbs={[mediaCrumb, { label: "Vacancies" }]}
      />
      <SectionShell title="Media" items={mediaNav}>
        <Prose>
          <p>
            MANEB is a parastatal organisation established by an Act of Parliament to conduct academic and other
            examinations at the conclusion of any approved course in Malawi, and to award certificates to successful
            candidates. Opportunities to join the Board are advertised here and in the press.
          </p>
        </Prose>

        <H2 className="mt-10">Open opportunities</H2>
        <div className="mt-5 space-y-4">
          {open.map((v) => (
            <VacancyCard key={v.title} vacancy={v} defaultOpen />
          ))}
        </div>

        <H2 className="mt-12">Recently closed</H2>
        <div className="mt-5 space-y-4">
          {closed.map((v) => (
            <VacancyCard key={v.title} vacancy={v} />
          ))}
        </div>
      </SectionShell>
    </>
  );
}

/* ------------------------------- Tenders ------------------------------- */

export function Tenders() {
  usePageTitle("Tenders");

  return (
    <>
      <PageHeader
        title="Tenders"
        description="Procurement opportunities and notices from the Malawi National Examinations Board."
        image={images.walkToSchool}
        crumbs={[mediaCrumb, { label: "Tenders" }]}
      />
      <SectionShell title="Media" items={mediaNav}>
        <div className="rounded-3xl border border-dashed border-ink-100 bg-ink-50/60 px-6 py-12 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft">
            <Icon name="landmark" className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-[1.35rem] font-bold text-ink-900">There are no tenders at the moment</h2>
          <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-ink-500">
            Feel free to check again — new procurement notices are published here as they are advertised.
          </p>
        </div>

        <H2 className="mt-12">Past notices</H2>
        <div className="mt-5 space-y-4">
          {tenders.map((t) => (
            <div key={t.title} className="rounded-2xl border border-ink-100 p-5 sm:p-6">
              <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-500 ring-1 ring-ink-100">
                {t.status}
              </span>
              <h3 className="mt-3 font-display text-[16.5px] font-bold leading-snug text-ink-900">{t.title}</h3>
              <p className="mt-1.5 text-[13px] text-ink-500">{t.reference}</p>
            </div>
          ))}
        </div>

        <Card className="mt-8 bg-ink-50/60">
          <CardTitle icon="building" title="Procurement enquiries" />
          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-700">
            Procurement and Disposal Unit, Malawi National Examinations Board, Malemia Road next to Old Parliament
            Building, P.O. Box 191, Zomba.
          </p>
          <p className="mt-2 text-[14px] font-semibold text-brand-700">{tenders[0].contact}</p>
        </Card>
      </SectionShell>
    </>
  );
}
