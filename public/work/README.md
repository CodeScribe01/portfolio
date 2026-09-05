# Project screenshots

Each project has its own folder and shows a gallery: one large image, a
thumbnail strip, and a click-to-zoom lightbox. Drop a file at the exact path
below and it replaces the placeholder automatically — no code change needed.
Missing files stay as placeholders, so you can add them a few at a time.

Paths and captions live in `src/app/data/projects.ts` (`shots`).

## ticketdesk/
| File              | Caption shown                                    |
|-------------------|--------------------------------------------------|
| `dashboard.png`   | Ticket queue with live SLA status                |
| `amc.png`         | AMC contract lifecycle and scheduling            |
| `tally-sync.png`  | Tally ERP sync — idempotent upsert endpoints     |
| `mobile.png`      | Field-agent mobile flow over the JWT API         |

## pos-erp/
| File              | Caption shown                                    |
|-------------------|--------------------------------------------------|
| `shipment.png`    | Warehouse shipment with invoice coverage         |
| `invoice.png`     | Sales invoice raised against a shipment          |
| `inventory.png`   | FEFO batch picking across returns and orders     |

## wms-migration/
| File              | Caption shown                                    |
|-------------------|--------------------------------------------------|
| `before.png`      | The system on .NET Framework 4.8                 |
| `after.png`       | Same business logic, running on .NET 10          |
| `scheduler.png`   | Quartz scheduler on the async job model          |

## integration/
| File              | Caption shown                                          |
|-------------------|--------------------------------------------------------|
| `module.png`      | Ticket module inside the multi-tenant POS/ERP          |
| `lead.png`        | Enquiry email parsed into structured product lines     |
| `quotation.png`   | Quotation → Order conversion with partial fulfillment  |
| `approval.png`    | Tokenized approval portal, per-line approve/reject     |
| `grid.png`        | AG-Grid list view — workflow and commercial status     |

## vendor-onboarding/
| File              | Caption shown                                    |
|-------------------|--------------------------------------------------|
| `form.png`        | Eight-step registration workflow                 |
| `approval.png`    | Admin → Super Admin approval chain               |
| `documents.png`   | PAN, GST, Aadhaar and bank verification          |
| `portal.png`      | Vendor self-service status tracking              |

## eduadmin/
| File              | Caption shown                                    |
|-------------------|--------------------------------------------------|
| `attendance.png`  | Bulk class attendance in one transaction         |
| `leave.png`       | Leave workflow with automatic balance deduction  |
| `roles.png`       | Role-aware navigation for three user types       |

---

**Spec:** landscape, 1600 px wide or more, PNG or WebP. The card crops to 16:10
from the top, so keep the important part of the UI in the upper portion. The
lightbox shows the full uncropped image.

**Also:** `public/me.jpg` is your portrait on the About page (portrait
orientation, 4:5, 800 px wide or more). Until it exists, an "NB" block shows in
its place.

**BEFORE EXPORTING — these are client production systems.** Check every frame
for real customer names, vendor records, pricing, serial numbers, phone numbers
or invoice data, and confirm DBLB Tech is fine with the UI being public. Use
seed or demo data if there is any doubt.
