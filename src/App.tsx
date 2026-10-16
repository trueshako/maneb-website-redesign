import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Icon } from "@/components/icons";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Link, RouterProvider, matchRoute, usePageTitle, usePath } from "@/router";
import { Home } from "@/pages/Home";
import { Background, Directorates, Structure, VisionMission } from "@/pages/About";
import { CodeOfConduct, Registration, SchoolExams, TeachersExams } from "@/pages/Examinations";
import { Results } from "@/pages/Results";
import { ServiceDetail, ServicesIndex } from "@/pages/Services";
import { NewsArticle, NewsList, Tenders, Vacancies } from "@/pages/Media";
import { Downloads, Faqs } from "@/pages/Resources";
import { Contact } from "@/pages/Contact";
import { Search } from "@/pages/Search";
import { AdminCenter } from "@/pages/AdminCenter";

const routes: Record<string, () => ReactNode> = {
  "/": () => <Home />,
  "/about": () => <Background />,
  "/about/background": () => <Background />,
  "/about/vision-mission": () => <VisionMission />,
  "/about/structure": () => <Structure />,
  "/about/directorates": () => <Directorates />,
  "/examinations": () => <SchoolExams />,
  "/examinations/school": () => <SchoolExams />,
  "/examinations/teachers": () => <TeachersExams />,
  "/examinations/registration": () => <Registration />,
  "/examinations/code-of-conduct": () => <CodeOfConduct />,
  "/results": () => <Results />,
  "/services": () => <ServicesIndex />,
  "/media": () => <NewsList />,
  "/media/news": () => <NewsList />,
  "/media/vacancies": () => <Vacancies />,
  "/media/tenders": () => <Tenders />,
  "/downloads": () => <Downloads />,
  "/faqs": () => <Faqs />,
  "/search": () => <Search />,
  "/admin-center": () => <AdminCenter />,
  "/contact": () => <Contact />,
};

function resolve(path: string): ReactNode {
  const page = routes[path];
  if (page) return page();

  let params = matchRoute("/about/directorates/:slug", path);
  if (params) return <Directorates slug={params.slug} />;
  params = matchRoute("/services/:slug", path);
  if (params) return <ServiceDetail slug={params.slug} />;
  params = matchRoute("/media/news/:slug", path);
  if (params) return <NewsArticle slug={params.slug} />;

  return <NotFound />;
}

function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-brand-950 pt-16 xl:pt-[72px]">
      <div className="grid-lines absolute inset-0 -z-10 opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-brand-500/25 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-sun-500/15 blur-[100px]" />

      <div className="container-x py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-[1.1rem] font-bold uppercase tracking-[0.2em] text-sun-400">
              Error 404
            </p>
            <h1 className="mt-4 text-balance font-display text-[2.6rem] font-extrabold leading-[1.05] text-white sm:text-[3.5rem]">
              This page took an examination it wasn't prepared for.
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-brand-100/80">
              The page you are looking for may have moved, been renamed, or never existed. Try one of these instead.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-sun-400 px-6 py-3.5 text-[14.5px] font-bold text-brand-950 transition hover:bg-sun-300"
              >
                <Icon name="home" className="h-4 w-4" />
                Back home
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[14.5px] font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                <Icon name="search" className="h-4 w-4" />
                Search the site
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <p className="font-display text-[7rem] font-extrabold leading-none text-white/15 sm:text-[9rem]">404</p>
              <div className="mt-4 space-y-3">
                {[
                  { to: "/results", label: "Examination results" },
                  { to: "/examinations/school", label: "School examinations" },
                  { to: "/services", label: "Services" },
                  { to: "/contact", label: "Contact us" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[14px] font-medium text-white transition hover:border-sun-400/40 hover:bg-white/10"
                  >
                    {l.label}
                    <Icon name="arrowRight" className="h-4 w-4 text-brand-300 transition-transform group-hover:translate-x-0.5 group-hover:text-sun-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Shell() {
  const path = usePath();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <button
        type="button"
        onClick={() => document.getElementById("main")?.focus()}
        className="sr-only fixed left-4 top-3 z-[100] rounded-full bg-brand-950 px-4 py-2 text-[13px] font-semibold text-white focus:not-sr-only"
      >
        Skip to content
      </button>
      <Navbar />
      <main id="main" tabIndex={-1} key={path} className="page-enter flex-1 outline-none">
        {resolve(path)}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  );
}
