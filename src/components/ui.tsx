import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon, type IconName } from "@/components/icons";
import { Link, usePath } from "@/router";
import type { NavItem } from "@/data/nav";
import { site } from "@/data/site";

/* ----------------------------- Page header ----------------------------- */

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  image: string;
  crumbs: Crumb[];
  eyebrow?: string;
}

export function PageHeader({ title, description, image, crumbs, eyebrow }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pt-16 xl:pt-[72px]">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-40" />

      <div className="container-x py-11 sm:py-14 lg:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-brand-200/80">
            <li>
              <Link to="/" className="flex items-center gap-1.5 transition hover:text-white">
                <Icon name="home" className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-50" />
                {c.to ? (
                  <Link to={c.to} className="transition hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && (
          <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.16em] text-sun-400">{eyebrow}</p>
        )}
        <h1
          className={cn(
            "max-w-3xl text-balance font-display text-[2rem] font-extrabold leading-[1.1] text-white sm:text-[2.75rem] lg:text-5xl",
            eyebrow ? "mt-2" : "mt-6",
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-brand-100/80 sm:text-[16.5px]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------------------------- Section shell ---------------------------- */

function activeItem(items: NavItem[], path: string) {
  return items
    .map((i) => i.to)
    .filter((to) => path === to || path.startsWith(`${to}/`))
    .sort((a, b) => b.length - a.length)[0];
}

export function SectionShell({
  title,
  items,
  children,
}: {
  title: string;
  items: NavItem[];
  children: ReactNode;
}) {
  const path = usePath();
  const current = activeItem(items, path);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    const active = el?.querySelector<HTMLElement>("[data-active='true']");
    if (el && active) el.scrollLeft = active.offsetLeft - el.clientWidth / 2 + active.clientWidth / 2;
  }, [path]);

  return (
    <div className="container-x py-10 lg:py-16">
      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="px-3 text-[11.5px] font-bold uppercase tracking-[0.16em] text-ink-300">{title}</p>
            <nav className="mt-3 space-y-0.5" aria-label={title}>
              {items.map((item) => {
                const isCurrent = item.to === current;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
                      isCurrent ? "bg-brand-950 text-white" : "text-ink-700 hover:bg-ink-50 hover:text-ink-900",
                    )}
                  >
                    <Icon
                      name={item.icon}
                      className={cn(
                        "h-[18px] w-[18px] shrink-0",
                        isCurrent ? "text-sun-400" : "text-ink-300 group-hover:text-brand-600",
                      )}
                    />
                    <span className="leading-snug">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-50/70 p-5">
              <p className="font-display text-[15px] font-bold text-ink-900">Need help?</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">
                Our offices in Zomba, Lilongwe and Mzuzu are ready to assist.
              </p>
              <a
                href={site.phoneHref}
                className="mt-3 flex items-center gap-2 text-[13.5px] font-semibold text-brand-700 hover:text-brand-900"
              >
                <Icon name="phone" className="h-4 w-4" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="mt-1.5 flex items-center gap-2 text-[13.5px] font-semibold text-brand-700 hover:text-brand-900"
              >
                <Icon name="mail" className="h-4 w-4" />
                {site.email}
              </a>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div ref={scroller} className="no-scrollbar -mx-5 mb-8 overflow-x-auto px-5 md:-mx-8 md:px-8 lg:hidden">
            <div className="flex w-max gap-2">
              {items.map((item) => {
                const isCurrent = item.to === current;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    data-active={isCurrent}
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors",
                      isCurrent
                        ? "border-brand-950 bg-brand-950 text-white"
                        : "border-ink-100 bg-white text-ink-700 hover:border-brand-200",
                    )}
                  >
                    <Icon name={item.icon} className={cn("h-4 w-4", isCurrent ? "text-sun-400" : "text-ink-300")} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

/** Previous / next links between pages of the same section. */
export function PrevNext({ items }: { items: NavItem[] }) {
  const path = usePath();
  const current = activeItem(items, path);
  const index = items.findIndex((i) => i.to === current);
  if (index === -1) return null;
  const prev = items[index - 1];
  const next = items[index + 1];

  return (
    <div className="mt-14 grid gap-3 border-t border-ink-100 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          to={prev.to}
          className="group rounded-2xl border border-ink-100 p-5 transition hover:border-brand-200 hover:bg-brand-50/40"
        >
          <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-ink-300">
            <Icon name="arrowLeft" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="mt-1.5 block font-display text-[16px] font-bold text-ink-900">{prev.label}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <Link
          to={next.to}
          className="group rounded-2xl border border-ink-100 p-5 text-right transition hover:border-brand-200 hover:bg-brand-50/40"
        >
          <span className="flex items-center justify-end gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-ink-300">
            Next
            <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1.5 block font-display text-[16px] font-bold text-ink-900">{next.label}</span>
        </Link>
      )}
    </div>
  );
}

/* ------------------------------ Primitives ------------------------------ */

export function Eyebrow({ icon, children, dark }: { icon?: IconName; children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em]",
        dark ? "border border-white/15 bg-white/5 text-brand-200" : "bg-brand-50 text-brand-700",
      )}
    >
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  icon,
  title,
  description,
}: {
  eyebrow?: string;
  icon?: IconName;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow icon={icon}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-balance font-display text-[1.85rem] font-extrabold leading-[1.12] text-ink-900 sm:text-[2.35rem]",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </h2>
      {description && <p className="mt-3.5 text-[15.5px] leading-relaxed text-ink-500">{description}</p>}
    </div>
  );
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-display text-[1.55rem] font-extrabold leading-tight text-ink-900 sm:text-[1.8rem]", className)}>
      {children}
    </h2>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("space-y-4 text-[15.5px] leading-[1.75] text-ink-700", className)}>{children}</div>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-ink-100 bg-white p-6 sm:p-7", className)}>{children}</div>;
}

