<!-- .slide: class="with-code inconsolata" -->
# HttpClientModule
<br><br>

- Angular procure le client HTTP nécessaire pour une communication serveur
- Ce package se nomme <b>HttpClientModule</b>
- HttpClientModule provient du package <b>@angular/common/http</b>
<br><br>

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
<!-- .slide -->
# Injection dans un Composant
<br><br>
Pour utiliser un service dans un composant, il est nécessaire de l'injecter.<br>
Injectons le service http qui provient du module HttpClientModule
<br><br>

![h-600](assets/images/school/serveur-communication/injection.png)
![h-500](assets/images/school/serveur-communication/injection_astuce.png)
