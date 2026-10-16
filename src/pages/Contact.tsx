import { useState, type FormEvent } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/ui";
import { usePageTitle } from "@/router";
import { images, offices, site, socials } from "@/data/site";

const subjects = [
  "General enquiry",
  "Examination results",
  "Examinations registration",
  "Certificates & transcripts",
  "Verification of certificates",
  "Tenders & procurement",
  "Vacancies",
  "Press enquiry",
];

const field =
  "w-full rounded-xl border border-ink-100 bg-ink-50 px-4 py-3 text-[14.5px] text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100";

export function Contact() {
  usePageTitle("Contact Us");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: subjects[0], message: "" });
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Reach the MANEB Head Office in Zomba or our regional offices in Mzuzu and Lilongwe."
        image={images.walkToSchool}
        crumbs={[{ label: "Contact Us" }]}
      />

      <div className="container-x py-12 lg:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {offices.map((o, i) => {
            const head = o.id === "head";
            return (
              <Reveal key={o.id} delay={i * 70}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-3xl p-6 sm:p-7",
                    head ? "bg-brand-950 text-white" : "border border-ink-100 bg-white",
                  )}
                >
                  <span className={cn("text-[11.5px] font-bold uppercase tracking-[0.14em]", head ? "text-sun-400" : "text-brand-600")}>
                    {o.region}
                  </span>
                  <h2 className={cn("mt-2 font-display text-[18px] font-bold", head ? "text-white" : "text-ink-900")}>
                    {o.addressee}
                  </h2>
                  <address className={cn("mt-3 text-[14px] not-italic leading-relaxed", head ? "text-brand-100/80" : "text-ink-500")}>
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <div className={cn("mt-5 space-y-2 border-t pt-5 text-[13.5px]", head ? "border-white/10" : "border-ink-100")}>
                    <p className={cn("flex items-start gap-2.5", head ? "text-brand-100/85" : "text-ink-700")}>
                      <Icon name="mapPin" className={cn("mt-0.5 h-4 w-4 shrink-0", head ? "text-sun-400" : "text-brand-600")} />
                      {o.location}
                    </p>
                    {o.phone && (
                      <a href={site.phoneHref} className="flex items-center gap-2.5 font-semibold text-white hover:text-sun-400">
                        <Icon name="phone" className="h-4 w-4 shrink-0 text-sun-400" />
                        {o.phone}
                      </a>
                    )}
                    {o.email && (
                      <a href={`mailto:${o.email}`} className="flex items-center gap-2.5 font-semibold text-white hover:text-sun-400">
                        <Icon name="mail" className="h-4 w-4 shrink-0 text-sun-400" />
                        {o.email}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-12">
          <div className="rounded-3xl border border-ink-100 p-6 sm:p-8 lg:col-span-7">
            <h2 className="font-display text-[1.45rem] font-extrabold text-ink-900">Send us a message</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
              For official correspondence, write to The Executive Director or email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 hover:underline">
                {site.email}
              </a>
              .
            </p>

            <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Full name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={field}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Email address</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className={field}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Subject</span>
                <span className="relative block">
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={cn(field, "appearance-none pr-10")}
                  >
                    {subjects.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <Icon
                    name="chevronDown"
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300"
                  />
                </span>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?"
                  className={cn(field, "resize-none")}
                />
              </label>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-800"
                >
                  <Icon name="send" className="h-4 w-4" />
                  Send message
                </button>
                <p
                  role="status"
                  className={cn("flex items-center gap-2 text-[13px] font-medium", sent ? "text-brand-700" : "text-ink-300")}
                >
                  <Icon name={sent ? "check" : "clock"} className="h-4 w-4" />
                  {sent ? "Thank you — your message has been received." : "We aim to respond within two working days."}
                </p>
              </div>
            </form>
          </div>

          <div className="flex flex-col overflow-hidden rounded-3xl border border-ink-100 lg:col-span-5">
            <iframe
              title="Map showing the MANEB Head Office in Zomba"
              src="https://www.google.com/maps?q=Malawi+National+Examinations+Board,+Zomba,+Malawi&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[320px] w-full flex-1 border-0"
            />
            <div className="flex items-center justify-between gap-4 border-t border-ink-100 p-5">
              <div>
                <p className="font-display text-[15px] font-bold text-ink-900">Follow MANEB</p>
                <p className="text-[12.5px] text-ink-500">News and announcements</p>
              </div>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-50 text-ink-700 transition-colors hover:bg-brand-700 hover:text-white"
                  >
                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
