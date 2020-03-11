<!-- .slide: class="sfeir-basic-slide" -->
# Les Fondements
<br><br>
- Angular lance un changement de détection sur tous les composants (du parents à tous les enfants)<br><br>
- Lancement d'un changement de détection à chaque fois que quelque chose change dans l'app (user event)<br><br>
- Performant mais pour des applications plus complexes, risque de lague.
<br>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Change Detection Strategy: OnPush
<span class="full-center important bold">Ne lance un changement de détection uniquement lorsque la référence d'une variable change</span>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Des exemples
<div class="flex-row">
    <div class="half">
        <pre>
            <code data-trim class="typescript">
                import { Component } from '@angular/core';
                @Component({
                selector: 'app-root',
                templateUrl: './app.component.html'
                })
                export class AppComponent {
                  foods = ['Bacon', 'Lettuce', 'Tomatoes'];
                  addFood(food) {
                    this.foods.push(food);
                  }
                }
            </code>
        </pre>
        <pre>
            <code data-trim>
                <input #newFood type="text" placeholder="Enter a new food">
                <button (click)="addFood(newFood.value)">Add food</button>
                <app-child [data]="foods"></app-child>
            </code>
        </pre>
    </div>
    <div class="half">
        <pre>
            <code data-trim class="typescript">
               import { Component, Input } from '@angular/core';
               @Component({
                selector: 'app-child',
                template: './food-details.component.html'
               })
               export class ChildComponent {
                @Input() data: string[];
               } 
            </code>
        </pre>
    </div>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Des exemples
<div class="flex-row">
    <div class="half">
        <pre>
            <code data-trim class="typescript">
                import { Component } from '@angular/core';
                @Component({
                selector: 'app-root',
                templateUrl: './app.component.html'
                })
                export class AppComponent {
                  foods = ['Bacon', 'Lettuce', 'Tomatoes'];
                  addFood(food) {
                    this.foods.push(food);
                    // this.foods = [ ...this.foods, food ];
                  }
                }
            </code>
        </pre>
        <pre>
            <code data-trim>
                <input #newFood type="text" placeholder="Enter a new food">
                <button (click)="addFood(newFood.value)">Add food</button>
                <app-child [data]="foods"></app-child>
            </code>
        </pre>
    </div>
    <div class="half">
        <pre>
            <code data-trim class="typescript">
               import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
               @Component({
                selector: 'app-child',
                template: './food-details.component.html',
                changeDetection: ChangeDetectionStrategy.OnPush,
               })
               export class ChildComponent {
                @Input() data: string[];
               } 
            </code>
        </pre>
    </div>
</div>
Notes
- Dans cette exemple, on ne verra aucun changement, puisque la référence ne change pas ! 
- Si l'on souhaite chnager de reférence, penser à la destructuration => this.foods = [...this.foods, food];

