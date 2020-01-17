<!-- .slide: class="transition-white sfeir-bg-blue" -->
# Bootstraping

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Bootsraping: main.ts
<br><br>
Dans une application Angular, le premier ficher chargé correspond au fichier main.ts
<br><br>
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Bootstaping dans sa totalité

<strong>fichier: app.module.ts</strong>
```typescript
@NgModule({
  imports: [BrowserModule, ...],
  declaration: [AppComponent, ...],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```
<br>
<strong>fichier: main.ts</strong>
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```
<br>
<strong>fichier: index.html</strong>
```html
<sfeir-app></sfei-app>
```
