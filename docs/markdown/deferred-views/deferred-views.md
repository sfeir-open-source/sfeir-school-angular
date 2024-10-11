<!-- .slide: class="with-code inconsolata" -->
# Overview sur les vue différées :)

- nouvelle foncionnalité du compileur <br/><br/>
- solution pour lazyloader des composants et leur dépendances <br/><br/>
- amélioration des performances <br/><br/>
- plusieux blocs pour gérer l'état du lazyload <br/><br/>
- declencheur, et prefetching

<br/>

```angular17html
@defer {
  <todo-list />
}
```
<!-- .element: class="big-code" -->

##==##

# Pourquoi les vues différées?

- alléger le bundle initial <br/><br/>
- charger à la demande des composants lourd qui ne seront pas utilisés immédiatement; voir pas du tout <br/><br/>
- améliorer les métriques LCP et TTFB <br/><br/>

##==##

# Quelles dépendances peuvent être différées?

Il existe deux conditions pour qu'un composant puisse être différé:

- doit être obligatoire standalone <br/><br/>
- ne doit pas être directement reférencé comme par exemple avec l'utilisation @ViewChild

##==##

<!-- .slide: class="with-code inconsolata" -->
# @defer et le sous block @placeholder

```angular17html
@defer {
  <todo-list />
}@placeholder(minimum 500ms) {
  <div>Placeholder content</div>
}
```
<!-- .element: class="medium-code" -->

<br/><br/>

Par défaut, le block defer n'affiche aucun contenu tant qu'il n'est pas trigger. Le block placeholder est utilisé pour afficher un contenu de remplacement. <br/><br/>
Le block @placeholder prend un argument supplémentaire (minimum) qui est le temps d'affichage minimum du placeholder.

##==##

<!-- .slide: class="with-code inconsolata" -->
# @defer et le sous block @error

```angular17html
@defer {
  <todo-list />
}@error {
  <div>An error occurred</div>
}
```
<!-- .slide: class="big-code" -->

<br/><br/>

Le block error est utilisé pour afficher un contenu alternatif en cas d'erreur lors du chargement du composant différé.

##==##

<!-- .slide: class="with-code inconsolata" -->
# @defer et le sous block @loading

```angular17html
@defer {
  <todo-list />
}@loading(after 100ms; minimum 1s) {
  <div>Loading in progress</div>
}
```
<!-- .slide: class="big-code" -->

<br/><br/>

Le block loading est utilisé pour afficher un contenu alternatif pendant le chargement du composant différé. <br/><br/>
Il prends deux arguments supplémentaires: after et minimum:
- after: le temps d'attente avant d'afficher le contenu loading <br/><br/>
- minimum: le temps d'affichage minimum du contenu loading

##==## 

# Les differents type de trigger pour les vue différées

- __on idle__ : déclenche le chargement lorsque le navigateur est inactif <br/><br/>
- __on viewport__ : déclenche le chargement lorsque le composant/élément est visible dans le viewport <br/><br/>
- __on interaction__ : déclenche le chargement lorsque l'utilisateur interagit avec un élément <br/><br/>
- __on hover__ : déclenche le chargement lorsque l'utilisateur survole un élément <br/><br/>
- __on immediate__: déclenche le chargement immédiatement <br/><br/>
- __on time__ : déclenche le chargement après un certain temps
- __when__ : déclenche le chargement lorsque la condition est vraie

##==##


# Chargement différé avec prefetching

- Fonctionne exactement comme le chargement différé, mais le composant est chargé en arrière-plan avant d'être affiché <br/><br/>
- prefetch possède les mêmes trigger que le chargement différé. <br/><br/>
- prefetch permet de gérer le fetching de la ressource et defer l'affichage quand ils sont utilisés ensemble

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple complet


```angular17html
<button #trigger>Display</button>
@defer(on interaction(trigger); on timer(1000s); prefetch on viewport(trigger)) {
  <todo-list />
}@placeholder(minimum 500ms) {
  <div>Placeholder content</div>
}@loading(after 100ms; minimum 1s) {
  <div>Loading in progress</div>
}@error {
  <div>An error occurred</div>
}
```
<!-- .element: class="big-code" -->




