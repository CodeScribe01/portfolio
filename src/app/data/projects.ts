export type ProjectStatus = 'production' | 'building' | 'shipped' | 'personal';

export interface LifecycleStep {
  label: string;
  done: boolean;
}

export interface Shot {
  src: string;
  caption: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  context: string;
  org?: string;
  period: string;
  status: ProjectStatus;
  featured: boolean;
  summary: string;
  highlights: string[];
  metrics: Metric[];
  stack: string[];
  /** the system's real pipeline — the rail under each card */
  lifecycle: LifecycleStep[];
  /** drop real files at public/work/<slug>/ — the gallery falls back to a placeholder until then */
  shots: Shot[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'ticketdesk',
    name: 'TicketDesk — Service-Desk & AMC Platform',
    context: 'Client work',
    org: 'DBLB Tech',
    period: '2026',
    status: 'production',
    featured: true,
    summary:
      'A production service-desk and Annual Maintenance Contract platform I led major development on. ' +
      'Ticket lifecycle, contract management, ERP sync and a field-agent mobile API, deployed continuously ' +
      'through Azure DevOps.',
    highlights: [
      '100+ commits over three months, deployed continuously through Azure DevOps CI/CD.',
      'Tally ERP integration API — 1,265 LOC of idempotent, SyncId-based upsert endpoints for products, customers and contracts, removing manual double-entry between ERP and platform.',
      'JWT-secured mobile REST API with 17 endpoints for field agents: serial validation, ticket lifecycle actions, device enrollment and secure attachment verification.',
      'Migrated outbound notifications from SMTP to the Microsoft Graph API, then extended the layer with per-event emails, in-app notifications and watcher fan-out across six delivery paths.',
    ],
    metrics: [
      { value: '17', label: 'Field-agent API endpoints' },
      { value: '6', label: 'Notification delivery paths' },
      { value: '3', label: 'ERP entities synced idempotently' },
    ],
    stack: ['ASP.NET Core 8', 'EF Core', 'SQL Server', 'Azure DevOps', 'Microsoft Graph'],
    lifecycle: [
      { label: 'Raised', done: true },
      { label: 'Assigned', done: true },
      { label: 'SLA tracked', done: true },
      { label: 'AMC billed', done: true },
    ],
    shots: [
      { src: '/work/ticketdesk/dashboard.png', caption: 'Admin dashboard' },
      { src: '/work/ticketdesk/amc.png', caption: 'AMC contract lifecycle and scheduling' },
      { src: '/work/ticketdesk/admin-hub.png', caption: 'Admin hub' },
      { src: '/work/ticketdesk/ticket-queue.png', caption: 'Ticket queue with live SLA status' },
    ],
  },
  {
    slug: 'pos-erp',
    name: 'Multi-Tenant POS / ERP Platform',
    context: 'Client work',
    org: 'DBLB Tech',
    period: '2026',
    status: 'production',
    featured: true,
    summary:
      'Warehouse, invoicing and inventory for a multi-tenant retail platform — the part of the system where ' +
      'a miscounted stock deduction becomes a real financial problem.',
    highlights: [
      'Designed and shipped the Warehouse Shipment → Sales Invoice workflow, enforcing single-deduction stock logic with per-shipment invoice coverage and full or partial rollback.',
      'Built coverage validation that closed a stock-bypass hole allowing over-invoicing and duplicate stock posting on spent shipments.',
      'Cut invoice-load time by parallelising data fetches and eliminating N+1 barcode queries, collapsing a three-round-trip waterfall to roughly one.',
      'Corrected inventory semantics across Sales Orders, Invoices and Returns — decoupled orders from stock and batch gating to enable back-orders, and standardised batch picking to FEFO (earliest-expiry-first).',
    ],
    metrics: [
      { value: '3 → 1', label: 'Load round-trips' },
      { value: 'FEFO', label: 'Batch picking' },
      { value: '0', label: 'Stock-bypass holes left' },
    ],
    stack: ['Angular 17', '.NET 8', 'EF Core', 'Dapper', 'SQL Server'],
    lifecycle: [
      { label: 'Shipment', done: true },
      { label: 'Coverage', done: true },
      { label: 'Invoice', done: true },
      { label: 'Stock posted', done: true },
    ],
    shots: [
      { src: '/work/pos-erp/shipment.png', caption: 'Warehouse shipment with invoice coverage' },
      { src: '/work/pos-erp/Invoice.png', caption: 'Sales invoice raised against a shipment' },
      { src: '/work/pos-erp/inventory.png', caption: 'FEFO batch picking across returns and orders' },
    ],
  },
  {
    slug: 'wms-migration',
    name: '.NET 10 Migration — Warehouse Management',
    context: 'Client work',
    org: 'DBLB Tech',
    period: '2026',
    status: 'shipped',
    featured: true,
    summary:
      'Moved a live Warehouse Management System from .NET Framework 4.8 to .NET 10 across five projects, ' +
      'without changing a single business rule or breaking an API contract.',
    highlights: [
      'Migrated five projects — MVC/Web API, integration API, scheduler, Windows service and logging library — preserving all business logic, stored procedures and API contracts.',
      'Re-platformed System.Web-based MVC/Web API onto ASP.NET Core, converted a Windows Service into a BackgroundService worker, and upgraded the Quartz scheduler to its async job model.',
      'Diagnosed subtle .NET Core behavioural regressions, including silent camelCase JSON serialisation breaks and HtmlEncoder corrupting security tokens, restoring full data flow across the migrated system.',
    ],
    metrics: [
      { value: '5', label: 'Projects migrated' },
      { value: '4.8 → 10', label: '.NET version' },
      { value: '0', label: 'Contract changes' },
    ],
    stack: ['.NET 10', 'ASP.NET Core', 'Quartz', 'SQL Server'],
    lifecycle: [
      { label: '.NET 4.8', done: true },
      { label: 'Re-platform', done: true },
      { label: 'Regressions', done: true },
      { label: '.NET 10', done: true },
    ],
    shots: [
      { src: '/work/wms-migration/home.png', caption: 'Home screen' },
      { src: '/work/wms-migration/picking-menu.png', caption: 'Same business logic, running on .NET 10' },
      { src: '/work/wms-migration/admin-view.png', caption: 'Quartz scheduler on the async job model' },
    ],
  },
  {
    slug: 'ticketdesk-pos-integration',
    name: 'TicketDesk → POS/ERP Integration',
    context: 'Client work',
    org: 'DBLB Tech',
    period: '2026',
    status: 'production',
    featured: false,
    summary:
      'Integrated an email-driven ticketing front end into an existing multi-tenant POS/ERP as a single ' +
      'modular monolith, adding a full ticket → CRM lead → quotation → order → invoice workflow without ' +
      'disrupting any existing POS/CRM flow.',
    highlights: [
      'Built an email-to-ticket pipeline that parses enquiry mails into structured product lines — extracting product, quantity, and unit-of-measure and mapping them to existing POS master records (no duplicate definitions).',
      'Implemented the Sales/Purchase Quotation → Order conversion with server-enforced duplicate-prevention, quantity-aware partial fulfillment, and lifecycle status tracking ("Partially Ordered" / "Closed - SO Created").',
      'Designed a customer approval workflow with tokenized public approval links, per-line approve/reject with mandatory reasons, and permanent locking of committed items once an order is raised.',
      'Engineered a cross-context data layer bridging two EF Core DbContexts (TicketDesk domain + POS) via scalar references and batched lookups, preserving strict tenant isolation.',
      'Delivered consistent lead/ticket product grids with warehouse selection, per-line customer-approval controls, and state-driven locking, plus AG-Grid list views with independent workflow-status and commercial-progress columns.',
    ],
    metrics: [
      { value: '5', label: 'Stages, ticket to invoice' },
      { value: '2', label: 'DbContexts bridged, tenant-isolated' },
      { value: '0', label: 'Existing POS/CRM flows disrupted' },
    ],
    stack: ['Angular 21', 'ASP.NET Core 8', 'EF Core', 'SQL Server', 'Multi-tenant', 'AG-Grid'],
    lifecycle: [
      { label: 'Ticket', done: true },
      { label: 'Lead', done: true },
      { label: 'Quotation', done: true },
      { label: 'Order', done: true },
      { label: 'Invoice', done: true },
    ],
    shots: [
      { src: '/work/integration/module.png', caption: 'Ticket module inside the multi-tenant POS/ERP' },
      { src: '/work/integration/lead.png', caption: 'Enquiry email parsed into structured product lines' },
      { src: '/work/integration/quotation.png', caption: 'Quotation → Order conversion with partial fulfillment' },
      { src: '/work/integration/approval.png', caption: 'Tokenized approval portal, per-line approve/reject' },
      { src: '/work/integration/tkt-view.png', caption: 'AG-Grid list view — workflow and commercial status' },
    ],
  },
  {
    slug: 'vendor-onboarding',
    name: 'Vendor Onboarding System',
    context: 'Personal project',
    period: 'Apr — May 2026',
    status: 'personal',
    featured: false,
    summary:
      'An eight-step vendor registration workflow with two-level approvals, document verification and a ' +
      'self-service portal vendors can track their own application in.',
    highlights: [
      'Eight-step multi-form registration workflow with field-level validation and conditional logic, on an EF Core Code First schema.',
      'Two-level RBAC approval chain (Admin → Super Admin) with auto-generated vendor reference codes and an edit-request system supporting admin-initiated correction cycles.',
      'Document management for PAN, GST, Aadhaar and bank uploads with server-side validation, plus a vendor self-service portal showing real-time status and an activity timeline.',
      'SMTP transactional email notifications and dual invitation flows — email and a shareable QR or link — over session-based authentication.',
    ],
    metrics: [
      { value: '8', label: 'Registration steps' },
      { value: '2', label: 'Approval levels' },
      { value: '4', label: 'Document types verified' },
    ],
    stack: ['ASP.NET Core MVC', '.NET 8', 'C#', 'EF Core', 'SQL Server'],
    lifecycle: [
      { label: 'Invite', done: true },
      { label: 'Submit', done: true },
      { label: 'Admin', done: true },
      { label: 'Super Admin', done: true },
    ],
    shots: [
      { src: '/work/vendor-onboarding/form.png', caption: 'Eight-step registration workflow' },
      { src: '/work/vendor-onboarding/approval.png', caption: 'Admin → Super Admin approval chain' },
      { src: '/work/vendor-onboarding/timeline.png', caption: 'Vendor self-service status tracking—Submission and approval timeline' },
    ],
  },
  {
    slug: 'eduadmin',
    name: 'EduAdmin — School Management System',
    context: 'Personal project',
    period: 'Dec 2025 — Jan 2026',
    status: 'personal',
    featured: false,
    summary:
      'Role-aware school administration: bulk attendance, leave workflows with automatic balance deduction, ' +
      'and cascading course/fee selection.',
    highlights: [
      'Role-based access control for Admin, Teacher and Student built on ASP.NET Core Identity, with session-based auth, a 30-minute idle timeout and role-aware navigation.',
      'Bulk daily attendance module marking a whole class Present, Absent or Half-Day in a single transaction, with per-date upsert logic.',
      'Leave management workflow covering leave types, approval-status tracking and automatic balance deduction, plus AJAX cascading dropdowns for course, semester and fee auto-fill.',
    ],
    metrics: [
      { value: '3', label: 'Roles' },
      { value: '1', label: 'Transaction per class' },
    ],
    stack: ['ASP.NET Core 8 MVC', 'C#', 'EF Core 9', 'SQL Server'],
    lifecycle: [
      { label: 'Mark', done: true },
      { label: 'Request', done: true },
      { label: 'Approve', done: true },
      { label: 'Deduct', done: true },
    ],
    shots: [
      { src: '/work/eduadmin/dashboard.png', caption: 'Dashboard' },
      { src: '/work/eduadmin/leave.png', caption: 'Leave workflow with automatic balance deduction' },
      { src: '/work/eduadmin/students.png', caption: 'Student registration' },
    ],
  },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  production: 'In production',
  building: 'Building',
  shipped: 'Shipped',
  personal: 'Personal',
};

export const STATUS_CLASS: Record<ProjectStatus, string> = {
  production: 'state-live',
  building: 'state-build',
  shipped: 'state-live',
  personal: 'state-solo',
};
