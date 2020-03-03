<!-- .slide: class="sfeir-basic-slide with-code" -->
# Action: Définition
<br>
Les __actions__ sont des commandes qui doivent déclancher une mutation de l'état (state).<br><br>
C'est uniquement à travers des actions que l'on modifie l'état de notre state
<br><br>
Chaque action doit obligatoirement contenir un champs qui l'identifiant unique de l'action<br><br><br>
```typescript
export class FeedZebra {
  static readonly type = '[Zoo] Feed Zebra';
  constructor(public name: string, public hayAmount: number) {}
}
```
<!-- .element: class="big-code" -->
Notes
- dans cette exemple on peut voir que je passe des arguments lorsque je dispatch mon action
Ici name et hayAmount

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Action: Comment la déclancher
<br>
- Dans le composant, l'action est déclenché grâce au mot clé __disptach__
- Une action renvoie toujours un observable
<br><br>
```typescript
@Component({ ... })
export class ZooComponent {
    constructor(private readonly store: Store) {}

    addFee({ name: string, hayAmount: number }): void {
        this.store.dispatch(name, hayAmount);
    }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Actions: Convention de nommage
<br><br>
Une __bonne__ action doit contenir trois parties:<br><br>
- d'ou vient l'action [PAGE, API, ...]
- un verbe décrivant l'action [GETUSER]
- l'entité sur laquel agit l'action
<br><br>
__Exemple__: au click j'ajoute un utilisateur dans un tableau 
<br><br>
__[USER PAGE] addUser__

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Actions: regrouper des actions
<br>
```typescript
export namespace Todo {
  export class Add {
    static readonly type = '[Todo] Add';
    constructor(public payload: any) {}
  }

  export class Edit {
    static readonly type = '[Todo] Edit';
    constructor(public payload: any) {}
  }

  export class FetchAll {
    static readonly type = '[Todo] Fetch All';
  }

  export class Delete {
    static readonly type = '[Todo] Delete';
    constructor(public id: number) {}
  }
}
```
<!-- .element: class="big-code" -->
