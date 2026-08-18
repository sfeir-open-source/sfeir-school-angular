import { booleanAttribute, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

const KING_HTML = `<span class="mat-icon material-icons">
supervised_user_circle
</span>`;

@Directive({
  selector: '[sfeirKing]',
})
export class King {
  private readonly _elementRef = inject(ElementRef<HTMLSpanElement>);
  private readonly _renderer = inject(Renderer2);

  public readonly isManager = input.required({ alias: 'sfeirKing', transform: booleanAttribute });

  constructor() {
    effect(() => {
      const isManager = this.isManager();
      this._renderer.setProperty(this._elementRef.nativeElement, 'innerHTML', isManager ? KING_HTML : '');
    });
  }
}
