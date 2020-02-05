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
<div class="flex-row">
    <div class="fill-rest">
        <pre class="big-code">
            <code data-trim>
               import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
               import { AppModule } from './app.module';

               platformBrowserDynamic().bootstrapModule(AppModule);
            </code>
        </pre>
    </div>
   <div class="tiers">
        <pre class="big-code">
            <code data-trim>
                @NgModule({
                imports: [BrowserModule],
                declaration: [AppComponent],
                exports: [],
                bootstrap: [AppComponent],
                })
                export class AppModule { }
            </code>
        </pre>
   </div>
</div>
<br><br>
<div>
    <pre class="big-code">
        <code data-trim>
            <sfeir-app></sfeir-app>
        </code>
    </pre>
</div>
