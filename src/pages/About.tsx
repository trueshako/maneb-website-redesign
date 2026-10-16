import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { Callout, CheckList, H2, PageHeader, PrevNext, Prose, SectionShell } from "@/components/ui";
import { Link, usePageTitle } from "@/router";
import { aboutNav } from "@/data/nav";
import { images, site } from "@/data/site";
import {
  background,
  coreValues,
  directorates,
  mandate,
  milestones,
  structureDirectorates,
  structureUnits,
} from "@/data/about";

const aboutCrumb = { label: "About", to: "/about/background" };

function AboutLayout({
  title,
  description,
  image,
  children,
}: {
  title: string;
  description: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} description={description} image={image} crumbs={[aboutCrumb, { label: title }]} />
      <SectionShell title="About MANEB" items={aboutNav}>
        {children}
        <PrevNext items={aboutNav} />
      </SectionShell>
    </>
  );
}

/* ------------------------------ Background ------------------------------ */

export function Background() {
  usePageTitle("Background — Who We Are");

  return (
    <AboutLayout
      title="Background"
      description="Who we are — the story of Malawi's central authority for national examinations."
      image={images.secondaryGirls}
    >
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <H2>Who we are</H2>
          <Prose className="mt-5">
            {background.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Prose>
        </div>

        <div className="space-y-4">
          <img
            src={images.classroom}
            alt="Primary school learners in a classroom in Malawi"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <div className="rounded-2xl bg-brand-950 p-5 text-white">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-sun-400">At a glance</p>
            <dl className="mt-4 space-y-3 text-[13.5px]">
              {[
                ["Founded", "April 1987"],
                ["Predecessor", "MCE&TB (1969)"],
                ["Status", "Parastatal"],
                ["Head office", "Zomba"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <dt className="text-brand-200/80">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <H2>Milestones</H2>
        <ol className="relative ml-3 mt-8 space-y-8 border-l-2 border-brand-100">
          {milestones.map((m, i) => (
            <Reveal key={m.year} as="li" delay={i * 60} className="relative pl-8">
              <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-white bg-brand-600 ring-2 ring-brand-100" />
              <p className="font-display text-[13px] font-extrabold tracking-wide text-brand-600">{m.year}</p>
              <h3 className="mt-0.5 font-display text-[17px] font-bold text-ink-900">{m.title}</h3>
              <p className="mt-1 max-w-2xl text-[14.5px] leading-relaxed text-ink-500">{m.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </AboutLayout>
  );
}

/* -------------------- Vision, Mission, Mandate & Values -------------------- */

export function VisionMission() {
  usePageTitle("Vision, Mission, Mandate & Core Values");

  return (
    <AboutLayout
      title="Vision, Mission & Core Values"
      description="The vision, mission, mandate and core values that guide the Malawi National Examinations Board."
      image={images.handsUp}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-3xl bg-brand-950 p-7 text-white sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-sun-400">
              <Icon name="eye" className="h-6 w-6" />
            </span>
            <h2 className="mt-6 font-display text-[1.5rem] font-extrabold">Vision</h2>
            <p className="mt-3 text-[17px] leading-relaxed text-brand-100/85">{site.vision}</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex h-full flex-col rounded-3xl bg-brand-700 p-7 text-white sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-sun-300">
              <Icon name="target" className="h-6 w-6" />
            </span>
            <h2 className="mt-6 font-display text-[1.5rem] font-extrabold">Mission</h2>
            <p className="mt-3 text-[17px] leading-relaxed text-white/85">{site.mission}</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-5 rounded-3xl border border-ink-100 p-7 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Icon name="clipboard" className="h-6 w-6" />
            </span>
            <h2 className="font-display text-[1.5rem] font-extrabold text-ink-900">Mandate</h2>
          </div>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {mandate.map((m, i) => (
              <li key={m} className="flex gap-4 rounded-2xl bg-ink-50/80 p-5">
                <span className="font-display text-[1.6rem] font-extrabold leading-none text-brand-200">0{i + 1}</span>
                <p className="text-[15px] leading-relaxed text-ink-700">{m}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <div className="mt-14">
        <H2>Core values</H2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {coreValues.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-ink-100 p-5 transition duration-300 hover:border-brand-200 hover:shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                  <Icon name={v.icon} className="h-[22px] w-[22px]" />
                </span>
                <p className="font-display text-[15.5px] font-bold leading-snug text-ink-900">{v.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </AboutLayout>
  );
}

/* ------------------------- Organizational structure ------------------------- */

export function Structure() {
  usePageTitle("Organizational Structure");

  return (
    <AboutLayout
      title="Organizational Structure"
      description="How the Board is organised — an Executive Director, six directorates, and supporting units."
      image={images.ictLab}
    >
      <Prose>
        <p>
          An Executive Director heads MANEB. MANEB has six directorates. Each of the directorates has a director who
          reports to the Executive Director. MANEB also has three units and one section that support the functions of
          the directorates.
        </p>
      </Prose>

      <div className="mt-10 rounded-3xl border border-ink-100 bg-ink-50/50 p-5 sm:p-8">
        <div className="flex flex-col items-center">
          <div className="rounded-2xl border border-ink-100 bg-white px-6 py-3 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-300">Governance</p>
            <p className="font-display text-[15px] font-bold text-ink-900">Board of Directors</p>
          </div>
          <span className="h-6 w-px bg-brand-200" />
          <div className="rounded-2xl bg-brand-950 px-7 py-4 text-center text-white shadow-lift">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sun-400">Head of MANEB</p>
            <p className="font-display text-[17px] font-bold">Executive Director</p>
          </div>
          <span className="h-6 w-px bg-brand-200" />
        </div>

        <div className="grid gap-3 border-t-2 border-brand-100 pt-6 sm:grid-cols-2 xl:grid-cols-3">
          {structureDirectorates.map((d, i) => (
            <Reveal key={d.name} delay={i * 50}>
              <Link
                to={`/about/directorates/${directorates[i].slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
              >
                <span className="font-display text-[12px] font-extrabold tracking-wide text-brand-500">
                  DIRECTORATE 0{i + 1}
                </span>
                <h3 className="mt-1.5 font-display text-[16px] font-bold text-ink-900">{d.name}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">{d.role}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-semibold text-brand-700">
                  Functions
                  <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <H2>Units and section</H2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {structureUnits.map((u) => (
            <div key={u.name} className="flex gap-4 rounded-2xl border border-ink-100 p-5">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sun-500" />
              <div>
                <h3 className="font-display text-[15.5px] font-bold text-ink-900">{u.name}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-500">{u.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AboutLayout>
  );
}

/* ------------------------------ Directorates ------------------------------ */

export function Directorates({ slug }: { slug?: string }) {
  usePageTitle("Directorates");
  const initial = directorates.find((d) => d.slug === slug) ?? directorates[0];
  const [selected, setSelected] = useState(initial.slug);
  const current = directorates.find((d) => d.slug === selected) ?? directorates[0];

  const choose = (next: string) => {
    setSelected(next);
    window.history.replaceState(null, "", `#/about/directorates/${next}`);
  };

  return (
    <AboutLayout
      title="Directorates"
      description="Six directorates and two supporting units deliver MANEB's mandate."
      image={images.textbooks}
    >
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {directorates.map((d) => {
          const active = d.slug === selected;
          return (
            <button
              key={d.slug}
              type="button"
              onClick={() => choose(d.slug)}
              aria-pressed={active}
              className={cn(
                "flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-200",
                active
                  ? "border-brand-950 bg-brand-950 text-white"
                  : "border-ink-100 bg-white text-ink-900 hover:border-brand-200 hover:bg-brand-50/40",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  active ? "bg-white/10 text-sun-400" : "bg-brand-50 text-brand-700",
                )}
              >
                <Icon name={d.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="font-display text-[14px] font-bold leading-snug">{d.name}</span>
            </button>
          );
        })}
      </div>

      <div key={current.slug} className="page-enter mt-6 rounded-3xl border border-ink-100 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700">
            {current.kind}
          </span>
        </div>
        <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-ink-900 sm:text-[1.9rem]">
          {current.name}
        </h2>
        <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-ink-700">{current.summary}</p>

        {current.sections && (
          <div className="mt-6">
            <p className="text-[12px] font-bold uppercase tracking-wider text-ink-300">Sections</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {current.sections.map((s) => (
                <span key={s} className="rounded-full border border-ink-100 bg-ink-50 px-3.5 py-1.5 text-[13px] font-medium text-ink-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-7">
          <p className="text-[12px] font-bold uppercase tracking-wider text-ink-300">Functions</p>
          <CheckList items={current.functions} className="mt-4" />
        </div>

        {current.note && (
          <Callout icon="monitor" className="mt-7">
            {current.note}
          </Callout>
        )}
      </div>

      {/* Hidden access point for the admin center — not advertised anywhere else */}
      <div className="mt-10 flex justify-end">
        <Link
          to="/admin-center"
          className="text-[11px] text-ink-200 transition hover:text-ink-400"
          aria-label="Admin center"
          title="Admin center"
        >
          📝
        </Link>
      </div>
    </AboutLayout>
  );
}
