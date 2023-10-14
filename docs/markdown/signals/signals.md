<!-- .slide: class="with-code inconsolata"-->
# Comment créer un Signal
<br/><br/>

```typescript
const name = signal<string>('SFEIR');
```
<!-- .element: class="big-code"-->

<br /><br/>

La signature d'un signal est la suivante:
<!-- .element: class="important"-->

<br/><br/>


```typescript
signal<T>(initialValue: T, { equality: EqualityFn<T> }): WritableSignal<T>
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->

## Lecture de la valeur d'un signal

<br/><br/>

- Dans le composant
```typescript
const name = signal<string>('SFEIR');
console.log(name()); // SFEIR
```
<!-- .element: class="big-code"-->

<br/><br/>

- Dans le template
```html
<span>{{ name }}</span>
```
<!-- .element: class="big-code"-->

##==##

# L'objet WritableSignal
<br /><br />

- la méthode **set**: permet de modifier la valeur du signal en changeant sa référence <br /><br />
- la méthode **update**: permet de modifier la valeur du signal en utilisant la valeur précédente <br /><br />
- la méthode **asReadonly**: permet de transformer un signal en un signal en lecture seule <br /><br />

##==##

<!-- .slide: class="with-code inconsolata"-->
# La méthode set

<br/><br/>

- Permet de setter une nouvelle valeur du signal en changeant sa référence <br /><br />

```typescript
const name = signal<string>('SFEIR');
console.log(name()) // SFEIR

name.set('Google');
console.log(name()); // Google
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# La méthode update

<br/><br/>

- permet de modifier la valeur du signal en utilisant la valeur précédente <br /><br />

```typescript
const name = signal<string>('SFEIR');
console.log(name()); // SFEIR

name.update(name  => `${name} Luxembourg`);
console.log(name()); // SFEIR Luxembourg
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# La méthode asReadonly

<br/><br/>

- permet de transformer un signal en un signal en lecture seule <br /><br />

```typescript
const name = signal<string>('SFEIR');
const nameReadonly = name.asReadonly();
console.log(name()); // SFEIR

nameReadonly.set('Google'); // Error can set signal that is readonly
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Changer la résolution d'égalité

- Vous pouvez changer la façon dont Angular détecte un changement <br/><br/>
- Attention il faut être sûre de son coup, risque de bug. <br/><br/>

```typescript
content_copy
import { isEqual } from 'lodash-es';

const data = signal(['test'], {equal: isEqual});
data.set(['test']);
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->

# Dériver un signal avec computed

- **computed** est définie par une fonction de dérivation <br/><br/>
- évalué de manière lazy et memoized par défaut <br/><br/>
- dépendance d'une computed sont dynamique  <br/><br/>

```typescript
const showCount = signal(false);
const count = signal(0);
const conditionalCount = computed(() => {
  if (showCount()) {
    return `The count is ${count()}.`;
  } else {
    return 'Nothing to see here!';
  }
}
```
<!-- .element: class="big-code"-->

##==##

# Performer des effets de bord avec effect

<br/><br/>

- **effect** est définie par une fonction de sideEffect <br/><br/>
- exécution de la fonction de sideEffect au moins une fois <br/><br/>
- exécuté à chaque fois que les dépendances tracker changent <br/><br/>
- un effet se réalise toujours dans un context d'injection <br/><br/>

##==##

<!-- .slide: class="with-code inconsolata"-->
# Performer des effets de bord avec effect

```typescript
@Component({ selector: 'app-root', template: ''})
export class AppComponent {
  id = signal('12');
  todo = signal<Todo | null>(null);

  constructor() {
    effect((onCleanup) => {
      const controller = new AbortController();
      const response = await fetch(`/todos/${id()}`, { signal: controller.signal })
      todo.set(await response.json());
      onCleanup(() => controller.abort())
    }, { allowSignalWrites: true })
  }
}
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Performer des effets de bord avec effect

```typescript
@Component({ selector: 'app-root', template: ''})
export class AppComponent implements OnInit {
  readonly #injector = inject(Injector);
  id = signal('12');
  todo = signal<Todo | null>(null);

  ngOnInit(): void {
    effect((onCleanup) => {
      const controller = new AbortController();
      const response = await fetch(`/todos/${id()}`, { signal: controller.signal })
      todo.set(await response.json());
      onCleanup(() => controller.abort())
    }, { allowSignalWrites: true, injector: this.#injector })
  }
}
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Ne pas lever une réévaluation avec untracked

- **untracked** permet de ne pas lever une réévaluation <br/><br/>
- **untracked** permet de ne pas ajouter de dépendance dans une fonction réactive <br/><br/>
- **untracked** prend en paramètre une fonction <br/><br/>

```typescript
const company = signal('SFEIR');
const employeeNumber = signal(100);

effect(() => {
  console.log(`The company ${untracked(company)} has ${employeeNumber()} employees.`);
  });
})
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Assemblons et voyons comment ça fonctionne
<br/><br/>

```typescript
const counter = signal(0);
const isEven = computed(() => counter() % 2 === 0);
effect(() => {
  console.log(`The counter is ${counter()} and is ${isEven() ? 'even' : 'odd'}.`);
})

counter.set(2);

counter.set(4);
```
<!-- .element: class="big-code"-->

##==##

# Assemblons et voyons comment ça fonctionne

![h-900 full-width ](assets/images/school/signals/signals-working.png)
