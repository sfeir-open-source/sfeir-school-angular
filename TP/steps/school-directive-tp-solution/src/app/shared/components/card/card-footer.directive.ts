import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'sfeir-card-footer'
})
export class CardFooterDirective implements OnInit {
  constructor(private readonly elementRef: ElementRef<CardFooterDirective>, private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'text-sm');
  }
}
