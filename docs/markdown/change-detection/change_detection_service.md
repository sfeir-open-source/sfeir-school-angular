<!-- .slide: class="sfeir-basic-slide with-code" -->
# Le service ChangeDetectorRef
<br><br>
- Permet d'avoir un contrôle complet sur la statégie de détection
- 4 méthodes
 - detectChanges (détect un changement)
 - markForCheck (détect une mutation d'état pratique pour les observables)
 - detach (permet de ne plus observer une variable)
 - reattach (permet de nouveau regarder les changements)

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Exemple: detectChanges
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
               import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
               @Component({
                selector: 'app-child',
                template: './food-details.component.html'
                changeDetection: ChangeDetectionStrategy.OnPush,
               })
               export class ChildComponent {
                constructor(private readonly cd: changeDectorRef) { }
                @Input() data: string[];
                refresh() {
                  this.cd.detectChanges();
                }
               } 
            </code>
        </pre>
    </div>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Exemple: markForCheck
<div class="flex-row">
    <div class="half">
        <pre>
            <code data-trim class="typescript">
                import { Component } from '@angular/core';
                import { BehaviorSubject } from 'rxjs/BehaviorSubject';
                @Component({
                selector: 'app-root',
                templateUrl: './app.component.html'
                })
                export class AppComponent {
                  foods = new BehaviorSubject(['Bacon', 'Letuce', 'Tomatoes']);;
                  addFood(food) {
                    this.foods.next(food)
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
               import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
               @Component({
                selector: 'app-child',
                template: './food-details.component.html',
                changeDetection: ChangeDetectionStrategy.OnPush,
               })
               export class ChildComponent implements OnInit {
                constructor(private readonly cd: changeDectorRef) { }
                @Input() data: string[];
                foods: string[] = [];
                ngOnInit(): void {
                  this.data.subscribe(food => {
                  this.foods = [...this.foods, ...food];
                  this.cd.markForCheck();
                });
               } 
            </code>
        </pre>
    </div>
</div>
