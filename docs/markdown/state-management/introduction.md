<!-- .slide: class="sfeir-bg-white-5" -->
# Problématique

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Cas concret
<br><br>
Soit une application web classique avec trois composants A, B, C et une variable ‘toto’.<br><br>

- Composant A peut créer et modifier la variable toto
- Composant B peut modifier la variable toto
- Composant C peut modifier uniquement une propriété de la variable toto
<br><br>

__Problème__: schématisation d’accès et de modification à la donnée semblable à une toile d'araigné dont chaque cas est dépendant du contexte! <br><br>
__Répercussion__: Complication à suivre de la logique, difficile à débugger<br><br>
<span class="center bold important">Trouver un moyen de communication commun</span>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# 3 façon de communiquer
<br><br>
Il existe deux grandes familles de communication<br><br>
- __Parent - Enfant__:
    - Input / Output [ exemple => @Input() , @Output dans un application Angular ]
<br><br>
- __Éléments indépendants les uns des autres__
    - Bus de communication [ système de notification, event emitter, Subject … ]
    - Architecture flux

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Notification dans un bus de communication
<br>
- Notification via un Subject
- Dans des services
- Utiliser les méthodes
    - next et subscribe
<br><br>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Définiton dans les routes du module principal
<br>
Dans le service

```typescript
@Injectable({provideIn: 'root'})
export class PeopleStoreService {
  
  private peopleSubject = new BehaviorSubject<Person[]>([]);
  public people$ = this.peopleSubject.asObservable();

  constructor(private http: HttpClient) {}

  refreshPeople() {
    this.http.get(url).subscribe(people => this.peopleSubject.next(people));
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Définiton dans les routes du module principal
<br>
Dans les composants

```typescript
@Component()
export class PeopleComponent implements OnInit, OnDestroy {
  people: Person[];
  peopleSubscription: Subscription;
  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleSubscription = this.peopleService.people$.subscribe(people => (this.people = people));
  }

  ngOnDestroy() {
    this.peopleSubscription.unsubscribe();
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# State Management
<br><br>
<div class="flex-row">
    <ul>
        <li>Architecture dataflow: like Redux :)</li><br>
        <li>librairie tiers à installer</li>
    </ul>
    <img alt="h-500" src="assets/images/school/state-management/redux_concepts.png" />
</div>
