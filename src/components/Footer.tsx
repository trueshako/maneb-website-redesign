import { Icon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { Link } from "@/router";
import { aboutNav, examNav, mediaNav } from "@/data/nav";
import { photoCredits, site, socials } from "@/data/site";

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  { title: "About", links: aboutNav.map(({ label, to }) => ({ label, to })) },
  {
    title: "Examinations",
    links: [
      ...examNav.map(({ label, to }) => ({ label, to })),
      { label: "Examination Results", to: "/results" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Academic Transcripts", to: "/services/academic-transcripts" },
      { label: "Verification of Certificates", to: "/services/verification-of-certificates" },
      { label: "Lost Certificates", to: "/services/replacement-of-lost-certificate" },
      { label: "Certificate by Accumulation", to: "/services/certificate-by-accumulation" },
      { label: "All services", to: "/services" },
    ],
  },
  {
    title: "Media",
    links: [...mediaNav.map(({ label, to }) => ({ label, to })), { label: "Contact Us", to: "/contact" }],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100/70">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <div className="container-x relative">
        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-4">
            <Link to="/" aria-label="MANEB — home" className="inline-block">
              <Logo variant="light" />
            </Link>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed">{site.mission}</p>

            <ul className="mt-6 space-y-2.5 text-[13.5px]">
              <li className="flex items-start gap-2.5">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                {site.poBox}
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={site.phoneHref} className="transition hover:text-white">
                  {site.phone} / 1 525 212
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${site.email}`} className="transition hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand-200 transition hover:border-sun-400 hover:bg-sun-400 hover:text-brand-950"
                >
                  <Icon name={s.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-[12.5px] font-bold uppercase tracking-[0.16em] text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-[13.5px] leading-snug transition hover:text-sun-400">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5 sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sun-400 text-brand-950">
              <Icon name="megaphone" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-[15px] font-bold text-white">Report examination malpractice</p>
              <p className="mt-0.5 text-[13px] leading-relaxed">
                Call the MANEB Toll Free Line{" "}
                <span className="font-bold text-sun-400">{site.tollFree}</span> — available to all TNM
                subscribers during the administration of examinations.
              </p>
            </div>
          </div>
          <Link
            to="/examinations/code-of-conduct"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold text-white transition hover:border-sun-400 hover:text-sun-400 sm:self-auto"
          >
            Code of conduct
            <Icon name="arrowRight" className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 py-6 text-[12.5px] md:flex-row md:items-start md:justify-between">
          <p>© {new Date().getFullYear()} Malawi National Examinations Board. All rights reserved.</p>
          <details className="group md:max-w-md md:text-right">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 font-medium text-brand-200 transition hover:text-white">
              Photo credits
              <Icon name="chevronDown" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-3 space-y-1.5 text-[12px]">
              {photoCredits.map((c) => (
                <li key={c.subject}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                    {c.subject} — {c.author} ({c.license})
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
