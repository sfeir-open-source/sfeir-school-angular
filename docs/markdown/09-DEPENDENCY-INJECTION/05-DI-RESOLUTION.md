<!-- .slide -->

# Beyond `useClass`: the different resolution strategies

`providers: [MyService]` covers the common case. Four strategies exist for when the token and its implementation need to be decoupled.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Resolution by value: `useValue`

<br/>

```typescript
providers: [{ provide: V8, useValue: 8 }];
providers: [{ provide: V8, useValue: 'V8' }];
providers: [{ provide: V8, useValue: { cylinder: 8 } }];
```

<!-- .element: class="big-code" -->

Notes:

- Useful for configuration objects, feature flags, or an `InjectionToken` holding a plain constant — anything that isn't a class instance.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Resolution by alternative class: `useClass`

```typescript
providers: [{ provide: V8, useClass: V8 }]; // same as providers: [V8]
providers: [{ provide: V8, useClass: V8Mock }]; // swap the implementation
```

<!-- .element: class="big-code" -->

Notes:

- This is how you register interceptors, or swap a real service for a mock/test double, while every consumer keeps injecting the same token (`V8`).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Resolution by aliased class: `useExisting`

Reuse an **existing** instance under a second token, instead of creating a new one:

<br/>

```typescript
providers: [V8, { provide: V8Engine, useExisting: V8 }];
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Resolution by factory: `useFactory`

```typescript
export function createEngineFactory(dep: V8Engine) {
  return new Engine(dep.cylinders);
}
providers: [V8Engine, { provide: Engine, useFactory: createEngineFactory, deps: [V8Engine] }];
```

<!-- .element: class="big-code" -->

Notes:

- Very useful for libraries that need to build a service from a configuration provided by the consuming app (e.g. an authentication service).
- With `@Service`, the equivalent is the single `factory` option seen earlier — it covers the same need with less ceremony, for the common case of a root-provided singleton.

##==##

<!-- .slide -->

# Overriding a dependency in tests

Because `Home` depends on the **token** `People`, not a hardcoded instance, a test can swap in a fake implementation without touching `Home` at all:

<br/>

```typescript
TestBed.configureTestingModule({
  providers: [{ provide: People, useValue: { getFirstPerson: () => mockPerson, getRandomPerson: () => mockPerson } }],
});
```

<!-- .element: class="big-code" -->

> This is the payoff of dependency injection: `Home` never chose *how* to get a `People` — it only declared that it needed one. Swapping the real service for a test double is a one-line provider override, with zero changes to the component under test.
