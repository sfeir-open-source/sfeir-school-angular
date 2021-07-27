<!-- .slide: class="transition-bg-grey-1 underline" -->

# Concepts

##==##

<!-- .slide-->

# Concepts généraux de TDD

-   **describe(string, function)** : un scénario de specs à exécuter<br><br>
-   **it(string, function)** : une spec contient une ou plusieurs vérifications<br><br>
-   **toXXXX(expected) ⇒ toBe(expected)** : un comparateur compare le résultat obtenu avec un résultat attendu<br><br>
-   **beforeAll/afterAll, beforeEach/afterEach** : permet d’exécuter du code avant/après chaque scénario/test<br><br>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Concepts TDD (exemple)

```typescript
describe('scenario description...', () => {
  // setup
  beforeEach(() => ...));

  // test
  it('should return some value', () => {
    expect(service.getSomeValue()).toContain('some value');
  });
})
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide -->

# Un exemple complet

![full-center h-900](assets/images/school/unit-tests/exemple_concepts.png)

##==##

<!-- .slide: class="with-code inconsolata" -->

# L'API d'Angular pour la TDD

**TestBed** : module de configuration des tests(similaire à NgModule)

```typescript
TestBed.configureTestingModule({
    declarations: [UserComponent],
    providers: [UserService]
});
```

<!-- .element: class="big-code" -->

<br><br>

**Inject** : injection des dépendances

```typescript
inject([UserService], user => {
    // sync test
});
```

<!-- .element: class="big-code" -->
