import type { IconName } from "@/components/icons";

export interface FeeRow {
  item: string;
  standard: string;
  express?: string;
}

export interface Service {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  intro: string[];
  requirements?: string[];
  steps?: string[];
  fees?: FeeRow[];
  feeNote?: string;
  processing?: string;
  table?: { head: string[]; rows: string[][]; note?: string };
  subsections?: { title: string; body: string; requirements: string[] }[];
  submit?: string;
  collection?: string;
}

const SUBMIT_IN_PERSON =
  "Hand-deliver your documents in person to MANEB Head Office (off Malemia Road, next to Old Parliament Building, Zomba) or email them to info@maneb.edu.mw. Applicants in the Northern and Central Regions may submit at the Mzuzu (Luwinga) and Lilongwe (Area 3) regional offices.";

const SUBMIT_ANY_OFFICE =
  "Hand-deliver your application to MANEB offices in Zomba, Lilongwe or Mzuzu, or email it to info@maneb.edu.mw, attaching a copy of the deposit slip.";

export const payment = {
  accountName: "MANEB",
  bank: "National Bank of Malawi",
  accountNumber: "1123688",
  serviceCentre: "Zomba",
  swift: "NBMAMWMW",
};

export const services: Service[] = [
  {
    slug: "notification-of-results",
    name: "Notification of Results",
    short: "Results slips used while a certificate is processed",
    icon: "receipt",
    intro: [
      "A notification of results slip is a document which MANEB prints in triplicate for every candidate who sits for national examinations. This document is meant to be used while waiting for the processing of a certificate.",
      "MANEB delivers notification of results slips to District Education Offices, from where examination centres (schools) collect them. Candidates therefore do not have to come to MANEB — they collect their slips from their respective schools for free.",
      "If a candidate comes to MANEB and requests that we reproduce a notification of results slip instead of collecting it from their school, we process it at a fee.",
    ],
    fees: [{ item: "Reproduction of slip (per triplicate)", standard: "MWK 60,000", express: "MWK 100,000" }],
    processing: "Minimum of one week · 2-day express available",
    submit: "Hand-deliver your application, including a reference letter, to any MANEB office or email it to info@maneb.edu.mw, attaching a copy of the deposit slip.",
  },
  {
    slug: "replacement-of-lost-certificate",
    name: "Replacement of Lost Certificate",
    short: "A certifying statement for lost or damaged certificates",
    icon: "fileCheck",
    intro: [
      "In the event that a certificate is lost or damaged, a certifying statement will be issued upon submission of an application.",
    ],
    requirements: [
      "Police report",
      "National Identity card",
      "Reference letter from the school where you obtained the certificate",
      "Reference from a notable or well-known person — such as a Member of Parliament, Doctor, Reverend, Chief or Magistrate — testifying that he/she knows you personally",
      "Payment of the processing fee, made after the application has been vetted (so include all your contact details)",
    ],
    fees: [{ item: "Certifying statement", standard: "MWK 80,000", express: "MWK 120,000" }],
    processing: "Processing starts once the application is vetted · express available",
    submit: SUBMIT_IN_PERSON,
    collection:
      "When processing is done, MANEB will contact you using the details on your application letter. Bring a valid identification document — passport, driving licence or National Identity card — to collect the certificate.",
  },
  {
    slug: "academic-transcripts",
    name: "Academic Transcripts",
    short: "A sealed record of your grades, sent to an employer",
    icon: "fileText",
    intro: [
      "Transcripts are issued when an individual requests MANEB to give information on how he/she passed in any of the examinations that we administer.",
    ],
    steps: [
      "Fill in the Transcript Application Form with your name, examination number, school(s) attended, subjects passed, correct grades and details of the addressee (employer or organisation).",
      "The transcript is addressed to the employer or organisation that requires the information.",
      "The transcript carries the MANEB seal for authenticity.",
      "The transcript is wax-sealed and sent to the employer or organisation in question.",
      "Pay the processing fee.",
    ],
    fees: [
      { item: "Local use", standard: "MWK 45,000", express: "MWK 90,000" },
      { item: "International use", standard: "USD 55", express: "USD 75" },
    ],
    processing: "Minimum of one week · 2-day express available",
    submit: SUBMIT_ANY_OFFICE,
  },
  {
    slug: "authentication-of-certificate",
    name: "Authentication of Certificate",
    short: "Authentication of certificates bearing our logo",
    icon: "stamp",
    intro: [
      "We authenticate certificates that bear our logo upon request from employers or education institutions.",
    ],
    requirements: [
      "Application with the original copy of the certificate to be authenticated attached",
      "Payment of the processing fee",
    ],
    fees: [
      { item: "Requests from within Malawi (per certificate)", standard: "MWK 80,000", express: "MWK 120,000" },
      { item: "Requests from outside Malawi (per certificate)", standard: "USD 90", express: "USD 120" },
    ],
    processing: "Minimum of one week · 2-day express available",
    submit: SUBMIT_ANY_OFFICE,
  },
  {
    slug: "certificate-equating",
    name: "Certificate Equating",
    short: "Equivalence with other ‘O’ level examining boards",
    icon: "scale",
    intro: [
      "We determine the equivalence of our certificates to those of other examining boards that administer ‘O’ level examinations by providing a comparison statement between our certificates and those offered by the other boards.",
    ],
    requirements: [
      "A copy of the certificate requiring the determination",
      "Proof of payment for the service",
    ],
    fees: [{ item: "Comparison statement", standard: "USD 90", express: "USD 120" }],
    feeNote: "Or the equivalent in Malawian Kwacha. Fees may also be paid in cash at our head office.",
    processing: "Minimum of one week · 2-day express available",
    submit: SUBMIT_ANY_OFFICE,
  },
  {
    slug: "examination-data-request",
    name: "Examination Data Request",
    short: "Examination statistics for research and planning",
    icon: "database",
    intro: [
      "MANEB supplies examination-related data at a fee to individuals, organisations or institutions upon advance booking. The charges are for labour during processing, the processing itself, and printing (if necessary).",
    ],
    table: {
      head: ["Item", "Individual", "Organisation"],
      rows: [
        ["Labour", "K1,600 / minute", "K3,400 / minute"],
        ["Computer time", "K800 / minute", "K1,800 / minute"],
        ["Printer time", "K800 / minute", "K1,800 / minute"],
        ["Ribbon", "K200 / page", "K400 / page"],
        ["Printing on 132-column paper", "K10,000 / page", "K12,000 / page"],
        ["Printing on A4 paper", "K200 / page", "K400 / page"],
      ],
      note: "Requests for data should specify the type of statistics. MANEB uses its discretion to determine the nature of the data to be released.",
    },
  },
  {
    slug: "certificate-by-accumulation",
    name: "Certificate by Accumulation",
    short: "Combine grades from more than one sitting",
    icon: "repeat",
    intro: [
      "An individual who has not managed to qualify for a certificate at one sitting stands a chance of being awarded a certificate by combining grades obtained from two or three sittings within four consecutive years of the same curriculum.",
      "The certificate is produced upon request from the individual and indicates the years in which the accumulated grades were obtained.",
    ],
    requirements: [
      "An application letter stating your names, the years of the examinations, the names of the schools you registered with, and the grades obtained in each year — or the application form obtainable from MANEB",
      "Payment of the processing fee, made in cash at MANEB offices or by deposit after the application has been vetted",
    ],
    fees: [{ item: "Certificate by accumulation", standard: "MWK 80,000" }],
    processing: "Minimum of 5 days",
    submit: SUBMIT_IN_PERSON,
  },
  {
    slug: "verification-of-certificates",
    name: "Verification of Certificates",
    short: "For employers and institutions confirming a certificate",
    icon: "shield",
    intro: [
      "We verify certificates that bear our logo upon request from employers or education institutions.",
    ],
    requirements: [
      "Application with a copy of the certificate to be verified attached",
      "Payment of the processing fee",
    ],
    fees: [
      { item: "Requests from within Malawi (per certificate)", standard: "MWK 80,000", express: "MWK 120,000" },
      { item: "Requests from outside Malawi (per certificate)", standard: "USD 90", express: "USD 120" },
    ],
    processing: "Minimum of one week · 2-day express available",
    submit: SUBMIT_ANY_OFFICE,
  },
  {
    slug: "additional-services",
    name: "Additional Services",
    short: "Aptitude testing, research data and handwriting analysis",
    icon: "sparkles",
    intro: [
      "Beyond national examinations, MANEB offers specialised assessment services to employers, training institutions and researchers. These services are rendered at a fee.",
    ],
    subsections: [
      {
        title: "Aptitude Testing",
        body: "MANEB administers aptitude tests for the identification of suitable employees and suitable trainees.",
        requirements: [
          "Employers submit an application specifying the position to recruit for, the minimum qualifications of the recruits and the job description",
          "Training institutions provide the expected candidature, their qualifications and the dates when the test should be administered",
        ],
      },
      {
        title: "Provision of Metadata for Research",
        body: "MANEB provides metadata at a fee to individuals and institutions upon request.",
        requirements: [
          "An application specifying the type of data, the format required and an explanation of what the data will be used for",
          "Release of data is done at management's discretion",
        ],
      },
      {
        title: "Forensic Handwriting Analysis",
        body: "Compares and contrasts handwriting in questioned and known documents for purposes of identifying the author of a questioned document.",
        requirements: [
          "Submit original copies of the handwritten questioned and known documents to be analysed",
          "The fee is determined by management depending on the nature of the analysis",
        ],
      },
      {
        title: "Research in Education Assessment",
        body: "Carried out at a fee upon request from individuals or institutions.",
        requirements: ["Specify the kind and format of data required"],
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
