import type { IconName } from "@/components/icons";
import { images } from "@/data/site";

/* ----------------------------- About ----------------------------- */

export const background = [
  "The Malawi National Examinations Board (MANEB) was founded in April, 1987, as a result of a merger between the Malawi Certificate Examinations and Testing Board (MCE&TB) and the Examinations Section of the Ministry of Education and Culture. The MCE&TB had been created in 1969 by an Act of Parliament to take charge of the process of localising the development and administration of examinations in Malawi. Prior to these developments, students finishing their secondary education used to sit for the Cambridge overseas school leaving certificate examination.",
  "Following this decision, the MCE&TB Act was amended in April 1987 to reflect the birth of a central Authority, MANEB. This new Act gave MANEB the responsibility to develop and administer national examinations for purposes of certification, selection and placement.",
  "MANEB is a parastatal organisation whose financial support comes largely from the Malawi Government, supplemented by fees charged on examinations and other services.",
];

export const milestones = [
  {
    year: "1969",
    title: "MCE&TB established",
    text: "An Act of Parliament creates the Malawi Certificate Examinations and Testing Board to localise examinations in Malawi.",
  },
  {
    year: "1987",
    title: "MANEB is born",
    text: "In April, the MCE&TB merges with the Examinations Section of the Ministry of Education and Culture to form MANEB.",
  },
  {
    year: "2018",
    title: "First regional office",
    text: "On 1st July, MANEB opens its first ever regional office, taking services closer to the public.",
  },
  {
    year: "2022",
    title: "E-registration launched",
    text: "In October, online registration and payment is rolled out to all MANEB-approved examination centres.",
  },
  {
    year: "2026",
    title: "National ICT award",
    text: "MANEB wins the ICT Education Skills and Development Award from the ICT Association of Malawi.",
  },
];

export const mandate = [
  "Conduct academic and other examinations at the conclusion of any approved course in Malawi as it may be considered in the public interest.",
  "Award Certificates and Diplomas to successful candidates in such examinations.",
];

export const coreValues: { title: string; icon: IconName }[] = [
  { title: "Equitability and fairness", icon: "scale" },
  { title: "Efficiency, innovativeness and responsiveness", icon: "zap" },
  { title: "Professionalism and integrity", icon: "award" },
  { title: "Security cautiousness", icon: "shield" },
  { title: "Transparency and accountability", icon: "eye" },
];

export const structureDirectorates = [
  { name: "Examinations Development", role: "Developing, typesetting and printing national examinations" },
  { name: "Examinations Administration", role: "Logistical support during administration and marking of examinations, and candidates' certification" },
  { name: "Security Services", role: "Security of examination documents during item development, moderation and printing, and general security of the Board's property and premises" },
  { name: "Computer Services", role: "Developing information communication and technology systems and processing of examination data" },
  { name: "Finance", role: "Managing and accounting for financial resources" },
  { name: "Corporate Services", role: "Human resource management and provision of office services" },
];

export const structureUnits = [
  { name: "Policy, Planning & Research Unit", role: "Policy, planning and provision of research services" },
  { name: "Procurement Unit", role: "Procurement of goods and services (under Corporate Services)" },
  { name: "Stores Section", role: "Records of the Board's goods and inventory control (under Corporate Services)" },
  { name: "Internal Audit Unit", role: "Assuring the effectiveness of resource utilisation and internal control systems" },
];

export interface Directorate {
  slug: string;
  name: string;
  kind: "Directorate" | "Unit";
  icon: IconName;
  summary: string;
  sections?: string[];
  functions: string[];
  note?: string;
}

