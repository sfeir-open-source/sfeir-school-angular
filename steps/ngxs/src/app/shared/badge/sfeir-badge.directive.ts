import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sfeir-badge]'
})
export class SfeirBadgeDirective implements OnInit {
  @Input() person: any;

  /**
   * Component constructor
   */
  constructor(private _el: ElementRef, private _rd: Renderer2) {}
  /**
   * OnInit implementation
   */
  ngOnInit() {
    if (this.person && this.person.isManager) {
      this._rd.setProperty(this._el.nativeElement, 'innerHTML', '<i class="material-icons">supervisor_account</i>');
    }
  }
}
