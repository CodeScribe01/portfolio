export interface SkillGroup {
  title: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['C#', 'TypeScript', 'SQL', 'JavaScript', 'Python', 'Java', 'HTML', 'CSS'],
  },
  {
    title: 'API & Integration',
    items: [
      'REST',
      'JSON',
      'Swagger',
      'Postman',
      'Web Services',
      'Idempotent sync endpoints',
      'Microsoft Graph API',
    ],
  },
  {
    title: 'Frameworks',
    items: ['ASP.NET Core MVC', 'Web API', 'Angular 17', 'EF Core', 'Dapper', 'Razor'],
  },
  {
    title: 'Auth & Security',
    items: ['ASP.NET Core Identity', 'JWT', 'RBAC', 'Session auth'],
  },
  {
    title: 'Enterprise Systems',
    items: ['Tally ERP integration', 'MS Dynamics 365 CRM', 'WMS', 'OFS', 'POS'],
  },
  {
    title: 'Databases',
    items: [
      'SQL Server (SSMS)',
      'MySQL (dbForge)',
      'Query optimization',
      'Data-discrepancy troubleshooting',
    ],
  },
  {
    title: 'Tools & CI/CD',
    items: ['Azure DevOps', 'Git', 'GitHub', 'Visual Studio', 'Production debugging', 'Root-cause analysis'],
  },
];
