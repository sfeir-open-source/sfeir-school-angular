# Une definition simple de Signals

Signals est une nouvelle façon de signaler à notre template que nos données on changé
<!-- .element: class="important full-center"-->

##==##

# L'apport de Signals
<br /><br/>

- Améliorer la détection de changement <br/><br/>
- Rendre notre code plus réactive <br/><br/>
- Nouvelle fonctionnalité qui est apparut dans la version 16 d'Angular

##==##

<!-- .slide: class="with-code inconsolata"-->
# Pourquoi Signals ?
<br/><br/>

```typescript
let x = 'Sfeir';
let y = 'Luxembourg';
let z = `${x} ${y}`;
console.log(z); // Sfeir Luxembourg

y = 'Paris'

console.log(z); // ?
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Pourquoi Signals ?

- Getter <br/><br/>
- Event function <br/><br/>

```typescript
let x = 'Sfeir';
let y = 'Luxembourg';

get z() {
  return `${x} ${y}`;
}

console.log(z); // Sfeir Luxembourg
y = 'Paris'
console.log(z); // Sfeir Paris
```
<!-- .element: class="big-code"-->

##==##

# Pourquoi Signals ?
<br /><br/>

- Procurer plus de réactivité <br/><br/>
- Améliorer la granularité de notre réactivité <br/><br/>
- Améliorer la performance de notre application <br/><br/>

##==##

# Qu'est ce que Signals ?

- Object.create(factory)
- Nouveau système réactif primitif

![center](assets/images/school/signals/signals.png)
