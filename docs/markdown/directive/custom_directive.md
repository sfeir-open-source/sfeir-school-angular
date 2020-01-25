<!-- .slide: class="transition-white sfeir-bg-pink" -->
# Créer vos propres directives

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Quelques rappels sur les directives
<br><br>
<img alt="h-300" class="float-right" src="assets/images/school/directive/directive_schema.png"/>
- les directives structurelles: modifie le DOM<br><br>
- les directives attributales: modifie l'apparence ou le comportement d'un élement<br><br>
- composant: directive avec une vue<br><br>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Définition d'une directive
<br><br><br>
```typescript
import { Directive } from '@angular/core';

@Directive({ ... })
export class MyDirective {}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Comment invoquer une directive ?
<br><br>
- <strong>element-name</strong>: pour restreindre à un élement<br><br>
- <strong>[attribute]</strong>: pour restreindre à un attribut<br><br>
- <strong>.class</strong>: pour restreindre à une classe<br><br>
- <strong>[attribute=value]</strong>: pour restreindre à un attribut avec une certaine valeur<br><br>
- <strong>:not(sub_selector)</strong>: si l'élement ne match pas le sous sélécteur

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Quelques exemples seront plus parlant
<br><br>
<div class="flex-row">
    <img alt="h-400" src="assets/images/school/directive/attribut_directive.png" />
    <img alt="h-400" src="assets/images/school/directive/element_attibute_directive.png" />
    <img alt="h-400" src="assets/images/school/directive/css_direcitive.png" />
</div>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Comment passer des props à ma directive
<br>
<ul>
    <li>Lister des inputs grâce l'annotation <strong>@Input()</strong></li><br>
    <li>Ces inputs peuvent être aliasé</li><br>
    <li><strong>Exactement comme les composants</strong></li>
</ul>
<br><br>
```typescript
import {Directive, Input} from '@angular/core';
@Directive({
   selector: '[foobar]'
})
export class MyDirective {
  constuctor() { }
  myProp: string;
  @Input('alias') myProp2: string;
}
```
<!-- element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Comment intéragir avec les éléments du DOM
<br>
<ul>
    <li>ElementRef (service) permet de récupérer directment l'élement sur lequel agit la directive</li>
    <li>Renderer2 (service) permet d'intéragir avec le DOM</li>
</ul>
<br><br>
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
<br><br>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# L'intéraction avec le DOM
<br><br>
- Préférez l'utilisation du Render au lieu de ElementRef<br><br>
- Aucune dépendance direct avec le DOM<br><br>
- Permet d'éxécuter l'application dans d'autre environnements (EDGE, Firefox)

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# L'interaction avec le DOM: Practices
<br><br>
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

<!-- .slide: class="sfeir-basic-slide" -->
# Les évènements
<ul>
    <li><strong>@Hostlistener()</strong> pour écouter des évènements sur l'élément host</li><br>
    <li><strong>@Output()</strong>pour propager des évènements</li><br>
    <li class="bold">Exactement comme pour les composants</li>
</ul>
<br><br>
```typescript
@Directive({})
export class MyDirective {

  @Output() somethingChange$: EventEmitter<any>;

  constructor(){
    this.somethingChange$ = new EventEmitter();
  }

  @HostListener('click','$event') onClick($event) {
    this.somethingChange$.emit({$event, data});
  }
}
```
