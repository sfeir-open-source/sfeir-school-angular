import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  template: `
    <div class="host">
      <ng-container *ngTemplateOutlet="template; context: context"></ng-container>
      <i class="material-icons" (click)="changeType()">{{
        this.type === 'password' ? 'visibility_off' : 'visibility'
      }}</i>
    </div>
  `,
  styles: [
    `
      .host {
        position: relative;
      }

      i {
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    `
  ]
})
export class IconSecretComponent implements OnInit {
  @Input() template: TemplateRef<any>;
  private _type: 'password' | 'text';

  constructor() {}

  ngOnInit(): void {
    this._type = 'password';
  }

  changeType(): void {
    this._type = this._type === 'password' ? 'text' : 'password';
  }

  get context() {
    return {
      $implicit: this._type
    };
  }

  get type(): string {
    return this._type;
  }
}
