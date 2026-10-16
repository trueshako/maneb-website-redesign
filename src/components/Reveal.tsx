import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  threshold?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  threshold = 0.12,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(threshold);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
