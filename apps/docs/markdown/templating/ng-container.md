<!-- .slide: class="with-code inconsolata" -->

# La directive ng-container

- Créer un template sans créer un élement supplémentaire<br><br>
- Pratique lorsque l'on a besoin d'utiliser plusieurs directives structurelles sur le même élément <br><br>
- Utile pour téléporter un contenu d'une balise ng-template <br><br>

<br>

```html

<ng-container *ngIf="lessons.length > 0">
    <div class="lesson" *ngFor="let lesson of lessons">
        <div class="lesson-detail">{{lesson | json}}</div>
    </div>
</ng-container>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# La directive structurelle ngTemplateOutlet

- Prend deux paramètres, un template et un context<br><br>
- Le context doit être obligatoirement un object<br><br>

```typescript
@Component({
    selector: 'app-root',
    template: `
        <ng-template #estimateTemplate let-lessonsCounter="estimate">
            <div>Approximately {{ lessonsCounter }} lessons ...</div>
        </ng-template>
        <ng-container *ngTemplateOutlet="estimateTemplate; context: ctx"> </ng-container>
    `
})
export class AppComponent {
    totalEstimate = 10;
    ctx = { estimate: this.totalEstimate };
}
```

<!-- .element: class="medium-code" -->

Notes:

- Ici let-lessonsCounter doit absolement être égal à estimate, puisque dans le context c'est ainsi que l'on nomme la
  variable
- Si l'on souhaite utiliser une autre variable qu'estimate, donner un nom aléatoire, il est obligatoire de passer par
  $implicit => ctx = { $implicit: this.totalEstimate }

##==##

<!-- .slide: class="inconsolata with-code"-->

# Notion de context implicit

- Permet de définir une variable de template sans l'affecter <br><br>
- Utilisé par la directive *ngFor :) <br><br>

```typescript
@Component({
    selector: 'app-root',
    template: `
        <ng-template #estimateTemplate let-lessonsCounter>
            <div>Approximately {{ lessonsCounter }} lessons ...</div>
        </ng-template>
        <ng-container *ngTemplateOutlet="estimateTemplate; context: ctx"> </ng-container>
    `
})
export class AppComponent {
    totalEstimate = 10;
    ctx = { $implicit: this.totalEstimate };
}
```

<!-- .element: class="medium-code" -->