export const directorates: Directorate[] = [
  {
    slug: "examinations-development",
    name: "Examinations Development",
    kind: "Directorate",
    icon: "pen",
    summary: "The directorate's main responsibility is to develop national examinations.",
    functions: [
      "Coordination of examination paper setting services, i.e. determining examination paper format and structure, item development and moderation",
      "Production and administration of aptitude tests",
      "Provision of examination typesetting and printing services",
    ],
  },
  {
    slug: "examinations-administration",
    name: "Examinations Administration",
    kind: "Directorate",
    icon: "clipboard",
    summary:
      "The Examination Administration Directorate's main role is to provide logistical support during administration and marking of examinations.",
    sections: ["Examination Administration", "Examination Processing", "Candidate Certification"],
    functions: [
      "Coordinating registration of candidates for examinations",
      "Production of examination timetables",
      "Coordinating administration of national examinations",
      "Facilitating marking of national examinations",
      "Disseminating Chief Examiners' reports to schools",
      "Recruiting and training markers",
      "Quality control of marking and score verification",
    ],
  },
  {
    slug: "security-services",
    name: "Security Services",
    kind: "Directorate",
    icon: "shield",
    summary: "The directorate is responsible for the security of examination documents and the Board's assets.",
    sections: ["Examination Security", "Certification Processing", "General Security"],
    functions: [
      "Provision of examination security services during item development, moderation, typesetting and printing",
      "Processing and authentication of certificates bearing the MANEB logo",
      "Provision of general security services",
      "Inspecting and recommending approval of institutions that qualify to be examination centres",
    ],
  },
  {
    slug: "computer-services",
    name: "Computer Services",
    kind: "Directorate",
    icon: "monitor",
    summary:
      "The directorate processes examination data, and manages and develops information communication and technology systems.",
    functions: [
      "Developing computer systems",
      "Providing computer test scoring services",
      "Maintenance of hardware and software systems",
      "Preparation, controlling and computerisation of data processes",
      "Designing and updating websites",
      "Providing user support and internet connections",
    ],
    note: "The directorate designed the electronic registration system that allows candidates to register at approved examination centres and pay examination fees directly to MANEB — addressing nominal-roll postage delays and misappropriation of examination fees.",
  },
  {
    slug: "finance",
    name: "Finance",
    kind: "Directorate",
    icon: "wallet",
    summary: "The directorate is responsible for managing and accounting for financial resources.",
    functions: [
      "Revenue collection and billing of debtors",
      "Provision of expenditure accounting services and payment of salaries",
      "Receipt and payment of cash and reconciliation of accounts",
      "Preparation of financial reports",
    ],
  },
  {
    slug: "corporate-services",
    name: "Corporate Services",
    kind: "Directorate",
    icon: "users",
    summary:
      "This directorate is responsible for providing policy guidance, leadership and sound administrative services to ensure that the core functions of MANEB are effectively and efficiently executed.",
    sections: ["Human Resources Management", "Office Services", "Procurement and Supplies (Stores)"],
    functions: [
      "Provision of human resource management services",
      "Provision of office services",
      "Provision of procurement and supplies services",
      "Record keeping and inventory control",
    ],
  },
  {
    slug: "internal-audit",
    name: "Internal Audit Unit",
    kind: "Unit",
    icon: "fileCheck",
    summary:
      "The responsibility of the Internal Audit Unit is to monitor resource utilisation and assure internal control systems of the resources.",
    functions: [
      "Systematic examination of financial and stores records and transactions conducted by the Board to ensure effective operation of internal control systems",
      "Verification of accuracy and authenticity of the accounts to ensure that laid down systems and procedures are being followed",
      "Monitoring utilisation of Government resources to ensure they are managed with due regard to economy, effectiveness and efficiency, and in conformity with laid down laws, regulations and instructions",
      "Evaluating the effectiveness of risk management",
      "Production of audit reports on findings and recommendations for submission to management",
    ],
  },
  {
    slug: "policy-planning-research",
    name: "Policy, Planning & Research Services",
    kind: "Unit",
    icon: "chart",
    summary: "The unit is responsible for provision of policy, planning and research services.",
    functions: [
      "Coordinates policies, programmes, plans and research",
      "Provides monitoring and evaluation services",
    ],
  },
];

/* --------------------------- Examinations --------------------------- */

export interface Exam {
  code: string;
  name: string;
  level: string;
  image: string;
  summary: string;
}

export const schoolExams: Exam[] = [
  {
    code: "PSLCE",
    name: "Primary School Leaving Certificate of Education",
    level: "End of primary school",
    image: images.smiles,
    summary:
      "The Primary School Leaving Certificate of Education (PSLCE) Examination is written by learners who are completing their final grade at primary school. This examination is also used by the Ministry of Education to select learners to all public secondary schools.",
  },
  {
    code: "JCE",
    name: "Junior Certificate of Education",
    level: "Junior secondary · Form 2",
    image: images.textbooks,
    summary:
      "The Junior Certificate of Education (JCE) Examination is written by learners completing their second year of secondary school, certifying achievement at the junior secondary level.",
  },
  {
    code: "MSCE",
    name: "Malawi School Certificate of Education",
    level: "Senior secondary · Form 4",
    image: images.secondaryGirls,
    summary:
      "The Malawi School Certificate of Education (MSCE) Examination is the final examination at secondary school level in Malawi. Learners who pass this examination qualify for selection into public and private colleges and universities or get absorbed into the job market.",
  },
];

export const ptce: Exam = {
  code: "PTCE",
  name: "Primary Teacher Certificate of Education",
  level: "Teacher Training Colleges",
  image: images.teacher,
  summary:
    "The Primary Teacher Certificate of Education (PTCE) Examination is administered to student teachers completing their studies at all Teacher Training Colleges in Malawi. Qualifying student teachers are certified to teach at any primary school in Malawi.",
};

export const msceConditions = [
  "Obtain a pass in six subjects, including English, with at least one distinction/credit",
  "Obtain a pass in five subjects, including English, with at least three distinctions/credits",
];

export const registrationFacts = [
  "Students wishing to write national examinations register with any approved MANEB examination centre of their convenience. MANEB does not directly register candidates.",
  "MANEB sets the registration period, which is usually the first term of an academic year. Registration outside this period is not entertained.",
];

export const registrationFees = [
  "Subject fees",
  "Entry fee",
  "Administration fee",
  "Form fee (external candidates only)",
  "Centre fee",
  "Identity card processing fee",
];

