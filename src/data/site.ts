import ministerVisit from "@/assets/minister-visit.svg";
import examRoom from "@/assets/exam-room.svg";
import outreach from "@/assets/outreach.svg";
import schoolEvent from "@/assets/school-event.svg";
import type { IconName } from "@/components/icons";

export const site = {
  name: "Malawi National Examinations Board",
  short: "MANEB",
  email: "info@maneb.edu.mw",
  phone: "+265 1 525 277",
  phoneAlt: "+265 1 525 212",
  phoneHref: "tel:+2651525277",
  tollFree: "363",
  poBox: "P.O. Box 191, Zomba, Malawi",
  location: "Off Malemia Road, next to Old Parliament Building, Zomba",
  website: "https://www.maneb.edu.mw",
  mission:
    "To conduct valid and reliable examinations for certification, selection and placement purposes; and provide professional advice relating to assessment and examinations.",
  vision:
    "To be a highly reputable, credible and internationally recognised examining body.",
  portals: {
    eRegistration: "https://maneb.malawi265.com/",
    eResult: "https://maneb.malawi265.com/examresults",
  },
};

export const socials: { icon: IconName; label: string; href: string }[] = [
  { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/ManebMalawi" },
  { icon: "x", label: "X (Twitter)", href: "https://x.com/Maneb_Malawi" },
  {
    icon: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCbLdKiZlRNx1cOOm_NaGH4Q",
  },
];

export interface Office {
  id: string;
  region: string;
  addressee: string;
  lines: string[];
  location: string;
  phone?: string;
  email?: string;
}

export const offices: Office[] = [
  {
    id: "head",
    region: "Head Office",
    addressee: "The Executive Director",
    lines: ["The Malawi National Examinations Board", "P.O. Box 191", "Zomba, Malawi"],
    location: "Off Malemia Road, next to Old Parliament Building, Zomba",
    phone: "+265 1 525 277 / 1 525 212",
    email: "info@maneb.edu.mw",
  },
  {
    id: "north",
    region: "Regional Office — North",
    addressee: "The Regional Manager (North)",
    lines: ["The Malawi National Examinations Board", "P.O. Box 20289", "Luwinga, Mzuzu 2"],
    location: "Luwinga, Mzuzu",
  },
  {
    id: "central",
    region: "Regional Office — Central",
    addressee: "The Regional Manager (Central)",
    lines: ["The Malawi National Examinations Board", "Private Bag 130", "Lilongwe"],
    location: "Area 3, Lilongwe",
  },
];

/* ------------------------------------------------------------------ */
/* Photography — real Malawian learners (Wikimedia Commons) + MANEB     */
/* ------------------------------------------------------------------ */

const T = "https://thumb.wikimedia.org/wikipedia/commons/thumb";
const thumb = (hash: string, file: string, width: number) =>
  `${T}/${hash}/${file}/${width}px-${file}`;

export const images = {
  /** Primary school learner, Malawi — Federico Galizzi, CC BY-SA 4.0 */
  student: thumb("a/a3", "A_Malawian_primary_school_student.jpg", 1280),
  /** Ekwendeni Girls Secondary School — Scotland Malawi Partnership, CC BY-SA 4.0 */
  secondaryGirls: thumb(
    "5/5e",
    "Mrs_Elida_Kamanga_a_Lecturer_at_Mzuzu_University%2C_mentoring_girls_at_Ekwendeni_Girls_Secondary_School.jpg",
    1280,
  ),
  /** Nyungwe CDSS computer lab — Nicola Turing, CC BY-SA 4.0 */
  ictLab: thumb("c/cd", "Nyungwe_CDSS_Malawi.jpg", 1280),
  /** Learners walking to school, Malawi 2016 — public domain */
  walkToSchool: thumb("3/3e", "Jill_Biden_visits_Malawi%2C_July_2016_02.jpg", 1280),
  /** Primary classroom, Malawi 2016 — public domain */
  classroom: thumb("9/92", "Jill_Biden_visits_Malawi%2C_July_2016_09.jpg", 1280),
  /** Primary school, Lilongwe 2018 — public domain */
  teacher: thumb("a/aa", "First_Lady_Melania_Trump%27s_Visit_to_Africa_-_44204642695.jpg", 960),
  reading: thumb("c/cc", "First_Lady_Melania_Trump%27s_Visit_to_Africa_-_44204643405.jpg", 960),
  handsUp: thumb("2/2e", "First_Lady_Melania_Trump%27s_Visit_to_Africa_-_30177814967.jpg", 960),
  textbooks: thumb("5/5f", "First_Lady_Melania_Trump%27s_Visit_to_Africa_-_31242070098.jpg", 960),
  smiles: thumb("0/0c", "First_Lady_Melania_Trump%27s_Visit_to_Africa_-_44204645065.jpg", 960),
  /** Official MANEB photographs */
  ministerVisit,
  examRoom,
  outreach,
  schoolEvent,
};

export const photoCredits = [
  {
    subject: "Primary school learner, Malawi",
    author: "Federico Galizzi",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:A_Malawian_primary_school_student.jpg",
  },
  {
    subject: "Ekwendeni Girls Secondary School",
    author: "Scotland Malawi Partnership",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Mrs_Elida_Kamanga_a_Lecturer_at_Mzuzu_University,_mentoring_girls_at_Ekwendeni_Girls_Secondary_School.jpg",
  },
  {
    subject: "Nyungwe CDSS computer lab",
    author: "Nicola Turing",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Nyungwe_CDSS_Malawi.jpg",
  },
  {
    subject: "Learners in Malawi, 2016",
    author: "Lawrence Jackson",
    license: "Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Jill_Biden_visits_Malawi,_July_2016_02.jpg",
  },
  {
    subject: "Primary school learners, Lilongwe, 2018",
    author: "The White House",
    license: "Public domain",
    href: "https://commons.wikimedia.org/wiki/File:First_Lady_Melania_Trump%27s_Visit_to_Africa_-_30177814967.jpg",
  },
  {
    subject: "Examination rooms, events and the Minister's visit",
    author: "Malawi National Examinations Board",
    license: "© MANEB",
    href: "https://www.maneb.edu.mw",
  },
];
