# Préparation signal component

En vue de préparer les signals component, certaine annotations doivent être réécrite en fonction <br/>
- @Input --> input()
- @Output --> output()
- @ViewChild --> viewChild()
- @ViewChildren --> viewChildren()
- @ContentChild --> contentChild()
- @ContentChildren --> contentChildren()
- [(binding)] --> model()

##==##

## Pourquoi aller vers les composants signals ?

Le changement de détection sur Angular se fait à l'aide de Zone Js, chaque modification engendre une réévaluation de tout l'arbre

- composant onPush non modifié ne se voit lever un changement de détection
- composant en change detection par défaut se voit lever un changement de détection

<br/><br/>

et si on lever un changement de détection uniquement sur les composants qui ont été modifiés ?
<!-- .element: class="important" -->

<br/><br/>

**C'est possible avec les signals**

##==##

<!-- .slide: class="with-code inconsolata"-->
# La fonction input

La fonction input permet de déclarer une propriété d'entrée dans un composant
<br/><br/>

```typescript
@Component({...})
export class MyComponent {
  name = input.required<string>();
  age = input<number>(0);
}
```
<!-- .element: class="medium-code" -->

<br/>

```angular17html
<my-component [name]="name" [age]="age" />
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# La fonction output

La fonction output permet de déclarer une propriété d'entrée dans un composant
<br/><br/>

```typescript
import {output} from "@angular/core";

@Component({...})
export class MyComponent {
  nameChange = output<string>()
}
```
<!-- .element: class="medium-code" -->

<br/>

```angular17html
<my-component (nameChange)="updateName($event)" />
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Interporabilité avec RxJs: output

- outputToObservable: permet de convertir un output() en observable
- outputFromObservable: permet de convertir un observable en output()

<br/><br/>

```typescript
@Component({...})
export class MyComponent {
  name =  new FormControl<string>('');
  nameChange = outputFromObservable(this.name.valueChanges);
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# La fonction model 

La fonction model permet de déclarer un two data binding sur une propriété


```typescript
@Component({...})
export class MyComponent {
  name = model<string>('');
}
```
<!-- .element: class="medium-code" -->


```angular17html
<my-component [(name)]="firstname" />
```
<!-- .element: class="medium-code"-->

<br/><br/>

Dans l'exemple: firstname peut etre
- une valeur simple Javascript
- un signal

##==##

<!-- .slide: class="with-code inconsolata"-->
# Les fonctions viewChild et contentChild

<br/>

- Ces fonctions permettent de récupérer des élements du DOM dans un composant <br/><br/>
- elles renvoient un signal

<br/> <br/>

```typescript
import {ElementRef} from "@angular/core";

const input = viewChild<ElementRef<HTMLInputElement>>('input');
console.log(input().nativeElement);
```
<!-- .element: class="big-code"-->
