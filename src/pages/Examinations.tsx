import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { Callout, Card, CardTitle, CheckList, H2, NumberedSteps, PageHeader, PrevNext, Prose, SectionShell } from "@/components/ui";
import { Link, usePageTitle } from "@/router";
import { examNav } from "@/data/nav";
import { images, site } from "@/data/site";
import {
  centreRequirements,
  codeHighlights,
  codeOfConduct,
  msceConditions,
  paymentPlatforms,
  ptce,
  registrationFacts,
  registrationFees,
  registrationSteps,
  schoolExams,
  type Exam,
} from "@/data/about";

const examCrumb = { label: "Examinations", to: "/examinations/school" };

function ExamLayout({
  title,
  description,
  image,
  children,
}: {
  title: string;
  description: string;
  image: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} description={description} image={image} crumbs={[examCrumb, { label: title }]} />
      <SectionShell title="Examinations" items={examNav}>
        {children}
        <PrevNext items={examNav} />
      </SectionShell>
    </>
  );
}

function ExamCard({ exam, children }: { exam: Exam; children?: ReactNode }) {
  return (
    <Reveal>
      <article className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
        <div className="grid md:grid-cols-[260px_minmax(0,1fr)]">
          <div className="relative aspect-[16/10] bg-ink-100 md:aspect-auto">
            <img src={exam.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-2.5 py-1 font-display text-[13px] font-extrabold tracking-wide text-brand-800">
              {exam.code}
            </span>
          </div>
          <div className="p-6 sm:p-7">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-brand-600">{exam.level}</p>
            <h3 className="mt-1.5 font-display text-[1.3rem] font-bold leading-snug text-ink-900">{exam.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{exam.summary}</p>
          </div>
        </div>
        {children && <div className="border-t border-ink-100 p-6 sm:p-7">{children}</div>}
      </article>
    </Reveal>
  );
}

/* --------------------------- School examinations --------------------------- */

export function SchoolExams() {
  usePageTitle("School Examinations");
  const [pslce, jce, msce] = schoolExams;

  return (
    <ExamLayout
      title="School Examinations"
      description="We conduct valid and reliable examinations for certification, selection and placement purposes; and provide professional advice relating to assessment and examinations."
      image={images.reading}
    >
      <div className="space-y-6">
        <ExamCard exam={pslce} />
        <ExamCard exam={jce} />
        <ExamCard exam={msce}>
          <h4 className="font-display text-[17px] font-bold text-ink-900">Conditions for the award of MSCE</h4>
          <p className="mt-2 text-[14.5px] text-ink-500">Candidates are awarded the MSCE if they satisfy one of the following conditions:</p>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="rounded-2xl bg-brand-950 p-5 text-white">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-sun-400">Condition A</span>
              <p className="mt-2 text-[14.5px] leading-relaxed text-brand-100/90">{msceConditions[0]}</p>
            </div>
            <span className="mx-auto font-display text-[13px] font-extrabold uppercase text-ink-300">or</span>
            <div className="rounded-2xl bg-brand-700 p-5 text-white">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-sun-300">Condition B</span>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/90">{msceConditions[1]}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 p-5">
              <p className="font-display text-[15px] font-bold text-ink-900">Single-examination sitting</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                The most common way of obtaining a certificate. Such certificates are automatically produced for all
                successful candidates for free.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 p-5">
              <p className="font-display text-[15px] font-bold text-ink-900">Multiple-examination sitting</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                Satisfying the conditions within four consecutive sittings qualifies for a{" "}
                <Link to="/services/certificate-by-accumulation" className="font-semibold text-brand-700 hover:underline">
                  Certificate by Accumulation
                </Link>
                , issued on formal application.
              </p>
            </div>
          </div>

          <Callout icon="chart" title="Aggregation of points" className="mt-6">
            Aggregation is based on the best six performed subjects — including English if it is among the best six,
            or excluding English if it is passed but not among the best six.
          </Callout>
        </ExamCard>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-ink-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3 text-[14.5px] font-medium text-ink-700">
          <Icon name="calendar" className="h-5 w-5 text-brand-700" />
          Examination timetables are published as downloads.
        </p>
        <Link
          to="/downloads"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700 hover:text-brand-900"
        >
          View timetables
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </ExamLayout>
  );
}

/* -------------------------- Teachers examinations -------------------------- */

export function TeachersExams() {
  usePageTitle("Teachers Examinations");

  return (
    <ExamLayout
      title="Teachers Examinations"
      description="Certifying the next generation of primary school teachers in Malawi."
      image={images.teacher}
    >
      <ExamCard exam={ptce} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardTitle icon="users" title="Who sits the PTCE" />
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">
            Student teachers completing their studies at all Teacher Training Colleges in Malawi.
          </p>
        </Card>
        <Card>
          <CardTitle icon="award" title="What it certifies" />
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">
            Qualifying student teachers are certified to teach at any primary school in Malawi.
          </p>
        </Card>
      </div>
    </ExamLayout>
  );
}

/* -------------------------------- Registration -------------------------------- */

export function Registration() {
  usePageTitle("Examinations Registration");

  return (
    <ExamLayout
      title="Examinations Registration"
      description="How students register for national examinations at approved MANEB examination centres."
      image={images.textbooks}
    >
      <Prose>
        {registrationFacts.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </Prose>

      <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardTitle icon="clipboard" title="The registration process" />
          <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
            Candidates are registered by a teacher designated by the centre, who is given a username and password by
            MANEB to access the registration portal.
          </p>
          <div className="mt-6">
            <NumberedSteps items={registrationSteps} />
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="bg-ink-50/60">
            <CardTitle icon="receipt" title="Registration fees" />
            <CheckList items={registrationFees} className="mt-4" />
            <p className="mt-4 text-[13px] leading-relaxed text-ink-500">
              Primary school students from public schools are exempted from these fees except the identity card
              processing fee. Pupils from private institutions pay all the fees.
            </p>
          </Card>
          <a
            href={site.portals.eRegistration}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl bg-brand-950 p-5 text-white"
          >
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300">For designated teachers</span>
              <span className="mt-1 block font-display text-[16px] font-bold">e-Registration portal</span>
            </span>
            <Icon name="arrowUpRight" className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <Callout icon="wallet" tone="sun" title="Paying examination fees" className="mt-8">
        Examination fees are paid directly to MANEB through e-payment platforms by guardians or students themselves —
        not through school teachers or any school authorities. Pay only after verifying your details, since corrections
        cannot be made after payment. Once paid, the portal at your centre shows you as a paid candidate.
      </Callout>

      <div className="mt-8">
        <p className="text-[12px] font-bold uppercase tracking-wider text-ink-300">Approved payment platforms (2024)</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {paymentPlatforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-700"
            >
              <Icon name="smartphone" className="h-3.5 w-3.5 text-brand-600" />
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <H2>Becoming an examination centre</H2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-500">
          Institutions are inspected by the Security Services Directorate before approval. To qualify, the institution
          must:
        </p>
        <CheckList items={centreRequirements} className="mt-6" />
      </div>
    </ExamLayout>
  );
}

/* ----------------------------- Code of conduct ----------------------------- */

export function CodeOfConduct() {
  usePageTitle("Candidate Code of Conduct");

  return (
    <ExamLayout
      title="Candidate Code of Conduct"
      description="The rules that apply to every candidate sitting for national examinations."
      image={images.examRoom}
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {codeHighlights.map((h) => (
          <div key={h.text} className="rounded-2xl border border-ink-100 bg-white p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Icon name={h.icon} className="h-5 w-5" />
            </span>
            <p className="mt-3 text-[13.5px] font-semibold leading-snug text-ink-900">{h.text}</p>
          </div>
        ))}
      </div>

      <Callout icon="alert" tone="flag" title="Cheating during examinations leads to imprisonment" className="mt-6">
        Candidates' school bags should not be found within a 30m radius of the examination room. Make sure you register
        for an identity card — it is required to gain entry into the examination room.
      </Callout>

      <div className="mt-12">
        <H2>The rules</H2>
        <p className="mt-2 text-[15px] text-ink-500">The following rules shall apply to candidates sitting for national examinations:</p>
        <ol className="mt-6 divide-y divide-ink-100 rounded-2xl border border-ink-100">
          {codeOfConduct.map((rule, i) => (
            <li key={i} className="flex gap-4 p-4 sm:p-5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-50 font-display text-[12.5px] font-bold text-brand-700">
                {i + 1}
              </span>
              <div className="pt-0.5 text-[14.5px] leading-relaxed text-ink-700">
                {rule.text}
                {rule.sub && (
                  <ol className="mt-2.5 space-y-2">
                    {rule.sub.map((s, j) => (
                      <li key={s.slice(0, 20)} className="flex gap-2.5">
                        <span className="font-semibold text-brand-700">{String.fromCharCode(97 + j)}.</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </ExamLayout>
  );
}