export const registrationSteps = [
  "The student provides his/her correct details — names, date of birth and choice of subjects (for JCE and MSCE) — to the designated teacher.",
  "The student verifies the correctness of the details, and requests the teacher to make any corrections.",
  "The system generates an invoice showing the student's name, photo, choice of subjects, examination fees and invoice number. The student re-verifies the details.",
  "The teacher gives the student the invoice for payment of examination fees.",
];

export const paymentPlatforms = [
  "TNM Mpamba",
  "Airtel Money",
  "FDH 525 Mobile Banking",
  "FDH Wallet 525",
  "FDH Banki Pakhomo",
  "NBS Eazy Mobile",
  "National Bank Mo626",
  "Standard Bank Unayo",
  "First Capital Bank",
];

export const centreRequirements = [
  "Apply to the Executive Director, Malawi National Examinations Board, P.O. Box 191, Zomba",
  "Send a copy of the application for centre inspection to the District Education Manager's (DEM's) office",
  "Have a Ministry of Education Registration Certificate",
  "Possess a storage room with strong lockable metal cabinet(s) and burglar bars on windows",
  "Have a double locking system with a mortise lock and night latch",
  "Possess an adequate number of desks for every candidate",
  "Have examination documents such as syllabuses and a copy of MANEB's regulations on administration of examinations",
  "Have durable infrastructure built of burnt/cement bricks with a strong roof made of iron sheets",
];

export const codeHighlights: { icon: IconName; text: string }[] = [
  { icon: "clock", text: "Be seated 15 minutes before the starting time" },
  { icon: "idCard", text: "Wear your identity card visibly throughout" },
  { icon: "ban", text: "No phones, notes or reference materials" },
  { icon: "alert", text: "No entry after 30 minutes of the paper" },
];

export const codeOfConduct: { text: string; sub?: string[] }[] = [
  { text: "Every candidate shall, a day before entering the examination paper, sign the declaration form to confirm that he or she has read, understood and accepted to abide by the rules." },
  {
    text: "All candidates shall, before entering the examination room:",
    sub: [
      "Visibly wear their identity cards and keep them visible until the end of each examination paper; and",
      "Submit to thorough search — any candidate found in possession of, or with reference materials in the examination room shall be liable to be disqualified for the entire examination and to prosecution.",
    ],
  },
  { text: "Any candidate who colludes with another, or shares ideas during National Examinations shall be liable to be disqualified for the entire examination and to prosecution." },
  { text: "Every candidate shall be seated in the examination room fifteen minutes before examination starting time." },
  { text: "Where a candidate is permitted to enter the examination room after the examination starting time, no extra time shall be allowed." },
  { text: "No candidate will be permitted into the examination room after the examination has been in progress for thirty minutes or more." },
  { text: "No candidate shall be allowed to bring into the examination room such things as notes, textbooks, cell phones, mirrors, cardboards, folders, files, crib garments or any material which is likely to be used for cheating. Any such items found in possession of any candidate shall be confiscated, and the candidate shall be disqualified for the entire examination, and liable to prosecution." },
  { text: "No candidate shall bring any reference material within 100 metres of the examination room." },
  { text: "Every candidate shall make sure that the examination envelope marked “A” is opened and that the one marked “B” is sealed in their presence." },
  { text: "A candidate may be allowed to go to the toilet and shall be escorted by a security officer, and any time lost in the process shall not be compensated." },
  { text: "Any candidate who harasses a supervisor, an invigilator or any other authorised official at an Examination Administration Centre, or who disrupts examinations in any way, shall be liable to be disqualified in the entire examination, and shall be liable to prosecution." },
  { text: "Any candidate who is unlawfully assisted in any way during an examination shall be disqualified for the entire examination, and shall be liable to prosecution." },
  { text: "All internal candidates shall be identified by the head teacher of their school in addition to wearing an identity card." },
  { text: "All external candidates shall be identified by the authentic identity cards issued by MANEB, and external candidates who do not have the required identity cards shall not be admitted into an examination room." },
  { text: "Any candidate who has been involved in any examination malpractice shall complete his or her section on Form No. EMF 002 and sign against his or her name." },
  { text: "Candidates shall adhere to the sitting plan." },
  { text: "Any candidate found copying or exchanging scripts or peeping from another candidate's script during the examination shall be disqualified in the entire examination, and shall be liable to prosecution." },
  { text: "Any candidate who submits two scripts of an examination paper shall be disqualified for the entire examination." },
  { text: "Any candidate who hires another person to write examinations on his or her behalf shall be disqualified and shall be liable to prosecution, while the hired person commits an offence and shall be liable to prosecution." },
  { text: "No candidate shall be permitted to write examinations under the influence of alcohol or drugs." },
  {
    text: "Any candidate who, in the course or at the end of National Examinations:",
    sub: [
      "Threatens, harasses or intimidates any member of staff, any candidate or any student at an Examination Administration Centre; or",
      "Wilfully destroys, damages, or vandalises any property at an Examination Administration Centre — shall be disqualified in the entire examination and in addition shall be liable to prosecution.",
    ],
  },
  { text: "Any candidate who has enrolled as an external candidate but writes National Examinations as an internal candidate shall be disqualified in the entire examination." },
];
