import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icons";
import { PageHeader, SectionShell } from "@/components/ui";
import { Link, usePageTitle } from "@/router";
import { mediaNav } from "@/data/nav";
import { images } from "@/data/site";
import { downloads, faqs, type DownloadCategory } from "@/data/media";

const mediaCrumb = { label: "Media", to: "/media/news" };

/* -------------------------------- Downloads -------------------------------- */

export function Downloads() {
  usePageTitle("Downloads");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | DownloadCategory>("All");

  const categories: ("All" | DownloadCategory)[] = [
    "All",
    ...Array.from(new Set(downloads.map((d) => d.category))),
  ];
  const list = downloads.filter(
    (d) =>
      (category === "All" || d.category === category) &&
      d.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Downloads"
        description="Examination timetables, application forms, press statements and publications."
        image={images.textbooks}
        crumbs={[mediaCrumb, { label: "Downloads" }]}
      />
      <SectionShell title="Media" items={mediaNav}>
        <div className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-300"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents…"
            aria-label="Search documents"
            className="w-full rounded-full border border-ink-100 bg-ink-50 py-3.5 pl-11 pr-5 text-[14.5px] outline-none transition placeholder:text-ink-300 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
          />
        </div>

        <div className="no-scrollbar -mx-5 mt-4 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
                  category === c ? "bg-brand-700 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100 hover:text-ink-900",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-6 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100">
          {list.map((d) => (
            <li key={d.title}>
              <a
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 transition-colors hover:bg-ink-50/70 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-flag-50 text-flag-600">
                  <Icon name="fileText" className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-bold leading-snug text-ink-900">{d.title}</span>
                  <span className="mt-0.5 block text-[12.5px] text-ink-500">{d.category} · PDF</span>
                </span>
                <span className="hidden items-center gap-1.5 rounded-full border border-ink-100 px-3.5 py-1.5 text-[12.5px] font-semibold text-brand-700 transition-colors group-hover:border-brand-700 group-hover:bg-brand-700 group-hover:text-white sm:inline-flex">
                  <Icon name="download" className="h-3.5 w-3.5" />
                  Download
                </span>
                <Icon name="download" className="h-5 w-5 shrink-0 text-brand-700 sm:hidden" />
              </a>
            </li>
          ))}
          {list.length === 0 && (
            <li className="p-10 text-center text-[14px] text-ink-500">No documents match your search.</li>
          )}
        </ul>
        <p className="mt-4 text-[12.5px] text-ink-300">Documents open on the official MANEB website (maneb.edu.mw).</p>
      </SectionShell>
    </>
  );
}

/* ---------------------------------- FAQs ---------------------------------- */

export function Faqs() {
  usePageTitle("FAQs");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Quick answers about registration, results, certificates and services."
        image={images.smiles}
        crumbs={[mediaCrumb, { label: "FAQs" }]}
      />
      <SectionShell title="Media" items={mediaNav}>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors duration-300",
                  isOpen ? "border-brand-200 bg-brand-50/50" : "border-ink-100 bg-white hover:border-brand-200",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <span className={cn("font-display text-[15.5px] font-bold leading-snug", isOpen ? "text-brand-800" : "text-ink-900")}>
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isOpen ? "rotate-45 bg-brand-700 text-white" : "bg-ink-50 text-ink-500",
                    )}
                  >
                    <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </button>
                <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-ink-700 sm:px-6 sm:pb-6">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-ink-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-[16px] font-bold text-ink-900">Still have a question?</p>
            <p className="mt-1 text-[14px] text-ink-500">Our offices in Zomba, Lilongwe and Mzuzu are happy to help.</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-950 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Contact us
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </SectionShell>
    </>
  );
}
