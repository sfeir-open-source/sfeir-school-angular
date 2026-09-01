import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, Directive, inject, input, inputBinding, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type inputType = 'text' | 'password';

@Component({
  template: ` <div>
    <ng-template [ngTemplateOutlet]="template()" [ngTemplateOutletContext]="_context()" />
    <button type="button" matIconButton (click)="handleChangeType()" name="toggleVisibility">
      <mat-icon> {{ _type() === 'password' ? 'visibility' : 'visibility_off' }} </mat-icon>
    </button>
  </div>`,
  styles: `
    :host {
      width: 100%;
    }
    div {
      width: 100%;
      position: relative;

      button {
        position: absolute;
        right: 1rem;
        top: 0.3rem;
      }
    }
  `,
  imports: [MatIconModule, MatButtonModule, NgTemplateOutlet],
})
class SecretContainer {
  public readonly template = input.required<TemplateRef<{ $implicit: inputType }>>();
  protected readonly _type = signal<string>('password');
  protected readonly _context = computed(() => ({ $implicit: this._type() }));

  handleChangeType(): void {
    this._type.update(type => (type === 'text' ? 'password' : 'text'));
  }
}

@Directive({
  selector: '[sfeirSecret]',
})
export class Secret {
  private readonly _viewContainer = inject(ViewContainerRef);
  private readonly _templateRef = inject(TemplateRef<{ $implicit: inputType }>);

  constructor() {
    this._viewContainer.createComponent(SecretContainer, { bindings: [inputBinding('template', () => this._templateRef)] });
  }
}
