<!-- .slide: class="with-code inconsolata" -->
# HttpClientModule

-   Angular apporte son propre client HTTP nécessaire pour les communications serveur
-   Le module se nomme <b>HttpClientModule</b>
-   HttpClientModule provient du package <b>@angular/common/http</b>
<br/><br/>

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [..., HttpClientModule]
})
export class AppModule { }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column with-code inconsolata"-->
# Injection dans un Composant

-   Pour utiliser un service dans un composant, il est nécessaire de l'injecter.<br/>
-   Injectons le service HttpClient fourni par le module HttpClientModule <br/><br/>

```typescript
@Component({...})
export class AppComponent {
  httpClient: HttpClient!;
  
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
}
```
<!-- .element: class="medium-code"-->

##--##
<!-- .slide: class="with-code inconsolata"-->

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

```typescript
@Component({...})
export class AppComponent {
  constructor(private readonly httpClient: HttpClient) { }
}
```
<!-- .element: class="medium-code"-->
