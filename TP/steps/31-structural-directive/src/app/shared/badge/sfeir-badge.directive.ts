import { Directive, ElementRef, Input, OnInit, Renderer2, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[sfeir-badge]'
})
export class SfeirBadgeDirective implements OnInit {
  @HostBinding('style.color') badgeColor: string;
  @Input() person: any;

  /**
   * Component constructor
   */
  constructor(private _el: ElementRef, private _rd: Renderer2) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    event.stopPropagation();
    this.badgeColor = 'red';
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) {
    event.stopPropagation();
    this.badgeColor = 'black';
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    if (this.person && this.person.isManager) {
      this._rd.setProperty(this._el.nativeElement, 'innerHTML', '<i class="material-icons">supervisor_account</i>');
    }
  }
}
