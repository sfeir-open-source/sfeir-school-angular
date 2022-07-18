<!-- .slide: class="sfeir-basic-slide"-->
# Vers un monde sans module

Avec la version 14 d'Angular, la core team souhaite: <br/><br/>

- rendre les composants au centre du modèle de réflexion <br/> <br/>
- simplifier le modèle mental d'Angular <br/> <br/>
- rendre la framework plus simple d'apprentissage <br/> <br/>

En quelque sorte il s'agit de rendre les modules optionnels
<!-- .element: class="center important"-->

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Mais qu'est qu'un standalone components ?

Un composant standalone est un composant qui se suffit à lui mÊme: <br/><br/>

- plus la peine de le déclarer dans un module <br/><br/>
- possibilité de bootstrapper une application directement sur celui ci <br/><br/>
- possibilité de le lazyloader <br/><br/>

##==##

<!-- .slide: class="with-code inconsolata"-->
# Une écriture très simple

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-standalone-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent { }
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide"-->
## Deux nouvelles propriétés

La description d'un composant se voit ajouter deux nouvelles propriétés: <br/> <br/>

- __standalone__: permet de définir si le composant est standalone ou non <br/> <br/>
- __imports__: permet de définir ce qu'importe notre composant pour fonctionner correctement


##==## 

<!--- .slide: class="with-code inconsolata"-->
# Mais qu'est ce qui se cache sous le capot ?

En réalité un composant standalone est un module dit "virtuel" <br/><br/>

```typescript
@NgModule({
  declarations: [AppComponent],
  exports: [AppComponent]
})
export class AppComponent {}
```
<!-- .element: class="big-code"-->


##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Les impacts des standalone components

L'introduction de standalone components a plusieurs impacts: <br/><br/>

- Le bootstrapping d'une application <br/><br/>
- Le routing d'une application <br/><br/>
- Le scope de l'injection <br/><br/>
- L'enregistrement des ModuleWithProviders <br/>


##==##

<!-- .slide: class="with-code inconsolata"-->
# Un Bootstrapping beaucoup plus léger

<br/> <br/>

```typescript
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent).then(console.info).catch(console.error);
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Heu on ne perd pas des informations là ?

Ou enregistre t'on nos modules de dépendances, providers ?
<!-- .element: class="important"-->

__bootstrapApplication__ prend en deuxième paramètres des providers. <br/><br/><br/>

```typescript
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, { providers: [] });
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Comment faire pour importer les services d'un module ?

Une nouvelle fonction fais son apparition: __importProvidersFrom__ <br/><br/>

- Permet de charger tous les providers qu'expose un module <br/><br/>


```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, { providers: [
  importProvidersFrom(HttpClientModule)
] });
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Ça sera toujours comme ça ?

Non à l'avenir l'équipe Angular est persuadée que tout peut se résoudre grâce à l'injection. <br /><br/>

- __withHttpClient__ <br/> <br/>
- __withRoutes__ <br/><br/>
- __withAnimations__
