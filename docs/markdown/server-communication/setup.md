<!-- .slide: class="sfeir-basic-slide with-code" -->
# HttpClientModule
<br>
<ul>
    <li>Angular procure le client HTTP nécessaire pour une communication serveur</li>
    <li>Ce package se nomme <strong>HttpClientModule</strong></li>
    <li>HttpClientModule provient du package <strong>@angular/common/http</strong</li>
</ul>
<br><br>
```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [..., HttpClientModule]  
})
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Injection dans un Composant
<br><br>
Pour utiliser un service dans un composant, il est nécessaire de l'injecter.<br>
Injectons le service http qui provient du module HttpCLientModule
<br><br>
<img alt="h-600" src="assets/images/school/serveur-communication/injection.png" />
<img alt="h-500" src="assets/images/school/serveur-communication/injection_astuce.png" />

