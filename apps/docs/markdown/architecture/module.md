<!-- .slide: class="transition-bg-grey-1 underline" -->
# Le module

##==##

<!-- .slide-->
# Le module: généralités<br>

- Permet de regrouper des fonctionnalités<br><br>
- Au moins un module par application (obligatoire, car sans ce module, l'app ne démarre pas)<br><br>
- Peut être chargé de façon différée (lazy loading)<br><br>
- Bonne pratique : Architecture de modules selon rôles (Root Module, Navigation Module, Feature Module, Shared Module, Core Module ...)

Notes:
- Root Module, contient en général les autres modules de l'application
- Feature Module, il en existe un par fonctionnalité (ex: fonctionnalité user => update, creation ...)
- Shared Module, il en existe également plusieurs, un pour toute l'application et parfois un dans les features modules
- Core Module, il en existe un qui contient le core de votre application (footer, header, loader)
- Attention les services ne se mettent pas dans les shareds modules !!!!

##==##

<!-- .slide: class="with-code" -->
# Le module: son écriture
Comme le composant, la définition du module se fait à l'aide d'une classe et d'un décorateur
<br><br>

```typescript
// app.module.ts
@NgModule({
  imports: [BrowserModule, ...],
  declaration: [AppComponent, ...],
  exports: [],
  bootstrap: [AppComponent], // only in root module
})
export class AppModule { }
```
<!-- .element: class="big-code" -->

