# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Nanu Banshival's personal portfolio: a static Angular 21 SPA deployed to GitHub Pages at
https://codescribe01.github.io/portfolio/ (repo `CodeScribe01/portfolio`, branch `master`). Four
routed pages — Home, Work, About, Contact. There is no backend; the contact form posts to a Google Form.

## Commands

```bash
npm start                                                  # ng serve with hot reload
npm run build                                              # production build -> dist/portfolio-nanu/browser
npx ng test --watch=false                                  # all unit tests (Vitest + jsdom, @angular/build:unit-test)
npx ng test --watch=false --include src/app/app.spec.ts   # a single spec file
npx ng test --watch=false --filter "^App"                  # only tests whose suite/name matches a regex
```

- No linter is configured. Formatting is Prettier (`.prettierrc`: printWidth 100, single quotes,
  Angular parser for `.html`).
- Reproduce the deployed build locally with `npx ng build --base-href /portfolio/`. From Git Bash,
  prefix it with `MSYS_NO_PATHCONV=1`, otherwise MSYS rewrites `/portfolio/` into a Windows path.
- While `ng serve` is running, don't run `ng build` after each edit — the dev server recompiles on
  save and prints any template/TypeScript errors in its output.
- A running `ng serve` doesn't always pick up files newly added to `public/`; restart it if a new
  image 404s.
- `.vscode/mcp.json` registers the Angular CLI MCP server (`npx @angular/cli mcp`).

## Architecture

**Content lives in `src/app/data/`, not in templates.** Pages and components are presentational; to
change what the site says, edit the data:

- `profile.ts` — `PROFILE` (name, links, `cv` and `portrait` paths), `SUMMARY`, the Home stats band
  (`STATS`), and `GOOGLE_FORM` (form id and `entry.*` field ids).
- `projects.ts` — `PROJECTS` feeds both the Home featured cards (`featured: true`) and the Work page.
  Each project has a `status` (mapped to a chip via `STATUS_LABEL` / `STATUS_CLASS`), a `lifecycle`
  (the step rail under the card), `metrics`, an optional `repo` (renders a "View source" link), and
  `shots` (gallery images).
- `experience.ts` — `ROLES` (About timeline; `ROLES[0]` also fills the Home "Currently" card) and
  `EDUCATION` (the `primary` entry renders as the large card).
- `skills.ts` — About page Stack cards. `tech-stack.ts` — Home logo row, drawing icons from
  `brand-paths.ts` (paths extracted from simple-icons, so it isn't a runtime dependency; SQL Server,
  EF Core and Azure DevOps are hand-drawn glyphs because simple-icons doesn't carry them).

**Routing** (`app.routes.ts`, `app.config.ts`): four lazy `loadComponent` routes with
`PreloadAllModules`, scroll-to-top on every navigation, unknown paths redirect to Home. View
transitions were removed on purpose — they made mobile navigation feel slow.

**Components** are standalone, `OnPush`, signal-based, and use `@if` / `@for`. The shell (`app.html`)
is nav + `<router-outlet>` + footer + back-to-top. Non-obvious pieces:

- `nav` — inline links on desktop; on phones a fixed bottom tab bar (Home/Work/About/Contact). The
  component `:host` is the sticky element, because a sticky child inside a host exactly its own
  height has nowhere to move. `app.scss` pads the page bottom on phones to clear the bar.
- `project-card` → `gallery` — main image, thumbnails and a lightbox. Any image that fails to load
  falls back to an inline placeholder SVG, so `shots` can reference screenshots before they exist.
- `flow-canvas` — the Home hero canvas animation; it stops painting off-screen and under reduced motion.
- `directives/reveal` (scroll fade-in; the `.reveal` classes live in `styles.scss`) and
  `directives/count-up` (animated numeric stats).

**Styling.** Design tokens are in `tailwind.config.js` (palette `bg`, `ink`, `line`, `navy`, `acc`,
`ok`, `warn`; fonts Source Serif 4 / Source Sans 3 / Source Code Pro, loaded in `src/index.html`).
Shared classes (`.btn*`, `.card`, `.eyebrow`, `.h-section`, `.state-*`, `.rail-*`, `.reveal`) are in
the `@layer components` block of `src/styles.scss`; component `.scss` files hold animations and
anything needing media queries.

- Component styles outrank Tailwind utilities (emulated encapsulation adds an attribute selector), so
  `md:hidden` won't beat a `display` set in component SCSS — hide it with a media query in that file.
- Don't reintroduce `scroll-behavior: smooth` on `html`: it turns the router's scroll-to-top into an
  animated scroll on every navigation. `back-to-top` asks for smooth scrolling itself.

## Assets and deployment

- `public/` is copied to the site root: `cv.pdf`, `me.jpg` (About portrait), the favicons
  (`favicon.svg` / `favicon.ico` / `apple-touch-icon.png`, an "NB" monogram built from Source Code Pro
  Bold outlines), and `work/<project>/*.png` screenshots referenced by `shots` in `projects.ts`.
- **Asset paths must be relative** (`work/x.png`, not `/work/x.png`). The site is served under the
  `/portfolio/` sub-path; `<base href>` resolves relative paths, but a leading `/` escapes it and
  404s on Pages.
- Filenames are case-sensitive on the Pages host even though Windows isn't, so a path in `projects.ts`
  must match its file exactly.
- `.github/workflows/deploy.yml` builds on every push to `master` with
  `--base-href "/<repo-name>/"` (read from the repo name, so a rename can't break it), copies
  `index.html` to `404.html` so deep links like `/work` survive a refresh, adds `.nojekyll`, and
  deploys to Pages. Output is `dist/portfolio-nanu/browser` — the Angular project name, not the repo name.
- The `origin` URL pins `CodeScribe01@github.com`: Git Credential Manager on this machine also holds a
  `nanubanshival` login, which gets a 403 when pushing.

## Contact form

`pages/contact` posts `FormData` to the Google Form's `formResponse` endpoint with `mode: 'no-cors'`.
The response is opaque, so the UI's "sent" means delivered, not accepted — if the form's questions
change, update the `entry.*` ids in `GOOGLE_FORM`. An empty `formId` falls back to `mailto:`.
`scripts/form-notify.gs` is an optional Apps Script, not used by the site, that emails each
submission with Reply-To set to the sender.

## Owner preferences

- Don't commit or push unless explicitly asked — the owner commits themselves.
- Design: light mode only, solid fills (no gradients, glass or blur), navy `#172E6E` as the brand
  colour, restrained motion that respects `prefers-reduced-motion`. Avoid templated "AI portfolio"
  looks.
- Copy: flat bullet lists (nested per-project sub-headings were tried and rejected); outcome metrics
  over volume counts (no lines-of-code or file counts); every claim must match the owner's current CV.
- Keep personal contact details off the site: no street address or phone number.
