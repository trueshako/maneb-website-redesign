import { cn } from "@/utils/cn";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

/**
 * MANEB logo. The image is loaded from /public/logo.png so you can swap it
 * without touching code — just replace public/logo.png with the official logo.
 */
export function Logo({ variant = "dark", className }: LogoProps) {
  const light = variant === "light";

  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center",
          light && "rounded-xl bg-white p-1.5 shadow-sm",
        )}
      >
        <img
          src="/logo.png"
          alt="MANEB logo"
          width={160}
          height={160}
          className={cn(
            "w-auto object-contain",
            light ? "h-9" : "h-10 xl:h-11",
          )}
        />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-[19px] font-extrabold tracking-tight xl:text-[20px]",
            light ? "text-white" : "text-brand-950",
          )}
        >
          MANEB
        </span>
        <span
          className={cn(
            "mt-1 block text-[8.5px] font-semibold uppercase tracking-[0.08em] min-[380px]:text-[9.5px] sm:text-[10px] sm:tracking-[0.14em]",
            light ? "text-brand-200/80" : "text-ink-500",
          )}
        >
          Malawi National Examinations Board
        </span>
      </span>
    </span>
  );
}
