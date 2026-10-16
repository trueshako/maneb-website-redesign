import { images } from "@/data/site";

export type NewsCategory = "Results" | "Awards" | "Announcements" | "Press" | "Security";

export interface NewsBlock {
  type: "text" | "image";
  content?: string; // text content (supports **bold**, *italic*, [text](url))
  src?: string; // image URL
  alt?: string;
  caption?: string;
}

export interface NewsItem {
  slug: string;
  category: NewsCategory;
  title: string;
  date: string;
  image: string; // hero/cover image
  excerpt: string;
  body: string[]; // legacy: paragraphs
  blocks?: NewsBlock[]; // new: ordered content blocks
  author?: string;
}

/* ------------------------------------------------------------------ */
/*  News — sourced from www.maneb.edu.mw/medium/news-events.html        */
/* ------------------------------------------------------------------ */

export const news: NewsItem[] = [
  {
    slug: "2026-msce-results-out",
    category: "Results",
    title: "2026 MSCE Results Out",
    date: "2026",
    image: images.handsUp,
    excerpt:
      "MANEB, in conjunction with the Ministry of Education, has released the 2026 Malawi School Certificate of Education (MSCE) examination results. 111,510 of 188,169 candidates have passed.",
    body: [
      "The Malawi National Examinations Board (MANEB), in conjunction with the Ministry of Education, has released the 2026 Malawi School Certificate of Education (MSCE) examination results.",
      "For a candidate to be awarded a certificate he/she must either obtain a pass in six subjects including English, with a credit pass in at least one of them, or obtain a pass in five subjects including English, with a credit pass in at least three of them.",
      "Out of the 188,169 candidates who sat for the 2026 MSCE examination, 111,510 have passed, representing a 59.26 percent pass rate.",
      "To access examination results, examination centres will be able to download their school results through their e-Registration portals, while individual candidates or their parent/guardian will be able to access results online at https://maneb.malawi265.com/examresults/. A candidate's results can be retrieved using their correct examination number and date of birth.",
      "All candidates wishing to query their 2026 MSCE results should do so in writing through the heads of schools, and all queries should reach MANEB not later than 8th October, 2026.",
    ],
  },
  {
    slug: "maneb-wins-ict-education-skills-award",
    category: "Awards",
    title: "MANEB Wins ICT Education Skills and Development Award",
    date: "2026",
    image: images.ictLab,
    excerpt:
      "MANEB has been awarded the ICT Education Skills and Development Award in the 2026 ICT Corporate Awards organised by ICTAM, in recognition of innovations in the national examinations management systems.",
    body: [
      "MANEB has been awarded the Information and Communication Technology (ICT) Education Skills and Development Award in the 2026 ICT Corporate Awards organised by the ICT Association of Malawi (ICTAM), in recognition of innovations in the national examinations management systems.",
      "This recognition reflects MANEB's commitment to embracing technology to improve examination administration and enhance service delivery as an assessment body.",
      "Through the examinations management system, MANEB has successfully introduced the online registration of candidates by examination centres, online payment of examination fees through financial service institutions, and integrated the online processing and release of examination results, among others.",
      "Accepting the award from ICTAM, the MANEB Executive Director Professor Dorothy Nampota expressed her excitement at the recognition, as it demonstrates the impact of the strides that MANEB has made in digitalisation on the people of Malawi. She added that MANEB is still working to improve and digitalise most of the services that are rendered to the public in the near future.",
    ],
  },
  {
    slug: "maneb-welcomes-new-board-members",
    category: "Announcements",
    title: "MANEB Welcomes New Board Members",
    date: "14 January 2026",
    image: images.schoolEvent,
    excerpt:
      "MANEB has welcomed its new Board of Directors, who will provide guidance in its mission of conducting valid and reliable examinations for certification, selection and placement.",
    body: [
      "The Malawi National Examinations Board (MANEB) has welcomed its new Board of Directors that will provide guidance in its mission of conducting valid and reliable examinations for certification, selection, and placement purposes.",
      "The Board Members held their first meeting on 14 January 2026 at the MANEB Headquarters Office in Zomba, where they received an orientation into the work of the Board.",
      "The Executive Director for MANEB, Professor Dorothy Nampota, expressed confidence that the Board Members bring with them valuable experience and knowledge that will support the institution's remarkable work progress and future plans.",
    ],
  },
  {
    slug: "minister-of-education-visits-maneb",
    category: "Announcements",
    title: "Minister of Education Visits MANEB, Commends Examination Preparedness",
    date: "30 January 2026",
    image: images.ministerVisit,
    excerpt:
      "The Minister of Education, Science and Technology, Honourable Bright Msaka, SC, commended MANEB for the progress made in recent years during a visit to see how it is preparing for the 2026 national examinations.",
    body: [
      "The Minister of Education, Science and Technology, Honourable Bright Msaka, SC, has commended MANEB for the progress made in recent years during a visit organised to appreciate how the Board is preparing to administer the 2026 national examinations.",
      "During the visit, which took place on 30th January 2026, the Minister held discussions with the MANEB management team, where he expressed his satisfaction with the progress made by the Board in recent years in ensuring credible and leakage-free national examinations.",
    ],
  },
  {
    slug: "maneb-successfully-administers-2021-examinations",
    category: "Announcements",
    title: "MANEB Successfully Administers 2021 Examinations",
    date: "2021",
    image: images.classroom,
    excerpt:
      "2021 was full of activities with tight schedules but very rewarding for MANEB — five examinations processed and successfully administered.",
    body: [
      "2021 has been full of activities with tight schedules but very rewarding for MANEB. This year alone MANEB has processed and successfully administered five examinations.",
      "Good engagement of critical stakeholders, Government's timely provision of required resources, intensified awareness campaigns on examinations regulations, enhanced orientation of examination administrators, provision of terms of reference to examination administrators, strengthened examinations security, ease of communication among examination administrators and intensified monitoring of examinations administration are among the factors that contributed to the successful administration of the 2021 national examinations.",
      "Security is paramount in national examinations. To ensure provision of maximum security for the examinations, MANEB has a fully-fledged security department which works hand in hand with national security agents during processing and administration of the national examinations.",
    ],
  },
  {
    slug: "maneb-holds-interface-meeting-with-national-security-agents",
    category: "Security",
    title: "MANEB Holds Interface Meeting with National Security Agents",
    date: "29 June 2021",
    image: images.examRoom,
    excerpt:
      "MANEB held an interface meeting with senior officers from the Malawi Defence Force and the Malawi Police Service to review the 2020 examinations and plan for 2021.",
    body: [
      "Security is paramount in national examinations. To ensure provision of maximum security for the examinations, MANEB has a fully-fledged security department which works hand in hand with national security agents during processing and administration of the national examinations.",
      "For decades MANEB has largely partnered with the Malawi Police Service (MPS) in security provision during processing and administration of examinations, but following the 2020 MSCE examination leakage a decision was made to co-opt the Malawi Defence Force (MDF) to complement MANEB's and MPS's efforts during the re-administration of the examination. The involvement of the national security agents yielded positive results since the re-administered examination was leakage free.",
      "On 29th June 2021 an interface meeting was held between MANEB officials and senior officers from the two national security agents, MDF and MPS. The purpose of the meeting was to review the administration of the 2020 examinations and plan for the 2021 examinations with the view to further enhance examinations security and uphold the credibility of national examinations.",
    ],
  },
  {
    slug: "maneb-ed-press-briefing-2020-examinations",
    category: "Press",
    title: "MANEB's ED Press Briefing on Preparations for Administration of 2020 Examinations and 2021 JCE Examination",
    date: "15 September 2020",
    image: images.classroom,
    excerpt:
      "MANEB briefed the media at the Central Office of Information in Blantyre on preparations for the 2020 national examinations and the re-introduced 2021 JCE examination.",
    body: [
      "DATE OF PRESS BRIEFING: 15TH SEPTEMBER, 2020. VENUE: CENTRAL OFFICE OF INFORMATION, BLANTYRE.",
      "I called for this presser to update you on: a) what we have already done in preparation for the 2020 Primary School Leaving Certificate of Education (PSLCE), Malawi School Certificate of Education (MSCE) and Primary Teacher Certificate (PTC) examinations; b) what we are doing in preparation for the said examinations; c) our expectation for the 2020 examinations; d) preparations for the re-introduced 2021 JCE examination; and e) development of examinations syllabi.",
      "Registration processes for the 2020 PSLCE and MSCE examinations started in September 2019 and were completed in November 2019. MANEB strictly adhered to the deadlines that it stipulated in the circular letter on the registration, which was issued in August. Using registration data that had been submitted by respective District Education Managers (DEMs), in December 2019, MANEB produced nominal rolls which were distributed to examination centres for verification.",
    ],
  },
  {
    slug: "examinations-registration-and-payment-of-examination-fees",
    category: "Announcements",
    title: "Examinations Registration and Payment of Examination Fees",
    date: "October 2022",
    image: images.reading,
    excerpt:
      "The e-registration and payment system for examinations was rolled out in October 2022. Registration of students for all examinations is now done online in all MANEB-approved examination centres.",
    body: [
      "E-registration and payment system for examinations was rolled out in October 2022. In that regard, registration of students for all examinations is done online in all MANEB-approved examination centres. The system has proved to be efficient, transparent, and effective and, therefore, will continue to be used for subsequent examinations.",
      "MANEB sets registration and examination fees payment period, which is usually the first term of an academic year. Prospective candidates are required to register during this stated period, as MANEB does not entertain registration outside the required period.",
      "Examination fees are paid directly to MANEB through e-payment platforms by guardians or students themselves — not through school teachers nor any school authorities.",
    ],
  },
  {
    slug: "maneb-donates-tree-seedlings",
    category: "Announcements",
    title: "MANEB Donates Tree Seedlings to Support Environmental Protection Initiatives",
    date: "2020",
    image: images.outreach,
    excerpt:
      "MANEB donated tree seedlings to Zomba City Council, Kasungu Education District and the CCAP Livingstonia Synod as part of its corporate social responsibility.",
    body: [
      "The Malawi National Examinations Board (MANEB) has this year donated tree seedlings to Zomba City Council, Kasungu Education District and the Church of Central African Presybterian (CCAP) Livingstonia Synod. The donation is part of corporate social responsibility as per agreement between MANEB, as a parastatal, and the government of Malawi.",
      "In Zomba City Council, the donation was made to support the Mayor's Green and Clean City Initiative, which is intended at increasing the tree population in the city and replacing old trees. The initiative was launched by the Zomba City Mayor, Councillor Benson Bullah on 28 January 2020 in the Central Business District of the city. During the launch, heads and representatives of government and parastatal institutions, including MANEB, planted trees.",
      "Kasungu District Education office received 3,000 tree seedlings at a function held on 29 January 2020 at Kauta Primary School, in Lisasadzi zone. The handover of the seedlings to the District Education Manager (DEM), Mr Rabson Kawalala, was witnessed by the District Forestry Officer, local community leaders, members of the school management committee, and the school community including teachers and learners.",
    ],
  },
  {
    slug: "maneb-regional-offices-fully-operational",
    category: "Announcements",
    title: "MANEB Regional Offices Are Fully Operational",
    date: "2018",
    image: images.outreach,
    excerpt:
      "MANEB's regional offices in the Northern and Central Regions are fully operational, taking services closer to the public.",
    body: [
      "As one way of ensuring that there is equitability, fairness and responsiveness in the provision of assessment services to its clients, MANEB regional offices in the Northern and Central Regions of the country are fully operational.",
      "On 1st July 2018 the first ever regional office was officially opened in the northern region by Mr R.Z Agabu, the Director of Inspectorate and Advisory Services in the Ministry of Education, Science and Technology. The northern region office is located at Luwinga. Three months later, the central region office was also opened in Lilongwe Area 3 within the premises of the Malawi College of Distance Education (MCDE).",
      "Both regional offices are fully operational. Services offered at the offices include: receiving examination results queries, receiving candidates registration data, receiving examinations nominal roll queries, provision of identity card forms, applications for certificates replacement and accumulation, provision of academic transcripts for local and international use, provision of MSCE notification of results slip, determining academic equivalence of MANEB certificates, and verification of MANEB certificates.",
    ],
  },
  {
    slug: "northern-region-maneb-office-fully-operational",
    category: "Announcements",
    title: "Northern Region MANEB Office Is Fully Operational",
    date: "1 July 2018",
    image: images.outreach,
    excerpt:
      "MANEB's first ever regional office since its inception in 1987 was officially opened on 1st July 2018 in Mzuzu, in the Northern region.",
    body: [
      "The Malawi National Examinations Board (MANEB) is pleased to inform the general public that its first ever regional office since the inception of MANEB in 1987 was officially opened on 1st July 2018 by the Director of Inspectorate and Advisory Services in the Ministry of Education Science and Technology, Mr R.Z Agabu.",
      "The opening of the regional office is a fulfilment of one of MANEB's five year (2016-2021) strategic goals. The office, based in Mzuzu in the Northern region, is situated in Luwinga location in IDA maintenance building and it is fully operational.",
      "In line with our core values of equitability and fairness, which emphasise on providing examination services that promote fairness and equitable procedures in the provision of examination services to clientele from various social and economic backgrounds in a uniform manner, the Mzuzu office will help reduce the burden that clients in the Northern region used to face whenever they wanted to access our services.",
      "Services being offered at the Mzuzu office include: provision of MSCE notification of results slip, provision of local and international academic transcripts, and provision of certificates by accumulation and certifying.",
    ],
  },
  {
    slug: "dispatch-of-jce-msce-ptce-certificates",
    category: "Announcements",
    title: "Dispatch of JCE, MSCE and PTCE Certificates",
    date: "2018",
    image: images.smiles,
    excerpt:
      "MANEB has dispatched certificates to examination centres — 2015 and 2016 JCE, 2018 MSCE, and PTCE for IPTE 10 and 11.",
    body: [
      "MANEB has dispatched the following certificates to examination centres:",
      "a) 2015 and 2016 JCE",
      "b) 2018 MSCE",
      "c) PTCE for IPTE 10 and 11",
      "Those that sat and passed 2015 and 2016 JCE, 2018 MSCE and IPTE 10 and 11 examinations are, therefore, advised to collect their certificates from their respective examination centres.",
    ],
  },
  {
    slug: "security-is-paramount-in-national-examinations",
    category: "Security",
    title: "Security Is Paramount in National Examinations",
    date: "2021",
    image: images.examRoom,
    excerpt:
      "MANEB's fully-fledged security department works hand in hand with national security agents throughout the processing and administration of national examinations.",
    body: [
      "Security is paramount in national examinations. To ensure provision of maximum security for the examinations, MANEB has a fully-fledged security department which works hand in hand with national security agents during processing and administration of the national examinations.",
      "For decades MANEB has largely partnered with the Malawi Police Service (MPS) in security provision during processing and administration of examinations.",
    ],
  },
];

