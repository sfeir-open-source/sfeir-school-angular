import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'sfeir-card-title'
})
export class CardTitleDirective implements OnInit {
  constructor(private readonly elementRef: ElementRef<CardTitleDirective>, private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'text-2xl');
  }
}
