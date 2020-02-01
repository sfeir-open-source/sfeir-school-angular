<!-- .slide: class="sfeir-bg-white-5" -->
# Concepts

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Concepts généraux de TDD
<br><br>
- __describe(string, function)__: un scénario de specs à exécuter<br><br>
- __it(string, function)__: une spec contient un ou plusieurs vérifications<br><br>
- __toXXXX(expected) ⇒ toBe(expected)__: un comparateur compare le résultat obtenu avec un résultat attendu<br><br>
- __beforeAll/afterAll, beforeEach/afterEach__: Permet d’exécuter du code avant/après chaque scénario/test<br><br>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Concepts TDD (exemple)
<br><br>
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

<!-- .slide: class="sfeir-basic-slide" -->
# Un exemple complet
<div class="full-size">
    <img alt="full-center" src="assets/images/school/unit-tests/exemple_concepts.png" />
</div>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# L'API d'Angular pour la TDD
<br>
__TestBed__: module de configuration des tests(similaire à NgModule)
```typescript
TestBed.configureTestingModule({
    declarations: [ UserComponent ],
    providers: [ UserService ]
});
```
<!-- .element: class="big-code" -->
<br><br>
__Inject__: injection des dépendances
```typescript
inject([ UserService ], (user) => { 
    // sync test
});
```
<!-- .element: class="big-code" -->
