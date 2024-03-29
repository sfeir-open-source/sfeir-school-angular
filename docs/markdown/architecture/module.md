<!-- .slide: class="transition-bg-sfeir-2" -->

# Le module

##==##

<!-- .slide-->

# Le module: généralités

- Permet de regrouper des fonctionnalités<br/><br/>
- Depuis la version 14, le module est optionnel grâce au standalone component <br/><br/>
- Peut être chargé de façon différée (lazy loading)<br/><br/>
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
<br/><br/>

```typescript
// app.module.ts
@NgModule({
  imports: [browserModule, ...],
  declaration: [AppComponent, ...],
  exports: [],
  bootstrap: [AppComponent], // only in root module
})
export class AppModule {
}
```

<!-- .element: class="big-code" -->

