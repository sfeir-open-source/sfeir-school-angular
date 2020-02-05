<!-- .slide: class="sfeir-basic-slide with-code" -->
# La résolution par valeur
<br><br><br>
```typescript
providers: [ { provide: V8, useValue: 8 }]
providers: [ { provide: V8, useValue: 'V8' }]
providers: [ { provide: V8, useValue: false }]
providers: [ { provide: V8, useValue: { cylinder: 8 } }]
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La résolution par classe alternative: useClass
<br><br><br>
```typescript
providers: [ { provide: V8, useClass: V8 }]
providers: [ V8 ]
providers: [{ provide: V8, useClass: V8Mock }]
```
<!-- .element: class="big-code" -->
Notes
- C'est de cette manière que nous enregistrons les interceptors par exemple

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La résolution par class aliasée: useExisting
<br>
<ul>
    <li class="important bold">Création de 2 instances de V8</li>
</ul>
```typescript
providers: [ V8, { provide: V8, useClass: V8 }]
```
<!-- .element: class="big-code" -->
<br><br>
<ul>
    <li class="important bold">Réutilisation de l'instance de V8</li>
</ul>
```typescript
providers: [ V8, { provide: V8Engine, useExisting: V8 } ]
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La résolution par factory: useFactory
<br><br>
```typescript
export const function createEngineFactory(dep: V8Engine) {
	return new Engine(dep.cylinders);
}
providers: [ V8Engine, { provide: Engine, useFactory: createEngineFactory, deps: [ V8Engine ] } ]
```
<!-- .element: class="big-code" -->
Notes:
- Très utile lorsque l'on souhaite créer des librairies qui utilise des services d'authentification par exemple


