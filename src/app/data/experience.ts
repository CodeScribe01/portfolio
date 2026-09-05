export interface Role {
  title: string;
  org: string;
  /** Full-time · Internship · Part-time */
  employmentType: string;
  /** Remote · On-site · Hybrid */
  workMode: string;
  location: string;
  period: string;
  current: boolean;
  blurb?: string;
  points: string[];
}

export const ROLES: Role[] = [
  {
    title: 'Software Engineer',
    org: 'DBLB Tech',
    employmentType: 'Full-time',
    workMode: 'Remote',
    location: 'Gurugram, Haryana',
    period: 'Mar 2026 — Present',
    current: true,
    blurb:
      'Development, integration and production troubleshooting across a service-desk platform, a live ' +
      'multi-tenant POS/ERP, and a framework migration — much of it driven by issues customers reported.',
    points: [
      'Led major aspects of development on TicketDesk, a service-desk and AMC platform (ASP.NET Core 8, EF Core, SQL Server) — 100+ commits over 3 months, deployed continuously via Azure DevOps CI/CD.',
      'Architected its Tally ERP integration API with idempotent SyncId-based upsert endpoints for products, customers and contracts, eliminating manual double-entry between ERP and platform.',
      'Delivered a JWT-secured mobile REST API (17 endpoints) for field agents, and moved outbound notifications from SMTP to Microsoft Graph with watcher fan-out across 6 delivery paths.',
      'On a multi-tenant POS/ERP, designed the Warehouse Shipment → Sales Invoice workflow with single-deduction stock logic and rollback, closing a stock-bypass hole that allowed over-invoicing on already-shipped orders.',
      'Corrected inventory semantics across Sales Orders, Invoices and Returns — enabling back-orders and standardising FEFO batch picking — and cut a 3-round-trip invoice load to ~1 by parallelizing fetches and removing N+1 queries.',
      'Embedded TicketDesk into the live POS/ERP as a tenant-scoped module on a two-DbContext architecture, adding an email → ticket → lead → quotation pipeline and a tokenized customer approval portal without breaking existing POS/CRM flows.',
      'Migrated a production Warehouse Management System from .NET Framework 4.8 to .NET 10 across 5 projects, preserving all business logic and API contracts, and root-caused silent camelCase serialization and HtmlEncoder regressions.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    org: 'DBLB Tech',
    employmentType: 'Internship',
    workMode: 'Remote',
    location: 'Gurugram, Haryana',
    period: 'Dec 2025 — Mar 2026',
    current: false,
    points: [
      'Worked with developed integrations around enterprise business systems, including Microsoft Dynamics 365 CRM, Tally ERP, WMS (Warehouse Management System), OFS (Order Fulfillment System), and POS (Point of Sale).',
      'Gained hands-on experience understanding CRM, ERP, warehouse, order fulfillment, and retail/POS workflows and their integration with custom applications.',
      'Worked with enterprise data flows, APIs, business processes, and system-to-system integrations across these platforms.',
    ],
  },
  {
    title: 'Computer Science Instructor',
    org: 'Poddar College of Tech. & Management, Bharatpur',
    employmentType: 'Part-time',
    workMode: 'On-site',
    location: 'Bharatpur, Rajasthan',
    period: 'Dec 2025 — Apr 2026',
    current: false,
    blurb:
      'Taught three subjects across the 1st, 3rd and 5th semesters of the BCA programme to around ' +
      '90 students, while working full-time as an engineer.',
    points: [
      'Software Engineering (3rd semester) — process models from Waterfall through to Agile, requirement analysis, COCOMO estimation and scheduling, design concepts, testing strategy, and maintenance.',
      'Data Communication & Computer Networks (5th semester) — the OSI model and TCP/IP suite, transmission media, error detection and flow control, routing and IP, TCP/UDP, DNS and HTTP, switching, security and wireless.',
      'Computer Fundamentals & Office Management Tools (1st semester) — architecture and memory, number systems and character encodings, internet addressing and protocols, and practical Word, Excel, PowerPoint and Access.',
      'Built lesson plans and hands-on labs for each course, focusing on conceptual clarity over syllabus completion.',
    ],
  },
];

export interface Education {
  qualification: string;
  institution: string;
  /** awarding university or board */
  affiliation: string;
  location: string;
  period: string;
  notes: string[];
  /** the headline qualification, rendered larger */
  primary?: boolean;
}

export const EDUCATION: Education[] = [
  {
    qualification: 'B.Tech, Computer Science & Engineering',
    institution: 'Govt. Engineering College, Bharatpur',
    affiliation: 'RTU Kota',
    location: 'Bharatpur, Rajasthan',
    period: '2021 — 2025',
    notes: ['CGPA 7.18 / 10', 'Qualified GATE 2026 (Computer Science & IT)'],
    primary: true,
  },
  {
    qualification: 'Senior Secondary Examination',
    institution: 'Naveen S.S. Senior Secondary School, Roopwas',
    affiliation: 'Rajasthan Board',
    location: 'Roopwas, Bharatpur',
    period: '2021',
    notes: [],
  },
  {
    qualification: 'Secondary Examination',
    institution: 'Jain Adarsh VM Secondary School, Roopwas',
    affiliation: 'Rajasthan Board',
    location: 'Roopwas, Bharatpur',
    period: '2019',
    notes: [],
  },
];
