<!-- .slide: class="transition-bg-grey-1 underline" -->
# Concepts

##==##

<!-- .slide-->
# Concepts généraux de TDD
<br><br>

- __describe(string, function)__ : un scénario de specs à exécuter<br><br>
- __it(string, function)__ : une spec contient un ou plusieurs vérifications<br><br>
- __toXXXX(expected) ⇒ toBe(expected)__ : un comparateur compare le résultat obtenu avec un résultat attendu<br><br>
- __beforeAll/afterAll, beforeEach/afterEach__ : Permet d’exécuter du code avant/après chaque scénario/test<br><br>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Concepts TDD (exemple)
<br><br><br>

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
![full-center full-size](assets/images/school/unit-tests/exemple_concepts.png)


##==##

<!-- .slide: class="with-code inconsolata" -->
# L'API d'Angular pour la TDD
<br>

__TestBed__ : module de configuration des tests(similaire à NgModule)

```typescript
TestBed.configureTestingModule({
    declarations: [ UserComponent ],
    providers: [ UserService ]
});
```
<!-- .element: class="big-code" -->
<br><br>

__Inject__ : injection des dépendances

```typescript
inject([ UserService ], (user) => { 
    // sync test
});
```
<!-- .element: class="big-code" -->
