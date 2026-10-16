import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

/**
 * Tiny hash-based router. Hash routing keeps every page working from the
 * single generated index.html, with no server configuration required.
 */

function readPath(): string {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw.startsWith("/")) return "/";
  const clean = raw.split("?")[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

const RouterContext = createContext<string>("/");

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(readPath);

  useEffect(() => {
    const onChange = () => {
      setPath(readPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return <RouterContext.Provider value={path}>{children}</RouterContext.Provider>;
}

export function usePath() {
  return useContext(RouterContext);
}

export function matchRoute(pattern: string, path: string): Record<string, string> | null {
  const p = pattern.split("/").filter(Boolean);
  const s = path.split("/").filter(Boolean);
  if (p.length !== s.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < p.length; i += 1) {
    if (p[i].startsWith(":")) params[p[i].slice(1)] = decodeURIComponent(s[i]);
    else if (p[i] !== s[i]) return null;
  }
  return params;
}

/** True when `path` is `base` or nested beneath it. */
export function isUnder(path: string, base: string) {
  if (base === "/") return path === "/";
  return path === base || path.startsWith(`${base}/`);
}

export function isExternal(to: string) {
  return /^(https?:|mailto:|tel:)/.test(to);
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  if (isExternal(to)) {
    const newTab = to.startsWith("http");
    return (
      <a
        href={to}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (readPath() === to) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a href={`#${to}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | MANEB`
      : "MANEB — Malawi National Examinations Board";
  }, [title]);
}
