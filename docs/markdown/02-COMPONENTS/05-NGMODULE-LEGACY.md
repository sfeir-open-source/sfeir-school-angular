<!-- .slide: class="with-code inconsolata" -->

# For historical context: `NgModule`

Every app in this training is **100% standalone** — you will never write an `NgModule` here. But older codebases you'll meet on the job still use them, so it helps to recognize the shape:

<br/>

```typescript
// legacy: app.module.ts
@NgModule({
  declarations: [App], // components NOT standalone
  imports: [BrowserModule],
  bootstrap: [App],
})
export class AppModule {}
```

<!-- .element: class="medium-code" -->

```typescript
// legacy: main.ts
platformBrowser.bootstrapModule(AppModule);
```

<!-- .element: class="medium-code" -->

Notes:

- `NgModule` grouped components/directives/pipes before standalone existed (pre-v14). `declarations` only makes sense for non-standalone components — standalone ones are never declared, only imported.
- If you ever land on a legacy project: the migration path is `ng generate @angular/core:standalone`, an official schematic that converts a module-based app.
