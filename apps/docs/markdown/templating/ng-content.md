# La directive ng-content

- Permet la transclusion (possibilité d'ajouter du contenu dynamiquement) <br><br>
- S'utilise obligatoirement dans les composants <br><br>
- Prend un attribut select permettant la transclusion sur un élément particulier

##==##

# La puissance de l'attribut select

- l'attribut n'est pas __obligatoire__<br><br>
- Possibilité d'en faire une propriété :  __[select]__="'.'+selectedClass"<br><br>
- Permet la transclusion sur n'importe quel selecteur css
    - une classe __select__=".my_class"
    - un attribut __select__="[name='submit-button']"
    - un élement html __select__="button" <br><br>
- Pour plus de fun vous pouvez les mixer ;)
    - __select__="button[type='submit']"

##==##

<!-- .slide: class="two-column-layout"-->

# Un exemple c'est mieux pour comprendre

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-loader',
    template: `
        <section>
            <div class="loading" *ngIf="isLoading,
              else notLoading "></div>
            <ng-template #notLoading>
                <ng-content></ng-content>
            </ng-template>
        </section>
`
})
export class LoadingComponent {}
````

<!-- .element: class="big-code"-->

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-root',
    template: `
        <app-loader>
          <div>Hello tout le monde</div>
        </app-loader>
`
})
export class AppComponent {}
````

<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="two-column-layout"-->

# Un exemple c'est mieux pour comprendre

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-loader',
    template: `
        <section>
            <div class="loading" *ngIf="isLoading,
              else notLoading "></div>
            <ng-template #notLoading>
                <ng-content select="button[type='submit']">
                </ng-content>
            </ng-template>
        </section>
`
})
export class LoadingComponent {}
````

<!-- .element: class="big-code"-->

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-root',
    template: `
        <app-loader>
          <div>Hello tout le monde</div>
          <button type="submit">Click Me<button>
        </app-loader>
`
})
export class AppComponent {}
````

<!-- .element: class="big-code"-->

##==##

# __@ContentChild__ __@ContentChildren__ ?

- permet de récupérer le contenue de la transclusion dans le composant <br><br>
- Prend deux paramètres en entrée (nom de la référence, un object d'option: { static, read }) <br><br>
- Valeur de retour
    - __@ContentChild__: T
    - __@ContentChildren__: QueryList<T><br><br>

##==##

<!-- .slide: class="two-column-layout"-->

# Un exemple c'est mieux pour comprendre

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
import { ElementRef } from '@angular/core';

@Component({
    selector: 'app-loader',
    template: `
        <section>
            <div class="loading" *ngIf="isLoading,
              else notLoading "></div>
            <ng-template #notLoading>
                <ng-content></ng-content>
            </ng-template>
        </section>
`
})
export class LoadingComponent {
    @ContentChild('div') myDiv: ElementRef
}
````

<!-- .element: class="medium-code"-->

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-root',
    template: `
        <app-loader>
          <div #div>Hello tout le monde</div>
        </app-loader>
`
})
export class AppComponent {}
````

<!-- .element: class="big-code"-->


