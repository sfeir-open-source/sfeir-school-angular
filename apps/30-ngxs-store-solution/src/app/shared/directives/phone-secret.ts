import { Component, Directive, inject, input, inputBinding, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatIconModule, NgTemplateOutlet, MatButtonModule],
  template: `
    <div class="container-field-icon">
      <ng-container *ngTemplateOutlet="templateRef(); context: { $implicit: type() }" />
      <button type="button" matIconButton (click)="changeVisibility($event)" name="change-visibility">
        <mat-icon>{{ type() === 'text' ? 'visibility' : 'disabled_visible' }}</mat-icon>
      </button>
    </div>
  `,
  styles: `
    .container-field-icon {
      display: flex;
      gap: 1rem
    }
  `,
})
class Phone {
  templateRef = input.required<TemplateRef<{ $implicit: string }>>();
  type = signal('text');

  changeVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.type.update(type => (type === 'text' ? 'password' : 'text'));
  }
}

@Directive({
  selector: '[sfeirPhoneSecret]',
})
export class PhoneSecret {
  private readonly templateRef = inject(TemplateRef<{ $implicit: string }>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    this.viewContainerRef.createComponent(Phone, { bindings: [inputBinding('templateRef', () => this.templateRef)] });
  }
}
