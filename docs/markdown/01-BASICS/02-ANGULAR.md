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
