<!-- .slide: class="transition-bg-sfeir-2" -->

# The NgModule (legacy)

##==##

<!-- .slide -->

# NgModules: why still learn them?

Standalone components are the default today, but you **will** meet `NgModule` in existing codebases and older libraries. Knowing them helps you read and migrate real projects.

<br/>

- An `NgModule` **groups** related components, directives and pipes <br/><br/>
- It was the only way to organise an app **before** standalone components (v14) <br/><br/>
- Common historical roles: Root, Feature, Shared, Core modules <br/><br/>
- Modules can still be loaded lazily — but a **standalone component** does the same with less code

Notes:

- Root Module: the entry module, imports the other modules of the application.
- Feature Module: one per feature (e.g. a "user" feature: update, creation…).
- Shared Module: reusable UI (components, pipes, directives) shared across features.
- Core Module: app-wide singletons (footer, header, loader). Warning: don't put services in Shared modules.

##==##

<!-- .slide: class="with-code" -->

# The NgModule: its syntax

Like a component, a module is a class plus a decorator — here `@NgModule`:

<br/>

```typescript
// app-module.ts
@NgModule({
  imports: [BrowserModule], // other modules + standalone components/pipes/directives
  declarations: [App], // components, directives & pipes that are NOT standalone
  exports: [], // what this module exposes to modules that import it
  bootstrap: [App], // root component — root module only
  providers: [], // services / providers
})
export class AppModule {}
```

<!-- .element: class="big-code" -->

Notes:

- `declarations` only exists for the legacy, non-standalone world. Standalone components are never declared — they are imported.
