<!-- .slide: class="transition-bg-sfeir-2" -->

# What is Angular?

##==##

<!-- .slide -->

# Angular in one sentence

> Angular is a **TypeScript** framework, maintained by Google, for building **scalable** web applications — from a single-page app to a full server-rendered platform.

<br/>

- A **complete** framework: components, routing, forms, HTTP, testing… all official and versioned together
- **Opinionated** and consistent: one way to structure things, so teams stay aligned
- Backed by a **predictable** release cadence: a new major every ~6 months, with automated migrations (`ng update`)

##==##

<!-- .slide -->

# Angular today (v22)

Modern Angular is built around a few strong ideas — this is what this school teaches:

- **Standalone by default** — no more `NgModule` boilerplate to wire an app together <br/><br/>
- **Signals** — a fine-grained reactivity system for state and derived values <br/><br/>
- **Zoneless by default** (since v21) — no more `zone.js`, smaller bundles, faster change detection <br/><br/>
- **Built-in control flow** — `@if` / `@for` / `@switch` directly in templates <br/><br/>
- **SSR & hydration** — first-class server-side rendering for performance and SEO

##==##

<!-- .slide -->

# Why Angular in production?

- **Long-term maintainability**: strong conventions and typing keep large codebases healthy <br/><br/>
- **Tooling included**: CLI, dev server, test runner, linting, schematics — nothing to assemble yourself <br/><br/>
- **Smooth upgrades**: `ng update` runs code migrations for you between versions <br/><br/>
- **Ecosystem**: Material, CDK, state-management libraries, and a huge community

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `angular.json` file

The `angular.json` file is the **identity card** of your workspace: it declares your projects, their build targets, and every build/serve/test option.

<br/>

![](assets/images/school/basics/angular_json.png 'center h-700')

##==##

<!-- .slide -->

# What we're building today

Every exercise today grows the **same application**: a staff directory that lists people, shows a profile card, and lets you refresh, edit and delete entries.

<br/>

- `01-hands-on` → a standalone root component says hello
- `02-component-tree` → we split it into a component tree
- `03-bindings` → the profile card comes alive with signals
- `04-events` → a button refreshes the displayed person
- `05-input-output` → the card becomes a reusable, shared component
- `06-pipe` → dates and missing values get formatted for display
- `07-provider` → a service takes over the data access
- `08-directive` → a custom directive crowns the managers

Notes:

- Keep this slide visible mentally throughout the day — every concept below is introduced because the app needs it, not in the abstract.
