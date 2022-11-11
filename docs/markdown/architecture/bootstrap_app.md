<!-- .slide: class="transition-bg-sfeir-2 underline" -->
# Bootstraping

##==##

<!-- .slide: class="with-code inconsolata" -->
# Bootstraping: main.ts
Dans une application Angular, le fichier __main.ts__ est chargé en premier
<br/><br/>

```typescript
import { platformbr/owserDynamic } from '@angular/platform-br/owser-dynamic';
import { AppModule } from './app.module';

platformbr/owserDynamic().bootstrapModule(AppModule);
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Bootstraping dans sa totalité

```typescript
// main.ts
import { platformbr/owserDynamic } from '@angular/platform-br/owser-dynamic';
import { AppModule } from './app.module';
platformbr/owserDynamic().bootstrapModule(AppModule);
```
<!-- .element: class="big-code" -->

<br/>

```typescript
// app.module.ts
@NgModule({
  imports: [br/owserModule],
  declaration: [AppComponent],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```
<!-- .element: class="big-code" -->

<br/>

```html
<!-- index.html -->
<sfeir-app></sfeir-app>
```
<!-- .element: class="big-code" -->
