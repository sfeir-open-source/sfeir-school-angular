<!-- .slide: class="transition-bg-grey-1 underline" -->

# Créer vos propres directives

##==##

<!-- .slide: class="sfeir-basic-slide" -->

# Quelques rappels sur les directives

![h-300 center](assets/images/school/directive/directive_schema.png) <br>

-   les directives structurelles : modifient le DOM<br>
-   les directives d'attributs : modifient l'apparence ou le comportement d'un élement<br>
-   composant : directive avec une vue<br>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Définition d'une directive

```typescript
import { Directive } from '@angular/core';

@Directive({ 
    selector: '[myDirective]'
})
export class MyDirective {}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide -->

# Comment invoquer une directive ?

-   <b>element-name</b> : pour restreindre à un élément<br><br>
-   <b>[attribute]</b> : pour restreindre à un attribut<br><br>
-   <b>.class</b> : pour restreindre à une classe<br><br>
-   <b>[attribute=value]</b> : pour restreindre à un attribut avec une certaine valeur<br><br>
-   <b>:not(sub_selector)</b> : si l'élément ne match pas le sous sélecteur

##==##

<!-- .slide -->

# Quelques exemples seront plus parlants

![h-400](assets/images/school/directive/attribut_directive.png)
![h-400](assets/images/school/directive/element_attibute_directive.png)
![h-400](assets/images/school/directive/css_direcitive.png)

##==##

<!-- .slide: class="with-code inconsolata" -->

# Comment passer des props à ma directive

-   Lister des inputs grâce au décorateur <b>@Input()</b>
-   Ces inputs peuvent être aliasés
-   <b>Exactement comme pour les composants</b> <br><br>

```typescript
import { Directive, Input } from '@angular/core';
@Directive({
    selector: '[foobar]'
})
export class MyDirective {
    constuctor() {}
    myProp: string;
    @Input('alias') myProp2: string;
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Comment intéragir avec les éléments du DOM

-   ElementRef (injectable) permet de récupérer directement l'élément sur lequel agit la directive
-   Renderer2 (injectable) permet d'intéragir avec le DOM<br><br>

```typescript
import { Directive, ElementRef, Renderer2 } from '@angular/core';
@Directive({
    selector: '[foobar]'
})
export class MyDirective {
    constructor(private readonly element: ElementRef, private readonly renderer: Renderer2) {}
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide -->

# L'intéraction avec le DOM

-   Préférez l'utilisation du Renderer au lieu de ElementRef<br><br>
-   Aucune dépendance directe avec le DOM<br><br>
-   Permet d'éxécuter l'application dans d'autres environnements (EDGE, Firefox)

##==##

<!-- .slide: class="sfeir-basic-slide" -->

# L'interaction avec le DOM: Practices

<div class="container-practice border-red">
    <div class="icon-satisfaction">X</div>
    <div class="code">document.querySelector('#someId').innerHTML = 'X';</div>
</div>
<br><br>
<div class="container-practice border-orange">
    <div class="icon-satisfaction">:/</div>
    <div class="code">this.element.nativeElement.style.color = 'orange';<br>this.element.nativeElement.innerHTML = ':/';</div>
</div>
<br><br>
<div class="container-practice border-green">
    <div class="icon-satisfaction">:)</div>
    <div class="code">this.renderer.setStyle(this.element.nativeElement, 'color', '#0f0');<br>this.renderer.setProperty(this.element.nativeElement, 'innerHTML', ':)');</div>
</div>

##==##

<!-- .slide: class="with-code inconsolata" -->

# Les évènements

-   <b>@Output()</b> pour propager des évènements
-   <b>@Hostlistener()</b> pour écouter des évènements sur l'élément host
-   <b>Exactement comme pour les composants</b>

```typescript
@Directive({ selector: '[myDirective]' })
export class MyDirective {
    @Output() somethingChange: EventEmitter<{ event: MouseEvent, data: any }> = new EventEmitter();

    constructor() {}

    @HostListener('click', '$event') handleClick(event: MouseEvent) {
        this.somethingChange.emit({ event, data });
    }
}
```

<!-- .element: class="medium-code" -->
