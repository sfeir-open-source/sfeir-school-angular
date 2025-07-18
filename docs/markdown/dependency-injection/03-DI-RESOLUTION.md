<!-- .slide: class="with-code inconsolata" -->
# Resolution by value

<br/>

```typescript
providers: [ { provide: V8, useValue: 8 }]
providers: [ { provide: V8, useValue: 'V8' }]
providers: [ { provide: V8, useValue: false }]
providers: [ { provide: V8, useValue: { cylinder: 8 } }]
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Resolution by alternative class: useClass<br>

```typescript
providers: [ { provide: V8, useClass: V8 }]
providers: [ V8 ]
providers: [{ provide: V8, useClass: V8Mock }]
```
<!-- .element: class="big-code" -->
Notes:
- This is how we register interceptors, for example

##==##

<!-- .slide: class="with-code inconsolata" -->
# Resolution by aliased class: useExisting

<br><br>

- <b>Reuse of the V8 instance</b><br><br>

```typescript
providers: [ V8, { provide: V8Engine, useExisting: V8 } ]
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Resolution by factory: useFactory

<br/>

```typescript
export function createEngineFactory(dep: V8Engine) {
	return new Engine(dep.cylinders);
}
providers: [ V8Engine, { provide: Engine, useFactory: createEngineFactory, deps: [ V8Engine ] } ]
```
<!-- .element: class="big-code" -->
Notes:
- Very useful when you want to create libraries that use authentication services, for example