export function getNews(slug: string) {
  return news.find((n) => n.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  Vacancies                                                          */
/* ------------------------------------------------------------------ */

export interface Vacancy {
  title: string;
  status: "Open" | "Closed";
  type: string;
  posted: string;
  summary: string;
  duties?: string[];
  qualifications?: string[];
  apply: string;
}

export const vacancies: Vacancy[] = [
  {
    title: "Markers for PSLCE, JCE and MSCE Examinations",
    status: "Open",
    type: "Marking opportunity",
    posted: "March 2026",
    summary:
      "MANEB is inviting applications from suitably qualified primary and secondary school teachers to mark the Primary School Leaving Certificate of Education (PSLCE), Junior Certificate of Education (JCE) and Malawi School Certificate of Education (MSCE) examinations.",
    apply:
      "Interested teachers should complete the online application form and submit copies of their supporting documents.",
  },
  {
    title: "Director of Examinations Administration (M2)",
    status: "Closed",
    type: "3-year fixed term contract",
    posted: "Closed 2 July 2021",
    summary: "The Director reports to the Executive Director.",
    duties: [
      "Planning, organising and coordinating examinations logistics such as candidates' enrolment, invigilation and marking",
      "Preparing annual financial estimates for the Examinations Administration Department",
      "Advising management on examinations logistics matters",
      "Preparing agenda papers on examination logistics for Examinations and Security Committee meetings",
    ],
    qualifications: [
      "At least a Master's Degree in Education from a reputable higher education institution",
      "At least seven (7) years' work experience at management level",
    ],
    apply:
      "Applications were addressed to The Comptroller of Statutory Corporations, Department of Statutory Corporations, P.O. Box 30061, Capital City, Lilongwe 3.",
  },
  {
    title: "Director of Computer Services (M2)",
    status: "Closed",
    type: "3-year fixed term contract",
    posted: "Closed 2 July 2021",
    summary: "The Director reports to the Executive Director.",
    duties: [
      "Planning, directing, supervising and coordinating the activities of the Computer Services Department",
      "Developing programmes and software for examinations and assessment data processing",
      "Assessing data integrity and the suitability of data security procedures",
      "Advising management on software and hardware for the computer needs of the Board",
    ],
    qualifications: [
      "A Master's Degree in Computer Science or a relevant field from a reputable higher education institution",
      "At least seven (7) years' work experience at management level",
    ],
    apply:
      "Applications were addressed to The Comptroller of Statutory Corporations, Department of Statutory Corporations, P.O. Box 30061, Capital City, Lilongwe 3.",
  },
];

/* ------------------------------------------------------------------ */
/*  Tenders                                                           */
/* ------------------------------------------------------------------ */

export const tenders = [
  {
    title: "Engagement of an Architect — Supervision for the Construction of a Purposefully Built MANEB Complex",
    reference: "Procurement and Disposal Unit",
    status: "Closed",
    contact: "+265 111 625 277 · executivedirector@maneb.edu.mw",
  },
];

/* ------------------------------------------------------------------ */
/*  Downloads                                                         */
/* ------------------------------------------------------------------ */

export type DownloadCategory =
  | "Timetables"
  | "Application forms"
  | "Press statements"
  | "Brochure"
  | "Newsletter"
  | "Academic calendar";

export const downloads: { title: string; category: DownloadCategory; href: string }[] = [
  { title: "2025 MSCE Timetable", category: "Timetables", href: "https://www.maneb.edu.mw/examinations-timetables.html" },
  { title: "2025 JCE Timetable", category: "Timetables", href: "https://www.maneb.edu.mw/examinations-timetables.html" },
  { title: "2025 PSLCE Timetable", category: "Timetables", href: "https://www.maneb.edu.mw/examinations-timetables.html" },
  { title: "2025 PTCE (IPTE 18) Timetable", category: "Timetables", href: "https://www.maneb.edu.mw/examinations-timetables.html" },
  { title: "2026 MSCE Remark Form", category: "Application forms", href: "https://www.maneb.edu.mw/downloads.html" },
  { title: "Press Release — 2025 MSCE Examination Results", category: "Press statements", href: "https://www.maneb.edu.mw/downloads.html" },
  { title: "MANEB Brochure", category: "Brochure", href: "https://www.maneb.edu.mw/maneb-brochure.html" },
  { title: "2020 MANEB Newsletter", category: "Newsletter", href: "https://www.maneb.edu.mw/downloads.html" },
  {
    title: "Corrigendum for 2021 Academic Calendar",
    category: "Academic calendar",
    href: "https://www.maneb.edu.mw/academic-calendar.html?download=223:corrigendum-for-2021-academic-calendar",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs                                                              */
/* ------------------------------------------------------------------ */

export const faqs: { q: string; a: string }[] = [
  {
    q: "How can I report examination malpractices?",
    a: "MANEB welcomes information from whistleblowers. You can call us using our landlines, mobile phones and the MANEB Toll Free Line on 363, which is available to all TNM network subscribers during the administration of examinations.",
  },
  {
    q: "Does MANEB register candidates directly?",
    a: "No. Students wishing to write national examinations register with any approved MANEB examination centre of their convenience, during the registration period set by MANEB — usually the first term of the academic year. Registration outside this period is not entertained.",
  },
  {
    q: "How are examination fees paid?",
    a: "Fees are paid directly to MANEB through approved e-payment platforms — such as TNM Mpamba, Airtel Money and mobile banking services — by guardians or students themselves, not through teachers or school authorities. Pay only after verifying your details, as corrections cannot be made after payment.",
  },
  {
    q: "Where do I collect my notification of results slip?",
    a: "Slips are delivered to District Education Offices, from where examination centres collect them. Candidates collect their slips from their schools for free. MANEB can reproduce a slip at a fee of MWK 60,000 per triplicate, or MWK 100,000 for the two-day express service.",
  },
  {
    q: "What are the conditions for the award of the MSCE?",
    a: "Candidates are awarded the MSCE if they either obtain a pass in six subjects, including English, with at least one distinction/credit; or obtain a pass in five subjects, including English, with at least three distinctions/credits.",
  },
  {
    q: "I did not qualify for a certificate in one sitting. Can I combine results?",
    a: "Yes. Through Certificate by Accumulation, grades from two or three sittings within four consecutive years of the same curriculum can be combined. You must formally apply to MANEB — these certificates are not produced automatically.",
  },
  {
    q: "I have lost my certificate. What should I do?",
    a: "Apply for a certifying statement. Your application must include a police report, your National ID, a reference letter from your school and a reference from a notable person who knows you, followed by the processing fee once the application has been vetted.",
  },
  {
    q: "How does an institution become an examination centre?",
    a: "Apply to the Executive Director, MANEB, P.O. Box 191, Zomba, and send a copy of the application for centre inspection to the District Education Manager's office. The institution must, among other requirements, hold a Ministry of Education registration certificate, a secure storage room and adequate desks for every candidate.",
  },
];
