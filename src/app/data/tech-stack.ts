import { BRAND_PATHS } from './brand-paths';

export interface Tech {
  name: string;
  /** 24x24 path data; empty when the name is rendered as a lettermark instead */
  path: string;
}

/**
 * Neutral glyphs for marks Simple Icons does not carry. Generic symbols rather
 * than imitations of Microsoft's trademarked logos.
 */
const GLYPHS = {
  // stacked cylinder — the universal database symbol
  database:
    'M12 2c-4.4 0-8 1.34-8 3s3.6 3 8 3 8-1.34 8-3-3.6-3-8-3zm-8 6.5V12c0 1.66 3.6 3 8 3s8-1.34 8-3V8.5' +
    'c-1.7 1.3-4.7 2-8 2s-6.3-.7-8-2zm0 5.5V17c0 1.66 3.6 3 8 3s8-1.34 8-3v-3c-1.7 1.3-4.7 2-8 2s-6.3-.7-8-2z',
  // two columns joined by arrows — object/relational mapping
  mapping:
    'M3 4h6v2H3V4zm0 5h6v2H3V9zm0 5h6v2H3v-2zM15 4h6v2h-6V4zm0 5h6v2h-6V9zm0 5h6v2h-6v-2z' +
    'M10.5 5.2l3 1.8-3 1.8V5.2zm0 5l3 1.8-3 1.8v-3.6z',
  // branch and merge — CI/CD pipeline
  pipeline:
    'M6 3a3 3 0 0 0-1 5.83V15.2A3 3 0 1 0 7 15.2V8.83A3 3 0 0 0 6 3zm12 0a3 3 0 0 0-1 5.83V10a3 3 0 0 1-3 3h-2v2h2' +
    'a5 5 0 0 0 5-5V8.83A3 3 0 0 0 18 3z',
} as const;

/** Ordered by how central each one is to the work. */
export const TECH_ROW: Tech[] = [
  { name: 'ASP.NET Core', path: BRAND_PATHS['dotnet'] },
  { name: 'C#', path: '' },
  { name: 'Angular', path: BRAND_PATHS['angular'] },
  { name: 'SQL Server', path: GLYPHS.database },
  { name: 'EF Core', path: GLYPHS.mapping },
  { name: 'TypeScript', path: BRAND_PATHS['typescript'] },
  { name: 'Azure DevOps', path: GLYPHS.pipeline },
  { name: 'Git', path: BRAND_PATHS['git'] },
  { name: 'Postman', path: BRAND_PATHS['postman'] },
  { name: 'MySQL', path: BRAND_PATHS['mysql'] },
  { name: 'Python', path: BRAND_PATHS['python'] },
];
