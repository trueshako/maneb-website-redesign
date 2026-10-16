import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ui";
import { Link, usePageTitle } from "@/router";
import { images, site } from "@/data/site";
import { ptce, schoolExams } from "@/data/about";
import { services } from "@/data/services";
import { news } from "@/data/media";
import { NewsCard } from "@/pages/Media";

export function Home() {
  usePageTitle();

  return (
    <>
      <Hero />
      <WhoWeAre />
      <Examinations />
      <Services />
      <LatestNews />
    </>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pt-16 xl:pt-[72px]">
      <div className="grid-lines absolute inset-0 -z-10 opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-brand-500/25 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-sun-500/10 blur-[110px]" />

      <div className="container-x grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow dark icon="landmark">
              Certification · Selection · Placement
            </Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-[4.25rem]">
              Credible examinations.
              <span className="block bg-gradient-to-r from-sun-300 via-sun-400 to-brand-300 bg-clip-text text-transparent">
                Trusted futures.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-brand-100/80 sm:text-[17.5px]">
              The Malawi National Examinations Board develops, administers and processes valid national
              examinations for purposes of certification, selection and placement.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/about/background" variant="sun">
                Who we are
              </ButtonLink>
              <ButtonLink to="/examinations/school" variant="outlineLight" icon={null}>
                Our examinations
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-11 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                { label: "National exams", value: "4" },
                { label: "Directorates", value: "6" },
                { label: "Offices", value: "3" },
              ].map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-[1.9rem] font-extrabold leading-none text-white">{s.value}</dd>
                  <dt className="mt-2 text-[12px] font-medium uppercase tracking-wider text-brand-300">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-[30rem] lg:ml-auto lg:mr-0">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-2 backdrop-blur">
                <img
                  src={images.student}
                  alt="A Malawian primary school learner standing in a classroom"
                  className="aspect-[4/5] w-full rounded-[22px] object-cover object-[35%_center]"
                />
              </div>

              <div className="absolute -bottom-8 -left-3 w-[44%] overflow-hidden rounded-2xl border-4 border-brand-950 shadow-lift sm:-left-10">
                <img
                  src={images.reading}
                  alt="Pupils reading in a primary school classroom in Lilongwe"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="absolute -right-2 top-8 max-w-[13rem] rounded-2xl bg-white px-4 py-3.5 shadow-lift sm:-right-6">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-600">Our vision</p>
                <p className="mt-1 text-[13px] font-semibold leading-snug text-ink-900">
                  A highly reputable, credible and internationally recognised examining body
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Who we are ------------------------------ */

function WhoWeAre() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <img
              src={images.walkToSchool}
              alt="Learners walking to school in Malawi"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-lift"
            />
            <div className="absolute -bottom-7 right-5 flex items-center gap-3 rounded-2xl bg-white p-4 pr-5 shadow-lift ring-1 ring-ink-100 sm:right-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-sun-400">
                <Icon name="landmark" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-[14.5px] font-bold text-ink-900">A statutory parastatal</p>
                <p className="text-[12.5px] text-ink-500">Established by Act of Parliament</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Who we are"
              icon="building"
              title={
                <>
                  Malawi's national examining body <span className="text-brand-700">since 1987</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[15.5px] leading-[1.75] text-ink-700">
              MANEB was founded in April 1987 through a merger of the Malawi Certificate Examinations and Testing
              Board and the Examinations Section of the Ministry of Education and Culture — giving one central
              authority the responsibility to develop and administer national examinations for certification,
              selection and placement.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-brand-950 p-5 text-white">
                <span className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-sun-400">
                  <Icon name="eye" className="h-4 w-4" />
                  Vision
                </span>
                <p className="mt-2.5 text-[14px] leading-relaxed text-brand-100/85">{site.vision}</p>
              </div>
              <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-5">
                <span className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-700">
                  <Icon name="target" className="h-4 w-4" />
                  Mission
                </span>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-700">{site.mission}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink to="/about/background" variant="dark">
                Read our background
              </ButtonLink>
              <Link
                to="/about/vision-mission"
                className="group inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-brand-700 hover:text-brand-900"
              >
                Mandate & core values
                <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Examinations ----------------------------- */

function Examinations() {
  const exams = [...schoolExams, ptce];

  return (
    <section className="bg-ink-50 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Examinations"
              icon="graduation"
              title="National examinations we administer"
            />
          </Reveal>
          <Link
            to="/examinations/school"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-brand-700 hover:text-brand-900"
          >
            All examinations
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {exams.map((exam, i) => (
            <Reveal key={exam.code} delay={i * 70}>
              <Link
                to={exam.code === "PTCE" ? "/examinations/teachers" : "/examinations/school"}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                  <img
                    src={exam.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-2.5 py-1 font-display text-[12.5px] font-extrabold tracking-wide text-brand-800">
                    {exam.code}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-brand-600">{exam.level}</p>
                  <h3 className="mt-1.5 font-display text-[16.5px] font-bold leading-snug text-ink-900">{exam.name}</h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-brand-700">
                    Learn more
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Services ------------------------------- */

function Services() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              icon="award"
              title="Certificates & services"
              description="Transcripts, verification, replacement of lost certificates and more — available at our offices in Zomba, Lilongwe and Mzuzu."
            />
          </Reveal>
          <Reveal delay={80}>
            <ButtonLink to="/services" variant="outline" className="mt-7">
              View all services
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full items-start gap-3.5 rounded-2xl border border-ink-100 bg-white p-4 transition duration-300 hover:border-brand-200 hover:shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[14.5px] font-bold leading-snug text-ink-900">{s.name}</span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-ink-500">{s.short}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Latest news ------------------------------ */

function LatestNews() {
  return (
    <section className="bg-ink-50 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading eyebrow="News & events" icon="newspaper" title="Latest from the Board" />
          </Reveal>
          <Link
            to="/media/news"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-brand-700 hover:text-brand-900"
          >
            All news
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((item, i) => (
            <Reveal key={item.slug} delay={i * 80}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
