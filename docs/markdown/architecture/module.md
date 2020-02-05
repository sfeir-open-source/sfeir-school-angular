<!-- .slide: class="transition-white sfeir-bg-blue" -->
# Le module

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le module: généralités
<br><br>
<ul>
    <li>Permet de regrouper des fonctionnalités</li><br>
    <li>Au moins un module par application (obligatoire, sans ce module, l'app ne démarre pas)</li><br>
    <li>Peut être chargé de façon asynchrone (lazy loading)</li><br>
    <li>Différents types de module (Root Module, Navigation Module, Feature Module, Shared Module, Core Module, ...)</li><br>
</ul>
Notes
- Root Module, contient en général les autres modules de l'application
- Feature Module, il en existe un par fonctionnalité (ex: fonctionnalité user => update, creation ...)
- Shared Module, il en existe également plusieurs, un pour toute l'application et parfois un dans les features modules
- Core Module, il en existe un qui contient le core de votre application (footer, header, loader)
- Attention les services ne se mettent pas dans les shareds modules !!!!

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Le module: son écriture
<br><br>
Comme le composant, l'écriture du module se fait à l'aide d'une classe et d'une annotation
<br><br>
```typescript
@NgModule({
  imports: [BrowserModule, ...],
  declaration: [AppComponent, ...],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```
<!-- .element: class="big-code" -->

