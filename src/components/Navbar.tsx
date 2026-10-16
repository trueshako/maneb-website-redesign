import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { Link, isUnder, usePath } from "@/router";
import { nav, type NavSection } from "@/data/nav";
import { site, socials } from "@/data/site";

function sectionActive(path: string, section: NavSection) {
  return section.bases.some((base) => isUnder(path, base));
}

export function Navbar() {
  const path = usePath();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [path]);

  // Lock page scroll while the mobile menu is open and pre-expand the current section.
  useEffect(() => {
    if (mobileOpen) {
      const current = nav.find((s) => s.items && sectionActive(window.location.hash.slice(1) || "/", s));
      setExpanded(current?.label ?? null);
    }
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    const mq = window.matchMedia("(min-width: 1280px)");
    const onResize = () => mq.matches && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, []);

  const openNow = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
          scrolled || mobileOpen
            ? "border-ink-100 bg-white/95 shadow-[0_10px_30px_-22px_rgba(6,32,24,0.5)] backdrop-blur-xl"
            : "border-transparent bg-white",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 xl:h-[72px]">
          <Link
            to="/"
            aria-label="MANEB — home"
            className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <Logo />
          </Link>

          {/* ---------------- Desktop navigation ---------------- */}
          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {nav.map((section) => {
              const active = sectionActive(path, section);

              if (!section.items) {
                return (
                  <Link
                    key={section.label}
                    to={section.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors",
                      active
                        ? "bg-brand-50 text-brand-800"
                        : "text-ink-700 hover:bg-ink-50 hover:text-ink-900",
                    )}
                  >
                    {section.label}
                  </Link>
                );
              }

              const isOpen = openMenu === section.label;
              return (
                <div
                  key={section.label}
                  className="relative"
                  onMouseEnter={() => openNow(section.label)}
                  onMouseLeave={closeSoon}
                  onFocus={() => openNow(section.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeSoon();
                  }}
                >
                  <Link
                    to={section.to}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className={cn(
                      "flex items-center gap-1 rounded-full py-2 pl-3.5 pr-3 text-[14.5px] font-medium transition-colors",
                      active
                        ? "bg-brand-50 text-brand-800"
                        : isOpen
                          ? "bg-ink-50 text-ink-900"
                          : "text-ink-700 hover:bg-ink-50 hover:text-ink-900",
                    )}
                  >
                    {section.label}
                    <Icon
                      name="chevronDown"
                      className={cn(
                        "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </Link>

                  <div
                    className={cn(
                      "absolute left-1/2 top-full -translate-x-1/2 pt-3 transition duration-200",
                      section.wide ? "w-[640px]" : "w-[340px]",
                      isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-lift">
                      <div className={cn("grid gap-0.5 p-2", section.wide && "grid-cols-2")}>
                        {section.items.map((item) => {
                          const current = path === item.to;
                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setOpenMenu(null)}
                              className={cn(
                                "group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors",
                                current ? "bg-brand-50" : "hover:bg-ink-50",
                              )}
                            >
                              <span
                                className={cn(
                                  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                                  current
                                    ? "bg-brand-700 text-white"
                                    : "bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white",
                                )}
                              >
                                <Icon name={item.icon} className="h-[18px] w-[18px]" />
                              </span>
                              <span className="min-w-0">
                                <span
                                  className={cn(
                                    "block text-[14px] font-semibold",
                                    current ? "text-brand-800" : "text-ink-900",
                                  )}
                                >
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-500">
                                    {item.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      {section.wide && (
                        <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50/70 px-5 py-3">
                          <span className="text-[12.5px] text-ink-500">
                            Available at our offices in Zomba, Lilongwe and Mzuzu
                          </span>
                          <Link
                            to="/services"
                            onClick={() => setOpenMenu(null)}
                            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700 hover:text-brand-900"
                          >
                            All services
                            <Icon name="arrowRight" className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop search — icon that expands and overlays nav links */}
            <div className="relative hidden xl:block">
              {searchExpanded ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = searchQuery.trim();
                    if (q) {
                      window.location.hash = `#/search?q=${encodeURIComponent(q)}`;
                      setSearchQuery("");
                      setSearchExpanded(false);
                    }
                  }}
                  className="absolute right-0 top-1/2 z-50 -translate-y-1/2"
                >
                  <div className="relative">
                    <Icon
                      name="search"
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300"
                    />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search news, services, rules…"
                      aria-label="Search"
                      autoFocus
                      onBlur={() => {
                        if (!searchQuery.trim()) setSearchExpanded(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setSearchQuery("");
                          setSearchExpanded(false);
                        }
                      }}
                      className="w-72 rounded-full border border-brand-400 bg-white py-2 pl-9 pr-4 text-[13.5px] outline-none shadow-lift focus:ring-2 focus:ring-brand-100"
                    />
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchExpanded(true)}
                  aria-label="Open search"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-50 text-ink-700 transition-colors hover:bg-ink-100 hover:text-brand-700"
                >
                  <Icon name="search" className="h-[18px] w-[18px]" />
                </button>
              )}
            </div>

            <a
              href={site.portals.eRegistration}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-800 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-900 xl:inline-flex"
            >
              e-Registration
              <Icon name="arrowUpRight" className="h-4 w-4 shrink-0" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 xl:hidden",
                mobileOpen ? "bg-brand-950 text-white" : "bg-ink-50 text-ink-900 hover:bg-ink-100",
              )}
            >
              <span
                className={cn(
                  "absolute h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300",
                  mobileOpen ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300",
                  mobileOpen ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile menu ---------------- */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 xl:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-white transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "relative h-full overflow-y-auto overscroll-contain transition duration-300",
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <nav aria-label="Mobile" className="container-x pb-10 pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = searchQuery.trim();
                if (q) {
                  setMobileOpen(false);
                  window.location.hash = `#/search?q=${encodeURIComponent(q)}`;
                  setSearchQuery("");
                }
              }}
              className="mb-4"
            >
              <div className="relative">
                <Icon
                  name="search"
                  className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-300"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news, services, rules…"
                  aria-label="Search"
                  className="w-full rounded-2xl border border-ink-100 bg-ink-50 py-3.5 pl-11 pr-4 text-[15px] outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
              </div>
            </form>
            <ul className="divide-y divide-ink-100">
              {nav.map((section, i) => {
                const active = sectionActive(path, section);
                const isExpanded = expanded === section.label;
                return (
                  <li
                    key={section.label}
                    className={cn(
                      "transition duration-500",
                      mobileOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    )}
                    style={{ transitionDelay: mobileOpen ? `${60 + i * 35}ms` : "0ms" }}
                  >
                    {section.items ? (
                      <>
                        <button
                          type="button"
                          tabIndex={mobileOpen ? 0 : -1}
                          onClick={() => setExpanded(isExpanded ? null : section.label)}
                          aria-expanded={isExpanded}
                          className="flex w-full items-center justify-between gap-4 py-4 text-left"
                        >
                          <MobileLabel index={i} label={section.label} active={active} />
                          <span
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                              isExpanded ? "rotate-45 bg-brand-700 text-white" : "bg-ink-50 text-ink-500",
                            )}
                          >
                            <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
                          </span>
                        </button>

                        <div
                          className={cn(
                            "grid transition-[grid-template-rows] duration-300 ease-out",
                            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="grid gap-1 pb-4 pl-8 sm:grid-cols-2">
                              {section.items.map((item) => {
                                const current = path === item.to;
                                return (
                                  <Link
                                    key={item.to}
                                    to={item.to}
                                    tabIndex={isExpanded && mobileOpen ? 0 : -1}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                      "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                                      current
                                        ? "bg-brand-50 text-brand-800"
                                        : "text-ink-700 active:bg-ink-50",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                        current ? "bg-brand-700 text-white" : "bg-ink-50 text-brand-700",
                                      )}
                                    >
                                      <Icon name={item.icon} className="h-[18px] w-[18px]" />
                                    </span>
                                    <span className="text-[14.5px] font-medium leading-snug">
                                      {item.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        to={section.to}
                        tabIndex={mobileOpen ? 0 : -1}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <MobileLabel index={i} label={section.label} active={active} />
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500">
                          <Icon name="arrowRight" className="h-4 w-4" />
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div
              className={cn(
                "mt-6 space-y-3 transition duration-500",
                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              style={{ transitionDelay: mobileOpen ? "320ms" : "0ms" }}
            >
              <a
                href={site.portals.eRegistration}
                target="_blank"
                rel="noreferrer"
                tabIndex={mobileOpen ? 0 : -1}
                className="flex items-center justify-between rounded-2xl bg-brand-950 px-5 py-4 text-white"
              >
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">
                    Schools & examination centres
                  </span>
                  <span className="mt-1 block font-display text-[17px] font-bold">
                    e-Registration portal
                  </span>
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Icon name="arrowUpRight" className="h-5 w-5" />
                </span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={site.phoneHref}
                  tabIndex={mobileOpen ? 0 : -1}
                  className="rounded-2xl bg-ink-50 px-4 py-3.5"
                >
                  <Icon name="phone" className="h-4 w-4 text-brand-700" />
                  <span className="mt-2 block text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                    Call
                  </span>
                  <span className="block text-[13.5px] font-semibold text-ink-900">{site.phone}</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  tabIndex={mobileOpen ? 0 : -1}
                  className="min-w-0 rounded-2xl bg-ink-50 px-4 py-3.5"
                >
                  <Icon name="mail" className="h-4 w-4 text-brand-700" />
                  <span className="mt-2 block text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                    Email
                  </span>
                  <span className="block truncate text-[13.5px] font-semibold text-ink-900">
                    {site.email}
                  </span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[12.5px] font-medium text-ink-500">Follow MANEB</span>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      tabIndex={mobileOpen ? 0 : -1}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-50 text-ink-700 transition-colors hover:bg-brand-700 hover:text-white"
                    >
                      <Icon name={s.icon} className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function MobileLabel({ index, label, active }: { index: number; label: string; active: boolean }) {
  return (
    <span className="flex items-baseline gap-3">
      <span
        className={cn(
          "w-5 text-[11px] font-semibold tabular-nums",
          active ? "text-brand-600" : "text-ink-300",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "font-display text-[21px] font-bold tracking-tight",
          active ? "text-brand-700" : "text-ink-900",
        )}
      >
        {label}
      </span>
      {active && <span className="h-1.5 w-1.5 -translate-y-1 rounded-full bg-sun-500" />}
    </span>
  );
}
