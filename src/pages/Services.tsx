import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { Callout, CheckList, H2, NumberedSteps, PageHeader, PrevNext, Prose, SectionShell } from "@/components/ui";
import { Link, usePageTitle } from "@/router";
import { serviceNav, type NavItem } from "@/data/nav";
import { images } from "@/data/site";
import { getService, payment, services, type FeeRow } from "@/data/services";

const servicesItems: NavItem[] = [{ label: "All services", to: "/services", icon: "list" }, ...serviceNav];
const servicesCrumb = { label: "Services", to: "/services" };

function PaymentCard() {
  const rows: [string, string][] = [
    ["Account name", payment.accountName],
    ["Banker", payment.bank],
    ["Account number", payment.accountNumber],
    ["Service centre", payment.serviceCentre],
    ["SWIFT code", `${payment.swift} (outside Malawi)`],
  ];

  return (
    <div className="rounded-3xl bg-brand-950 p-6 text-white sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sun-400">
          <Icon name="landmark" className="h-5 w-5" />
        </span>
        <h3 className="font-display text-[17px] font-bold">Payment details</h3>
      </div>
      <dl className="mt-5 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white/[0.06] px-4 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-brand-300">{k}</dt>
            <dd className="mt-1 text-[14px] font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[13px] leading-relaxed text-brand-100/75">
        Services are only provided upon payment of fees. Attach a copy of the deposit slip to your application.
      </p>
    </div>
  );
}

function FeeTable({ rows }: { rows: FeeRow[] }) {
  const hasExpress = rows.some((r) => r.express);
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-ink-100">
      <table className="w-full min-w-[460px] text-left">
        <thead className="bg-ink-50">
          <tr className="text-[11.5px] font-bold uppercase tracking-wider text-ink-500">
            <th className="px-5 py-3.5">Item</th>
            <th className="px-5 py-3.5">Standard</th>
            {hasExpress && <th className="px-5 py-3.5">Express · 2 days</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100 text-[14.5px]">
          {rows.map((r) => (
            <tr key={r.item}>
              <td className="px-5 py-4 text-ink-700">{r.item}</td>
              <td className="whitespace-nowrap px-5 py-4 font-display font-bold text-ink-900">{r.standard}</td>
              {hasExpress && (
                <td className="whitespace-nowrap px-5 py-4 font-display font-bold text-brand-700">{r.express ?? "—"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------- Overview -------------------------------- */

export function ServicesIndex() {
  usePageTitle("Services");

  return (
    <>
      <PageHeader
        title="Services"
        description="Certificates, transcripts, verification and specialised assessment services from MANEB."
        image={images.smiles}
        crumbs={[{ label: "Services" }]}
      />
      <SectionShell title="Services" items={servicesItems}>
        <Prose>
          <p>
            Our services are available to candidates, schools, employers and institutions at the MANEB Head Office in
            Zomba and at the regional offices in Lilongwe (Area 3) and Mzuzu (Luwinga). Select a service for its
            requirements, fees and processing times.
          </p>
        </Prose>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => {
            const fee = s.fees?.[0]?.standard;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 50}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    {fee && (
                      <span className="rounded-full bg-ink-50 px-3 py-1 text-[12px] font-semibold text-ink-700">
                        From {fee}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-[16.5px] font-bold text-ink-900">{s.name}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{s.short}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-brand-700">
                    Requirements & fees
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10">
          <PaymentCard />
        </div>
      </SectionShell>
    </>
  );
}

/* --------------------------------- Detail --------------------------------- */

export function ServiceDetail({ slug }: { slug: string }) {
  const service = getService(slug);
  usePageTitle(service?.name ?? "Service");

  if (!service) {
    return (
      <>
        <PageHeader title="Service not found" image={images.smiles} crumbs={[servicesCrumb, { label: "Not found" }]} />
        <SectionShell title="Services" items={servicesItems}>
          <Callout title="We couldn't find that service">
            <Link to="/services" className="font-semibold text-brand-700 hover:underline">
              Browse all services
            </Link>
          </Callout>
        </SectionShell>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={service.name}
        description={service.short}
        image={images.smiles}
        crumbs={[servicesCrumb, { label: service.name }]}
      />
      <SectionShell title="Services" items={servicesItems}>
        <div className="space-y-12">
          <div>
            <Prose>
              {service.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Prose>
            {service.processing && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-[13px] font-semibold text-brand-800">
                <Icon name="clock" className="h-4 w-4" />
                {service.processing}
              </p>
            )}
          </div>

          {service.requirements && (
            <section>
              <H2>Requirements</H2>
              <CheckList items={service.requirements} className="mt-5" />
            </section>
          )}

          {service.steps && (
            <section>
              <H2>Procedure</H2>
              <div className="mt-6">
                <NumberedSteps items={service.steps} />
              </div>
            </section>
          )}

          {service.fees && (
            <section>
              <H2>Fees</H2>
              <FeeTable rows={service.fees} />
              {service.feeNote && <p className="mt-3 text-[13px] text-ink-500">{service.feeNote}</p>}
            </section>
          )}

          {service.table && (
            <section>
              <H2>Charges</H2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-ink-100">
                <table className="w-full min-w-[460px] text-left">
                  <thead className="bg-ink-50">
                    <tr className="text-[11.5px] font-bold uppercase tracking-wider text-ink-500">
                      {service.table.head.map((h) => (
                        <th key={h} className="px-5 py-3.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100 text-[14.5px]">
                    {service.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td
                            key={cell + i}
                            className={i === 0 ? "px-5 py-4 text-ink-700" : "whitespace-nowrap px-5 py-4 font-semibold text-ink-900"}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {service.table.note && (
                <Callout className="mt-5" title="Please note">
                  {service.table.note}
                </Callout>
              )}
            </section>
          )}

          {service.subsections && (
            <section className="grid gap-4 md:grid-cols-2">
              {service.subsections.map((sub) => (
                <div key={sub.title} className="rounded-2xl border border-ink-100 p-6">
                  <h3 className="font-display text-[17px] font-bold text-ink-900">{sub.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-700">{sub.body}</p>
                  <CheckList items={sub.requirements} className="mt-4" />
                </div>
              ))}
            </section>
          )}

          {(service.submit || service.collection) && (
            <div className="grid gap-4 md:grid-cols-2">
              {service.submit && (
                <Callout icon="send" title="How to apply">
                  {service.submit}
                </Callout>
              )}
              {service.collection && (
                <Callout icon="idCard" tone="sun" title="Collection">
                  {service.collection}
                </Callout>
              )}
            </div>
          )}

          {service.fees && <PaymentCard />}
        </div>

        <PrevNext items={serviceNav} />
      </SectionShell>
    </>
  );
}
