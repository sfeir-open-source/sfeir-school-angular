<!-- .slide: class="with-code inconsolata" -->
# Les références

- Se matérialise par un # / ref- dans le template
- Disponible dans tout le template
- On peut récupérer cet élément dans le composant grâce aux décorateurs __@ViewChild__, __@ViewChildren__ <br/><br/>
```html
<input #searchInput type="text" />
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Les décorateurs __@ViewChild__ et __@ViewChildren__

- Permet de récupérer une référence dans le composant
- Prend deux paramètres en entrée (nom de la référence, un object d'option: { static, read })
- valeur de retour
    - __@ViewChild__ : T
    - __@ViewChildren__ : QueryList<T>

```html
<myComponent #component></myComponent>
```

<!-- .element: class="small-code" -->

```typescript
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('component', { static: false }) private component: ElementRef;

  ngOnInit(): void {
    console.log(this.component); // undefined    
  }

  ngAfterViewInit(): void {
    console.log(this.component); // not undefined
  }
}
```
<!-- .element: class="small-code" -->
Notes:

- Dans la version 9 il n'est plus obligatoire de préciser static, false est sa valeur par défaut
- Si static est true, on peut accéder à la référence dans le OnInit (perte de performance)
- read est très utile lorsque l'on associe une directive à une référence (ex: #myForm = 'ngForm') si on ne précise pas
  la lecture par défaut on aura accès au méthode du ngForm et non à l'elementRef
