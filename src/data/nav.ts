import type { IconName } from "@/components/icons";
import { services } from "@/data/services";

export interface NavItem {
  label: string;
  to: string;
  icon: IconName;
  description?: string;
}

export interface NavSection {
  label: string;
  to: string;
  /** Route prefixes that mark this section as active. */
  bases: string[];
  items?: NavItem[];
  wide?: boolean;
}

export const aboutNav: NavItem[] = [
  { label: "Background", to: "/about/background", icon: "building", description: "Who we are and how MANEB began" },
  { label: "Vision, Mission & Values", to: "/about/vision-mission", icon: "eye", description: "Vision, mission, mandate and core values" },
  { label: "Organizational Structure", to: "/about/structure", icon: "network", description: "How the Board is organised" },
  { label: "Directorates", to: "/about/directorates", icon: "layers", description: "Six directorates and supporting units" },
];

export const examNav: NavItem[] = [
  { label: "School Examinations", to: "/examinations/school", icon: "graduation", description: "PSLCE, JCE and MSCE" },
  { label: "Teachers Examinations", to: "/examinations/teachers", icon: "book", description: "Primary Teacher Certificate of Education" },
  { label: "Examinations Registration", to: "/examinations/registration", icon: "clipboard", description: "How candidates register and pay" },
  { label: "Candidate Code of Conduct", to: "/examinations/code-of-conduct", icon: "shield", description: "Rules every candidate must follow" },
];

export const serviceNav: NavItem[] = services.map((s) => ({
  label: s.name,
  to: `/services/${s.slug}`,
  icon: s.icon,
  description: s.short,
}));

export const mediaNav: NavItem[] = [
  { label: "News & Events", to: "/media/news", icon: "newspaper", description: "Announcements from the Board" },
  { label: "Vacancies", to: "/media/vacancies", icon: "briefcase", description: "Careers and marking opportunities" },
  { label: "Tenders", to: "/media/tenders", icon: "landmark", description: "Procurement notices" },
  { label: "Downloads", to: "/downloads", icon: "download", description: "Timetables, forms and publications" },
  { label: "FAQs", to: "/faqs", icon: "help", description: "Answers to common questions" },
];

export const nav: NavSection[] = [
  { label: "Home", to: "/", bases: ["/"] },
  { label: "About", to: "/about/background", bases: ["/about"], items: aboutNav },
  { label: "Examinations", to: "/examinations/school", bases: ["/examinations"], items: examNav },
  { label: "Services", to: "/services", bases: ["/services"], items: serviceNav, wide: true },
  { label: "Media", to: "/media/news", bases: ["/media", "/downloads", "/faqs"], items: mediaNav },
  { label: "Results", to: "/results", bases: ["/results"] },
  { label: "Contact", to: "/contact", bases: ["/contact"] },
];