export function CardTitle({ icon, title, className }: { icon?: IconName; title: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon name={icon} className="h-5 w-5" />
        </span>
      )}
      <h3 className="font-display text-[17px] font-bold text-ink-900">{title}</h3>
    </div>
  );
}

export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Icon name="check" className="h-3 w-3" strokeWidth={2.8} />
          </span>
          <span className="text-[14.5px] leading-relaxed text-ink-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NumberedSteps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-0">
      {items.map((item, i) => (
        <li key={item} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && <span className="absolute left-[17px] top-10 bottom-1 w-px bg-brand-100" />}
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-950 font-display text-[13px] font-bold text-white">
            {i + 1}
          </span>
          <p className="pt-1.5 text-[14.5px] leading-relaxed text-ink-700">{item}</p>
        </li>
      ))}
    </ol>
  );
}

const calloutTones = {
  brand: "border-brand-200 bg-brand-50/70 text-brand-900 [&_svg]:text-brand-700",
  sun: "border-sun-200 bg-sun-50 text-ink-900 [&_svg]:text-sun-600",
  flag: "border-flag-200 bg-flag-50 text-ink-900 [&_svg]:text-flag-600",
};

export function Callout({
  icon = "info",
  title,
  children,
  tone = "brand",
  className,
}: {
  icon?: IconName;
  title?: string;
  children: ReactNode;
  tone?: keyof typeof calloutTones;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-3.5 rounded-2xl border p-5", calloutTones[tone], className)}>
      <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="text-[14px] leading-relaxed">
        {title && <p className="font-display text-[15px] font-bold">{title}</p>}
        <div className={cn(title && "mt-1", "text-ink-700")}>{children}</div>
      </div>
    </div>
  );
}

const buttonVariants = {
  primary: "bg-brand-700 text-white hover:bg-brand-800",
  dark: "bg-brand-950 text-white hover:bg-brand-800",
  sun: "bg-sun-400 text-brand-950 hover:bg-sun-300 shadow-[0_18px_40px_-18px_rgba(237,166,18,0.8)]",
  outline: "border border-ink-100 bg-white text-ink-900 hover:border-brand-300 hover:text-brand-700",
  outlineLight: "border border-white/25 bg-white/5 text-white backdrop-blur hover:border-white/50 hover:bg-white/10",
};

export function ButtonLink({
  to,
  children,
  variant = "primary",
  icon = "arrowRight",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  icon?: IconName | null;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-semibold transition-colors",
        buttonVariants[variant],
        className,
      )}
    >
      {children}
      {icon && (
        <Icon name={icon} className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
