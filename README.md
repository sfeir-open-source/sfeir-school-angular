# Angular 200

A [SFEIR School](https://www.sfeir.com/formation/school/)

![logo](https://www.sfeir.com/img/school/formations/Angular%20200.png)

[Training schedule, trainers, and program](https://www.sfeir.com/formation/school/angular-200/)

## Overview

This repository contains the SFEIR School Angular 200 hands-on training. It is an Nx workspace that hosts many small Angular applications used as progressive exercises. For each step, you will find:

- an exercise project, and
- a corresponding solution project

Both live under the `apps/` folder and follow the naming pattern `<nn>-<topic>` and `<nn>-<topic>-solution` (for example, `01-hands-on` and `01-hands-on-solution`).

## Slides

- View the slides: https://sfeir-open-source.github.io/sfeir-school-angular/
- Slide sources are licensed under CC BY-ND 3.0: [docs/LICENSE](./docs/LICENSE)

## Prerequisites

- Node.js 18+ (LTS recommended)
- Bun (recommended) or npm
- Git

## Quick start

```bash
git clone https://github.com/sfeir-open-source/sfeir-school-angular.git
cd sfeir-school-angular
bun install   # or: npm install
```

Serve the first exercise (default project is `01-hands-on`):

```bash
# Using Nx directly
bunx nx serve 01-hands-on
# or using the provided script alias
bun run client -- 01-hands-on   # npm run client -- 01-hands-on
```

Open the browser to the URL shown by the CLI (Angular defaults to http://localhost:4200 unless configured otherwise).

The mock API listens on http://localhost:9000 (see `apps/server-express/src/main.js`). Available endpoints include `/api/peoples`, `/api/peoples/:id`, `/api/peoples/random`, etc.

Run unit tests for a specific project:

```bash
bun run client:test -- 01-hands-on   # npm run client:test -- 01-hands-on
```

Run all tests across the workspace:

```bash
bun run test:all   # npm run test:all
```

Serve the slides locally:

```bash
# Nx target defined in docs/project.json
bunx nx serve docs
```

## Repository structure

```
.
├─ apps/
│  ├─ 01-hands-on/                 # exercise
│  ├─ 01-hands-on-solution/        # solution
│  ├─ …                            # more steps and their solutions
│  └─ server-express/              # mock API (Express on port 9000)
├─ docs/                           # Reveal.js slides and assets
├─ tools/                          # development utilities
├─ nx.json                         # Nx workspace configuration
├─ package.json                    # scripts and dependencies
├─ bun.lock                        # Bun lockfile
├─ tsconfig.base.json              # base TS config
├─ jest.config.ts / jest.preset.js # Jest configuration
└─ LICENSE                         # MIT license for the code
```

## Provided scripts (aliases)

The root `package.json` provides convenient aliases around Nx:

- `client` → `nx serve` (serve a project)
- `client:build` → `nx build` (build a project)
- `client:test` → run tests for multiple projects
- `server:start` → `nx serve server-express` (start the mock API on port 9000)
- `test:all` / `lint:all` → run tests/lint across the workspace

You can pass any Angular CLI or Nx options after `--`, for example:

```bash
bun run client -- 01-hands-on --configuration=production
```

## Credits

This project is maintained by the SFEIR Open Source team.

## License

- Code: MIT (see [LICENSE](./LICENSE))
- Slides: CC BY-ND 3.0 (see [docs/LICENSE](./docs/LICENSE))

See the Angular CLI documentation for additional commands: https://angular.io/cli
