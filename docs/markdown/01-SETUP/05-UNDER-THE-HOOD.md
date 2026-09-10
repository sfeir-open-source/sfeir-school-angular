<!-- .slide -->

# Under the hood: the build tool

You never call the bundler yourself — the Angular CLI does. But it helps to know what powers `ng build` and `ng serve`.

<br/>

- **Until v16**: Angular built your app with **Webpack** <br/><br/>
- **Since v17**: the default is the **Application builder**, powered by **esbuild** (for bundling) and **Vite** (for the dev server) <br/><br/>
- Result: dramatically faster cold starts, instant HMR, and near-native ESM in development

##==##

<!-- .slide -->

# Why the switch to esbuild + Vite?

| Feature           | Webpack (legacy) | esbuild + Vite (default) |
| ----------------- | ---------------- | ------------------------ |
| Dev server start  | Seconds          | Near-instant             |
| Rebuild / HMR     | Good             | Instant                  |
| Configuration     | Complex          | Minimal                  |
| ESM support       | Transpiled       | Native                   |

<br/>

> New Angular projects use the esbuild-based builder out of the box — there is nothing to configure.

Notes:

- The dev server (`ng serve`) uses Vite; production builds (`ng build`) use esbuild under the `@angular/build` package.
- Very old workspaces may still use the Webpack-based `@angular-devkit/build-angular` builder; `ng update` migrates them.
