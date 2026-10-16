import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icons";
import { Link } from "@/router";

type Grade = "D" | "C" | "P" | "F" | "-";

const gradeOptions: { value: Grade; label: string }[] = [
  { value: "D", label: "Distinction" },
  { value: "C", label: "Credit" },
  { value: "P", label: "Pass" },
  { value: "F", label: "Fail" },
  { value: "-", label: "Not taken" },
];

const selectedTone: Record<Grade, string> = {
  D: "bg-brand-700 text-white ring-brand-700",
  C: "bg-brand-500 text-white ring-brand-500",
  P: "bg-sun-400 text-brand-950 ring-sun-400",
  F: "bg-flag-500 text-white ring-flag-500",
  "-": "bg-ink-700 text-white ring-ink-700",
};

const startingRows: { subject: string; grade: Grade }[] = [
  { subject: "English", grade: "C" },
  { subject: "Mathematics", grade: "P" },
  { subject: "Chichewa", grade: "C" },
  { subject: "Biology", grade: "P" },
  { subject: "Physical Science", grade: "P" },
  { subject: "Agriculture", grade: "P" },
  { subject: "Geography", grade: "-" },
  { subject: "History", grade: "-" },
];

const isPass = (g: Grade) => g === "D" || g === "C" || g === "P";
const isCredit = (g: Grade) => g === "D" || g === "C";

export function MsceChecker() {
  const [rows, setRows] = useState(startingRows);

  const passes = rows.filter((r) => isPass(r.grade)).length;
  const credits = rows.filter((r) => isCredit(r.grade)).length;
  const englishPassed = isPass(rows[0].grade);
  const conditionA = englishPassed && passes >= 6 && credits >= 1;
  const conditionB = englishPassed && passes >= 5 && credits >= 3;
  const qualifies = conditionA || conditionB;

  let reason = "";
  if (!englishPassed) reason = "A pass in English is required for the award of the MSCE.";
  else if (passes < 5) reason = `You need passes in at least five subjects — currently ${passes}.`;
  else if (passes === 5 && credits < 3)
    reason = "With five passes, at least three of them must be distinctions or credits.";
  else if (credits < 1) reason = "At least one distinction or credit is required.";

  const setGrade = (index: number, grade: Grade) =>
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, grade } : r)));

  return (
    <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-sun-400">
              <Icon name="graduation" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-[18px] font-bold text-ink-900">MSCE award checker</h3>
              <p className="text-[13px] text-ink-500">Set the outcome for each subject to see if the award conditions are met.</p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-ink-100 rounded-2xl border border-ink-100">
            {rows.map((row, index) => (
              <div
                key={row.subject}
                className="flex flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex items-center gap-2 text-[14px] font-semibold text-ink-900">
                  {row.subject}
                  {index === 0 && (
                    <span className="rounded-md bg-sun-100 px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-sun-700">
                      Required
                    </span>
                  )}
                </span>
                <div role="radiogroup" aria-label={`${row.subject} outcome`} className="flex flex-wrap gap-1.5">
                  {gradeOptions
                    .filter((o) => !(index === 0 && o.value === "-"))
                    .map((o) => {
                      const selected = row.grade === o.value;
                      return (
                        <button
                          key={o.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setGrade(index, o.value)}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-[12px] font-semibold ring-1 transition-colors",
                            selected ? selectedTone[o.value] : "bg-white text-ink-500 ring-ink-100 hover:text-ink-900 hover:ring-ink-300",
                          )}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col border-t border-ink-100 bg-ink-50/70 p-5 sm:p-7 lg:border-l lg:border-t-0">
          <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-ink-300">Summary</p>
          <dl className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              { label: "Passes", value: passes },
              { label: "Dist./Credits", value: credits },
              { label: "English", value: englishPassed ? "Pass" : "Fail" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-3 text-center ring-1 ring-ink-100">
                <dd className="font-display text-[20px] font-extrabold text-ink-900">{s.value}</dd>
                <dt className="mt-0.5 text-[11px] font-medium text-ink-500">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div
            className={cn(
              "mt-5 rounded-2xl p-5",
              qualifies ? "bg-brand-950 text-white" : "bg-white ring-1 ring-flag-200",
            )}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  qualifies ? "bg-sun-400 text-brand-950" : "bg-flag-50 text-flag-600",
                )}
              >
                <Icon name={qualifies ? "check" : "close"} className="h-4 w-4" strokeWidth={2.6} />
              </span>
              <p className={cn("font-display text-[16px] font-bold", !qualifies && "text-ink-900")}>
                {qualifies ? "Meets the MSCE award conditions" : "Conditions not yet met"}
              </p>
            </div>
            <p className={cn("mt-3 text-[13.5px] leading-relaxed", qualifies ? "text-brand-100/80" : "text-ink-500")}>
              {qualifies
                ? conditionA
                  ? "Passes in six or more subjects including English, with at least one distinction/credit."
                  : "Passes in five subjects including English, with at least three distinctions/credits."
                : reason}
            </p>
          </div>

          {!qualifies && (
            <Link
              to="/services/certificate-by-accumulation"
              className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700 hover:text-brand-900"
            >
              Learn about Certificate by Accumulation
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </Link>
          )}

          <p className="mt-auto pt-6 text-[11.5px] leading-relaxed text-ink-300">
            This tool illustrates the official award conditions only. Official results and awards are determined by MANEB.
          </p>
        </div>
      </div>
    </div>
  );
}
