import { Icon, type IconName } from "@/components/icons";
import { MsceChecker } from "@/components/MsceChecker";
import { H2, PageHeader } from "@/components/ui";
import { Link, usePageTitle } from "@/router";
import { images, site } from "@/data/site";

const related: { to: string; icon: IconName; title: string; text: string }[] = [
  {
    to: "/services/certificate-by-accumulation",
    icon: "repeat",
    title: "Certificate by Accumulation",
    text: "Combine grades from more than one sitting",
  },
  {
    to: "/services/academic-transcripts",
    icon: "fileText",
    title: "Academic Transcripts",
    text: "A sealed record of your grades for employers",
  },
  {
    to: "/services/verification-of-certificates",
    icon: "shield",
    title: "Verification of Certificates",
    text: "For employers and institutions",
  },
];

export function Results() {
  usePageTitle("Examination Results");

  return (
    <>
      <PageHeader
        title="Examination Results"
        description="Check results for recently released examinations, understand the MSCE award conditions and find results-related services."
        image={images.handsUp}
        crumbs={[{ label: "Results" }]}
      />

      <div className="container-x py-12 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="relative isolate overflow-hidden rounded-3xl bg-brand-950 p-7 text-white sm:p-10 lg:col-span-7">
            <div className="grid-lines absolute inset-0 -z-10 opacity-40" />
            <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-brand-500/30 blur-[80px]" />

            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-200">
              <Icon name="monitor" className="h-3.5 w-3.5" />
              e-Result portal
            </span>
            <h2 className="mt-5 max-w-md font-display text-[1.9rem] font-extrabold leading-tight sm:text-[2.3rem]">
              Check your examination results online
            </h2>
            <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-brand-100/80">
              Results for recently released examinations are published on the official MANEB e-Result portal.
            </p>

            <ul className="mt-6 space-y-2.5 text-[14px] text-brand-100/90">
              {["Have your examination number ready", "Choose the examination you sat for", "View your results by subject"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sun-400 text-brand-950">
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>

            <a
              href={site.portals.eResult}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-sun-400 px-7 py-4 text-[15px] font-bold text-brand-950 transition-colors hover:bg-sun-300"
            >
              Open e-Result portal
              <Icon name="arrowUpRight" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid gap-5 lg:col-span-5">
            <Link
              to="/services/notification-of-results"
              className="group flex flex-col rounded-3xl border border-ink-100 p-6 transition duration-300 hover:border-brand-200 hover:shadow-soft sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name="receipt" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-[17px] font-bold text-ink-900">Notification of results slip</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                Printed in triplicate for every candidate and collected from your school for free — used while your
                certificate is processed.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-700">
                Details & fees
                <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              to="/downloads"
              className="group flex flex-col rounded-3xl border border-ink-100 p-6 transition duration-300 hover:border-brand-200 hover:shadow-soft sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sun-50 text-sun-600">
                <Icon name="pen" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-[17px] font-bold text-ink-900">Remarking</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                Requesting a remark? The 2026 MSCE Remark Form is available in our downloads.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-700">
                Go to downloads
                <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <H2>Do I qualify for the MSCE?</H2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            The MSCE is awarded for a pass in six subjects including English with at least one distinction/credit — or
            a pass in five subjects including English with at least three distinctions/credits.
          </p>
          <div className="mt-6">
            <MsceChecker />
          </div>
        </div>

        <div className="mt-16">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink-300">Related services</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group flex items-center gap-3.5 rounded-2xl border border-ink-100 p-4 transition duration-300 hover:border-brand-200 hover:shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[14.5px] font-bold text-ink-900">{r.title}</span>
                  <span className="block text-[12.5px] text-ink-500">{r.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
