export interface Stat {
  value: string;
  /** numeric portion for the count-up animation; omit for non-numeric values */
  count?: number;
  suffix?: string;
  caption: string;
}

export const PROFILE = {
  name: 'Nanu Banshival',
  role: 'Software Engineer',
  tagline: 'ASP.NET Core · Angular · SQL Server',
  location: 'Bharatpur, Rajasthan, India',
  email: 'nanubanshival@gmail.com',
  github: 'https://github.com/CodeScribe01',
  githubHandle: '@CodeScribe01',
  linkedin: 'https://www.linkedin.com/in/nanubanshival/',
  linkedinHandle: '@nanubanshival',
  cv: 'cv.pdf',
  portrait: 'me.jpg',
  available: 'Open to full-time software engineering roles',
} as const;

export const SUMMARY =
  'Software engineer developing, integrating and troubleshooting data-driven applications built on ' +
  'ASP.NET Core, C# and SQL Server. I work across REST/JSON API design and documentation, cross-system ' +
  'ERP and CRM integration, and production issues on a live multi-tenant platform — usually alongside ' +
  'the stakeholders who reported them.';

export const STATS: Stat[] = [
  { value: '4', count: 4, caption: 'Production systems' },
  { value: '.NET 10', caption: 'Migration across 5 projects' },
  { value: '17', count: 17, caption: 'REST API endpoints' },
  { value: 'GATE 2026', caption: 'Qualified — CS & IT' },
];

/**
 * Contact form delivery — Google Forms.
 *
 * Setup (about 3 minutes, no third-party service):
 *  1. forms.google.com -> blank form. Add three SHORT-ANSWER questions in this
 *     order: Name, Email, Message. Make each one Required.
 *  2. Send -> link icon: the long id between /d/e/ and /viewform is `formId`.
 *  3. Three-dot menu -> "Get pre-filled link". Fill each box with its own name
 *     ("Name", "Email", "Message"), press Get link, copy it. The URL contains
 *     entry.123456=Name&entry.789012=Email&... — paste those entry.NNN keys below.
 *  4. In the form's Responses tab, turn on "Get email notifications for new
 *     responses" so every message reaches your inbox.
 *
 * Until `formId` is filled in, the form falls back to opening the visitor's
 * mail client with their message pre-filled, so the page is never broken.
 */
export const GOOGLE_FORM = {
  formId: '1FAIpQLSdbONxGPbK7NW3m5p84MU5ftMiyfMhxEG-b9W1pVAeCCysjIw',
  fields: {
    name: 'entry.1593661840',
    email: 'entry.1552228274',
    message: 'entry.362654969',
  },
} as const;
