<!-- .slide: class="sfeir-basic-slide with-code" -->
# La directive ng-container
<br><br>
<ul>
    <li>Créer un template sans créer un élement supplémentaire</li>
    <li>Pratique lorsque l'on a besoin d'utiliser plusieurs directives structurelles sur le même élément</li>
    <li>Utile pour téléporter un contenue d'une balise ng-template</li>
</ul>
<br><br>
```html
<ng-container *ngIf="lessons.length > 0">
    <div class="lesson" *ngFor="let lesson of lessons">
        <div class="lesson-detail">
            {{lesson | json}}
        </div>
    </div>
</ng-container>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La directive structurelle ngTemplateOutlet

<ul>
    <li>prend deux paramètres un template et un context</li>
    <li>le context doit être obligatoirement un object</li>
</ul>
```typescript
@Component({
  selector: 'app-root',
  template: `      
    <ng-template #estimateTemplate let-lessonsCounter="estimate">
        <div> Approximately {{lessonsCounter}} lessons ...</div>
    </ng-template>
    <ng-container 
    *ngTemplateOutlet="estimateTemplate;context:ctx">
    </ng-container>
`})
export class AppComponent {
  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };
}
```
<!-- .element: class="big-code" -->
Notes:
- Ici let-lessonsCounter doit absolement être égal à estimate, puisque dans le context c'est ainsi que l'on nomme la variable
- Si l'on souhaite utiliser une autre variable qu'estimate, donner un nom aléatoire, il est obligatoire de passer par $implicit => ctx = { $implicit: this.totalEstimate }
