import { booleanAttribute, Directive, effect, ElementRef, inject, input, Renderer2, signal } from '@angular/core';

const KING_HTML = `<span class="mat-icon material-icons">
supervised_user_circle
</span>`;

type IconColor = 'inherit' | 'red';

@Directive({
  selector: '[sfeirKing]',
  host: {
    '[style.color]': '_iconColor()',
    '(mouseover)': 'handleMouseOver()',
    '(mouseout)': 'handleMouseOut()',
  },
})
export class King {
  private readonly _elementRef = inject(ElementRef<HTMLSpanElement>);
  private readonly _renderer = inject(Renderer2);
  protected _iconColor = signal<IconColor>('inherit');

  public readonly isManager = input.required({ alias: 'sfeirKing', transform: booleanAttribute });

  constructor() {
    effect(() => {
      const isManager = this.isManager();
      this._renderer.setProperty(this._elementRef.nativeElement, 'innerHTML', isManager ? KING_HTML : '');
    });
  }

  handleMouseOver(): void {
    this._iconColor.set('red');
  }

  handleMouseOut(): void {
    this._iconColor.set('inherit');
  }
}
